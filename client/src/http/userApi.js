import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (username, password) => {
    const { data } = await $host.post('api/user/registration', { username, password});
    localStorage.setItem('token', data.token);
    const decoded = jwtDecode(data.token);
    return { id: decoded.id, username: decoded.username, password, role: decoded.role };
}

export const login = async (username, password) => {
    const { data } = await $host.post('api/user/login', { username, password });
    localStorage.setItem('token', data.token);
    const decoded = jwtDecode(data.token);
    return { id: decoded.id, username: decoded.username, password, role: decoded.role }; 
}


export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}