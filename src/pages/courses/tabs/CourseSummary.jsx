import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TableToolbar from '../../../components/TableToolbar'
import DataTable from '../../../components/DataTable'
import {getAdminDashboard} from "../../../api/students.api"
import ImportCsvModal  from '../../../components/ImportCsvModal'
import { exportToCsv } from '../../../utils/exportToCsv'
import { importCsv } from '../../../api/students.api'

const CourseSummary = ({ CourseID }) => {
 const [data,setData]=useState(null);
  const [courseType,setCourseType]=useState('');
  
 
  const load=async(cid=CourseID)=>{
    const r=await getAdminDashboard({course_id:cid});
    setData(r.data);
  };
 
  useEffect(()=>{load();},[]);
  if(!data) return <div className='p-5'>Loading...</div>;
  const s=data.summary;
 
  return ( 
  <div className='container-fluid'>
  
   <div className='row'>
    {Object.entries(s).map(([k, v]) => {
      if (k == 'total_students' || k == 'total_courses'
      ) return null;
      return (
        <div className='col-md-3 mb-3' key={k}>
          <div className='card'>
            <div className='card-body text-center'>
              <h6>{k.replaceAll('_', ' ')}</h6>
              <h2>{v}</h2>
            </div>
          </div>
        </div>
      );
    })}
   </div>
  </div>    
  )
}

export default CourseSummary