import React, { useState, useEffect } from "react";
import Login from "./layouts/login";
function App() {
    const [isAuthenticated, setisAuthenticated] = useState(false);
    // const authenticateUser = (authState) => {
    //   setisAuthenticated(authState);
    // }
    useEffect(() => {
        console.log(`Authenticated: ${isAuthenticated}`);
    }, [isAuthenticated]);
    return <Login setisAuthenticated={setisAuthenticated} />;
}
export default App;
