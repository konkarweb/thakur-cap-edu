import React,{useEffect,useState} from 'react';
import {getAdminDashboard} from "../api/students.api";

export default function AdminDashboard(){
 const [data,setData]=useState(null);
 const [courseType,setCourseType]=useState('');
 const [courseId,setCourseId]=useState('');

 const load=async(ct=courseType,cid=courseId)=>{
   const r=await getAdminDashboard({course_type:ct,course_id:cid});
   setData(r.data);
 };

 useEffect(()=>{load();},[]);
 if(!data) return <div className='p-5'>Loading...</div>;
 const s=data.summary;

 return <div className='container-fluid'>
  <div className='row mb-3'>
   <div className='col-md-4'>
    <select className='form-select' value={courseType}
      onChange={e=>{setCourseType(e.target.value);setCourseId('');load(e.target.value,'')}}>
      <option value=''>All Types</option>
      {data.course_types.map(x=><option key={x.CourseTypeID} value={x.CourseType}>{x.CourseType}</option>)}
    </select>
   </div>
   <div className='col-md-6'>
    <select className='form-select' value={courseId}
      onChange={e=>{setCourseId(e.target.value);load(courseType,e.target.value)}}>
      <option value=''>All Courses</option>
      {data.courses.map(x=><option key={x.CourseID} value={x.CourseID}>{x.CourseTitle}</option>)}
    </select>
   </div>
  </div>
  <div className='row'>
   {Object.entries(s).map(([k,v])=><div className='col-md-3 mb-3' key={k}><div className='card'><div className='card-body text-center'><h6>{k.replaceAll('_',' ')}</h6><h2>{v}</h2></div></div></div>)}
  </div>
 </div>
}
