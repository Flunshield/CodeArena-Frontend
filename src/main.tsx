import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {AuthContextProvider} from "./AuthContext.tsx";
import Home from "./Pages/home.tsx";
import PrivateRoute from "./ComposantsCommun/PrivateRoute.tsx";
import {LogoutPage} from "./Pages/logout.tsx";
import SignUpForm from "./Pages/signUpForm.tsx";
import Login from "./Pages/login.tsx";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n.ts";
import ForgotPassword from "./Pages/ForgotPassword.tsx";
import ChangePassword from "./Pages/changePassword.tsx";

const router = createBrowserRouter([
  {
      path: "/login",
      element: <Login/>,
      errorElement: "<ErrorPage/>",
  },
    {
        path: "/",
        element: <Home />,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/logout",
        element: <PrivateRoute><LogoutPage /></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/signUp",
        element: <SignUpForm />,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/forgotPassword",
        element: <ForgotPassword />,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/changePassword",
        element: <ChangePassword />,
        errorElement: "<ErrorPage/>"
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18n}>
        <AuthContextProvider>
            <RouterProvider router={router}/>
        </AuthContextProvider>
    </I18nextProvider>
)
