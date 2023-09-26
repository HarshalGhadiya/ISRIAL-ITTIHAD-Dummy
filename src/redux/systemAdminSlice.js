import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

//Slice initial state
const initialState = {
  systemadminData: [],
  loading: false,
  systemadmingetsingledata: [],
  systemadminform: {},
  sytemuserTypeData: {},
  SelectedTab: 1,
  rowsPerPage: 10
}

// System Admin dropdown list
export const SystemAdminDropdownRolelistapiCall =
  (site, navigate) => async (dispatch) => {
    const token = localStorage.getItem("authtoken");
    try {
      //dispatch(loadingflag(false));
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/role-permission/roleBySite?site=${site}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response,'response')
      if (response.status === 200) {
        dispatch(systemadminDropdownRole(response?.data?.data));
        dispatch(loadingflag(false));
      }
      dispatch(loadingflag(false));
    } catch (err) {
      if (err?.response.status === 401) {
        // Clear localStorage if the response is 401 Unauthorized
        localStorage.clear();
        navigate("/login");
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
export const SystemAdminsingleformdata = (id, navigate) => async (dispatch) => {
  const token = localStorage.getItem("authtoken");
  try {
    dispatch(loadingflag(true));
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/admin/findByIdAdmin/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response,'response')
    if (response.status === 200) {
      dispatch(systemadminformsingleformData(response?.data?.adminDataByID));
      dispatch(SystemAdminDropdownRolelistapiCall(response?.data?.adminDataByID[0]?.site, navigate))
      //dispatch(loadingflag(false));
    }
    dispatch(loadingflag(false));
  } catch (err) {
    if (err?.response.status === 401) {
      // Clear localStorage if the response is 401 Unauthorized
      localStorage.clear();
      navigate("/login");
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
// System Admin list
export const SystemAdminlistapiCall =
  (
    pagenum,
    rowperpage,
    searchvalue,
    sortColumn,
    sortDirection,
    navigate,
    tokendata
  ) =>
  async (dispatch) => {
    const token = localStorage.getItem("authtoken");
    try {
      dispatch(loadingflag(true));
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/admin/allAdminData`,
        {
          search: searchvalue,
          sortField: sortColumn,
          sortOrder: sortDirection,
          itemsPerPage: rowperpage,
          page: pagenum,
        },
        {
          headers: {
            Authorization: `Bearer ${tokendata}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(systemadminttableData(response.data));
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
      dispatch(loadingflag(false));
    }
  };

// Create new system Admin list
export const SystemAdminformapiCall =
  (formdata, navigate) => async (dispatch) => {
    const token = localStorage.getItem("authtoken");
    try {
      dispatch(loadingflag(true));
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/admin/createAdmin`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(systemadminformData(response.data));
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
        navigate("/system-admins");
      }
      dispatch(loadingflag(false));
    } catch (err) {
      if (err?.response.status === 401) {
        // Clear localStorage if the response is 401 Unauthorized
        localStorage.clear();
        navigate("/login");
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

// Edit Admin form
export const SystemAdminEditcell =
  (formdata, navigate, id) => async (dispatch) => {
    const token = localStorage.getItem("authtoken");
    try {
      dispatch(loadingflag(true));
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/admin/updateAdmin/${id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(systemadminformData(response.data));
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
        navigate("/system-admins");
      }
      dispatch(loadingflag(false));
    } catch (err) {
      if (err?.response.status === 401) {
        // Clear localStorage if the response is 401 Unauthorized
        localStorage.clear();
        navigate("/login");
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

//// Edit Admin form password
export const SystemAdminupdatePassword =
  (formdata, navigate, id) => async (dispatch) => {
    const token = localStorage.getItem("authtoken");
    try {
      dispatch(loadingflag(true));
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/admin/changePassword/${id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(systemadminformData(response.data));
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
        navigate("/system-admins");
      }
      dispatch(loadingflag(false));
    } catch (err) {
      if (err?.response.status === 401) {
        // Clear localStorage if the response is 401 Unauthorized
        localStorage.clear();
        navigate("/login");
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

//Delete System backoffice Admin
export const SystemAdmindeleteapiCall =
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
    const token = localStorage.getItem("authtoken");
    const userSite = localStorage.getItem("usersite");
    console.log(
      (userSite != "systemBackOffice" && lastone && pagenum > 1, pagenum),
      "pagenum"
    );
    try {
      dispatch(loadingflag(true));
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/admin/deleteAdmin/${deleteID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(
          SystemAdminlistapiCall(
            userSite != "systemBackOffice" && lastone && pagenum > 1
              ? pagenum - 1
              : pagenum,
            rowperpage,
            searchvalue,
            sortColumn,
            sortDirection,
            navigate,
            token
          )
        );
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
        // navigate("/system-admins");
      }
      dispatch(loadingflag(false));
    } catch (err) {
      if (err?.response.status === 401) {
        // Clear localStorage if the response is 401 Unauthorized
        localStorage.clear();
        navigate("/login");
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

export const forTabUpdate = (val) => async (dispatch) => {
  try {
    dispatch(updateTab(val));
  } catch (err) {}
};

const systemAdminSlice = createSlice({
  name: "systemadmin",
  initialState,
  reducers: {
    loadingflag: (state, action) => {
      state.loading = action.payload;
    },
    systemadminttableData: (state, action) => {
      state.systemadminData = action.payload;
    },
    systemadminformData: (state, action) => {
      state.systemadminform = action.payload;
    },
    systemadminformsingleformData: (state, action) => {
      state.systemadmingetsingledata = action.payload;
    },
    systemadminDropdownRole: (state, action) => {
      state.sytemuserTypeData = action.payload;
    },
    updateTab: (state, action) => {
      state.SelectedTab = action.payload;
    },
    resetSytemadminSingleData: (state, action) => {
      state.systemadmingetsingledata = [];
    },
    SetRowPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
});

export const {
  loadingflag,
  systemadminttableData,
  systemadminformData,
  systemadminDropdownRole,
  updateTab,
  systemadminformsingleformData,
  resetSytemadminSingleData,
  SetRowPerPage
} = systemAdminSlice.actions;

export default systemAdminSlice.reducer;

// NOTE : Please manage the slice according to your requirement
