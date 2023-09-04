import React, { Component } from "react"
import { Amplify, Auth, Hub } from "aws-amplify"
import { Formik, Form, Field, ErrorMessage } from "formik"

export class AuthWidget extends Component {
    constructor(props) {
        super(props)

        Amplify.configure({
            Auth: {
                region: this.props.region,
                userPoolId: this.props.userPoolId,
                userPoolWebClientId: this.props.userPoolWebClientId,
                mandatorySignIn: true
            }
        })

        this.state = {
            isSignedIn: false,
            state: "home",
            username: "",
            email: "",
            errorMessage: undefined
        }

        Hub.listen("auth", ({ payload }) => {
            const { event } = payload
            if (event === "autoSignIn") {
                console.log("auto signed in", payload.data)
                this.state.username = payload.data.username
                this.state.email = payload.data.attributes.email
                this.state.isSignedIn = true
                this.state.state = "signedIn"
                this.setState(this.state)

                if (this.props.signInCallback !== undefined) {
                    this.props.signInCallback(this.state.username)
                }
            } else if (event === "autoSignIn_failure") {
                alert("Auto Sign in Failure")
            } else if (event === "signIn") {
                console.log("signed in", payload.data)
                this.state.username = payload.data.username
                this.state.email = payload.data.attributes.email
                this.state.isSignedIn = true
                this.state.state = "signedIn"
                this.setState(this.state)

                if (this.props.signInCallback !== undefined) {
                    this.props.signInCallback(this.state.username)
                }
            } else if (event === "signOut") {
                console.log("signed out", payload.data)
                this.state.username = ""
                this.state.email = ""
                this.state.isSignedIn = false
                this.state.state = "home"
                this.setState(this.state)

                if (this.props.signOutCallback !== undefined) {
                    this.props.signOutCallback()
                }
            }
        })

        Auth.currentAuthenticatedUser().then((data) => {
            console.log("Auto Sign In", data)
            this.state.username = data.username
            this.state.email = data.attributes.email
            this.state.isSignedIn = true
            this.state.state = "signedIn"
            this.setState(this.state)

            if (this.props.signInCallback !== undefined) {
                this.props.signInCallback(this.state.username)
            }
        }).catch(() => {
            this.state.isSignedIn = false
            this.state.state = "home"
            this.setState(this.state)
        })
    }

