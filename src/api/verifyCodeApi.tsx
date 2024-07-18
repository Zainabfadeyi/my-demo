
import axios from './axios'
export interface VerificationRequest{
    email:string,
    code:string,
}

export const verifyCodeApi = async(
    email:string,
    code:string,
):Promise<VerificationRequest>=>{
    const verifyData={
        email,
        code,
    };try{
        
        const response = await axios.post<VerificationRequest>(`/api/v1/auth/verify`, verifyData)
        return response.data
        
    }catch(error){
        throw new Error(`Error during validation ${error}`)
    }
}
