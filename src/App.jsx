import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import ReportUser from "./pages/Admin/Report/ReportUser";
import ReportEvent from "./pages/Admin/Report/ReportEvent";
import SelinganPrivateRoute from "./components/layout/SelinganPrivateRoute";
import Host from "./pages/Host/Host";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import CreateRagam from "./pages/CreateRagam/CreateRagam";
import Explore from "./pages/Explore/Explore";
// import { createGlobalStyle } from "styled-components";

import "@fontsource/poppins";

import "./App.css";
import "./index.css";
import Ragams from "./pages/ListRagam/ListRagam";
import AuthProvider from "./providers/AuthProvider";
// import ExploreMap from "./components/ExploreMap";

// const GlobalStyle = createGlobalStyle`
//   body, .ant-typography {
//     font-family: 'Poppins', sans-serif !important;
//   }
// `;
function App() {
  return (
    <>
      {/* <GlobalStyle /> */}
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />

          {/* Selingan Admin */}
          <Route
            exact
            path="/report-user"
            element={<SelinganPrivateRoute component={<ReportUser />} />}
          />
          <Route
            exact
            path="/report-event"
            element={<SelinganPrivateRoute component={<ReportEvent />} />}
          />

          {/* Selingan User */}
          <Route
            exact
            path="/create-ragam"
            element={<SelinganPrivateRoute component={<CreateRagam />} />}
          />
          <Route
            exact
            path="/explore"
            element={<SelinganPrivateRoute component={<Explore />} />}
          />
          <Route
            exact
            path="/ragam"
            element={<SelinganPrivateRoute component={<Ragams />} />}
          />
          <Route
            exact
            path="/host"
            element={<SelinganPrivateRoute component={<Host />} />}
          />
          <Route
            exact
            path="/profile"
            element={<SelinganPrivateRoute component={<Profile />} />}
          />
          <Route
            exact
            path="/settings"
            element={<SelinganPrivateRoute component={<Settings />} />}
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
