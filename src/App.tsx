
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AdminLogin from './pages/admin/AdminLogin'
import CommAdminRegistration from './pages/communityAdmin/CommAdminRegistration'
import useAuth from './hooks/useAuth'
import DashboardLayout from './layouts/DashboardLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminImages from './pages/admin/AdminImages'
import Communities from './pages/admin/Communities'
import CorePackages from './pages/admin/CorePackages'
import AddImageForm from './components/AddFormImage'
import CommAdminLogin from './pages/communityAdmin/CommunityAdminLogin'
import CommAdminDashboard from './pages/communityAdmin/CommAdminDashboard'
import Users from './pages/communityAdmin/Users'



const App = () => {
  //select type of user using useAuth custom 
  const { role } = useAuth()
  console.log('roleee', role)

  return (
    <>

      <Routes>
        <Route path='/' element={<MainLayout><HomePage /></MainLayout>} />
        <Route path='/api/admin/login' element={<Layout><AdminLogin /></Layout>} />
        <Route path='/api/comm-admin/register' element={<Layout><CommAdminRegistration /></Layout>} />
        <Route path='/api/comm-admin/login' element={<Layout><CommAdminLogin /></Layout>} />
      
      {role === 'admin' && (
        <>
          <Route path='/api/admin' element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
          <Route path='/api/admin/addImage' element={<DashboardLayout><AddImageForm/></DashboardLayout>} />
          <Route path='/api/admin/communities' element={<DashboardLayout><Communities /></DashboardLayout>} />
          <Route path='/api/admin/packages' element={<DashboardLayout><CorePackages /></DashboardLayout>} />
          <Route path='/api/admin/images' element={<DashboardLayout><AdminImages /></DashboardLayout>} />
        </>
      )}
      {role==='commAdmin'&&(
        <>
        <Route path='/api/comm-admin' element={<DashboardLayout><CommAdminDashboard /></DashboardLayout>} />
        <Route path='/api/comm-admin/users' element={<DashboardLayout><Users/></DashboardLayout>} />
        </>
      )}
     
        <Route path='*' element={<Navigate to="/" />} />

      </Routes>
    </>
  )
}

export default App