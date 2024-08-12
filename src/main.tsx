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
import Ranked from './Pages/ranked.tsx';
import Classement from "./Pages/classement.tsx";
import TournamentDashboard from "./Pages/tournamentDashboard.tsx";
import EventDashboard from "./Pages/eventDashboard.tsx";
import PageTournamentInfos from "./Pages/pageTournamentInfos.tsx";
import PrivateRouteAdmin from "./ComposantsCommun/PrivateRouteAdmin.tsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.tsx";
import GameEntreprise from "./Pages/Entreprise/gameEntreprise.tsx";
import {
    ADMIN, ADMIN_EVENT_CREATE,
    CANCEL,
    COMPTE,
    COOKIE_POLICY,
    DASHBOARD,
    DASHBOARD_ENTREPRISE,
    ENTREPRISE,
    ERROR_PAGE,
    EVENT,
    FORGOT_PASSWORD,
    GAME_ENTREPRISE,
    HOME,
    LEGAL,
    LOAD_GAME,
    LOGIN,
    LOGOUT,
    PRIVACY_POLICY,
    RANKED,
    RANKING,
    REGISTER,
    RESET_PASSWORD,
    RESULT_PAGE,
    SUCCESS,
    TERMS,
    TOURNAMENT
} from "./constantes/constantesRoutes.ts";
import Entreprise from "./Pages/Entreprise/entreprise.tsx";
import Success from "./Pages/Entreprise/success.tsx";
import Cancel from "./Pages/Entreprise/cancel.tsx";
import CookiePolicyPage from "./ComposantsCommun/CookiePolicyPage.tsx";
import PrivacyPolicy from "./ComposantsCommun/PrivacyPolicy.tsx";
import LegalMentions from "./ComposantsCommun/LegalMentions.tsx";
import Cgv from "./ComposantsCommun/Cgv.tsx";
import LoadGame from "./Pages/Entreprise/LoadGame.tsx";
import PrivateRouteEntreprise from "./ComposantsCommun/PrivateRouteEntreprise.tsx";
import DashboardEntreprise from "./Pages/Entreprise/dashboardEntreprise.tsx";
import ErrorPage from "./Pages/ErrorPage.tsx";
import ResultPage from "./Pages/Entreprise/ResultPage.tsx";
import {NotificationProvider} from "./NotificationContext.tsx";
import AdmineventCreate from "./Pages/Admin/AdmineventCreate.tsx";

const router = createBrowserRouter([
    {
        path: LOGIN,
        element: <Login/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: HOME,
        element: <Home/>,
        errorElement: <ErrorPage/>
    },
    {
        path: LOGOUT,
        element: <PrivateRoute><LogoutPage/></PrivateRoute>,
        errorElement: <ErrorPage/>
    },
    {
        path: REGISTER,
        element: <SignUpForm/>,
        errorElement: <ErrorPage/>
    },
    {
        path: FORGOT_PASSWORD,
        element: <ForgotPassword/>,
        errorElement: <ErrorPage/>
    },
    {
        path: RESET_PASSWORD,
        element: <ChangePassword/>,
        errorElement: <ErrorPage/>
    },
    {
        path: ENTREPRISE,
        element: <Entreprise/>,
        errorElement: <ErrorPage/>
    },
    {
        path: COOKIE_POLICY,
        element: <CookiePolicyPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: PRIVACY_POLICY,
        element: <PrivacyPolicy/>,
        errorElement: <ErrorPage/>
    },
    {
        path: LEGAL,
        element: <LegalMentions/>,
        errorElement: <ErrorPage/>
    },
    {
        path: TERMS,
        element: <Cgv/>,
        errorElement: <ErrorPage/>
    },
    {
        path: DASHBOARD,
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        errorElement: <ErrorPage/>
    },
    {
        path: COMPTE,
        element: <PrivateRoute><MyAccount/></PrivateRoute>,
        errorElement: <ErrorPage/>
    },
    {
        path: RANKED,
        element: <PrivateRoute><Ranked/></PrivateRoute>,
        errorElement: <ErrorPage/>
    },
    {
        path: RANKING,
        element: <PrivateRoute><Classement/></PrivateRoute>,
        errorElement: <ErrorPage/>
    },
    {
        path: TOURNAMENT,
        element: <PrivateRoute><TournamentDashboard/></PrivateRoute>,
        errorElement: <ErrorPage/>
    },
    {
        path: `${TOURNAMENT}/:id`,
        element: <PrivateRoute><PageTournamentInfos/></PrivateRoute>,
        errorElement: <ErrorPage/>
    },
    {
        path: EVENT,
        element: <PrivateRoute><EventDashboard/></PrivateRoute>,
        errorElement: <ErrorPage/>
    },
    {
        path: ADMIN,
        element: <PrivateRouteAdmin><AdminDashboard/></PrivateRouteAdmin>,
        errorElement: <ErrorPage/>
    },
    {
        path: ADMIN_EVENT_CREATE,
        element: <PrivateRouteAdmin><AdmineventCreate/></PrivateRouteAdmin>,
        errorElement: <ErrorPage/>
    },
    {
        path: GAME_ENTREPRISE,
        element: <GameEntreprise/>,
        errorElement: <ErrorPage/>
    },
    {
        path: LOAD_GAME,
        element: <LoadGame/>,
        errorElement: <ErrorPage/>
    },
    {
        path: SUCCESS,
        element: <PrivateRoute><Success/></PrivateRoute>,
        errorElement: <ErrorPage/>
    },
    {
        path: CANCEL,
        element: <PrivateRoute><Cancel/></PrivateRoute>,
        errorElement: <ErrorPage/>
    },
    {
        path: DASHBOARD_ENTREPRISE,
        element: <PrivateRouteEntreprise><DashboardEntreprise/></PrivateRouteEntreprise>,
        errorElement: <ErrorPage/>
    },
    {
        path: ERROR_PAGE,
        element: <ErrorPage/>
    },
    {
        path: RESULT_PAGE,
        element: <ResultPage/>,
        errorElement: <ErrorPage/>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18n}>
        <AuthContextProvider>
            <NotificationProvider>
                <RouterProvider router={router}/>
            </NotificationProvider>
        </AuthContextProvider>
    </I18nextProvider>
)
