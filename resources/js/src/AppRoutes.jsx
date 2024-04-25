import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { isAuth } from "./libs/functions";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";

import UsersList from "./pages/users/List";
import UsersForm from "./pages/users/Form";

import PatientsList from "./pages/patients/List";
import PatientsForm from "./pages/patients/Form";
import AppointmentsList from "./pages/appointments/List";

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

                    <Route path='/patients/list' exact element={<PatientsList />} />
                    <Route path='/patients/new' exact element={<PatientsForm />} />
                    <Route path='/patients/edit/:id' exact element={<PatientsForm />} />

                    <Route path='/appointment/list' exact element={<AppointmentsList />} />
                    <Route path='/patients/new' exact element={<PatientsForm />} />
                    <Route path='/patients/edit/:id' exact element={<PatientsForm />} />
                </Route>
                
            </Route>
            
        </Routes>
    )
}

export default AppRoutes;