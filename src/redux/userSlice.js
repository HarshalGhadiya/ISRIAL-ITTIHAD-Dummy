import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = 'http://172.16.0.220:3001/api/v1'
//Slice initial state
const initialState = {
    UserListData: [],
    usereditsingledata:[],
    loading: false,
    rowsPerPage:10
};


export const userList=
  (pages, rowsPerPage, searchValue, sortColumn, sortDirection) =>
    async (dispatch) => {
      try {
        const token = localStorage.getItem('authtoken')
        dispatch(loadingflag(true));
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/user/usersList`,
          {
             search: searchValue,
             sortField: sortColumn,
             sortOrder: sortDirection,
            itemsPerPage: rowsPerPage,
            page: pages,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        if (response.status === 200) {
          dispatch(userData(response.data.data));
          dispatch(loadingflag(false));
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
export const userEditsingledata =
  (navigate, id) => async (dispatch) => {
    try {
      const token = localStorage.getItem('authtoken')
      dispatch(loadingflag(true))
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/user/getUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        dispatch(userDataeditdata(response.data.data))
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
       // navigate("/system-admins")
      }
      dispatch(loadingflag(false))
    } catch (err) {
      // if (err?.response.status === 401) {
      //   // Clear localStorage if the response is 401 Unauthorized
      //   localStorage.clear()
      //   navigate("/login")
      // }
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
      if (err?.response?.status === 401) {
        localStorage.clear()
        navigate('/login')
    }
      dispatch(loadingflag(false))
    }
  }
  export const userEditdata =
  (data,navigate,id) => async (dispatch) => {
    console.log('id',id,'data',data)
   
    try {
  
      const token = localStorage.getItem('authtoken')
      dispatch(loadingflag(true))
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_API_URL}/user/updateUser/${id}`,{status:data},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
       // dispatch(userDataeditdata(response.data.data))
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
        navigate("/users")
      }
      dispatch(loadingflag(false))
    } catch (err) {
      if (err?.response.status === 401) {
        // Clear localStorage if the response is 401 Unauthorized
        localStorage.clear()
        navigate("/login")
      }
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

    const userSlice = createSlice({
        name: "user",
        initialState,
        reducers: {
            loadingflag: (state, action) => {
                state.loading = action.payload;
            },
            userData: (state, action) => {
                state.UserListData = action.payload;
            },
            userDataeditdata: (state, action) => {
              state.usereditsingledata = action.payload;
          },
          SetRowPerPage: (state, action) => {
            state.rowsPerPage = action.payload;
        },
        },
    });
    
    export const { loadingflag, userData,userDataeditdata,SetRowPerPage} =
    userSlice.actions;
    
    export default userSlice.reducer;