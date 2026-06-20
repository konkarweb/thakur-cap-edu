import React, { useEffect, useState } from "react";
import CourseDashboard from "./CourseDashboard";
import AdminDashboard from "./AdminDashboard";
export default function Dashboard() {

 const user = JSON.parse(localStorage.getItem('auth'))
  const role = user?.role

  return (
    <>
      {role === 'STUDENT' && <CourseDashboard />}
      {role === 'ADMIN' && <AdminDashboard />}
    </>
  );
  
}
