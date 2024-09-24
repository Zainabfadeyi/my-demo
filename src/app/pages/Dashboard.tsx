import React, { useEffect, useState } from 'react'
import Bar from '../component/chart/Bar'
import PieChart from '../component/chart/PieChart'
import styles from '../../styles/dashboard.module.css'
import LineChart from '../component/chart/LineChart'
import TubeBarChart from '../component/chart/TubeBarChart'
import { Link } from 'react-router-dom'
import Weather from '../component/chart/Weather'
import { useSelector } from 'react-redux'
import { RootState } from '../../api/store'
import axios from '../../api/axios'
import MyTask from './MyTask'

const Dashboard:React.FC = () => {
  const [totalRequests, setTotalRequests] = useState<number>(0);
  const [myRequests, setMyRequests] = useState<number>(0);
  const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken);
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // Default to current month
    const [selectedPieMonth, setSelectedPieMonth] = useState<number>(new Date().getMonth() + 1);
    const fetchTotalRequests = async () => {
      try {
        const response = await axios.get('/api/v1/memo/count',
          {
            headers: {
              Authorization: `Bearer ${accessToken}` 
            }
      }
        );
        setTotalRequests(response.data); // Set total number of requests
      } catch (error) {
        console.error('Error fetching total requests:', error);
      }
    };
  
    // Fetch the number of memos for a specific user (my requests)
    const fetchMyRequests = async () => {
      try {
        const response = await axios.get(`/api/v1/memo/count/by-user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}` 
            }
      }
        );
        setMyRequests(response.data); // Set number of requests for this user
      } catch (error) {
        console.error('Error fetching my requests:', error);
      }
    };
  
    // Use useEffect to make the API calls on component mount
    useEffect(() => {
      fetchTotalRequests();
      fetchMyRequests();
    }, []);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedMonth(parseInt(event.target.value));
    };
  
    const handlePieMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedPieMonth(Number(event.target.value));
    };

    

  return (
    <div className={styles.container}>
      <div className={styles.memoWrap}>
        <h2 style={{color:"#62B5D5", marginBottom:"8px"}}>Memorandum Form and Workflow </h2>
        
        <div  style={{ border:"1px solid #f5f5f5", marginBottom:"10px"}}/>
        <div style={{display:"block", width:"100%"}}>
          <p style={{marginBottom:"10px"}}> Informing users for a speacific problem or solution </p>
        
        <Link to={"/inbox"} style={{color:"#62B5D5"}}> Inbox </Link>
        </div>
      </div>

      <div className={styles.request}>
        <div className={styles.allRequest}>
          <div className={styles.number}>
          <div className={styles.name} style={{display:"flex"}}>
            All Request
            </div>
            <div style={{display:"flex", justifyContent:"center", padding:"10px"}}> Total number of requests</div>
            
            <div style={{fontSize:"27px", color:"#FDC7A2", display:"flex",justifyContent:"center", paddingTop:"30px", paddingBottom:"10px"}}> {totalRequests} Request </div>
            </div>
            
        </div>
        <div className={styles.allRequest}>
          <div className={styles.number}>
          <div className={styles.name} style={{display:"flex"}}>
            My Request
            </div>
            <div style={{display:"flex", justifyContent:"center", padding:"10px"}}> Total number of requests</div>
            
            <div style={{fontSize:"27px", color:"#FDC7A2", display:"flex",justifyContent:"center", paddingTop:"30px", paddingBottom:"10px"}}> {myRequests} Request </div>
            </div>
            
        </div>
      </div>


      <div  className={styles.segment}>
        <div style={{display:"flex", width:"100%", backgroundColor:"#fff",  boxShadow:" 0 0 10px rgba(0, 0, 0, 0.1)"}}>
          <div style={{fontWeight:"500", width:"100%", margin:"10px"}}>
            <p style={{fontSize:"18px",}}>Task Progress</p>
            
            <p style={{fontSize:"29px",color:"#b5b5b5"}}>{totalRequests}</p>
            </div>
            <div style={{justifyContent:'center',display:"flex", width:"100%"}}>
      <LineChart/>
      </div>
      </div>

      <div  style={{display:"flex", width:"100%", backgroundColor:"#fff", padding:"10px", boxShadow:" 0 0 10px rgba(0, 0, 0, 0.1)"}}>
      <div style={{fontWeight:"500", width:"100%"}}>
            <div style={{fontSize:"18px", paddingBottom:"26px" }}>Task Category</div>
            
            <p style={{fontSize:"29px",color:"#b5b5b5",paddingBottom:"10px"}}>{totalRequests}</p>
            </div>
      <TubeBarChart />

      </div>
      <Weather/>
      </div>
      

      <div className={styles.chartContainer}>
        <div className={styles.Bar}>
          <div  style={{ padding: '20px', margin:"-9px", fontWeight: '500', backgroundColor: '#F9FBFC' , fontSize:"18px"}} className={styles.header}>
            Task Status
            <div style={{ display: "flex" }}>
              <select value={selectedMonth} onChange={handleMonthChange} className={styles.monthDropdown}>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {new Date(2024, i, 1).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Bar month= {selectedMonth}/>
        </div>
        
        <div className={styles.Bar}>
          <div className={styles.header} style={{ padding: '20px', margin:"-9px", fontWeight: '500', backgroundColor: '#F9FBFC', fontSize:"18px" }}>
            Category
            <div style={{ display: "flex" }}>
              <select value={selectedPieMonth} onChange={handlePieMonthChange} className={styles.monthDropdown}>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {new Date(2024, i, 1).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <PieChart month={selectedPieMonth}/>
        </div>
      
      
      
    
    </div>
    <div style={{ padding: '20px', margin:"-9px", fontWeight: '500', fontSize:"18px"}}>
            My Request
            </div>
    <MyTask/>
    </div>
  )
}

export default Dashboard;