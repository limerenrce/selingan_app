import SelinganUserLayout from "./SMain";
import SelinganAdminLayout from "./AMain";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import SignIn from "../../pages/Auth/SignIn";
import HamsterLoader from "../loaders/hamster";

// eslint-disable-next-line react/prop-types
const SelinganPrivateRoute = ({ component }) => {
  const { isLoggedIn, isLoadingScreen, userProfile } = useContext(AuthContext);
  console.log("user profile from private route", userProfile);
  console.log("PrivateRoute -> isLoggedIn", isLoggedIn);

  if (isLoggedIn && !isLoadingScreen) {
    // Redirect to login page or any other public route
    // return <MainLayout> {component} </MainLayout>;
    if (userProfile?.role === "user") {
      return <SelinganUserLayout> {component} </SelinganUserLayout>;
    } else if (userProfile?.role === "admin") {
      return <SelinganAdminLayout> {component} </SelinganAdminLayout>;
    }
  } else if (!isLoggedIn && !isLoadingScreen) {
    return <SignIn />;
  }
  // return <Navigate to="/login" replace />;
  return <HamsterLoader />;

  // Render the child component or outlet
};

export default SelinganPrivateRoute;
