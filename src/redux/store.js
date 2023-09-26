// ** Redux Imports
// import rootReducer from "./rootReducer";
// import { configureStore } from "@reduxjs/toolkit";

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware({
//       serializableCheck: false,
//     });
//   },
// });

// export { store };


import { configureStore } from "@reduxjs/toolkit";
import { persistedReducer } from "../redux/rootReducer";

export default configureStore({
    reducer: {
        root: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});
