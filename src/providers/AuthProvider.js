import React, { useState } from 'react';
import { authMethods } from '../authmethods'

export const firebaseAuth = React.createContext()

const AuthProvider = (props) => {

    const [inputs, setInputs] = useState({email: '', password: ''})
    const [errors, setErrors] = useState([])
    const [token, setToken] = useState(null)

    const handleSignIn = () => {
        authMethods.signin(inputs.email, inputs.password, setErrors, setToken)
        console.log(errors, token);
    }
    return (
        <firebaseAuth.Provider
        value={{
            handleSignIn,
            token,
            inputs,
            setInputs,
            errors,
        }}>
        {props.children}

        </firebaseAuth.Provider>
    )
};

export default AuthProvider;