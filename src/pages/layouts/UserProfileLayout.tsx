import { PrivateRoute } from '@features/routes/PrivateRoute'
import { Footer } from '@features/ui/footer/Footer'
import { Outlet } from "react-router-dom";
import { LateralNav } from '@features/ui/lateral-nav/LateralNav'

const UserProfileLayout = () => {
  return (
    <PrivateRoute>
        <div className='workspace-layout'>
            <LateralNav />
            <Outlet />
            <Footer />
        </div>
    </PrivateRoute>
  )
}

export default UserProfileLayout