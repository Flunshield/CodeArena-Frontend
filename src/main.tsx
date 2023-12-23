import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {AuthContextProvider} from "./AuthContext.tsx";
import Home from "./Pages/home.tsx";
import PrivateRoute from "./ComposantsCommun/PrivateRoute.tsx";
import {LogoutPage} from "./Pages/logout.tsx";

const router = createBrowserRouter([
  {
      path: "/",
      element: <App/>,
      errorElement: "<ErrorPage/>",
  },
    {
        path: "/home",
        element: <PrivateRoute><Home /></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/logout",
        element: <PrivateRoute><LogoutPage /></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthContextProvider>
        <RouterProvider router={router}/>
    </AuthContextProvider>
)
