import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = 'http://172.16.1.237:3001/api/v1'
const token = localStorage.getItem('authtoken')
//Slice initial state
const initialState = {
    settingPageData: [],
    loading: false,
    getdataloding:false,
    getemailoption:[],
};

export const settingPagecreateData=
  (formdata) =>
    async (dispatch) => {
      try {
        const token = localStorage.getItem('authtoken')
        dispatch(getdataloadingflag(true));
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/pageSetting/createPage`, formdata
          ,{
            headers: {
              "Content-Type":`multipart/form-data; boundary=${formdata._boundary}`,
                Authorization: `Bearer ${token}`,
            },
          });
        if (response.status === 200) {
          //dispatch(settingPageData(response.data));
          dispatch(getdataloadingflag(false));
          // toast.success(response.data.message, {
          //   position: "top-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });
        }
        dispatch(loadingflag(false));
      } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 500) {
          dispatch(loadingflag(false));
          toast.error(err?.response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (err?.response?.status === 401) {
          localStorage.clear()
          navigate('/login')
      }
        dispatch(loadingflag(false));
      }
    };
    export const settingPageupdateData=
  (formdata,id) =>
    async (dispatch) => {
      try {
        const token = localStorage.getItem('authtoken')
        dispatch(loadingflag(true));
        const response = await axios.put(`${import.meta.env.VITE_APP_API_URL}/pageSetting/updatePage`, formdata
          ,{
            headers: {
              "Content-Type":`multipart/form-data; boundary=${formdata._boundary}`,
                Authorization: `Bearer ${token}`,
            },
          });
        if (response.status === 200) {
          dispatch(settingPageGetData(response.data));
          dispatch(loadingflag(false));
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        dispatch(loadingflag(false));
      } catch (err) {
        if (err?.response.status === 401) {
          // Clear localStorage if the response is 401 Unauthorized
          localStorage.clear();
          navigate('/login')
        }
        if (err?.response?.status === 400 || err?.response?.status === 500) {
          dispatch(loadingflag(false));
          toast.error(err?.response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        dispatch(loadingflag(false));
      }
    };
export const settingPageGetData=
  () =>
    async (dispatch) => {
      try {
        const token = localStorage.getItem('authtoken')
        dispatch(getdataloadingflag(true));
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/pageSetting/getPage`
          ,{
            headers: {
              //"Content-Type":`multipart/form-data; boundary=${formdata._boundary}`,
                Authorization: `Bearer ${token}`,
            },
          });
        if (response.status === 200) {
          dispatch(settingPageData(response.data.data));
          dispatch(getdataloadingflag(false));
          // toast.success(response.data.message, {
          //   position: "top-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          // });
        }
        dispatch(getdataloadingflag(false));
      } catch (err) {
        if (err?.response.status === 401) {
          // Clear localStorage if the response is 401 Unauthorized
          localStorage.clear();
          navigate('/login')
        }
        if (err?.response?.status === 400 || err?.response?.status === 500) {
          dispatch(getdataloadingflag(false));
          toast.error(err?.response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        dispatch(getdataloadingflag(false));
      }
    };
export const settingPageGetEmailOption=
  () =>
    async (dispatch) => {
      try {
        const token = localStorage.getItem('authtoken')
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/admin/allAdminEmail`
          ,{
            headers: {
              //"Content-Type":`multipart/form-data; boundary=${formdata._boundary}`,
                Authorization: `Bearer ${token}`,
            },
          });
        if (response.status === 200) {
          console.log('response',response);
          dispatch(settingPagEmailOption(response.data.data));
        }
      } catch (err) {
        if (err?.response.status === 401) {
          localStorage.clear();
          navigate('/login')
        }
        if (err?.response?.status === 400 || err?.response?.status === 500) {
         // dispatch(getdataloadingflag(false));
          toast.error(err?.response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        //dispatch(getdataloadingflag(false));
      }
    };

    const settingPageSlice = createSlice({
        name: "settingPage",
        initialState,
        reducers: {
            loadingflag: (state, action) => {
                state.loading = action.payload;
            },
            getdataloadingflag: (state, action) => {
              state.getdataloding = action.payload;
          },
            settingPageData: (state, action) => {
                state.settingPageData = action.payload;
            },
            settingPagEmailOption: (state, action) => {
              state.getemailoption = action.payload;
          },
        },
    });
    
    export const { loadingflag, settingPageData,getdataloadingflag,settingPagEmailOption} =
          settingPageSlice.actions;
    
    export default settingPageSlice.reducer;