import { BASE_URL, config, withLogs } from "../utils";
import axios from "axios";


const authUrl = `http://${BASE_URL}/api/auth/login`;

export interface AuthProps {
  token: string;
}

export const login: (username?: string, password?: string) => Promise<AuthProps> = (username, password) => withLogs(axios.post(authUrl, {
  username,
  password
}, config), 'login');