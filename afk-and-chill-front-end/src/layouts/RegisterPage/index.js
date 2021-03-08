import React, {useState} from 'react';
import Register from '../../components/Register'

export default function LoginPage() {
//   const history = useHistory()
  
    const [isAuthenticated, setisAuthenticated] = useState(false);

    const authenticateUser = (authState) => {
      setisAuthenticated(authState);
    }
  
    useEffect(() => {
      console.log(`Authenticated: ${isAuthenticated}`);
    }, [isAuthenticated]);
  

  return <Register authenticate={authenticateUser} />
        // <Register 
        //   onClose={onClose} 
        //   login={login}
        //   onSubmitSignUp ={onSubmitSignUp}
        //   />
}