import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


//Slice initial state
const initialState = {
    loading: false,
    historytData:{},
    rowsPerPageCommentHistory:10,
    rowsPerPagePageHistory:10
};



// get History log 
export const getHistoryComment = (navigate,currentPage, rowsPerPage, searchValue, sortDirection, column,id, module) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/historyLogs/getHistoryLogs/${id}`,
            {
                search:searchValue,
                sortField: column,
                sortOrder: sortDirection,
                itemsPerPage: rowsPerPage * 1,
                page: currentPage,
                module, 
              },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
        );

        if (response.status === 200) {
            dispatch(HistoryData(response.data.data));
            dispatch(loadingflag(false));
        }
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
};

const historySlice = createSlice({
    name: "getHistoryLog",
    initialState,
    reducers: {
        loadingflag: (state, action) => {
            state.loading = action.payload;
        },
        HistoryData: (state, action) => {
            state.historytData = action.payload;
        },
        setRowPerPageCommentHistory: (state, action) => {
            state.rowsPerPageCommentHistory = action.payload;
        },
        setRowPerPagePageHistory: (state, action) => {
            state.rowsPerPagePageHistory = action.payload;
        },
    },
});

export const { loadingflag, HistoryData, setRowPerPageCommentHistory, setRowPerPagePageHistory} =
    historySlice.actions;

export default historySlice.reducer;