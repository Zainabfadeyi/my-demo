import { UseSelector} from './hook';
import axios from './axios'
import { AuthResponse } from './registerApi'
import { RootState } from './store';


export  interface UserDetailsResponse{
    id:number;
    firstName: string;
    lastName:string;
    userIdentifier:string,
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


    
return{
    loginApi,
  
}
}