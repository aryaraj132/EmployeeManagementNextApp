import { useEffect, useState } from "react";
import { fetchWrapper } from "../_utils/FetchWrapper";
import { IoIosArrowDropright } from 'react-icons/io';
import AddEmployeePopup from "../components/addEmployeePopup";
import Link from "next/link";
export default function AdminDashboard() {
    const [employees, setEmployees] = useState();
    useEffect(() => {
        fetchWrapper.get('/api/auth/getemployee')
            .then((res) => {
                setEmployees(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    function deactivate(checked, id) {
        fetchWrapper.post('/api/auth/deactivate', { id })
            .then((res) => {
                fetchWrapper.get('/api/auth/getemployee')
                    .then((res) => {
                        setEmployees(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function activate(checked, id) {
        fetchWrapper.post('/api/auth/activate', { id })
            .then((res) => {
                fetchWrapper.get('/api/auth/getemployee')
                    .then((res) => {
                        setEmployees(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <section className="min-h-section bg-black bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg p-2">
            <h1>Admin Dashboard</h1>
            <AddEmployeePopup employees={employees} setEmployees={setEmployees} />
            <div className="flex flex-col">
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
                                                        <input type="checkbox" value="" id={"checked-toggle"+employee._id} className="sr-only peer"checked="false" onClick={(e)=>{deactivate(e.target.checked, employee._id)}} />
                                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                    :
                                                    <label for={"default-toggle"+employee._id} className="inline-flex relative items-center cursor-pointer">
                                                        <input type="checkbox" value="" id={"default-toggle"+employee._id} className="sr-only peer" onClick={(e)=>{activate(e.target.checked, employee._id)}}/>
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={"dashboard/"+employee._id}><a className="text-indigo-600 hover:text-indigo-900">Show Details</a></Link>
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
                                                        <input type="checkbox" value="" id={"checked-toggle"+employee._id} className="sr-only peer" checked="false" onClick={(e)=>{deactivate(e.target.checked, employee._id)}} />
                                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                    :
                                                    <label for={"default-toggle"+employee._id} className="inline-flex relative items-center cursor-pointer">
                                                        <input type="checkbox" value="" id={"default-toggle"+employee._id} className="sr-only peer" onClick={(e)=>{activate(e.target.checked, employee._id)}}/>
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={"dashboard/"+employee._id}><a className="text-indigo-600 hover:text-indigo-900">Show Details</a></Link>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}