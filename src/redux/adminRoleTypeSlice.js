import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"

// import ToastContent from "../utility/common/ToastSuccess"

//Slice initial state
const initialState = {
  adminRoleTypes: [],
  adminRoleTypesById: {},
  loading: false,
  buttonloading: false,
}

// get Harmful Word
export const GetAdminRoleTypes =
  (pagenum, rowperpage, searchvalue, sortColumn, sortDirection) =>
  async (dispatch) => {
    const token = localStorage.getItem("authtoken")

    try {
      dispatch(loadingflag(true))
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/role-permission/roleList`,
        {
          search: searchvalue,
          sortField: sortColumn,
          sortOrder: sortDirection,
          itemsPerPage: rowperpage,
          page: pagenum,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        dispatch(AdminRoleType(response.data))
        dispatch(loadingflag(false))
      }
    } catch (err) {
      if (err?.response?.status === 401 || err?.response?.status === 500) {
        dispatch(loadingflag(false))
        toast.error(<ToastContent message={err?.response?.data?.message} />, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        navigate("/login")
        localStorage.clear()
      } else if (err?.response?.status === 404) {
        dispatch(loadingflag(false))
        navigate("/error")
      } else if (err?.response?.status === 400) {
        dispatch(loadingflag(false))
        toast.error(<ToastContent message={err?.response?.data?.message} />, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        dispatch(loadingflag(false))
      }
    }
  }

export const GetAdminRoleTypesById = (id, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authtoken")

    dispatch(loadingflag(true))
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/role-permission/findByRoleId/${id}`,
      "",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (response.status === 200) {
      dispatch(AdminRoleTypeId(response.data))
      dispatch(loadingflag(false))
    }
  } catch (err) {
    if (err?.response?.status === 401 || err?.response?.status === 500) {
      dispatch(loadingflag(false))
      toast.error(<ToastContent message={err?.response?.data?.message} />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      navigate("/login")
      localStorage.clear()
    } else if (err?.response?.status === 404) {
      dispatch(loadingflag(false))
      navigate("/error")
    } else if (err?.response?.status === 400) {
      dispatch(loadingflag(false))
      toast.error(<ToastContent message={err?.response?.data?.message} />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      dispatch(loadingflag(false))
    }
  }
}
export const AddAdminRoleType = (data, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authtoken")

    dispatch(loadingBtn(true))
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/role-permission/createRole`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    // navigate("/harmful-word")
    if (response.status === 200) {
      // console.log(response)
      dispatch(loadingBtn(false))
      navigate("/system-admins")
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
    }
  } catch (err) {
    if (err?.response?.status === 401 || err?.response?.status === 500) {
      dispatch(loadingflag(false))
      toast.error(<ToastContent message={err?.response?.data?.message} />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      navigate("/login")
      localStorage.clear()
    } else if (err?.response?.status === 404) {
      dispatch(loadingflag(false))
      navigate("/error")
    } else if (err?.response?.status === 400) {
      dispatch(loadingflag(false))
      toast.error(<ToastContent message={err?.response?.data?.message} />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      dispatch(loadingflag(false))
    }
  }
}
//edit roletype
export const editAdminRoleType = (data, id, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authtoken")

    dispatch(loadingBtn(true))
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API_URL}/role-permission/updateRole/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    // navigate("/harmful-word")
    if (response.status === 200) {
      dispatch(loadingBtn(false))
      navigate("/system-admins")
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
    }
  } catch (err) {
    if (err?.response?.status === 401 || err?.response?.status === 500) {
      dispatch(loadingflag(false))
      toast.error(<ToastContent message={err?.response?.data?.message} />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      navigate("/login")
      localStorage.clear()
    } else if (err?.response?.status === 404) {
      dispatch(loadingflag(false))
      navigate("/error")
    } else if (err?.response?.status === 400) {
      dispatch(loadingflag(false))
      toast.error(<ToastContent message={err?.response?.data?.message} />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      dispatch(loadingflag(false))
    }
  }
}

export const DeleteAdminRoleType =
  (
    deleteID,
    navigate,
    pagenum,
    rowperpage,
    searchvalue,
    sortColumn,
    sortDirection,
    lastone
  ) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("authtoken")

      dispatch(loadingflag(true))
      const response = await axios.put(
        `${
          import.meta.env.VITE_APP_API_URL
        }/role-permission/deleteRole/${deleteID}`,
        "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        dispatch(
          GetAdminRoleTypes(
            lastone && pagenum > 1 ? pagenum - 1 : pagenum,
            rowperpage,
            searchvalue,
            sortColumn,
            sortDirection
          )
        )
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
        // navigate("/system-admins");
      }
      dispatch(loadingflag(false))
    } catch (err) {
      if (err?.response?.status === 401 || err?.response?.status === 500) {
        dispatch(loadingflag(false))
        toast.error(err?.response?.data?.error, {
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
        localStorage.clear()
      } else if (err?.response?.status === 404) {
        dispatch(loadingflag(false))
        navigate("/error")
      } else if (err?.response?.status === 400) {
        console.log("sdjkjsdjk", err?.response?.data?.error)
        dispatch(loadingflag(false))
        toast.error(err?.response?.data?.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        dispatch(loadingflag(false))
      }
    }
  }

const adminRoleTypeSlice = createSlice({
  name: "GetAdminRoleType",
  initialState,
  reducers: {
    loadingflag: (state, action) => {
      state.loading = action.payload
    },
    loadingBtn: (state, action) => {
      state.buttonloading = action.payload
    },
    AdminRoleType: (state, action) => {
      state.adminRoleTypes = action.payload
    },
    AdminRoleTypeId: (state, action) => {
      state.adminRoleTypesById = action.payload
    },
  },
})

export const { loadingflag, loadingBtn, AdminRoleType, AdminRoleTypeId } =
  adminRoleTypeSlice.actions

export default adminRoleTypeSlice.reducer

// NOTE : Please manage the slice according to your requirement
