import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from '../../../styles/memoform.module.css';
import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import { RootState } from '../../../api/store';
import { useSelector } from 'react-redux';
import { MemoApi } from '../../../api/memo/MemoApi';
import LoadingSpinner from '../chart/LoadingSpinner';

interface RequesterProps{
  memoId:string|undefined,
  documentNo:string|undefined
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const ReviewerFormPages: React.FC<RequesterProps> = ({ memoId, documentNo }) => {
    const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
  const { recieveMemo } = MemoApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  
 
  const [memoDetails, setMemoDetails] = useState<any>(null);

  useEffect(() => {
    if (memoId) {
      axios.get(`/api/v1/memo/${memoId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
        .then((response) => {
          setMemoDetails(response.data);
          
        })
        .catch((error) => {
          console.error("Error fetching memo details:", error);
        });
    }
  }, [memoId]);


    // const handleTemplateSelection = (url: string | null) => {
    //   setDocumentUrl(url); // Update the state with the selected document URL
    // };



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const formatDateTimeForInput = (isoDateTime: string): string => {
    const date = new Date(isoDateTime);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    const formatted = `${year}-${month}-${day}T${hours}:${minutes}`;
    console.log('Formatted DateTime:', formatted);
    
    return formatted;
  };
const formattedDate = memoDetails?.memo.dateCreated ? formatDateTimeForInput(memoDetails.memo.dateCreated) : '';

const formatDateTimeForDisplay = (isoDateTime: string): string => {
  const date = new Date(isoDateTime);
  
  const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(date);
};

// Assuming memoDetails.date is the ISO date-time string
const formattedDateForDisplay = memoDetails?.memo.dateCreated ? formatDateTimeForDisplay(memoDetails.memo.dateCreated) : '';

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  // Spread the entire memoDetails object and then update memo properties
  setMemoDetails({
    ...memoDetails,
    memo: {
      ...memoDetails.memo,
      [name]: value,
    }
  });
};
const handleSubmit =async()=>{
  setIsLoading(true);
  try{
    await recieveMemo(memoId)
    await delay(2000);
    navigate('/inbox')
  }catch(error){
    console.error('Error creating memo:', error);
  }
  finally {

    setIsLoading(false);
  }
}
if (isLoading) {
  return <LoadingSpinner size={50} message="Reviewing your memo..." />;
}


  return(
  <div className={styles.formGroup}>
    {memoDetails ? (
    <>
     
     <div style={{ display:"flex", alignItems:"center"}}> 
      <div style={{color:"#1976D2", width:"15%"}}>Memo Document </div>
      
      <div className={styles.hr}></div>
      </div>

      <div className={styles.fieldCover}>
      <div style={{ padding:"12px",margin:"-20px", fontWeight:"900", backgroundColor:"#F9FBFC"}}> 
    Petition Document</div>
    <div className={styles.fieldContent}>
      <div className={styles.field}>
    <div className={styles.formField}>
    
      <label htmlFor="documentNo" className={styles.label}>DocumentNo</label>
      <input id="documentNo" name="documentNo" type="text" onChange={handleInputChange} value={memoDetails.memo.documentNo}readOnly className={styles.formInput} />
    </div>
    <div className={styles.formField}>
      <label htmlFor="date" className={styles.label}>RequestDate</label>
      <input id="date" name="date" onChange={handleInputChange} type="datetime-local" value={formattedDate} readOnly className={styles.formInput} />
    </div>
    <div className={styles.formField}>
      <label  className={styles.label}>Status</label>
      <input id="text" name="status" type="text" onChange={handleInputChange} value={memoDetails.memo.status}readOnly className={styles.formInput} />
    </div>
    </div>
    </div>
    </div>

    
    <div className={styles.fieldCover}>
      <div style={{ padding:"12px",margin:"-20px", fontWeight:"900",backgroundColor: '#00FF00'}}> 
    Memo Details</div>

    <div className={styles.fieldContent }>
    <div className={styles.field}>
    <div className={styles.formField}>
    
    <label htmlFor="subject" className={styles.label}>Subject</label>
    <input id="subject" name="subject" type="text" onChange={handleInputChange} readOnly value={memoDetails.memo.subject}className={styles.formInput} />
  </div>
  </div>
    <div className={styles.field}>
    
    
    <div className={styles.formField}>
      <label htmlFor="recipient" className={styles.label}>Recipient</label>
      <input id="recipient" name="recipient" type="text" onChange={handleInputChange} readOnly value={memoDetails.memo.recipient}className={styles.formInput} />
    </div>
    <div className={styles.formField}>
      <label htmlFor="category" className={styles.label}>CategoryType</label>
      <input id="category" name="category" type="text" onChange={handleInputChange} readOnly value={memoDetails.memo.category}className={styles.formInput} />
    </div>
    </div>
    <div className={styles.field}>
    <div className={styles.formField}>
      <label  className={styles.label}>From</label>
      <input id="sender" name="sender" type="text" onChange={handleInputChange} readOnly value={memoDetails.memo.sender}className={styles.formInput} />
    </div>
    <div className={styles.formField}>
      <label htmlFor="date" className={styles.label}>Date</label>
      <input id="date" name="date" type="date" onChange={handleInputChange} readOnly value={memoDetails.memo.date} className={styles.formInput} />
    </div>
    </div>
    <div className={styles.formField}>
      <label htmlFor="description" className={styles.label}>Description</label>
      <textarea id="description" name="description" rows={4} readOnly onChange={handleInputChange} value={memoDetails.memo.description} className={styles.input}></textarea>
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
              value={memoDetails.memo.landmark}
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
              value={memoDetails.memo.department}
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
              <td className={styles.data}>{memoDetails.memo.createdBy}</td>
              <td className={styles.data}>Submitted</td>
              <td className={styles.data}>{formattedDateForDisplay}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button color="primary" onClick={handleSubmit} className={styles.RequesterBtn}>
          Submit
        </button>
        <button color="primary"  className={styles.RequesterBtn}>
          Cancel
        </button>
      </div>
      </>
      ) : (
        <p>Loading memo details...</p>
      )}
  </div>
  )
};


export default ReviewerFormPages;