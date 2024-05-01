
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AdminLogin from './pages/AdminLogin'



const AppRoutes = () => {
  return (
   <Routes>
        <Route path='/' element={<MainLayout><HomePage/></MainLayout>} />
        <Route path='/api/admin' element={<Layout><AdminLogin/></Layout>} />
        <Route path='*' element={<Navigate to="/" />} />
   </Routes>
  )
}

export default AppRoutes