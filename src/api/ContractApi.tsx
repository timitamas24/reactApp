import axios from 'axios';
import { ContractProps } from '../models/ContractProps';
import { authConfig, BASE_URL, withLogs } from "../utils";

const tasksUrl = `http://${BASE_URL}/api/item`

export const getContracts: (token: string, page: number) => Promise<ContractProps[]> = (token, page) => {
  return withLogs(axios.get(`${tasksUrl}/${page}`, authConfig(token)), 'getItems');
}

export const createContract: (token: string, task: ContractProps) => Promise<ContractProps[]> = (token, task) => {
  return withLogs(axios.post(tasksUrl, task, authConfig(token)), 'createItem');
}

export const updateContract: (token: string, task: ContractProps) => Promise<ContractProps[]> = (token, task) => {
  return withLogs(axios.put(`${tasksUrl}/${task._id}`, task, authConfig(token)), 'updateItem');
}

interface MessageData {
  event: string;
  payload: ContractProps;
}

export const newWebSocket = (token: string, onMessage: (data: MessageData) => void) => {
  const ws = new WebSocket(`ws://${BASE_URL}`);
  ws.onopen = () => {
    console.log('web socket onopen');
    ws.send(JSON.stringify({ type: 'authorization', payload: { token } }));
  };
  ws.onclose = () => {
    console.log('web socket onclose');
  };
  ws.onerror = error => {
    console.log('web socket onerror: ', error);
  };
  ws.onmessage = messageEvent => {
    console.log('web socket onmessage');
    onMessage(JSON.parse(messageEvent.data));
  };
  return () => {
    ws.close();
  };
};