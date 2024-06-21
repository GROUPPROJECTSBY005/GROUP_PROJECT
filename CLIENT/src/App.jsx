import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";


function App() {
    particlesJS.load('particles-js', '/particlesjs-config.json', function() {
        console.log('callback - particles.js config loaded');
    });
    return (
        <>
            <AuthProvider>
                <ThemeProvider>
                    <RouterProvider router={router} />
                    <div id="particles-js"></div> {/* This is where the particles will be rendered */}
                </ThemeProvider>
            </AuthProvider>
        </>
    );
}

export default App;
