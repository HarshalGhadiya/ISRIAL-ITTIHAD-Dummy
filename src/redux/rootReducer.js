// ** Reducers Imports
import layoutSlice from "../redux/layout"
import navlayoutSlice from "../redux/navbar"

// const rootReducer = { navbar, layout };

// export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authSlice from "./authSlice"
import harmfulWordSlice from "./harmfulWordSlice"
import systemAdminSlice from "./systemAdminSlice"
import adminRoleTypeSlice from "./adminRoleTypeSlice"
import settingPageSlice from "./settingPageSlice"
import userSlice from "./userSlice"
import commentSlice from "./commentSlice"
import pageSlice from "./pageSlice"
import historyLogSlice from "./historyLogSlice"
import articalauthSlice from "./articalauthSlice"
import downloaddataSlice from "./exportdataExelslice"
import profileSlice from "./profileSlice"
// import authSlice from "./slices/authSlice";

// Reducers

const persistConfig = {
  key: "root",
  storage,
}

const appReducer = combineReducers({
  auth: authSlice,
  articalauth: articalauthSlice,
  navbar: navlayoutSlice,
  layout: layoutSlice,
  harmfulWord: harmfulWordSlice,
  systemadmin: systemAdminSlice,
  adminRoleType: adminRoleTypeSlice,
  settingPage:settingPageSlice,
  users:userSlice,
  comment: commentSlice,
  page: pageSlice,
  dowloadexeledata:downloaddataSlice,
  history: historyLogSlice,
  profile:profileSlice
})
const rootReducer = (state, action) => {
  if (action.type === "login/logoutdata") {
    state = undefined
  }
  return appReducer(state, action)
}
export const persistedReducer = persistReducer(persistConfig, rootReducer)
export default rootReducer
