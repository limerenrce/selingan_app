import SelinganAdminLayout from "./AMain";
// eslint-disable-next-line react/prop-types
const SelinganAdminRoute = ({ component }) => {
  return (
    <>
      <SelinganAdminLayout> {component} </SelinganAdminLayout>
    </>
  );
};

export default SelinganAdminRoute;