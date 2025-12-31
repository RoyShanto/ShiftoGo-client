import axios from "axios";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
    baseURL: "http://localhost:3000/"
    // timeout: 1000,
    // headers: { "X-Custom-Header": "foobar" },
});


const useAxiosSecure = () => {
    const { user } = useAuth();
    // console.log(user?.accessToken)

    axiosSecure.interceptors.request.use(async (config) => {
        if (user) {
            const token = user?.accessToken;
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    });
    return axiosSecure;
};

export default useAxiosSecure;