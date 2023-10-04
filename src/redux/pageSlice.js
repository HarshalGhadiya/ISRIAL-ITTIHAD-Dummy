import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { getCount } from "./commentSlice";


//Slice initial state
const initialState = {
    pageData:{},
    singalPage:{},
    loading: false,
    pageHistoryData:{},
    rowsPerPagePage:10,
    addEditLoader:false
};

// get pages 
export const getPage = (navigate,currentPage, rowsPerPage, searchValue, sortDirection, column) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/pages/allPages`,
            {
                search:searchValue,
                sortField: column ,
                sortOrder: sortDirection,
                itemsPerPage: rowsPerPage * 1,
                page: currentPage,
              },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
        );

        if (response.status === 200) {
            dispatch(pageData(response.data.data));
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

// get singal page 
export const getSingalPage = (navigate,id) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        const response = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/pages/getPage/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
        );

        if (response.status === 200) {
            dispatch(singalPageData(response?.data?.data?.pageData[0]));
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

// edit Page
export const editPage = (navigate, data,id) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(setAddEditLoader(true));
        const response = await axios.put(
            `${import.meta.env.VITE_APP_API_URL}/pages/updatePage/${id}`,
                data,        
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 200) {
              dispatch(getCount())
              navigate('/pages')
              dispatch(setAddEditLoader(false));
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
        dispatch(setAddEditLoader(false));
    }
};

//add page
export const addPage = (navigate, data) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(setAddEditLoader(true));
        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/pages/createPage`,
            data,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 200) {
            navigate("/pages")
            dispatch(setAddEditLoader(false));
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
        dispatch(setAddEditLoader(false));
    }
};

// get History log 
export const getHistoryPage = (navigate,currentPage, rowsPerPage, searchValue, sortDirection, column) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/harmfullWord/allHarmfullWords`,
            {
                search:searchValue,
                sortField: column.sortField,
                sortOrder: sortDirection,
                itemsPerPage: rowsPerPage,
                page: currentPage,
              },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
        );

        if (response.status === 200) {
            dispatch(pageHistory(response.data.data));
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


const pageSlice = createSlice({
    name: "getPage",
    initialState,
    reducers: {
        loadingflag: (state, action) => {
            state.loading = action.payload;
        },
        pageData: (state, action) => {
            state.pageData = action.payload;
        },
        singalPageData: (state, action) => {
            state.singalPage = action.payload;
        },
        pageHistory :(state, action) => {
            state.pageHistoryData = action.payload;
        },
        setRowPerPagePage :(state, action) => {
            state.rowsPerPagePage = action.payload;
        },
        setAddEditLoader:(state, action) => {
            state.addEditLoader = action.payload;
        },
    },
});

export const { loadingflag, pageData, singalPageData, pageHistory, setRowPerPagePage, setAddEditLoader} =
    pageSlice.actions;

export default pageSlice.reducer;


// NOTE : Please manage the slice according to your requirement
