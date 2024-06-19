import {createBrowserRouter  ,Outlet , redirect} from "react-router-dom"
import Home from "./pages/Home"
import Game from "./pages/Game"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"


const CekAccessToken = () =>{
    if (!localStorage.access_token){
        return redirect('/login')
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
                element: <Home/>
            },
            {
                path: '/game',
                element: <Game/>
            },
            {

            }
           
        ]
    },
    
    {
        path: '/register',
        element: <Register/>
    },
    {
        path : '/login',
        element: <Login/>
    }
    
    
    
    ])

    export default router