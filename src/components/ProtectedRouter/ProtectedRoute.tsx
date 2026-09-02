import { Navigate } from "react-router";

export default function ProtectedRoute({ children }:{children:React.ReactNode}) {


    if (localStorage.getItem('tkn')) {
        return children;
        
    }


  return (
   <Navigate to={'/login'}/>
  )
}
