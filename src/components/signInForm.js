import React, { useContext } from "react";
import { firebaseAuth } from '../providers/AuthProvider'

const SignIn = () => {

    const {handleSignIn, inputs, setInputs, errors} = useContext(firebaseAuth)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('handleSubmit')
        handleSignIn()
      }
      const handleChange = e => {
        const {name, value} = e.target;
        console.log(inputs)
        setInputs(prev => ({...prev, [name]: value}))
      }

      return (
        <form onSubmit={handleSubmit}>
          Signin
          <input onChange={handleChange} name="email" placeholder='email' value={inputs.email} />
          <input onChange={handleChange} name="password" placeholder='password' value={inputs.password} />
          <button>Sign In</button>
          {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
        </form>
      );
    };
export default SignIn;