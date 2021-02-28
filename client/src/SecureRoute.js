import React ,{useContext}from "react"
import { Route, Redirect } from "react-router-dom"
import { UserContext } from "./Contexts/UserProvider"

export default function PrivateRoute({ component: Component, ...rest }) {

    const user = useContext(UserContext)
    return (
        <Route
            {...rest}
            render={props => {
                return user.user ? <Component {...props} /> : <Redirect to="/login" />
            }}
        ></Route>
    )
}
