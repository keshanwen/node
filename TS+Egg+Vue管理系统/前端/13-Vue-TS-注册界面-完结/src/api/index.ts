import Network from './network';
export const registerUser = (data:{})=>Network.post('/register', data);
export const sendCode2Email = (data:{})=>Network.get('/emailcode', data);
export const sendCode2Phone = (data:{})=>Network.get('/smscode', data);
