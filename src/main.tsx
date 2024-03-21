import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {AuthContextProvider} from "./AuthContext.tsx";
import Home from "./Pages/home.tsx";
import PrivateRoute from "./ComposantsCommun/PrivateRoute.tsx";
import {LogoutPage} from "./Pages/logout.tsx";
import SignUpForm from "./Pages/signUpForm.tsx";
import Login from "./Pages/login.tsx";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n.ts";
import ForgotPassword from "./Pages/forgotPassword.tsx";
import ChangePassword from "./Pages/changePassword.tsx";
import Dashboard from "./Pages/dashboard.tsx";
import MyAccount from "./Pages/myAccount.tsx";
import Ranked from "./Pages/ranked.tsx";
import Classement from "./Pages/classement.tsx";
import TournamentDashboard from "./Pages/tournamentDashboard.tsx";
import EventDashboard from "./Pages/eventDashboard.tsx";
import PageTournamentInfos from "./Pages/pageTournamentInfos.tsx";
import PrivateRouteAdmin from "./ComposantsCommun/PrivateRouteAdmin.tsx";
import AdminDashboard from "./Pages/AdminDashboard.tsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>,
        errorElement: "<ErrorPage/>",
    },
    {
        path: "/",
        element: <Home/>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/logout",
        element: <PrivateRoute><LogoutPage/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/signUp",
        element: <SignUpForm/>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/forgotPassword",
        element: <ForgotPassword/>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/changePassword",
        element: <ChangePassword/>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/myAccount",
        element: <PrivateRoute><MyAccount/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/ranked",
        element: <PrivateRoute><Ranked/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/ranking",
        element: <PrivateRoute><Classement/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/tournament",
        element: <PrivateRoute><TournamentDashboard/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/tournament/:id",
        element: <PrivateRoute><PageTournamentInfos/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/event",
        element: <PrivateRoute><EventDashboard/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: "/admin",
        element: <PrivateRouteAdmin><AdminDashboard/></PrivateRouteAdmin>,
        errorElement: "<ErrorPage/>"
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18n}>
        <AuthContextProvider>
            <RouterProvider router={router}/>
        </AuthContextProvider>
    </I18nextProvider>
)
