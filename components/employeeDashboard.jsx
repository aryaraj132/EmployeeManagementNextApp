import { useEffect, useState } from "react";
import { fetchWrapper } from "../_utils/FetchWrapper";
import { IoIosArrowDropright, IoMdCall, IoMdMail } from 'react-icons/io';
import AddTaskPopup from "../components/addTaskPopup";
import { userState } from "../_recoil/userState";
import { useRecoilValue } from "recoil";
export default function EmployeeDashboard() {
  const [tasks, setTasks] = useState();
  const userData = useRecoilValue(userState);
  useEffect(() => {
    console.log(userData.user._id);
    fetchWrapper.get('/api/task/gettask?id=' + userData.user._id)
      .then((res) => {
        console.log(res);
        setTasks(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  return (
    <section className="min-h-full bg-black bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg p-2">
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
                  <button class="bg-pink-500 sm:float-right active:bg-pink-600 uppercase text-white font-semibold hover:shadow-md shadow text-md px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                    Reset Password
                  </button>
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
                <div class="w-full lg:w-9/12 px-4">
                  <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                   
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
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
      </div>
      {/* <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden md:border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 hidden md:table ">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {"Employee's Name"}
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Department
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {employees && employees.map((employee) => (
                                        <tr key={employee._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-5 w-5">
                                                        <IoIosArrowDropright className="w-full h-full" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {employee.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {employee.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{employee.contact}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {employee.department}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {employee.isActive ?
                                                    <label for={"checked-toggle"+employee._id} className="inline-flex relative items-center cursor-pointer">
                                                        <input type="checkbox" value="" id={"checked-toggle"+employee._id} className="sr-only peer"checked="false" onClick={(e)=>{console.log(e.target.checked)}} />
                                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                    :
                                                    <label for={"default-toggle"+employee._id} className="inline-flex relative items-center cursor-pointer">
                                                        <input type="checkbox" value="" id={"default-toggle"+employee._id} className="sr-only peer" />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">Show Details</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="shadow overflow-hidden md:hidden border-b border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {"Employee's Name"}
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {employees && employees.map((employee) => (
                                        <tr key={employee._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {employee.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {employee.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {employee.isActive ?
                                                    <label for={"checked-toggle"+employee._id} className="inline-flex relative items-center cursor-pointer">
                                                        <input type="checkbox" value="" id={"checked-toggle"+employee._id} className="sr-only peer"checked="false" onClick={(e)=>{console.log(e.target.checked)}} />
                                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                    :
                                                    <label for={"default-toggle"+employee._id} className="inline-flex relative items-center cursor-pointer">
                                                        <input type="checkbox" value="" id={"default-toggle"+employee._id} className="sr-only peer" />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">Show Details</a>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> */}

    </section>
  );
}