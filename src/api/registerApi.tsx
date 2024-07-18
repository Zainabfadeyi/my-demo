import exp from 'constants';
import axios from './axios'
import { User } from './slices/authSlice';
export interface AuthResponse{
    token?: any;
    secretImageUri?: string;
    mfaEnabled?:boolean,
    user:User,

}

export const registerApi = async(
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    mfaEnabled:boolean
    
):Promise<AuthResponse>=>{
    const requestData={
        firstName,
        lastName,
        email,
        password,
        mfaEnabled
    };
    try{
        console.log('this is the log', requestData)
        const response = await axios.post<AuthResponse>('/api/v1/auth/register', requestData)
        
        return response.data
        
    }catch (error){
        throw new Error(`Error during registration: ${error}`)
    }
}