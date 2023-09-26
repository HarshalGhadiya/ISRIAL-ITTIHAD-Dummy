import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


//Slice initial state
const initialState = {
    commentData:{},
    singalComment:{},
    loading: false,
    rowsPerPageComment:10,
    rowsPerPagePageComment:10,
    editCommentLoader : false
};

// get comments 
export const getComment = (navigate,currentPage, rowsPerPage, searchValue, sortDirection, column,user_id) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/comments/allCommentsData?pageid=&userId=${user_id}`,
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
            dispatch(commentData(response.data.data));
            dispatch(loadingflag(false));
        }
    } catch (err) {
        dispatch(loadingflag(false));
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
        if (err?.response?.status === 401) {
            localStorage.clear()
            navigate('/login')
        } 
        if (err?.response?.status === 404) {
            navigate('/error')
        } 
        dispatch(loadingflag(false));
    }
};

// get singal comment 
export const getSingalComment = (navigate,id) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        const response = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/comments/getCommentById/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
        );

        if (response.status === 200) {
            dispatch(singalCommentData(response.data.data[0]));
            dispatch(loadingflag(false));
        }
    } catch (err) {
        dispatch(loadingflag(false));
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
        if (err?.response?.status === 401) {
            localStorage.clear()
            navigate('/login')
        } 
        if (err?.response?.status === 404) {
            navigate('/error')
        } 
        dispatch(loadingflag(false));
    }
};

// edit Comment
export const editComment = (navigate, data,id) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(setEditCommentLoader(true));
        const response = await axios.put(
            `${import.meta.env.VITE_APP_API_URL}/comments/updateCommentsData/${id}`,
                data,        
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 200) {
              navigate('/comments')
              dispatch(setEditCommentLoader(false));
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
        dispatch(setEditCommentLoader(false));
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
        if (err?.response?.status === 401) {
            localStorage.clear()
            navigate('/login')
        }
        dispatch(setEditCommentLoader(false));
    }
};

const commentSlice = createSlice({
    name: "getComment",
    initialState,
    reducers: {
        loadingflag: (state, action) => {
            state.loading = action.payload;
        },
        commentData: (state, action) => {
            state.commentData = action.payload;
        },
        singalCommentData: (state, action) => {
            state.singalComment = action.payload;
        },
        setRowPerPageComment :(state, action) => {
            state.rowsPerPageComment = action.payload;
        },
        setRowPerPagePageComment :(state, action) => {
            state.rowsPerPagePageComment = action.payload;
        },
        setEditCommentLoader :(state, action) => {
            state.editCommentLoader = action.payload;
        },
    },
});

export const { loadingflag, commentData, singalCommentData, setRowPerPageComment, setRowPerPagePageComment, setEditCommentLoader } =
    commentSlice.actions;

export default commentSlice.reducer;


// NOTE : Please manage the slice according to your requirement
