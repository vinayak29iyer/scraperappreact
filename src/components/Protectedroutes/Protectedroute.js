import { Outlet, Navigate } from 'react-router-dom'
import moment from 'moment-timezone'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const ProtectedRoute = () => {
    const isAutTokenPresent = !!localStorage.getItem('authToken')
    let isAutTokenValid
    if(isAutTokenPresent){
        //Token Present, now check authTokenExp, should be less than curr DateTime 
        isAutTokenValid = moment().isBefore(localStorage.getItem('authTokenExp'))
    }
    //err will be thrown only if authToken is present, this stops modal bok to keep popping-up unnecessarily
    if(isAutTokenPresent && !isAutTokenValid){
        Swal.fire({
            title: 'Error!',
            text: 'Session Expired! You will now be redirected to Login Page!',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
    return ((isAutTokenValid ? <Outlet />: <Navigate to='/' />))
}

export default ProtectedRoute;