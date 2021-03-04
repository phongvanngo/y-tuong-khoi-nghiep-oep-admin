import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import signInApi from "./signInApi";
import notifcation from './../../Common/NotificationComponent';

export const signInRequest = createAsyncThunk(
    'user/signInRequestStatus',
    async (signInPayload, thunkApi) => {
        const response = await signInApi.login(signInPayload);
        return response;
        // return null;
    }
)

export const signInSlice = createSlice({
    name: 'signIn',
    initialState: {
        isLogin: false,
        idToken: null
    },
    reducers: {
        checkLoggedInRecently: state => {
            const token = localStorage.getItem('id_token');
            if (token != null) state.isLogin = true;
        },
        logOut: state => {
            window.localStorage.removeItem('id_token');
            state.isLogin = false;
        }
    },

    extraReducers: {
        [signInRequest.fulfilled]: (state, action) => {
            const response = action.payload;
            if (response == null) return;
            switch (response.status) {
                case 200:
                    notifcation("success", "Đăng nhập thành công");
                    localStorage.setItem('id_token', response.data.token);
                    state.isLogin = true;
                    break;
                default:
                    notifcation("danger", "Đăng nhập thât bại", "Kiểm tra tên đăng nhập hoặc password");
                    break;
            }
        }
    }
})

// export default signInSlice.reducer;
export const { checkLoggedInRecently, logOut } = signInSlice.actions;
const { reducer: signInReducer } = signInSlice;
export default signInReducer; 