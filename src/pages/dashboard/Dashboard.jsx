import { useSelector } from 'react-redux'

import Navbar from '../../components/navbar/Navbar'

function Dashboard() {
  const mode = useSelector((state) => state.theme.mode);
  return (
    <>
      <Navbar />
    </>
  )
}

export default Dashboard