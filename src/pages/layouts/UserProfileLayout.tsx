import { PrivateRoute } from '@features/routes/PrivateRoute'
import { Footer } from '@features/ui/footer/Footer'
import { Outlet } from "react-router-dom";
import { LateralNav } from '@features/ui/lateral-nav/LateralNav'
import { NotificationPanel } from '@features/notifications/NotificationPanel';

const UserProfileLayout = () => {
  return (
    <PrivateRoute>
      <div className='user-layout'>
        <LateralNav />
        <Outlet />
        <Footer />
      </div>
      <NotificationPanel />
    </PrivateRoute>
  )
}

export default UserProfileLayout