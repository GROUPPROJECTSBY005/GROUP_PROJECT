import {createBrowserRouter  ,Outlet , redirect} from "react-router-dom"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Register from "./pages/Register"
import LoginPage from "./pages/LoginPage"


const CekAccessToken = () =>{
    if (!localStorage.access_token){
        return redirect('/LoginPage')
    }
    return null
}

const router = createBrowserRouter([


    {
        element: <>
                <Navbar/>
                <Outlet/>
                </>,
                loader: CekAccessToken,
    
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/GamePage',
                element: <GamePage/>
            },
            {

            }
           
        ]
    },
    
    {
        path: '/Register',
        element: <Register/>
    },
    {
        path : '/LoginPage',
        element: <LoginPage/>
    }
    
    
    
    ])

    export default router