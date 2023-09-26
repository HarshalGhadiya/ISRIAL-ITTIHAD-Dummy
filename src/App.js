import React, { Suspense } from "react"
import { redirect } from "react-router-dom"
// ** Router Import
import Router from "./router/Router"
import { useEffect } from "react"

const App = () => {
  //Hide all warning from the browser
  // useEffect(() => {
  //   const originalConsoleLog = console.log;
  //   const originalConsoleWarn = console.warn;
  //   const originalConsoleError = console.error;

  //   console.log = console.warn = console.error = () => { };

  //   return () => {
  //     console.log = originalConsoleLog;
  //     console.warn = originalConsoleWarn;
  //     console.error = originalConsoleError;
  //   };
  // }, []);

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  )
}

export default App
