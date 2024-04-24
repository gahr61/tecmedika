import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import { isAuth } from "./libs/functions";

const ProtectedRoute = ()=>{
    let auth = isAuth();
    if(!auth){
        return <Navigate to="login" replace />;
    }

    return <Outlet />
}

const AppRoutes = (props)=>{
    return(
        <Routes>
            <Route path='/login' exact element={<Login />} />

            <Route element={<ProtectedRoute />}>
                <Route path='/' exact element={<Home />} />
            </Route>
            
        </Routes>
    )
}

export default AppRoutes;