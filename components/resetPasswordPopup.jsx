import { AiOutlineClose, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import Popup from "reactjs-popup";
import { IoIosAdd } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { fetchWrapper } from "../_utils/FetchWrapper";
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
const schema = yup.object().shape({
    newPassword: yup.string().required('This field is required'),
    oldPassword: yup.string().required('This field is required'),
});
export default function ResetPasswordPopup() {
  const [seePassword, setSee] = useState(false);
  const [seePassword2, setSee2] = useState(false);
    function handleClose() {
        reset();
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onTouched', resolver: yupResolver(schema) });
    function onSubmit(res) {
        return fetchWrapper.post('/api/auth/resetpassword', res)
            .then((res) => {
                toast.success("PASSWORD CHANGED SUCCESSFULLY");
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
                <button className="bg-pink-500 sm:float-right active:bg-pink-600 uppercase text-white font-semibold hover:shadow-md shadow text-md px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                    Reset Password
                </button>
            }
            modal
            nested
            onClose={handleClose}
        >
            {(close) => (
                <div className='h-auto'>
                    <div className="flex items-center justify-between px-4 py-2 bg-white border-b-2">
                        <h1 className="text-2xl font-medium text-primary">Reset Password</h1>
                        <AiOutlineClose
                            className="text-2xl  text-red-500 hover:text-red-800 transition-all cursor-pointer"
                            onClick={close}
                        ></AiOutlineClose>
                    </div>
                    <div className="w-[80vw] max-w-3xl min-h-[400px] h-auto grid bg-white justify-center pt-6">
                        <form className="p-6 space-y-10 md:min-w-[600px] sm:min-w-[500px]"
                            onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('oldPassword')} id="oldPassword" type={seePassword ? "text" : "password"} name="oldPassword" placeholder=" " className="block w-[90%] appearance-none focus:outline-none bg-transparent" />
                                <label for="oldPassword" className="absolute top-0 duration-300 origin-0 pointer-events-none">Old Password</label>
                                <button
                                    type='button'
                                    onClick={() => setSee(o => !o)}
                                    className="absolute right-[0.5rem] top-0 cursor-pointer md:top-[0rem] md:right-[0.5rem]">
                                    {
                                        seePassword ? (<AiOutlineEye size={20} />) : (<AiOutlineEyeInvisible size={20} />)
                                    }
                                </button>
                            </div>
                            <label className='text-sm mt-2 min-h-[18px] text-[red]'>{errors.oldPassword?.message}</label>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('newPassword')} id="newPassword" type={seePassword2 ? "text" : "password"} name="newPassword" placeholder=" " className="block w-[90%] appearance-none focus:outline-none bg-transparent" />
                                <label for="newPassword" className="absolute top-0 duration-300 origin-0 pointer-events-none">New Password</label>
                                <button
                                    type='button'
                                    onClick={() => setSee2(o => !o)}
                                    className="absolute right-[0.5rem] top-0 cursor-pointer md:top-[0rem] md:right-[0.5rem]">
                                    {
                                        seePassword2 ? (<AiOutlineEye size={20} />) : (<AiOutlineEyeInvisible size={20} />)
                                    }
                                </button>
                            </div>
                            <label className='text-sm mt-2 min-h-[18px] text-[red]'>{errors.newPassword?.message}</label>
                            <button className="cursor-pointer mt-[1rem] w-full flex bg-[#1969AC] text-white p-4 font-medium outline-0 border-0 justify-center rounded-lg transition-all hover:bg-[#1950AC]">
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            )
            }
        </Popup >
    );
}