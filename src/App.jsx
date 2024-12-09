import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import SelinganUserRoute from "./components/layout/SelinganUserRoute";
import Explore from "./pages/Explore/Explore";
import Ragam from "./pages/Ragam/Ragam";
import Host from "./pages/Host/Host";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import CreateRagam from "./pages/CreateRagam/CreateRagam";

import "./App.css";
import "./index.css";
import Ragams from "./pages/ListRagam/ListRagam";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        {/* Selingan User */}
        <Route
          exact
          path="/create-ragam"
          element={<SelinganUserRoute component={<CreateRagam />} />}
        />
        <Route
          exact
          path="/explore"
          element={<SelinganUserRoute component={<Explore />} />}
        />
        <Route
          exact
          path="/ragam"
          element={<SelinganUserRoute component={<Ragams />} />}
        />
        {/* <Route
          exact
          path="/ragam"
          element={<SelinganUserRoute component={<Ragam />} />}
        /> */}
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
      <div className="flex-1 flex flex-col">
        {/* Body */}
        {/* <div className="flex-1 overflow-y-auto p-4"> */}
        {/* <Routes> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Default route (redirect to Dashboard) */}
        {/* <Route path="/*" element={<Dashboard />} /> */}
        {/* </Routes> */}
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
