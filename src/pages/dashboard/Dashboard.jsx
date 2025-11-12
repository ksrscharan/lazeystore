import { useSelector } from 'react-redux';

function Dashboard() {
  const mode = useSelector((state) => state.theme.mode);
  return (
    <>
      <Navbar />
    </>
  );
}

export default Dashboard;
