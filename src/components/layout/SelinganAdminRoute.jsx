// import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from "../../utils/AuthContext";
import SelinganAdminLayout from "./AMain";
// eslint-disable-next-line react/prop-types
const SelinganAdminRoute = ({ component,
  //  role
   }) => {
  // const { user } = useAuth();
  // const location = useLocation();
  // const navigate = useNavigate();

  // if (!user) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // if (role && user.role !== role) {
  //   return <Navigate to="/" state={{ from: location }} replace />; // Redirect to a general page or error page
  // }

  return (
    <>
      <SelinganAdminLayout> {component} </SelinganAdminLayout>
    </>
  );
};

export default SelinganAdminRoute;
