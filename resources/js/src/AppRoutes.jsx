import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { isAuth } from "./libs/functions";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";

import UsersList from "./pages/users/List";
import UsersForm from "./pages/users/Form";

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
                <Route element={<Layout />}>
                    <Route path='/' exact element={<Home />} />

                    <Route path='/users/list' exact element={<UsersList />} />
                    <Route path='/users/edit/:id' exact element={<UsersForm />} />
                </Route>
                
            </Route>
            
        </Routes>
    )
}

export default AppRoutes;