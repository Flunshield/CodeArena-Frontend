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
import Classement from "./Pages/classement.tsx";
import TournamentDashboard from "./Pages/tournamentDashboard.tsx";
import EventDashboard from "./Pages/eventDashboard.tsx";
import PageTournamentInfos from "./Pages/pageTournamentInfos.tsx";
import PrivateRouteAdmin from "./ComposantsCommun/PrivateRouteAdmin.tsx";
import AdminDashboard from "./Pages/AdminDashboard.tsx";
import {
    ADMIN,
    COMPTE,
    DASHBOARD, ENTREPRISE, EVENT,
    FORGOT_PASSWORD,
    HOME,
    LOGIN,
    LOGOUT,
    RANKING,
    REGISTER,
    RESET_PASSWORD, TOURNAMENT
} from "./constantes.ts";
import Entreprise from "./Pages/entreprise.tsx";

const router = createBrowserRouter([
    {
        path: LOGIN,
        element: <Login/>,
        errorElement: "<ErrorPage/>",
    },
    {
        path: HOME,
        element: <Home/>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: LOGOUT,
        element: <PrivateRoute><LogoutPage/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: REGISTER,
        element: <SignUpForm/>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: FORGOT_PASSWORD,
        element: <ForgotPassword/>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: RESET_PASSWORD,
        element: <ChangePassword/>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: ENTREPRISE,
        element: <Entreprise/>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: DASHBOARD,
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: COMPTE,
        element: <PrivateRoute><MyAccount/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: RANKING,
        element: <PrivateRoute><Classement/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: TOURNAMENT,
        element: <PrivateRoute><TournamentDashboard/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: `${TOURNAMENT}/:id`,
        element: <PrivateRoute><PageTournamentInfos/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: EVENT,
        element: <PrivateRoute><EventDashboard/></PrivateRoute>,
        errorElement: "<ErrorPage/>"
    },
    {
        path: ADMIN,
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
