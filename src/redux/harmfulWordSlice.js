import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


//Slice initial state
const initialState = {
    harmfulWordData: {},
    singalHarmfulWord:{},
    loading: false,
    getSinglawordLoader: false,
    rowsPerPage:10
};

// get Harmful Word 
export const getHarmfulWord = (navigate,currentPage, rowsPerPage, searchValue, sortDirection, column, pagination) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        const columnName = column.name == 'Id' ? 'row_id' : column.name == 'Word' ? "word" : column.name == 'Updated' ? 'updatedAt' : 'row_id'
        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/harmfullWord/allHarmfullWords?pagination=${pagination ? pagination : true}`,
            {
                search:searchValue,
                sortField: columnName,
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
            dispatch(harmfulWordData(response.data.data));
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

// get singal Harmful Word 
export const getSingalHarmfulWord = (navigate,id) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        dispatch(SinglawordLoader(true))
        const response = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/harmfullWord/getWord/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
        );

        if (response.status === 200) {
            dispatch(singalHarmfulWordData(response.data.data));
            dispatch(loadingflag(false));
            dispatch(SinglawordLoader(false))
        }
    } catch (err) {
        dispatch(loadingflag(false));
        dispatch(SinglawordLoader(false))
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

// edit Harmful Word
export const editHarmfulWord = (navigate, data,id) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        const response = await axios.put(
            `${import.meta.env.VITE_APP_API_URL}/harmfullWord/updateWord/${id}`,
                {word:data},        
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 200) {
              navigate('/harmful-words')
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
    } catch (err) {
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
        if (err?.response?.status === 401) {
            localStorage.clear()
            navigate('/login')
        }
        dispatch(loadingflag(false));
    }
};

//add harmful word
export const addHarmfulWord = (navigate, data) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/harmfullWord/createWord`,
            {word:data} ,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.status === 200) {
            navigate('/harmful-words')
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
    } catch (err) {
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
        if (err?.response?.status === 401) {
            localStorage.clear()
            navigate('/login')
        }
        dispatch(loadingflag(false));
    }
};

export const deleteHarmfulWord = (id, navigate, currentPage, rowsPerPage, searchValue, sortDirection, column, lastone ) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        const response = await axios.put(
            `${import.meta.env.VITE_APP_API_URL}/harmfullWord/deleteWord/${id}`,'',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        if (response.status === 200) {
            dispatch(loadingflag(false));
            dispatch(
                getHarmfulWord(
                  navigate,
                  lastone && currentPage > 1 ? currentPage - 1 : currentPage,
                  rowsPerPage,
                  searchValue,
                  sortDirection,
                  column, true
                )
              );
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
        dispatch(loadingflag(false));
        if (err?.response?.status === 401) {
            localStorage.clear()
            navigate('/login')
        } 
        // else {
        //     navigate('/error')
        // }
        dispatch(loadingflag(false));
    }
};

const harmfulWordSlice = createSlice({
    name: "getHarmfulWord",
    initialState,
    reducers: {
        loadingflag: (state, action) => {
            state.loading = action.payload;
        },
        harmfulWordData: (state, action) => {
            state.harmfulWordData = action.payload;
        },
        singalHarmfulWordData: (state, action) => {
            state.singalHarmfulWord = action.payload;
        },
        SinglawordLoader: (state, action) => {
          state.getSinglawordLoader = action.payload;
      },
      SetRowPerPage: (state, action) => {
        state.rowsPerPage = action.payload;
    },
    },
});

export const { loadingflag, harmfulWordData, singalHarmfulWordData, SinglawordLoader, SetRowPerPage } =
    harmfulWordSlice.actions;

export default harmfulWordSlice.reducer;


// NOTE : Please manage the slice according to your requirement
