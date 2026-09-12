import { CanMatchFn, Routes } from '@angular/router';
import { Login } from './login/login';
import { Patients } from './patients/patients';


const protectedRoutes: CanMatchFn = (route, segments) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        return false;
    }
    return true;
}

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'patients',
        component: Patients,
        canMatch: [protectedRoutes]
    }
];
