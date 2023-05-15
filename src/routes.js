import { Navigate, useRoutes } from "react-router-dom";
// layouts
import HomePageLayout from "./layouts/homePageLayout";
import CommingSoon from "./pages/CommingSoon";
import Connect from "./pages/Connect";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import News from "./pages/News";
import OurTeam from "./pages/OurTeam";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Wallet from "./pages/Wallet";
//

// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
      {
        path: "/",
        element: <HomePageLayout />,
        children: [
          // { element: <Navigate to="/dashboard/app" replace /> },
          { path: "/", element: <Wallet /> },
          { path: "contact-us", element: <ContactUs /> },
          { path: "disclaimer", element: <PrivacyPolicy /> },
          { path: "comming-soon", element: <CommingSoon /> },
          { path: "our-team", element: <OurTeam /> },
          { path: "news", element: <News /> },
        ],
      },
      {
        path: "/xyz",
        element: <HomePageLayout />,
        children: [
          // { element: <Navigate to="/dashboard/app" replace /> },
          { path: "xyz", element: <Connect /> },
        ],
      },
      // {
      //   path: '/',
      //   element: <LogoOnlyLayout />,
      //   children: [
      //     { path: 'login', element: <Login /> },
      //     { path: 'register', element: <Register /> },
      //     { path: '404', element: <NotFound /> },
      //     { path: '/', element: <Navigate to="/dashboard" /> },
      //     { path: '*', element: <Navigate to="/404" /> }
      //   ]
      // },
      // { path: '*', element: <Navigate to="/404" replace /> }
    ]);
}
