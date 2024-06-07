
import { Navigate, Route, Routes } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import PublicRoutes from './routes/PublicRoutes'
import AdminRoutes from './routes/AdminRoutes'
import CommunityAdminRoutes from './routes/CommunityAdminRoutes'


const AppRoutes = () => {
  //select type of user using useAuth custom 
  const { role } = useAuth()
  
  console.log('roleee', role)

  return (
    <>

     

        {role === 'admin' && <AdminRoutes/>}
         
        {role === 'commAdmin' && <CommunityAdminRoutes/>}
        

          {!role && <PublicRoutes />}
    </>
  )
}

export default AppRoutes