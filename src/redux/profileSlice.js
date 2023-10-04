import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


//Slice initial state
const initialState = {
    profileData: {},
    loading: false,
    editLoader : false
};


// get singal Harmful Word 
export const getUserProfileData = (navigate) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        const response = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/admin/findProfileById`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.status === 200) {
            dispatch(getProfileData(response.data.data[0]));
            dispatch(loadingflag(false));
        }
    } catch (err) {
        dispatch(SinglawordLoader(false))
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

// edit Harmful Word
export const editProfile = (navigate, data) => async (dispatch) => {
    const accessToken = localStorage.getItem("authtoken")
    try {
        dispatch(loadingflag(true));
        dispatch(editLoadingflag(true));
        const response = await axios.put(
            `${import.meta.env.VITE_APP_API_URL}/admin/updateProfileData`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (response.status === 200) {
            navigate(-1)
            dispatch(loadingflag(false));
            dispatch(editLoadingflag(false));

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
        dispatch(loadingflag(false));
        dispatch(editLoadingflag(false));
    }
};


const profileSlice = createSlice({
    name: "getProfileData",
    initialState,
    reducers: {
        loadingflag: (state, action) => {
            state.loading = action.payload;
        },
        getProfileData: (state, action) => {
            state.profileData = action.payload;
        },
        editLoadingflag: (state, action) => {
            state.editLoader = action.payload;
        },
    },
});

export const { loadingflag, getProfileData, editLoadingflag} =
    profileSlice.actions;

export default profileSlice.reducer;