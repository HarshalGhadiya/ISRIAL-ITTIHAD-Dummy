// ** React Imports
import { Suspense, lazy } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

// ** Redux Imports
// import { store } from "./redux/store";
import { Provider } from "react-redux"
import persistStore from "redux-persist/es/persistStore"
import { PersistGate } from "redux-persist/integration/react"
import store from "../src/redux/store"

// ** ThemeColors Context

import { ThemeContext } from "./utility/context/ThemeColors"

// ** ThemeConfig
import themeConfig from "./configs/themeConfig"

// ** Toast
import { Toaster } from "react-hot-toast"

// ** Spinner (Splash Screen)
import Spinner from "./@core/components/spinner/Fallback-spinner"

// ** Ripple Button
import "./@core/components/ripple-button"

// ** PrismJS
import "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-jsx.min"

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css"

// ** React Hot Toast Styles
import "@styles/react/libs/react-hot-toasts/react-hot-toasts.scss"
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss"

// ** Core styles
import "./@core/assets/fonts/feather/iconfont.css"
import "./@core/scss/core.scss"
import "./assets/scss/style.scss"

// ** Service Worker
import * as serviceWorker from "./serviceWorker"

//import google auth
import { GoogleOAuthProvider } from "@react-oauth/google";

// ** Lazy load app
const LazyApp = lazy(() => import("./App"))

const container = document.getElementById("root")
const root = createRoot(container)

let persistor = persistStore(store)
const client_id =
  // "607320119054-c6deqhdbutlkk61a5gk4gdon612vu89s.apps.googleusercontent.com";
  "755438335341-5atihkouu8fpr1dfh3cpfusn4a8iqo7c.apps.googleusercontent.com";

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <ThemeContext>
          <PersistGate loading={null} persistor={persistor}>
            <GoogleOAuthProvider clientId={client_id}>
              <LazyApp />
              <Toaster
                position={themeConfig.layout.toastPosition}
                toastOptions={{ className: "react-hot-toast" }}
              />
            </GoogleOAuthProvider>
          </PersistGate>
        </ThemeContext>
      </Suspense>
    </Provider>
  </BrowserRouter>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