    async signUp(email, password) {
        try {
            const { user } = await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    email: email,
                },
                autoSignIn: {
                    enabled: true,
                }
            })

            this.state.state = "confirm"
            this.state.username = user.username
            this.setState(this.state)
        } catch (error) {
            console.log("error signing up:", error)
        }
    }

    async resendConfirmationCode() {
        try {
            await Auth.resendSignUp(this.state.username)
            console.log("code resent successfully")
        } catch (err) {
            console.log("error resending code: ", err)
        }
    }

    async confirmSignUp(code) {
        try {
            await Auth.confirmSignUp(this.state.username, code)
        } catch (error) {
            console.log("error confirming sign up", error)
        }
    }

    async signIn(username, password) {
        try {
            const user = await Auth.signIn(username, password)
            this.state.username = user.username
            this.state.isSignedIn = true
            this.state.errorMessage = undefined
            this.setState(this.state)
        } catch (error) {
            console.log("error signing in", error.message)
            this.state.errorMessage = error.message
            this.setState(this.state)
        }
    }

    async signOut() {
        try {
            await Auth.signOut()
        } catch (error) {
            console.log("error signing out: ", error)
        }
    }

    onSignInClicked() {
        this.state.state = "signIn"
        this.setState(this.state)
    }

    onSignUpClicked() {
        this.state.state = "signUp"
        this.setState(this.state)
    }

    onForgotPasswordClicked() {
        this.state.state = "forgotPassword"
        this.setState(this.state)
    }

    sendForForgotPasswordCode(username) {
        Auth.forgotPassword(username)
            .then((data) => {
                console.log("sent forgot pass code", data)
                this.state.username = username
                this.state.state = "submitForgotPasswordCode"
                this.setState(this.state)
            }).catch((err) => console.log(err))
    }

    sendForgotPasswordCode(verificationCode, newPassword) {
        Auth.forgotPasswordSubmit(this.state.username, verificationCode, newPassword)
            .then((data) => {
                console.log("New password", data)
                if (data === "SUCCESS") {
                    this.state.state = "signIn"
                    this.setState(this.state)
                }
            }).catch((err) => console.log(err))
    }

    async onSignOutClicked() {
        await this.signOut()
    }

    getErrorMessageWidget() {
        if (this.state.errorMessage === undefined) {
            return null
        }

        return (
            <div>
                {this.state.errorMessage}
            </div>
        )
    }

    getConfirmWidget() {
        return (
            <div style={this.props.style}>
                <h1>
                    Confirm Email
                </h1>
                <Formik
                    initialValues={{ verificationCode: "" }}
                    validate={(values) => {
                        const errors = {}
                        if (values.verificationCode.length === 0) {
                            errors.verificationCode = "Required"
                        }

                        return errors
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(async() => {
                            await this.confirmSignUp(values.verificationCode)
                            setSubmitting(false)
                        }, 1)
                    }}
                >
                    {({ isSubmitting }) =>
                        <div>
                            <Form>
                                <label htmlFor="verificationCode">Code: </label>
                                <Field name="verificationCode" />
                                <ErrorMessage name="verificationCode" component="div" />
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </Form>
                            <button onClick={() => this.resendConfirmationCode()}>Resend Confirmation Code</button>
                        </div>
                    }
                </Formik>
            </div>
        )
    }

    getSignUpWidget() {
        return (
            <div style={this.props.style}>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validate={(values) => {
                        const errors = {}
                        if (!values.email) {
                            errors.email = "Required"
                        } else if (
                            !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(values.email)
                        ) {
                            errors.email = "Invalid email address"
                        }
                        if (!values.password) {
                            errors.password = "Required"
                        } else if (values.password.length < 8) {
                            errors.password = "Password needs to be at least 8 charactesr"
                        }
                        return errors
                    }}
                    onSubmit={async(values, { setSubmitting }) => {
                        await this.signUp(values.email, values.password)
                        setSubmitting(false)
                    }}
                >
                    {({ isSubmitting }) =>
                        <Form>
                            <label htmlFor="email">Email: </label>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                            <label htmlFor="password">Password: </label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    }
                </Formik>
                <button onClick={() => this.onSignInClicked()}>Already have an Account?</button>
            </div>
        )
    }

    getHomeWidget() {
        return (
            <div style={this.props.style}>
                <button onClick={() => this.onSignInClicked()}>Sign In</button>
                <button onClick={() => this.onSignUpClicked()}>Create Account</button>
            </div>
        )
    }

    getSignInWidget() {
        return (
            <div style={this.props.style}>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validate={(values) => {
                        const errors = {}
                        if (!values.email) {
                            errors.email = "Required"
                        } else if (
                            !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(values.email)
                        ) {
                            errors.email = "Invalid email address"
                        }
                        return errors
                    }}
                    onSubmit={async(values, { setSubmitting }) => {
                        await this.signIn(values.email, values.password)
                        setSubmitting(false)
                    }}
                >
                    {({ isSubmitting }) =>
                        <div>
                            <Form>
                                <label htmlFor="email">Email: </label>
                                <Field type="email" name="email" />
                                <ErrorMessage name="email" component="div" />
                                <label htmlFor="password">Password: </label>
                                <Field type="password" name="password" />
                                <ErrorMessage name="password" component="div" />
                                <button type="submit" disabled={isSubmitting}>
                                    Sign In
                                </button>
                            </Form>
                            <button onClick={() => this.onForgotPasswordClicked()}>Forgot Password?</button>
                        </div>
                    }
                </Formik>
                {this.getErrorMessageWidget()}
            </div>
        )
    }

    getForgotPasswordWidget() {
        return (
            <div style={this.props.style}>
                <Formik
                    initialValues={{ email: "" }}
                    validate={(values) => {
                        const errors = {}
                        if (!values.email) {
                            errors.email = "Required"
                        } else if (
                            !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(values.email)
                        ) {
                            errors.email = "Invalid email address"
                        }
                        return errors
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        this.sendForForgotPasswordCode(values.email)
                        setSubmitting(false)
                    }}
                >
                    {({ isSubmitting }) =>
                        <Form>
                            <label htmlFor="email">Email: </label>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    }
                </Formik>
            </div>
        )
    }

    getSubmitForgotPasswordCodeWidget() {
        return (
            <div style={this.props.style}>
                <div>
                    <h1>
                        Confirm Code
                    </h1>
                    <Formik
                        initialValues={{ verificationCode: "" }}
                        validate={(values) => {
                            const errors = {}
                            if (values.verificationCode.length === 0) {
                                errors.verificationCode = "Required"
                            }
                            if (!values.password) {
                                errors.password = "Required"
                            } else if (values.password.length < 8) {
                                errors.password = "Password needs to be at least 8 charactesr"
                            }

                            return errors
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            this.sendForgotPasswordCode(values.verificationCode, values.password)
                            setSubmitting(false)
                        }}
                    >
                        {({ isSubmitting }) =>
                            <div>
                                <Form>
                                    <label htmlFor="verificationCode">Code: </label>
                                    <Field name="verificationCode" />
                                    <ErrorMessage name="verificationCode" component="div" />
                                    <label htmlFor="password">New Password: </label>
                                    <Field type="password" name="password" />
                                    <ErrorMessage name="password" component="div" />
                                    <button type="submit" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </Form>
                            </div>
                        }
                    </Formik>
                </div>
            </div>
        )
    }

    getSignOutWidget() {
        return (
            <div style={this.props.style}>
                {this.state.email}
                <button onClick={() => this.onSignOutClicked()}>SignOut</button>
            </div>
        )
    }

    render() {
        if (!this.state.isSignedIn) {
            switch (this.state.state) {
            case "confirm":
                return this.getConfirmWidget()
            case "signUp":
                return this.getSignUpWidget()
            case "home":
                return this.getHomeWidget()
            case "signIn":
                return this.getSignInWidget()
            case "forgotPassword":
                return this.getForgotPasswordWidget()
            case "submitForgotPasswordCode":
                return this.getSubmitForgotPasswordCodeWidget()
            }
        } else {
            return this.getSignOutWidget()
        }

        return <h1>Error</h1>
    }
}
