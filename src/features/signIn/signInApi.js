import axiosClient from "./../../app/AxiosClient";
import notifcation from './../../Common/NotificationComponent';

const signInApi = {
    login: async (user) => {
        const url = '/auth/admin';
        return await axiosClient
            .post(url, user)
            .then(response => {
                return response;
            })
            .catch(error => {
                notifcation("danger", "Đăng nhập thât bại", "Kiểm tra tên đăng nhập hoặc password");
                return null;
            });

    },
}

export default signInApi;