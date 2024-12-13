import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Report from "./pages/Admin/Report/Report";
import User from "./pages/Admin/User/User";
import SelinganUserRoute from "./components/layout/SelinganUserRoute";
import SelinganAdminRoute from "./components/layout/SelinganAdminRoute";
import Host from "./pages/Host/Host";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import CreateRagam from "./pages/CreateRagam/CreateRagam";
import { createGlobalStyle } from "styled-components";

import "@fontsource/poppins";

import "./App.css";
import "./index.css";
import Ragams from "./pages/ListRagam/ListRagam";
import ExploreMap from "./components/ExploreMap";

const GlobalStyle = createGlobalStyle`
  body, .ant-typography {
    font-family: 'Poppins', sans-serif !important;
  }
`;
function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />

        {/* Selingan Admin */}
        <Route
          exact
          path="/admin-report"
          element={<SelinganAdminRoute component={<Report />} />}
        />
        <Route
          exact
          path="/admin-user"
          element={<SelinganAdminRoute component={<User />} />}
        />


        {/* Selingan User */}
        <Route
          exact
          path="/create-ragam"
          element={<SelinganUserRoute component={<CreateRagam />} />}
        />
        <Route
          exact
          path="/explore"
          element={<SelinganUserRoute component={<ExploreMap />} />}
        />
        <Route
          exact
          path="/ragam"
          element={<SelinganUserRoute component={<Ragams />} />}
        />
        <Route
          exact
          path="/host"
          element={<SelinganUserRoute component={<Host />} />}
        />
        <Route
          exact
          path="/profile"
          element={<SelinganUserRoute component={<Profile />} />}
        />
        <Route
          exact
          path="/settings"
          element={<SelinganUserRoute component={<Settings />} />}
        />
      </Routes>
    </>
  );
}

export default App;
