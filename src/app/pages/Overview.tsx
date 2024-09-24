import React, { useEffect, useState } from 'react'
import styles from '../../styles/memoform.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../api/store';
import axios from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineForm } from 'react-icons/ai';


const Overview: React.FC = () => {
    const [memoDetails, setMemoDetails] = useState<any>(null);
    const { documentNo } = useParams<{ documentNo: string }>();
    const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const navigate=useNavigate()
  
    useEffect(() => {
      if (documentNo && accessToken) {
        axios.get(`/api/v1/memo/details/${documentNo}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => {
            setMemoDetails(response.data);
          })
          .catch((error) => {
            console.error("Error fetching memo details:", error);
          });
      }
    }, [documentNo, accessToken]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      // handle input change (if required)
    };
  
    const formatDateTimeForInput = (isoDateTime: string): string => {
        const date = new Date(isoDateTime);
      
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
      
        // Get the hours and determine AM or PM
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const amPm = hours >= 12 ? 'PM' : 'AM';
      
        // Convert hours to 12-hour format
        hours = hours % 12 || 12;  // Converts '0' to '12' for midnight
      
        const formatted = `${year}-${month}-${day} ${String(hours).padStart(2, '0')}:${minutes} ${amPm}`;
        console.log('Formatted DateTime:', formatted);
      
        return formatted;
      };
      const handleCancel= () =>{
        navigate('/my-request')
      }      
  
    return (
      <div className={styles.formGroup}>
        <div style={{ display: "flex", alignItems: "center", padding:"5px" }}>
          <div style={{ color: "#1976D2", width: "15%" , fontSize:"20px", columnGap:"10px", alignItems:"center", display:"flex"}}>
            <div style={{fontWeight:"900", fontSize:"23px"}}>
            <AiOutlineForm />
            </div>
            <div>
          {documentNo}
          </div>
          </div>
          <div className={styles.hr}></div>
        </div>
  
        <div className={styles.fieldCover}>
          <div style={{ padding: "12px", margin: "-20px", fontWeight: "900", backgroundColor: '#F9FBFC' }}>Memo Details</div>
          <div className={styles.fieldContent}>
            <div className={styles.field}>
              <div className={styles.formField}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <input id="subject" name="subject" type="text" value={memoDetails?.subject || ''} onChange={handleInputChange} readOnly className={styles.formInput} />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.formField}>
                <label htmlFor="recipient" className={styles.label}>Recipient</label>
                <input id="recipient" name="recipient" type="text" value={memoDetails?.recipient || ''} onChange={handleInputChange} readOnly className={styles.formInput} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="category" className={styles.label}>CategoryType</label>
                <input id="category" name="category" type="text" value={memoDetails?.category || ''} onChange={handleInputChange} readOnly className={styles.formInput} />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.formField}>
                <label className={styles.label}>From</label>
                <input id="sender" name="sender" type="text" value={memoDetails?.sender || ''} onChange={handleInputChange} readOnly className={styles.formInput} />
              </div>
              <div className={styles.formField}>
                <label htmlFor="date" className={styles.label}>Date</label>
                <input id="date" name="date" type="date" value={memoDetails?.date || ''} onChange={handleInputChange} readOnly className={styles.formInput} />
              </div>
            </div>
            <div className={styles.formField}>
              <label htmlFor="description" className={styles.label}>Description</label>
              <textarea id="description" name="description" rows={4} value={memoDetails?.description || ''} readOnly onChange={handleInputChange} className={styles.input}></textarea>
            </div>
          </div>
        </div>

    <div className={styles.fieldCover} style={{border:"1px solid #FF7668"}}>
      <div style={{ padding:"12px",margin:"-20px", fontWeight:"900", backgroundColor:"#FF7668"}}> 
    Location</div>

    <div className={styles.formField} style={{marginTop:"20px"}}>
            <label className={styles.label}>Landmark</label>
            <input
              id="landmark"
              name="landmark"
              type="text"
              value={memoDetails?.landmark || ""}
              className={styles.formInput}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="department" className={styles.label}>Department</label>
            <input
              id="department"
              name="department"
              value={memoDetails?.department|| ""}
              type="text"
              className={styles.formInput}
              onChange={handleInputChange}
              required
            />
          </div>
          
    </div>
   
    <div className={styles.tableCover}>
    <div style={{ margin:"-20px",padding:"12px", fontWeight:"900", backgroundColor:"#F9FBFC"}}> 
    History</div>
      
    
    <div style={{ width: "100%" , paddingTop:"20px"}}>
        <table className={styles.historyTable}>
          <thead >
            <tr  className={styles.head}>
              <th  className={styles.head} >Created By</th>
              <th className={styles.head}>Status</th>
              <th className={styles.head}>Date</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <tr>
              <td className={styles.data}>{memoDetails?.createdBy || ""}</td>
              <td className={styles.data}>SUBMITTED</td>
              <td className={styles.data}>{memoDetails ? formatDateTimeForInput(memoDetails.dateCreated) : ''} </td>
              
            </tr>
            <tr>
              <td className={styles.data}>{memoDetails?.reviewerName || ""}</td>
              <td className={styles.data}>{memoDetails?.status || ""}</td>
              <td className={styles.data}>{memoDetails?.dateReceived ? formatDateTimeForInput(memoDetails.dateReceived) : ''} </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button color="primary"onClick={handleCancel}  className={styles.RequesterBtn}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Overview