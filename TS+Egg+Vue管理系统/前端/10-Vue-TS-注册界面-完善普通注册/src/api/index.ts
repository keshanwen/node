import Network from './network';
export const registerUser = (data:{})=>Network.post('/register', data);
