import { AiOutlineClose,AiOutlineEyeInvisible,AiOutlineEye } from 'react-icons/ai';
import Popup from "reactjs-popup";
import { IoIosAdd } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import {fetchWrapper} from "../_utils/FetchWrapper";
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useState} from 'react';
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
const schema = yup.object().shape({
    name: yup.string().required('This field is required'),
    email: yup.string().email('Please enter a valid email').required('This field is required'),
    password: yup.string().required('This field is required'),
    contact: yup.string().matches(phoneRegExp,"Contact number is not valid").required('This field is required'),
    department: yup.string().required('This field is required'),
    joiningDate: yup.string().required('This field is required'),
});
export default function AddEmployeePopup({ employees, setEmployees }) {
    function handleClose() {
        reset();
    }

    const [seePassword, setSee] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: 'onTouched', resolver: yupResolver(schema) });
    function onSubmit(res) {
        return fetchWrapper.post('/api/auth/addemployee', res)
          .then((response) => {
            setEmployees([...employees, response]);
          })
          .then(() => {
            toast.success("EMPLOYEE ADDED SUCCESSFULLY");
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
                    className=" right-0 bg-white text-gray-800 font-semibold py-2 px-4 inline-flex items-center rounded-md"
                >
                    <IoIosAdd className="w-6 h-6" /> Add Employees
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
                                <input {...register('name')} type="text" name="name" autoComplete="login" placeholder=" " className="block w-full appearance-none focus:outline-none bg-transparent" />
                                <label for="name" className="absolute top-0 pointer-events-none duration-300 origin-0">Name</label>
                            </div>
                            <label className='text-sm min-h-[18px] mt-2 text-[red]' >{errors.name?.message}</label>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('email')} type="text" name="email" autoComplete="login" placeholder=" " className="block w-full appearance-none focus:outline-none bg-transparent" />
                                <label for="email" className="absolute top-0 pointer-events-none duration-300 origin-0">Email</label>
                            </div>
                            <label className='text-sm min-h-[18px] mt-2 text-[red]' >{errors.email?.message}</label>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('password')} id="password" type={seePassword ? "text" : "password"} name="password" placeholder=" " className="block w-[90%] appearance-none focus:outline-none bg-transparent" />
                                <label for="password" className="absolute top-0 pointer-events-none duration-300 origin-0">Password</label>
                                <button
                                    type='button'
                                    onClick={() => setSee(o => !o)}
                                    className="absolute right-[0.5rem] top-0 cursor-pointer md:top-[0rem] md:right-[0.5rem]">
                                    {
                                        seePassword ? (<AiOutlineEye size={20} />) : (<AiOutlineEyeInvisible size={20} />)
                                    }
                                </button>
                            </div>
                            <label className='text-sm mt-2 min-h-[18px] text-[red]'>{errors.password?.message}</label>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('contact')} type="text" name="contact" autoComplete="login" placeholder=" " className="block w-full appearance-none focus:outline-none bg-transparent" />
                                <label for="contact" className="absolute top-0 pointer-events-none duration-300 origin-0">Contact</label>
                            </div>
                            <label className='text-sm min-h-[18px] mt-2 text-[red]' >{errors.contact?.message}</label>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('department')} type="text" name="department" autoComplete="login" placeholder=" " className="block w-full appearance-none focus:outline-none bg-transparent" />
                                <label for="department" className="absolute top-0 pointer-events-none duration-300 origin-0">Department</label>
                            </div>
                            <label className='text-sm min-h-[18px] mt-2 text-[red]' >{errors.department?.message}</label>
                            <div className="relative border-b-2 focus-within:border-blue-500">
                                <input {...register('joiningDate')} type="date" name="joiningDate" autoComplete="login" placeholder=" " className="block w-full appearance-none focus:outline-none bg-transparent" />
                                <label for="joiningDate" className="absolute top-0 pointer-events-none duration-300 origin-0">Joining Date</label>
                            </div>
                            <label className='text-sm min-h-[18px] mt-2 text-[red]' >{errors.joiningDate?.message}</label>
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