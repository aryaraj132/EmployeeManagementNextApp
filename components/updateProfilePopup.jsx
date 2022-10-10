import { AiOutlineClose, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import Popup from "reactjs-popup";
import { IoIosAdd } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { fetchWrapper } from "../_utils/FetchWrapper";
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userState } from "../_recoil/userState";
import { useRecoilState } from "recoil";
import { useEffect, useState } from 'react';
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
const schema = yup.object().shape({
    name: yup.string().required('This field is required'),
    department: yup.string().required('This field is required'),
    contact: yup.string().matches(phoneRegExp,"Contact number is not valid").required('This field is required'),
});
export default function UpdateProfilePopup({ tasks, setTasks }) {
    function handleClose() {
    }
    const [user,setUser] = useRecoilState(userState);
    const [userName,setUserName] = useState(user.user.name);
    const [userDepartment,setUserDepartment] = useState(user.user.department);
    const [userContact,setUserContact] = useState(user.user.contact);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onTouched', defaultValues: {name:userName,department:userDepartment,contact:userContact}, resolver: yupResolver(schema) });
    function onSubmit(res) {
        setUserName(res.name);
        setUserDepartment(res.department);
        setUserContact(res.contact);
        return fetchWrapper.post('/api/auth/updateprofile', res)
          .then((response) => {
            var temp = {...user}
            temp.user = response;
            setUser(temp);
          })
          .then(() => {
            toast.success("PROFILE UPDATED SUCCESSFULLY");
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
                    className="right-0 bg-gradient-to-r to-cyan-500 from-teal-500 text-white-800 font-semibold py-2 px-4 inline-flex items-center rounded-md"
                >
                    Update Profile
                </button>
            }
            modal
            nested
            onClose={handleClose}
        >
            {(close) => (
                <div className='h-auto'>
                    <div className="flex items-center justify-between px-4 py-2 bg-white border-b-2">
                        <h1 className="text-2xl font-medium text-primary">Update Profile</h1>
                        <AiOutlineClose
                            className="text-2xl  text-red-500 hover:text-red-800 transition-all cursor-pointer"
                            onClick={close}
                        ></AiOutlineClose>
                    </div>
                    <div className="w-[80vw] max-w-3xl min-h-[400px] h-auto grid bg-white justify-center pt-6">
                        <form className="p-6 space-y-10 md:min-w-[600px] sm:min-w-[500px]"
                            onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('name')} type="text" name="name" autoComplete="login" placeholder=" " className="block w-full appearance-none focus:outline-none bg-transparent" />
                                <label for="name" className="absolute top-0 pointer-events-none duration-300 origin-0">Name</label>
                            </div>
                            <label className='text-sm min-h-[18px] mt-2 text-[red]' >{errors.name?.message}</label>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('department')} id="department" type="text" name="department" placeholder=" " className="block w-[90%] appearance-none focus:outline-none bg-transparent" />
                                <label for="department" className="absolute top-0 pointer-events-none duration-300 origin-0">Department</label>
                            </div>
                            <label className='text-sm mt-2 min-h-[18px] text-[red]'>{errors.department?.message}</label>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('contact')} type="text" name="contact" autoComplete="login" placeholder=" " className="block w-full appearance-none focus:outline-none bg-transparent" />
                                <label for="contact" className="absolute top-0 pointer-events-none duration-300 origin-0">Contact</label>
                            </div>
                            <label className='text-sm min-h-[18px] mt-2 text-[red]' >{errors.contact?.message}</label>
                            <button className="cursor-pointer mt-[1rem] w-full flex bg-[#1969AC] text-white p-4 font-medium outline-0 border-0 justify-center rounded-lg transition-all hover:bg-[#1950AC]">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )
            }
        </Popup >
    );
}