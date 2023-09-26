import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"
// import { toast } from "react-toastify";
// import { ToastContent } from "../../common/ToastContent";

//Slice initial state
const initialState = {
  data: [],
  loading: false,
  logindata: {},
  tokendata: {},
  forgotpasswordemailData: {},
}

// dummy data API
export const login =
  (pagenum, rowperpage, searchvalue, sortColumn, sortDirection) =>
  async (dispatch) => {
    try {
      dispatch(loadingflag(true))
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pagenum}&_limit=${rowperpage}&q=${searchvalue}&_sort=${sortColumn}&_order=${sortDirection}`
      )

      if (response.status === 200) {
        dispatch(loginData(response.data))
        dispatch(loadingflag(false))
        // toast.success(<ToastContent message={"Data fetched successfully"} />, {
        //     position: "top-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
      }
    } catch (err) {
      if (err?.response?.status === 400 || err?.response?.status === 500) {
        dispatch(loadingflag(false))
        // toast.error(<ToastContent message={err?.response?.data?.message} />, {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
      }
      dispatch(loadingflag(false))
    }
  }

// Login API
export const loginapiCall = (logindata, navigate) => async (dispatch) => {
  try {
    dispatch(loadingflag(true))
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/user/login`,
      logindata
    )

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
      navigate("/otp-code")
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

// Token API
export const tokenapiCall = (otpdata, navigate) => async (dispatch) => {
  try {
    dispatch(loadingflag(true))
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/user/verifyOtp`,
      otpdata
    )
    if (response.status === 200) {
      localStorage.setItem("authtoken", response.data?.data?.token)
      localStorage.setItem("usersite", response.data?.data?.data?.site)
      localStorage.setItem(
        "userData",
        JSON.stringify(response.data.data.data.user_type)
      )
      console.time("Saved userData")
      dispatch(tokenapiData(response.data))
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
      navigate("/")
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

// forgot password API
export const forgotpasswordEmailapiCall =
  (forgotdata, navigate) => async (dispatch) => {
    try {
      dispatch(loadingflag(true))
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/user/forgotPassword`,
        forgotdata
      )
      if (response?.status === 200) {
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
        navigate("/login")
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

// reset password API
export const resetpasswordapiCall =
  (resertdata, navigate) => async (dispatch) => {
    try {
      dispatch(loadingflag(true))
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/user/resetPassword`,
        resertdata
      )
      if (response.status === 200) {
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
        navigate("/login")
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

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loadingflag: (state, action) => {
      state.loading = action.payload
    },
    loginData: (state, action) => {
      state.data = action.payload
    },
    loginapiData: (state, action) => {
      state.logindata = action.payload
    },
    tokenapiData: (state, action) => {
      state.tokendata = action.payload
    },
    // forgotemailapiData: (state, action) => {
    //     state.forgotpasswordemailData = action.payload;
    // },
  },
})

export const { loadingflag, loginData, loginapiData, tokenapiData } =
  authSlice.actions

export default authSlice.reducer

// NOTE : Please manage the slice according to your requirement
