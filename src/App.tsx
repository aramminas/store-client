import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppRoutes } from "./app-router";
import ReduxProvider from "./store/redux-provider";

function App() {
  return (
    <ReduxProvider>
      <AppRoutes />
      <ToastContainer />
    </ReduxProvider>
  );
}

export default App;
