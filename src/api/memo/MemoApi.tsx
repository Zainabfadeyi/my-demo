import { useSelector } from 'react-redux';
import axios from '../axios'
import { RootState } from '../store';

export const MemoApi = () => {
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
  
    const createMemo = async (memoData: any) => {
      try {
        const { reviewerName, ...rest } = memoData;
  
        // Construct the query params for the URL
        const queryParams = new URLSearchParams({
          reviewerName: reviewerName || '', 
        }).toString();
  
        const response = await axios.post(
          `/api/v1/memo/${userId}?${queryParams}`, // Add query parameters to the URL
          rest, // Send the rest of the memo data in the body (excluding the names)
          {
            headers: {
              Authorization: `Bearer ${accessToken}` // Pass access token in headers
            }
          }
        );
  
        return response.data;
      } catch (error) {
        console.error("Error creating memo:", error);
        throw error;
      }
    };
    const getMemoById = async (id: number) => {
      try {
        // Send GET request to retrieve memo details by its ID
        const response = await axios.get(
          `/api/v1/memo/${id}`,
          
          {
            headers: {
              Authorization: `Bearer ${accessToken}` // Pass access token in headers
            }
          }
        );
  
        return response.data; // Return the memo data
      } catch (error) {
        console.error("Error fetching memo by ID:", error);
        throw error;
      }
    };
     const recieveMemo =async (id:string | undefined)=>{
      console.log(accessToken);

      try{
        const response = await axios.put(
          `/api/v1/memo/${id}/review/${userId}`, 
          {
            isReviewed: true, // Pass isReviewed as true in the request body
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}` // Pass access token in headers
            }
          }
        );
        console.log(accessToken);

        return response.data; 
      }catch(error){
      console.error("Error fetching memo by ID:", error);
      throw error;
     }}
  
    return { createMemo, getMemoById, recieveMemo };
  };
  