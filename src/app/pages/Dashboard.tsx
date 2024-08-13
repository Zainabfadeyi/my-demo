import React from 'react'
import Bar from '../component/chart/Bar'
import PieChart from '../component/chart/PieChart'
import styles from '../../styles/dashboard.module.css'
import LineChart from '../component/chart/LineChart'
import TubeBarChart from '../component/chart/TubeBarChart'
import Line from '../component/chart/Line'
import { Link } from 'react-router-dom'
import Weather from '../component/chart/Weather'

const Dashboard:React.FC = () => {
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
            
            <div style={{fontSize:"27px", color:"#FDC7A2", display:"flex",justifyContent:"center", paddingTop:"30px", paddingBottom:"10px"}}> 98 Request </div>
            </div>
            
        </div>
        <div className={styles.allRequest}>
          <div className={styles.number}>
          <div className={styles.name} style={{display:"flex"}}>
            My Request
            </div>
            <div style={{display:"flex", justifyContent:"center", padding:"10px"}}> Total number of requests</div>
            
            <div style={{fontSize:"27px", color:"#FDC7A2", display:"flex",justifyContent:"center", paddingTop:"30px", paddingBottom:"10px"}}> 98 Request </div>
            </div>
            
        </div>
      </div>


      <div  className={styles.segment}>
        <div style={{display:"flex", width:"100%", backgroundColor:"#fff",  boxShadow:" 0 0 10px rgba(0, 0, 0, 0.1)"}}>
          <div style={{fontWeight:"500", width:"100%", margin:"10px"}}>
            <p style={{fontSize:"18px",}}>Task Progress</p>
            
            <p style={{fontSize:"29px",color:"#b5b5b5"}}>98</p>
            </div>
            <div style={{justifyContent:'center',display:"flex", width:"100%"}}>
      <LineChart/>
      </div>
      </div>

      <div  style={{display:"flex", width:"100%", backgroundColor:"#fff", padding:"10px", boxShadow:" 0 0 10px rgba(0, 0, 0, 0.1)"}}>
      <div style={{fontWeight:"500", width:"100%", margin:"10px"}}>
            <p style={{fontSize:"18px"}}>Task Category</p>
            
            <p style={{fontSize:"29px",color:"#b5b5b5"}}>98</p>
            </div>
      <TubeBarChart />

      </div>
      <Weather/>
      </div>
      

      <div className= {styles.chartContainer }>
        <div className={styles.Bar}>
          <div className={styles.header}>
            
              Task Status
              <div style={{display:"flex"}}>
                dropdown
            

            </div>

          </div>
        <Bar/>
        </div>
        
        
        <div className={styles.Bar}>
          <div className={styles.header}>
              Category
              <div style={{display:"flex"}}>
              dropdown
            </div>

          </div>
          <PieChart/>
        </div>
      
      
    
    </div>
    </div>
  )
}

export default Dashboard;