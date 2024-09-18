import axios from './axios'
import { User } from './slices/authSlice';
export interface AuthResponse{
    token?: any;
    secretImageUri?: string;
    mfaEnabled?:boolean,
    user:User,

}
// export interface UserDetailsResponse{
//     id:Number,
//     firstName:string,
//     lastName:string,
//     userIdentifier:string,
//     email:string,
//     role:string
// }

// export const registerApi = async(
//     firstName:string,
//     lastName:string,
//     userIdentifier:string,
//     email:string,
//     password:string,
//     mfaEnabled:boolean,
//     signature:File|null
    
// ):Promise<AuthResponse>=>{
//     const requestData={
//         firstName,
//         lastName,
//         userIdentifier,
//         email,
//         password,
//         mfaEnabled,
//         signature
//     };
//     try{
        
//         const response = await axios.post<AuthResponse>('/api/v1/auth/register', requestData)
//         console.log('this is the log', requestData)
//         console.log('this is the response', response)
//         return response.data
        
        
//     }catch (error){
//         throw new Error(`Error during registration: ${error}`)
//     }
// }
export const registerApi = async (formData: FormData): Promise<AuthResponse> => {
    try {
        console.log("this is reaponnse ", formData)
        const response = await axios.post<AuthResponse>('/api/v1/auth/register', formData, {
            headers: {
                'Content-Type': 'application/json' // Ensure the content type is set correctly
            }
        });
        
        return response.data;
       
    } catch (error) {
        throw new Error(`Error during registration: ${error}`);
    }
};
