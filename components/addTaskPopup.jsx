import { AiOutlineClose, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import Popup from "reactjs-popup";
import { IoIosAdd } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { fetchWrapper } from "../_utils/FetchWrapper";
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
const schema = yup.object().shape({
    description: yup.string().required('This field is required'),
    starTime: yup.string().required('This field is required'),
    timeTaken: yup.number().typeError('Time Take must be a number in minutes').required('This field is required'),
});
export default function AddTaskPopup({ tasks, setTasks }) {
    function handleClose() {
        reset();
    }
    const currDate = new Date();
    const currHr = ("0" + currDate.getHours()).slice(-2);
    const currMin = ("0" + currDate.getMinutes()).slice(-2);
    const date = currDate.getFullYear() + '-' + (currDate.getMonth() + 1) + '-' + currDate.getDate() + 'T' + currHr + ':' + currMin;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onTouched', resolver: yupResolver(schema) });
    function onSubmit(res) {
        return fetchWrapper.post('/api/task/addtask', res)
          .then((response) => {
            setTasks([...tasks, response]);
          })
          .then(() => {
            toast.success("TASK ADDED SUCCESSFULLY");
            reset();
          })
          .catch((error) => {
            console.log(error);
              toast.error(error.errors.error);
          })
    }
    return (
        <Popup
            trigger={
                <button
                    className="right-0 bg-gradient-to-r from-cyan-500 to-teal-500 text-gray-800 font-semibold py-2 px-4 inline-flex items-center rounded-md"
                >
                    <IoIosAdd className="w-6 h-6" /> Add Task
                </button>
            }
            modal
            nested
            onClose={handleClose}
        >
            {(close) => (
                <div className='h-auto'>
                    <div className="flex items-center justify-between px-4 py-2 bg-white border-b-2">
                        <h1 className="text-2xl font-medium text-primary">Add Employees</h1>
                        <AiOutlineClose
                            className="text-2xl  text-red-500 hover:text-red-800 transition-all cursor-pointer"
                            onClick={close}
                        ></AiOutlineClose>
                    </div>
                    <div className="w-[80vw] max-w-3xl min-h-[400px] h-auto grid bg-white justify-center pt-6">
                        <form className="p-6 space-y-10 md:min-w-[600px] sm:min-w-[500px]"
                            onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('description')} type="text" name="description" autoComplete="login" placeholder=" " className="block w-full appearance-none focus:outline-none bg-transparent" />
                                <label for="description" className="absolute top-0 pointer-events-none duration-300 origin-0">Task Description</label>
                            </div>
                            <label className='text-sm min-h-[18px] mt-2 text-[red]' >{errors.description?.message}</label>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <select {...register('type')} id="type" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                    <option value="Work" selected>Work</option>
                                    <option value="Break">Break</option>
                                    <option value="Meeting">Meeting</option>
                                </select>
                                <label for="type" className="absolute top-0 pointer-events-none duration-300 origin-0 -translate-y-6 scale-75">Task Type</label>
                            </div>
                            <label className='text-sm min-h-[18px] mt-2 text-[red]' >{errors.type?.message}</label>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('starTime')} id="starTime" type="datetime-local" max={date} name="starTime" placeholder=" " className="block w-[90%] appearance-none focus:outline-none bg-transparent" />
                                <label for="starTime" className="absolute top-0 pointer-events-none duration-300 origin-0">Start Time</label>
                            </div>
                            <label className='text-sm mt-2 min-h-[18px] text-[red]'>{errors.starTime?.message}</label>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('timeTaken')} type="text" name="timeTaken" autoComplete="login" placeholder=" " className="block w-full appearance-none focus:outline-none bg-transparent" />
                                <label for="timeTaken" className="absolute top-0 pointer-events-none duration-300 origin-0">Time Taken (in mins)</label>
                            </div>
                            <label className='text-sm min-h-[18px] mt-2 text-[red]' >{errors.timeTaken?.message}</label>
                            <button className="cursor-pointer mt-[1rem] w-full flex bg-[#1969AC] text-white p-4 font-medium outline-0 border-0 justify-center rounded-lg transition-all hover:bg-[#1950AC]">
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            )
            }
        </Popup >
    );
}