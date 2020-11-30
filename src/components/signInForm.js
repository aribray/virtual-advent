import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from './Firebase'
import * as ROUTES from '../constants/routes';
import { compose } from 'recompose';
import "./signIn.css"

const signInPage = () => (
  <div>
      <h2>Sign In</h2>
      <SignInForm />
    </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  };


    // const {handleSignIn, inputs, setInputs, errors} = useContext(firebaseAuth)

  handleSubmit = (event) => {
    const { email, password } = this.state;

    console.log(this.props)

    event.preventDefault();

    this.props.firebase
      .signin(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.CALENDAR);
      })
      .catch(error => {
        this.setState({ error });
      });

  };

  handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.handleSubmit} className="signIn-Form">
      <input
        name="email"
        value={email}
        onChange={this.handleChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={this.handleChange}
        type="text"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
    );
  }
};

const SignInForm = compose(
  withRouter,
  withFirebase,)(SignInFormBase);

export default signInPage;

export { SignInForm }



{/* <form className="form ng-pristine ng-valid" onSubmit={handleSubmit}>
          <div className="form-group row">
            <div className="form-group row was-validated">
                <label className="col col-form-label form-control-label">Email</label>
                  <div className="col-lg-10">
                    <input className="form-control" type="text" required=" " id="email" name="email" onChange={handleChange} value={inputs.email} />
                    <div className="invalid-feedback">
                      Email is required.
                    </div>
                  </div>
            </div>
              <label className="col col-form-label form-control-label">Password</label>
                <div className="col-lg-10">
                    <input className="form-control" type="text" required="" id="password" name="password" onChange={handleChange} value={inputs.password}/>
                    <div className="invalid-feedback">
                      Password is required.
                    </div>
                </div>
          <div className="form-group row">
            <label className="col col-form-label form-control-label"></label>
            <div className="col-lg-10">
              <input type="submit" className="btn btn-primary mr-2" value="Submit" />
            </div>
          </div>
          </div>
          {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
        </form> */}