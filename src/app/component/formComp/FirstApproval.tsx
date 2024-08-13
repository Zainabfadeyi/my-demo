import styles from '../../../styles/memoform.module.css';
import Doc from '../../pages/Doc';
import Templates from './Templates';
import React, { useState } from 'react';


const FirstApproval :React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [selectedUser, setSelectedUser] = useState('');

  return(
  <div className={styles.formGroup}>
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
    
      <label htmlFor="subject" className={styles.label}>DocumentNo</label>
      <input id="subject" name="subject" type="text" readOnly className={styles.formInput} />
    </div>
    <div className={styles.formField}>
      <label htmlFor="recipient" className={styles.label}>RequestDate</label>
      <input id="recipient" name="recipient" type="text" readOnly className={styles.formInput} />
    </div>
    <div className={styles.formField}>
      <label htmlFor="from" className={styles.label}>Status</label>
      <input id="from" name="from" type="text" readOnly className={styles.formInput} />
    </div>
    </div>
    </div>
    </div>

    
    <div className={styles.fieldCover}>
      <div style={{ padding:"12px",margin:"-20px", fontWeight:"900", backgroundColor:"#F9FBFC"}}> 
    Memo Details</div>

    <div className={styles.fieldContent }>
    <div className={styles.field}>
    <div className={styles.formField}>
    
      <label htmlFor="subject" className={styles.label}>Subject</label>
      <input id="subject" name="subject" type="text" className={styles.formInput} />
    </div>
    <div className={styles.formField}>
      <label htmlFor="recipient" className={styles.label}>Recipient</label>
      <input id="recipient" name="recipient" type="text" className={styles.formInput} />
    </div>
    </div>
    <div className={styles.field}>
    <div className={styles.formField}>
      <label htmlFor="from" className={styles.label}>From</label>
      <input id="from" name="from" type="text" className={styles.formInput} />
    </div>
    <div className={styles.formField}>
      <label htmlFor="date" className={styles.label}>Date</label>
      <input id="date" name="date" type="date" className={styles.formInput} />
    </div>
    </div>
    <div className={styles.formField}>
      <label htmlFor="description" className={styles.label}>Description</label>
      <textarea id="description" name="description" rows={4} className={styles.input}></textarea>
    </div>
    </div>
    </div>

    
    <div className={styles.docsCover}>
    <div style={{ padding:"12px",margin:"-20px", fontWeight:"900", backgroundColor:"#F9FBFC"}}> 
    Attachment</div>
      <div className={styles.docsContent}>
    <div className={styles.formFieldAttachment}>
      <label htmlFor="documentName" className={styles.label}>Document Name/Description</label>
      <textarea id="documentName" name="documentName"  rows={6} className={styles.input} > </textarea>
    </div>
    <div style={{width:"100%"}}>
      
      <Doc/>
    </div>
    </div>
    </div>

    <div className={styles.fieldCover} style={{border:"1px solid #FF7668"}}>
      <div style={{ padding:"12px",margin:"-20px", fontWeight:"900", backgroundColor:"#FF7668"}}> 
    Action</div>

    <div className={styles.fieldContent }>
          
          
          <label>Appproval Considerations</label>
            <select id="user" name="user"  className={styles.userInput} onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}> 
            
              <option value="user1">Approved</option>
              <option value="user2">Rejected</option>

            </select>
    <div className={styles.formField}>
      <label htmlFor="description" className={styles.label}>Description</label>
      <textarea id="description" name="description" rows={4} className={styles.input}></textarea>
    </div>
    </div>
    </div>
    <div>
    
    <Templates/>
    </div>
    <div className={styles.tableCover}>
    <div style={{ margin:"-20px",padding:"12px", fontWeight:"900", backgroundColor:"#F9FBFC"}}> 
    History</div>
      
    
    <div style={{ width: "100%" , paddingTop:"20px"}}>
        <table className={styles.historyTable}>
          <thead >
            <tr  className={styles.head}>
              <th className={styles.head} >Created By</th>
              <th className={styles.head}>Status</th>
              <th className={styles.head}>Date</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <tr>
              <td className={styles.data}>user1</td>
              <td className={styles.data}>Submitted</td>
              <td className={styles.data}>12/12/2021</td>
            </tr>
            <tr>
              <td className={styles.data}>user2</td>
              <td className={styles.data}>Reviewer</td>
              <td className={styles.data}>12/12/2021</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
  </div>
  )
};


export default FirstApproval;