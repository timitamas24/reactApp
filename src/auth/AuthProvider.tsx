import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { login as loginApi } from "./AuthApi";
import { Storage } from "@capacitor/storage";
import { useStorage } from "../utils/useStorage";

export const AUTH_TOKEN = "auth_token";

export interface AuthState {
  authenticationError: Error | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login?: (username?: string, password?: string) => void;
  logout?: () => void;
  pendingAuthentication?: boolean;
  username?: string;
  password?: string;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  authenticationError: null,
  pendingAuthentication: false,
  token: ""
}

export const AuthContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
  children: PropTypes.ReactNodeLike
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const { isAuthenticated, isAuthenticating, authenticationError, pendingAuthentication, token } = state;
  const login = useCallback(loginCallback, []);
  const logout = useCallback(logoutCallback, []);
  useEffect(loadTokenEffect, []);
  useEffect(authenticationEffect, [pendingAuthentication]);
  const value = { isAuthenticated, login, logout, isAuthenticating, authenticationError, pendingAuthentication, token };
  const storage = useStorage();
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

  function loginCallback(username?: string, password?: string): void {
    setState({ ...state, pendingAuthentication: true, username, password })
  }

  function logoutCallback(): void {
    storage.remove(AUTH_TOKEN);
    setState(initialState);
  }

  function loadTokenEffect() {
    storage.get(AUTH_TOKEN).then((token) => {
      if (!token) return;
      setState({
        ...state,
        token,
        pendingAuthentication: false,
        isAuthenticated: true,
        isAuthenticating: false,
      });
    });
  }

  function authenticationEffect() {
    let canceled = false;
    authenticate();
    return () => {
      canceled = true;
    }

    async function authenticate() {
      if (!pendingAuthentication) return;

      try {
        setState({ ...state, isAuthenticating: true });
        const { username, password } = state;
        const { token } = await loginApi(username, password);
        await storage.set(AUTH_TOKEN, token);

        if (canceled) return;
        setState({
          ...state,
          token,
          pendingAuthentication: false,
          isAuthenticated: true,
          isAuthenticating: false
        });
      } catch (error) {
        if (canceled) return;
        setState({
          ...state,
          authenticationError: error,
          pendingAuthentication: false,
          isAuthenticating: false
        });
      }
    }
  }
};