import { UseSelector} from './hook';
import axios from './axios'
import { AuthResponse } from './registerApi'
import { RootState } from './store';


interface UserDetailsResponse{
    id:number;
    firstName: string;
    lastName:string;
    email:string;
    role:string;

}
export const loginService= ()=>{
    
    const token = UseSelector((state: RootState) => state.auth.token);
  

    const loginApi= async(
        email: string,
        password: string,
    ):Promise<AuthResponse>=>{
        const requestData={
            email,
            password,
        
        };try{
            console.log('this is the response', requestData)
            const response = await axios.post<AuthResponse>(`/api/v1/auth/authenticate`, requestData)
            console.log('this is after',requestData)
            return response.data
        }catch(error){
            throw new Error(`Error during login process: ${error} `)
        }

    }

    const userDetailsAPi= async(
    ):Promise<UserDetailsResponse> =>{
        
        try{
            
            const response = await axios.get(`/api/v1/user/details`,{
                headers:{Authorization: `Bearer ${token}`, }
            });
            return response.data

        }catch(error){
            throw new Error(`Error getting userdetails: ${error}`)
        }
    }
return{
    loginApi,
    userDetailsAPi
}
}