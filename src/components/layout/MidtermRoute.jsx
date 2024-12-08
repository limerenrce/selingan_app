import MainLayout from "./Main";
// eslint-disable-next-line react/prop-types
const MidtermRoute = ({ component }) => {
  return (
    <>
      <MainLayout> {component} </MainLayout>
    </>
  );
};

export default MidtermRoute;
