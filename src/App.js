import React from 'react';
import { Routes, Route, Link, Navigate  } from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Counter from './components/Counter';
import Login from './components/Login/login';
import Dasboard from './components/Dashboard/DasbhboardMain';
import UserManagement from './components/UserManagement/UserManagementMain';
import ProtectedRoute from './components/Protectedroutes/Protectedroute';
import PageNotFound from './components/Error/Pagenotfound'


function App() {
    const validateEnvs = ()=>{
        const applicationEnvVars = ['REACT_APP_BASE_API','REACT_APP_LOGIN_API','REACT_APP_SCRAPER_API']
        let unusedEnvVars = applicationEnvVars.filter((i) => !process.env[i])
        if (unusedEnvVars.length) throw new Error('\nRequired ENV variables are not set: [' + unusedEnvVars.join(', ') + ']\n')
    }
    validateEnvs()
    return (
        <>
        <div>
            <Routes>
                <Route path="*" element={<PageNotFound />} />
                <Route path="/" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} /> 
                    <Route path="/about" element={<About />} /> 
                    <Route path="/counter" element={<Counter />} /> 
                    <Route path="/dashboard" element={<Dasboard />} />
                    <Route path="/userlist" element={<UserManagement />} />
                    <Route path="/usersave" element={<UserManagement />} />
                </Route>
            </Routes>
        </div>
        </>
    );
}

export default App;
