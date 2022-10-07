import ReactLoading from 'react-loading';
import { Settings } from "../../_settings/settings";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from "../../_recoil/userState";
function isUserLoggedIn(currentUser) {
    if (currentUser) {
      const expT = new Date(currentUser.expiryDate);
      const currT = new Date();
      if (currT >= expT) {
        localStorage.removeItem('User');
        window.location.reload();
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

const withAuth = (WrappedComponent) => {
    const WithAuth = () => {
        const router = useRouter();
        const [user,setUser] = useRecoilState(userState);
        const [loadData, setLoadData] = useState({});
        useEffect(() => {
            const userData = JSON.parse(localStorage.getItem('User'));
            setUser(userData);
        }, []);
        useEffect(() => {
            const userData = JSON.parse(localStorage.getItem('User'));
            setUser(userData);
            const data = routeValidator(router.pathname)
            setLoadData(data);
            pushRouter(data);
        }, [router])
        function pushRouter(data) {
            if (!data.canLoad && data.redirectTo != undefined) {
                if (!!data.setReturnUrl) {
                    router.push({
                        pathname: Settings.URLS.LOGIN_URL,
                        query: { returnUrl: router.asPath },
                    });
                } else {
                    router.push(data.redirectTo);
                }
            }
        }
        function routeValidator(pathname) {
            // User can be logged in or anonymous - will mount
            if (Settings.ANON_OR_AUTH_PATH_PREFIX.has(`/${pathname.split('/')[1]}`)) {
                return { canLoad: true };
            }
            const loggerIn = isUserLoggedIn(user);
            if (!user) {
                loggerIn = isUserLoggedIn(JSON.parse(localStorage.getItem('User')));
            }
            // User must be anonymous - did
            if (Settings.ANONYMOUS_REQUIRED_PATHS.has(pathname)) {
                if (loggerIn) {
                    let redirectTo = Settings.URLS.LOGIN_REDIRECT_URL;
                    return { canLoad: false, redirectTo: redirectTo };
                } else {
                    return { canLoad: true };
                }
            }
            if (loggerIn) {
                return { canLoad: true };
            } else {
                let redirectTo = Settings.URLS.LOGIN_URL;
                return { canLoad: false, redirectTo: redirectTo, setReturnUrl: true };
            }
        }

        if (!loadData.canLoad) {
            return (
                <div className="flex flex-col justify-center h-main">
                    <div className="flex flex-col gap-4 items-center">
                        <ReactLoading type={"bars"} color={"#000"} />
                        <h4>Loading</h4>
                    </div>
                </div>
            )
        }
        else {
            return <WrappedComponent />;
        }
    };
    return WithAuth;
};

export default withAuth;