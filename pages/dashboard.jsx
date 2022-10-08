import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../_recoil/userState";
import AdminDashboard from "../components/adminDashboard";
import EmployeeDashboard from "../components/employeeDashboard";
export default function Dashboard() {
  
  const route = useRouter();
  const user = useRecoilValue(userState)
    return (     
      <>
      {user.user.isAdmin ? <AdminDashboard /> : <EmployeeDashboard />}
      </>

    );
}