import { useEffect, useState } from "react";
import { fetchWrapper } from "../_utils/FetchWrapper";
import { IoIosArrowDropright, IoMdCall, IoMdMail } from 'react-icons/io';
import AddTaskPopup from "../components/addTaskPopup";
import ResetPasswordPopup from "../components/resetPasswordPopup";
import UpdateProfilePopup from "./updateProfilePopup";
import { userState } from "../_recoil/userState";
import { useRecoilValue } from "recoil";
export default function EmployeeDashboard() {
  const [tasks, setTasks] = useState();
  const userData = useRecoilValue(userState);
  useEffect(() => {
    if(userData.user._id){
    fetchWrapper.get('/api/task/gettask?id=' + userData.user._id)
      .then((res) => {
        console.log(res);
        setTasks(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [userData])
  return (
    <section className="min-h-section bg-black bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg p-2">
      <div class="container mx-auto px-4">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
          <div class="px-6">
            <div class="flex flex-wrap justify-center">
              {/* <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div class="relative">
                  <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px">
                </div>
              </div> */}
              <div class="w-full sm:w-6/12 px-4 order-3 ">
                <div class="py-6 px-3">
                  <ResetPasswordPopup />
                </div>
              </div>
              <div class="w-full sm:w-6/12 px-4 order-1">
                <div class="py-6 px-3">
                <AddTaskPopup tasks={tasks} setTasks={setTasks} />
                </div>
              </div>
            </div>
            <div class="text-center mt-12">
              <div className="w-full mb-2">
              <h3 class="text-8xl rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 font-semibold leading-normal text-blueGray-700 w-36 mx-auto">
                  {userData.user.name[0]}
                </h3>
                </div>
              <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {userData.user.name}
              </h3>
              <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                Department - {userData.user.department}
              </div>
              <div class="mb-2 text-blueGray-600 mt-5 flex justify-center items-center">
                <span><IoMdCall className="inline"/> - {userData.user.contact}</span>
              </div>
              <div class="mb-2 text-blueGray-600">
              <span><IoMdMail className="inline"/> - {userData.user.email}</span>
              </div>
            </div>
            <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div class="flex flex-wrap justify-center">
              <UpdateProfilePopup />
                {/* <div class="w-full lg:w-9/12 px-4">
                  <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                   
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col">
        {tasks && tasks.map((task) => {
          return (
            <div className="flex flex-row justify-between items-center p-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg">
              <div className="flex flex-col">
                <h1 className="text-xl font-medium text-white">{task.description}</h1>
                <h1 className="text-sm font-medium text-white">{task.startTime}</h1>
              </div>
              <div className="flex flex-row items-center">
                <h1 className="text-sm font-medium text-white">{task.timeTaken} mins</h1>
                <IoIosArrowDropright className="w-6 h-6 text-white" />
              </div>
            </div>
          )
        })}
      </div> */}
    </section>
  );
}