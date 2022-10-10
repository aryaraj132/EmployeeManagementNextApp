import { useEffect, useState } from "react";
import { fetchWrapper } from "../../../_utils/FetchWrapper";
import { IoIosArrowDropright, IoMdCall, IoMdMail } from 'react-icons/io';
import AddTaskPopup from "../../../components/addTaskPopup";
import ResetPasswordPopup from "../../../components/resetPasswordPopup";
import UpdateProfilePopup from "../../../components/updateProfilePopup";
import { userState } from "../../../_recoil/userState";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import Graphs from "../../../components/graphs";
export default function Index() {
  const router = useRouter();
  const {employeeId} = router.query;
  const [tasks, setTasks] = useState();
  const userData = useRecoilValue(userState);
  useEffect(() => {
    if(!userData.user.isAdmin){
        router.push('/dashboard',null,{shallow:true});
    }
  }, [userData])
  return (
    <section className="min-h-section bg-black bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg p-2">
      <Graphs
      id={employeeId}
      ></Graphs>
    </section>
  );
}