import jwt from 'jsonwebtoken';
import { BadRequest } from '../../_utils/FetchError';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import {fetchWrapper} from "../../_utils/FetchWrapper";
import 'firebaseui/dist/firebaseui.css'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Settings } from "../../_settings/settings";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
// const uiConfig = {
//   signInSuccessUrl: "/dashboard",
//   signInflow: "popup",
//   signInOptions: [GithubAuthProvider.PROVIDER_ID,
//   GoogleAuthProvider.PROVIDER_ID,
//   EmailAuthProvider.PROVIDER_ID,
//   FacebookAuthProvider.PROVIDER_ID,],
//   callbacks: {
//     signInSuccessWithAuthResult: () => false,
//   },
// };
const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('This field is required'),
  password: yup.string().required('This field is required'),
});

export default function Login() {
  const router = useRouter();
  const [seePassword, setSee] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched', resolver: yupResolver(schema) });

  function onSubmit(res) {
    let email = res['email'];
    let password = res['password'];
    setInvalidCredentials(false);
    return fetchWrapper.post('/api/auth/login', { email, password })
      .then((res) => {
        console.log(res);
        const user = jwt.decode(res.token)
        const expiryDate = new Date(user.exp*1000);
        const userData = {
          token: res.token,
          expiryDate: expiryDate,
          user: user
        }
        localStorage.setItem('User', JSON.stringify(userData));
      })
      .then(() => {
        toast.success("LOGIN SUCCESS");
        const returnUrl = router.query.returnUrl?.toString() || Settings.URLS.LOGIN_REDIRECT_URL;
        router.push(returnUrl);
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof BadRequest) {
          toast.error(error.errors.error);
          setInvalidCredentials(true);
        } else {
          toast.error("SOMETHING WENT WRONG");
        }
      })
  }
  // //Sign in with google
  // const googleProvider = new GoogleAuthProvider();
  // const GoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const returnUrl = router.query.returnUrl?.toString() || Settings.URLS.LOGIN_REDIRECT_URL;
  //     router.push(returnUrl);
  //   } catch (error) {
  //     toast.error(error.code.toUpperCase());
  //     console.log(error);
  //   }
  // };
  // const githubProvider = new GithubAuthProvider();
  // const GithubLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, githubProvider);
  //     const returnUrl = router.query.returnUrl?.toString() || Settings.URLS.LOGIN_REDIRECT_URL;
  //     router.push(returnUrl);
  //   } catch (error) {
  //     // console.log(getExceptionText(error));
  //     toast.error(error.code.toUpperCase());
  //   }
  // };
  // const fbProvider = new FacebookAuthProvider();
  // const FacebookLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, fbProvider);
  //     const credantial = await FacebookAuthProvider.credentialFromResult(
  //       result
  //     );
  //     const token = credantial.accessToken;
  //     let photoUrl = result.user.photoURL + "?height=500&access_token=" + token;
  //     await updateProfile(auth.currentUser, { photoURL: photoUrl });
  //     const returnUrl = router.query.returnUrl?.toString() || Settings.URLS.LOGIN_REDIRECT_URL;
  //     router.push(returnUrl);
  //   } catch (error) {
  //     toast.error(error.code.toUpperCase());
  //     console.log(error);
  //   }
  // };

  return (
    <section className="min-h-full bg-black bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg p-2">
    <div className="shadow-xl mt-32 p-10 bg-white text-gray-700 rounded-lg max-w-xl max-h-max mx-auto">
      <h2 className="text-3xl font-medium">Sign In</h2>
      <div className="py-4 z-1001 ">
        <div className="grid grid-cols-1 gap-6">
          <form className="p-6 space-y-10"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="relative border-b-2 focus-within:border-blue-500">
              <input {...register('email')} type="text" name="email" autoComplete="login" placeholder=" " className="block w-full appearance-none focus:outline-none bg-transparent" />
              <label for="email" className="absolute top-0 duration-300 origin-0 pointer-events-none">Email</label>
            </div>
              <label className='text-sm min-h-[18px] mt-2 text-[red]' >{errors.email?.message}</label>
            <div className="relative border-b-2 focus-within:border-blue-500">
              <input {...register('password')} id="password" type={seePassword ? "text" : "password"} name="password" placeholder=" " className="block w-[90%] appearance-none focus:outline-none bg-transparent" />
              <label for="password" className="absolute top-0 duration-300 origin-0 pointer-events-none">Password</label>
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
            <button className="cursor-pointer mt-[1rem] w-full flex bg-[#1969AC] text-white p-4 font-medium outline-0 border-0 justify-center rounded-lg transition-all hover:bg-[#1950AC]">  
              Login
            </button>
          </form>
          {/* <button
            onClick={GoogleLogin}
            className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 max-w-lg"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
          <button
            className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 max-w-lg"
            onClick={FacebookLogin}
          >
            <BsFacebook className="text-2xl text-blue-400" />
            Sign in with Facebook
          </button>
          <button
            className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 max-w-lg"
            onClick={GithubLogin}
          >
            <FaGithub className="text-2xl" />
            Sign in with Github
          </button> */}
          {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} className="flex align-middle gap-2 max-w-lg"/> */}
        </div>
      </div>
    </div>
    </section>
  );
}