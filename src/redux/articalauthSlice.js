import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"
// import { toast } from "react-toastify";
// import { ToastContent } from "../../common/ToastContent";

//Slice initial state
const initialState = {
    loading: false,
    logindata: {},
    registerData: {},
    resetPasswordData: {}

}



// Register API
export const articalRegisterapiCall = (registerdata, navigate) => async (dispatch) => {
    try {
        dispatch(loadingflag(true))
        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/user/register-article-page`,
            registerdata
        )

        // console.log(response, 'response')
        if (response.status === 200) {
            dispatch(RegisterapiData(response.data))
            dispatch(loadingflag(false))
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            // navigate("/otp-code")
        }
        dispatch(loadingflag(false))
    } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            dispatch(loadingflag(false))
            toast.error(err?.response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        dispatch(loadingflag(false))
    }
}


// Login API
export const articalloginapiCall = (logindata, navigate,) => async (dispatch) => {
    try {
        dispatch(loadingflag(true))
        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/user/login-article-page`,
            logindata
        )
        // console.log(response, "response")
        if (response.status === 200) {
            dispatch(loginapiData(response.data))
            dispatch(loadingflag(false))
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            // navigate("/otp-code")
        }
        dispatch(loadingflag(false))
    } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            dispatch(loadingflag(false))
            toast.error(err?.response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        dispatch(loadingflag(false))
    }
}


// Login API
export const articallresetPasswordapiCall = (logindata, navigate,) => async (dispatch) => {
    try {
        dispatch(loadingflag(true))
        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/user/reset-password-article-page`,
            logindata
        )
        console.log(response, "response")
        if (response.status === 200) {
            dispatch(ResetPasswordData(response.data))
            dispatch(loadingflag(false))
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            // navigate("/otp-code")
        }
        dispatch(loadingflag(false))
    } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
            dispatch(loadingflag(false))
            toast.error(err?.response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        dispatch(loadingflag(false))
    }
}






const articalauthSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loadingflag: (state, action) => {
            state.loading = action.payload
        },
        loginapiData: (state, action) => {
            state.logindata = action.payload
        },
        RegisterapiData: (state, action) => {
            state.registerData = action.payload
        },
        ResetPasswordData: (state, action) => {
            state.resetPasswordData = action.payload
        },

    },
})

export const { loadingflag, loginapiData, RegisterapiData, ResetPasswordData } =
    articalauthSlice.actions

export default articalauthSlice.reducer

// NOTE : Please manage the slice according to your requirement
