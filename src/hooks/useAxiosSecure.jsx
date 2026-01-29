import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";


const axiosSecure = axios.create({
    baseURL: "http://localhost:3000/"
    // timeout: 1000,
    // headers: { "X-Custom-Header": "foobar" },
});


const useAxiosSecure = () => {
    const { user, signOutUser } = useAuth();
    // console.log(user?.accessToken)
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(async (config) => {
        if (user) {
            const token = user?.accessToken;
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(res => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return res;
    }, error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log("inside res interceptor", error.status);
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden')
        }
        if (status === 401) {
            signOutUser()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }
    });
    return axiosSecure;
};

export default useAxiosSecure;