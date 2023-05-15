// routes
import ScrollToTop from "./components/ScrrollToTop";
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import './App.css'
// ----------------------------------------------------------------------

export default function App() {
    return (
        <ThemeConfig>
            <ToastContainer />

            <ScrollToTop />
            <GlobalStyles />
            <Router />
        </ThemeConfig>
    );
}
