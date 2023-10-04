import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { exportToExcel } from "../utility/common/exportToExcel";
import toast from "react-hot-toast";

//Slice initial state
const initialState = {
  downloadPageData: [],
  loading: false,
};
export const getDownloadadta =
  (name, id, exportToExcel, fileName, SheetFormateresponse, navigate) =>
    async (dispatch) => {
      try {
        const token = localStorage.getItem('authtoken')
        dispatch(loadingflag(true));
        const response = await axios.post(
          id && id !== '' ? `${import.meta.env.VITE_APP_API_URL}/util/downloadExcel?excel=${name}&id=${id}` : `${import.meta.env.VITE_APP_API_URL}/util/downloadExcel?excel=${name}`,
          null,{
            headers: {
              Authorization: `Bearer ${token}`
            },
            responseType: "arraybuffer",
          });
        if (response.status === 201) {
          dispatch(setdownlaoddata(response.data.data));
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName + ".xlsx");
          document.body.appendChild(link);
          link.click();
          dispatch(loadingflag(false));
          // exportToExcel(transformedData,fileName)
        } 
        dispatch(loadingflag(false));
      } catch (err) {
        if (err?.response?.status === 401) {
          localStorage.clear()
          navigate('/login')
        } else if (err?.response?.status === 404) {
          dispatch(loadingflag(false))
          navigate("/error")
        } else if (err?.response?.status === 400) {
          dispatch(loadingflag(false))
          toast.error(err?.response?.data?.message, {
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
    }

const downloaddataSlice = createSlice({
  name: "dowloaddata",
  initialState,
  reducers: {
    setdownlaoddata: (state, action) => {
      state.downloadPageData = action.payload;
    },
    loadingflag: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setdownlaoddata, loadingflag } =
  downloaddataSlice.actions;

export default downloaddataSlice.reducer;