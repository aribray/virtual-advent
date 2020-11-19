/*
 * This is a version of Facebook's React Conditional Rendering
 * example modified to support firebase authentication.
 * https://facebook.github.io/react/docs/conditional-rendering.html
 */

import React, { Component, PropTypes } from 'react';
import firebase from "firebase/app";
import auth from "../firebase";

function GuestGreeting(props) {
	return <span>You are not signed in.</span>;
}

function Greeting(props) {
	if (props.auth) {
		return (
			<div className='user-meta'>
				<h2>Welcome, Family!</h2>
			</div>
		)
	}
	return <GuestGreeting />;
}

function SignInButton(props) {
	return (
		<button onClick={props.onClick}>
			Sign in
		</button>
	);
}

function SignOutButton(props) {
	return (
		<button onClick={props.onClick}>
			Sign out
		</button>
	);
}

class AuthControl extends Component {
	constructor(props) {
		super(props);
		this.handleSignInClick = this.handleSignInClick.bind(this);
		this.handleSignOutClick = this.handleSignOutClick.bind(this);
		this.state = {auth: false};
	}

	handleSignInClick() {
		auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
	}

	handleSignOutClick() {
		const auth = auth();
		auth.signOut();
	}

	componentDidMount() { // check to see if already signed in.
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({auth: user});
			} else {
				this.setState({auth: false});
			}
		});
	}

	render() {
		const auth = this.state.auth;

		let button = null;
		if (auth) {
			button = <SignOutButton onClick={this.handleSignOutClick} />;
		} else {
			button = <SignInButton onClick={this.handleSignInClick} />;
		}

		return (
			<div className='auth'>
				<Greeting auth={auth} />
				{button}
			</div>
		);
	}
}

export default AuthControl;