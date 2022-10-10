import { useEffect, useState } from "react";
import { fetchWrapper } from "../_utils/FetchWrapper";
import { IoIosArrowDropright, IoMdCall, IoMdMail } from 'react-icons/io';
import { userState } from "../_recoil/userState";
import { useRecoilValue } from "recoil";
import { Line, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, LineElement, LinearScale, CategoryScale, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js'
Chart.register(ArcElement, LineElement, LinearScale, CategoryScale, PointElement, Title, Tooltip, Legend, Filler);
const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
export default function Graphs(props) {
    const nowDate = new Date();
    var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate()
    var date2 = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + (nowDate.getDate() - 1)
    const [pie1Date, setPie1Date] = useState(date);
    const [pie2Date, setPie2Date] = useState(date2);
    const [pie1Data, setPie1Data] = useState();
    const [pie2Data, setPie2Data] = useState();
    const [drawPie1, setDrawPie1] = useState();
    const [drawPie2, setDrawPie2] = useState();
    const [toAdd, setToAdd] = useState('Today');
    const userData = useRecoilValue(userState);
    useEffect(() => {
        if (pie1Data) {
            var data = {
                labels: [
                    'Work',
                    'Break',
                    'Meeting'
                ],
                datasets: [{
                    data: [pie1Data.work, pie1Data.break, pie1Data.meeting],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            };
            setDrawPie1(data);
        }
    }, [pie1Data])
    useEffect(() => {
        if (pie2Data) {
            var data = {
                labels: [
                    'Work',
                    'Break',
                    'Meeting'
                ],
                datasets: [{
                    data: [pie2Data.work, pie2Data.break, pie2Data.meeting],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            };
            setDrawPie2(data);
        }
    }, [pie2Data])
    useEffect(() => {
        if (!userData.user.isAdmin) {
            fetchWrapper.post('/api/task/taskdata', { id: userData.user._id, date: pie1Date })
                .then((res) => {
                    setPie1Data(res);
                })
                .catch((err) => {
                    console.log(err);
                })
            fetchWrapper.post('/api/task/taskdata', { id: userData.user._id, date: pie2Date })
                .then((res) => {
                    setPie2Data(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            fetchWrapper.post('/api/task/taskdata', { id: props.id, date: pie1Date })
                .then((res) => {
                    setPie1Data(res);
                })
                .catch((err) => {
                    console.log(err);
                })
            fetchWrapper.post('/api/task/taskdata', { id: props.id, date: pie2Date })
                .then((res) => {
                    setPie2Data(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [userData, pie1Date, pie2Date, props.id])
    return (
        <>
            <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                    <div className="px-6">
                        <div className="flex flex-wrap items-center p-6">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-2xl text-blueGray-700">Work History</h3>
                            </div>
                        </div>
                        {/* <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100">
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                    Overview
                                                </h5>
                                                <span className="font-semibold text-xl text-blueGray-700">
                                                    Today
                                                </span>
                                            </div>
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                    Overview
                                                </h5>
                                                <span className="font-semibold text-xl text-blueGray-700">
                                                    Yesterday
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                    Work
                                                </h5>
                                                <span className="font-semibold text-xl text-blueGray-700">
                                                    {pie1Data ? pie1Data.work : 0} mins
                                                </span>
                                            </div>
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                    Work
                                                </h5>
                                                <span className="font-semibold text-xl text-blueGray-700">
                                                    {pie2Data ? pie2Data.work : 0} mins
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                    Break
                                                </h5>
                                                <span className="font-semibold text-xl text-blueGray-700">
                                                    {pie1Data ? pie1Data.break : 0} mins
                                                </span>
                                            </div>
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                    Break
                                                </h5>
                                                <span className="font-semibold text-xl text-blueGray-700">
                                                    {pie2Data ? pie2Data.break : 0} mins
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                    Meeting
                                                </h5>
                                                <span className="font-semibold text-xl text-blueGray-700">
                                                    {pie1Data ? pie1Data.meeting : 0} mins
                                                </span>
                                            </div>
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                    Meeting

                                                </h5>
                                                <span className="font-semibold text-xl text-blueGray-700">
                                                    {pie2Data ? pie2Data.meeting : 0} mins
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="text-xl pt-5 grid grid-cols-[0.3fr_0.3fr_0.3fr_0.3fr] shadow-md border-b-2">
                            <div
                                className={`flex items-center cursor-pointer justify-center ${toAdd == 'Today' &&
                                    'text-indigo-800 border-indigo-800 border-b-2'
                                    }`}
                                onClick={() => {
                                    setToAdd('Today');
                                }}
                            >
                                Today
                            </div>

                            <div
                                className={`flex items-center cursor-pointer justify-center ${toAdd == 'Yesterday' &&
                                    'text-indigo-800 border-indigo-800 border-b-2'
                                    }`}
                                onClick={() => {
                                    setToAdd('Yesterday');
                                }}
                            >
                                Yesterday
                            </div>
                        </div>
                        {toAdd == 'Yesterday' &&
                            <>
                                {pie2Data &&
                                    <>
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100">
                                                    <div className="flex-auto p-4">
                                                        <div className="flex flex-wrap">
                                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1 mb-2">
                                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                                    Work
                                                                </h5>
                                                                <span className="font-semibold text-xl text-blueGray-700">
                                                                    {pie2Data ? pie2Data.work : 0}
                                                                </span><span className="text-md">mins</span>
                                                            </div>
                                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1 mb-2">
                                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                                    Break
                                                                </h5>
                                                                <span className="font-semibold text-xl text-blueGray-700">
                                                                    {pie2Data ? pie2Data.break : 0}
                                                                </span><span className="text-md">mins</span>
                                                            </div>
                                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1 mb-2">
                                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                                    Meeting
                                                                </h5>
                                                                <span className="font-semibold text-xl text-blueGray-700">
                                                                    {pie2Data ? pie2Data.meeting : 0}
                                                                </span><span className="text-md">mins</span>
                                                            </div>
                                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1 mb-2">
                                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                                    Change Date
                                                                </h5>
                                                                <input type="date" value={pie2Date} onChange={(e) => {
                                                                    setPie2Date(e.target.value);
                                                                }} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            {drawPie2 &&
                                                <div className="mx-auto w-6/12 flex flex-row justify-center">
                                                    <Pie
                                                        data={drawPie2}
                                                        width={200}
                                                        height={200}
                                                    />
                                                </div>
                                            }
                                            {pie2Data.allTasks.length > 0 &&
                                                <div className="flex flex-wrap items-center p-6">
                                                    <div className="relative w-full px-2 max-w-full flex-grow flex-1">
                                                        <h3 className="font-semibold text-xl text-blueGray-700">Tasks List</h3>
                                                    </div>
                                                </div>
                                            }
                                            {pie2Data.allTasks.map((task) => {
                                                return (
                                                    <div key={task.userID} className="flex flex-row justify-between items-center p-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg">
                                                        <div className="flex flex-col">
                                                            <h1 className="text-lg font-medium text-gray-800">{task.description} <span className="shadow-md text-xs ml-4 p-1 bg-teal-500 rounded-full text-black">{task.type}</span></h1>
                                                            <h1 className="text-sm font-medium text-gray-800">{task.starTime}</h1>
                                                        </div>
                                                        <div className="flex flex-row items-center">
                                                            <h1 className="text-sm font-medium text-gray-800">{task.timeTaken} mins</h1>
                                                            <IoIosArrowDropright className="w-6 h-6 text-gray-800" />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                }
                            </>
                        }
                        {toAdd == 'Today' &&
                            <>
                                {pie1Data &&
                                    <>
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100">
                                                    <div className="flex-auto p-4">
                                                        <div className="flex flex-wrap">
                                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1 mb-2">
                                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                                    Work
                                                                </h5>
                                                                <span className="font-semibold text-xl text-blueGray-700">
                                                                    {pie1Data ? pie1Data.work : 0}
                                                                </span><span className="text-md">mins</span>
                                                            </div>
                                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1 mb-2">
                                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                                    Break
                                                                </h5>
                                                                <span className="font-semibold text-xl text-blueGray-700">
                                                                    {pie1Data ? pie1Data.break : 0}
                                                                </span><span className="text-md">mins</span>
                                                            </div>
                                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1 mb-2">
                                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                                    Meeting
                                                                </h5>
                                                                <span className="font-semibold text-xl text-blueGray-700">
                                                                    {pie1Data ? pie1Data.meeting : 0}
                                                                </span><span className="text-md">mins</span>
                                                            </div>
                                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1 mb-2">
                                                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                                    Change Date
                                                                </h5>
                                                                <input type="date" value={pie1Date} onChange={(e) => {
                                                                    setPie1Date(e.target.value);
                                                                }} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            {drawPie1 &&
                                                <div className="mx-auto w-6/12 flex flex-row justify-center">
                                                    <Pie
                                                        data={drawPie1}
                                                        width={200}
                                                        height={200}
                                                    />
                                                </div>
                                            }
                                            {pie1Data.allTasks.length > 0 &&
                                                <div className="flex flex-wrap items-center p-6">
                                                    <div className="relative w-full px-2 max-w-full flex-grow flex-1">
                                                        <h3 className="font-semibold text-xl text-blueGray-700">Tasks List</h3>
                                                    </div>
                                                </div>
                                            }
                                            {pie1Data.allTasks.map((task) => {
                                                return (
                                                    <div key={task.userID} className="flex flex-row justify-between items-center p-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg">
                                                        <div className="flex flex-col">
                                                            <h1 className="text-lg font-medium text-gray-800">{task.description} <span className="shadow-md text-xs ml-4 p-1 bg-teal-500 rounded-full text-black">{task.type}</span></h1>
                                                            <h1 className="text-sm font-medium text-gray-800">{task.starTime}</h1>
                                                        </div>
                                                        <div className="flex flex-row items-center">
                                                            <h1 className="text-sm font-medium text-gray-800">{task.timeTaken} mins</h1>
                                                            <IoIosArrowDropright className="w-6 h-6 text-gray-800" />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}