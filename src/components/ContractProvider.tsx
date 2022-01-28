import React, { useCallback, useContext, useEffect, useReducer } from "react";
import PropTypes from 'prop-types';
import { ContractProps } from "../models/ContractProps";
import { createContract, getContracts, newWebSocket, updateContract } from "../api/ContractApi";
import { AuthContext } from "../auth/AuthProvider";
import { useNetwork } from "../utils/useNetwork";
import { useStorage } from "../utils/useStorage";
import { sync } from "ionicons/icons";

type SaveContractFn = (contract: ContractProps) => Promise<any>;
type FetchContractFn = (page: number) => Promise<any>;

export interface ContractState {
  contract?: ContractProps[];
  fetching: boolean,
  fetchingError?: Error | null,
  saving: boolean,
  savingError?: Error | null,
  saveContract?: SaveContractFn,
  fetchContract?: FetchContractFn
}

interface ActionProps {
  type: string,
  payload?: any
}

const initialState: ContractState = {
  fetching: false,
  saving: false
}

const FETCH_CONTRACT_START = 'FETCH_CONTRACT_START';
const FETCH_CONTRACT_SUCCESS = 'FETCH_CONTRACT_SUCCESS';
const FETCH_CONTRACT_FAIL = 'FETCH_CONTRACT_FAIL';
const SAVE_CONTRACT_START = 'SAVE_CONTRACT_START';
const SAVE_CONTRACT_SUCCESS = 'SAVE_CONTRACT_SUCCESS';
const SAVE_CONTRACT_FAIL = 'SAVE_CONTRACT_FAIL';
const LOCAL_CONTRACT = 'local_CONTRACT';

const reducer: (state: ContractState, action: ActionProps) => ContractState = (state, { type, payload }) => {
  switch (type) {
    case FETCH_CONTRACT_START:
      return { ...state, fetching: true, fetchingError: null };
    case FETCH_CONTRACT_SUCCESS:{
      //console.log('fetched contracts: ', payload.contract);
      return { ...state, fetching: false, contract: payload.contract };
    }
      
    case FETCH_CONTRACT_FAIL:
      return { ...state, fetching: false, fetchingError: payload.error };
    case SAVE_CONTRACT_START:
      return { ...state, saving: true, savingError: null };
    case SAVE_CONTRACT_SUCCESS:
      const contract = [...(state.contract || [])];
      const cont = payload.contract;
      
      const index = contract.findIndex(t => t._id === cont._id);
      if (index === -1) {
        contract.push(cont);
      } else {
        contract[index] = cont;
      }
      return { ...state, saving: false, contract };
    case SAVE_CONTRACT_FAIL:
      alert("Contract failed to save, check connection and refresh page");
      return { ...state, saving: false, savingError: payload.error }
    default:
      return state;
  }
}

export const ContractContext = React.createContext<ContractState>(initialState);

interface ContractProviderProps {
  children: PropTypes.ReactNodeLike
}

export const ContractProvider: React.FC<ContractProviderProps> = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchContract = useCallback(fetchContractCallback, [token]);
  const { contract, fetching, fetchingError, saving, savingError } = state;
  const { networkStatus } = useNetwork();
  const storage = useStorage();
  useEffect(syncDataEffect, [networkStatus]);
  useEffect(wsEffect, [token]);
  const saveContract = useCallback<SaveContractFn>(saveContractCallback, [token]);
  const value = { contract, fetchContract, fetching, fetchingError, saving, savingError, saveContract };
  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );

  async function fetchContractCallback(page: number) {
    if (!token?.trim())
      return;

    let canceled = false;

    try {
      console.log('fetchContract start');
      dispatch({ type: FETCH_CONTRACT_START });
      const contract = await getContracts(token, page);
      console.log('fetchContract success');
      if (!canceled) {
        dispatch({ type: FETCH_CONTRACT_SUCCESS, payload: { contract } });
      }
    } catch (error) {
      console.log('fetchContract fail');
      dispatch({ type: FETCH_CONTRACT_FAIL, payload: { error } });
    }
    return () => {
      canceled = true;
    }
  }

  async function saveContractCallback(contract: ContractProps) {
    try {
      console.log('saveContract start');
      dispatch({ type: SAVE_CONTRACT_START });
      const savedContract = await (contract._id ? updateContract(token, contract) : createContract(token, contract));
      console.log('saveContract success');
      dispatch({ type: SAVE_CONTRACT_SUCCESS, payload: { contract: savedContract } });
    } catch (error) {
      const localContract = await storage.get(LOCAL_CONTRACT) || [];
      localContract.push(contract);
      await storage.set(LOCAL_CONTRACT, localContract);
      console.log('saveContract fail');
      dispatch({ type: SAVE_CONTRACT_FAIL, payload: { error, contract } });
    }
  }

  function wsEffect() {
    let canceled = false;
    const closeWebSocket = newWebSocket(token, (message: { event: any; payload: any; }) => {
      if (canceled) return;
      const { event, payload: contract } = message;
      if (event === 'created' || event === 'updated') {
        dispatch({ type: SAVE_CONTRACT_SUCCESS, payload: { contract } });
      }
    });
    return () => {
      canceled = true;
      closeWebSocket();
    }
  }

  async function syncData() {
    const localContract = await storage.get(LOCAL_CONTRACT) || [];
    localContract.forEach((contract: ContractProps) => saveContractCallback(contract));
    console.log("syncing local data to server");
  }

  function syncDataEffect() {
    if (!networkStatus.connected) return;
    syncData();
    storage.remove(LOCAL_CONTRACT);
  }
}