import '../styles/globals.css'
import withAuth from '../_utils/auth/withAuth';
import Layout from "../components/layout";
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
  const AuthComponent = withAuth(Component);
  return (
    <RecoilRoot>
    <Layout>
      <AuthComponent {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
    </RecoilRoot>
  )
}

export default MyApp
