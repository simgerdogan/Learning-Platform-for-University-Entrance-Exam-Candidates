
import React from 'react';
import ReactDOM from 'react-dom';
import{
    Router,
    Switch,
    Route,
    Link ,
    HashRouter
} from "react-router-dom";

import history from './history'
import WelcomePage from "./WelcomePage/WelcomePage";
import { UserProvider } from './Contexts/UserProvider'
import Deneme from "./Deneme";
import {auth} from "./firebase";
import SecureRoute from "./SecureRoute";
import ProfilePage from "./ProfilePage/ProfilePage";
import HomePage from "./HomePage/HomePage";
import NewQuestion from "./NewQuestion/NewQuestion";
import QuestionPage from "./QuestionPage/QuestionPage";
import ReachUs from "./ReachUs/ReachUs";
import Header from "./Header/Header";
import NotFound from "./NotFound";
import UsersPage from "./Users/UsersPage";
import UserProfile from "./UserProfile/UserProfile";
import AllQuestions from "./AllQuestions/AllQuestions";
import MocksPage from "./Mocks/MocksPage";
import Mock from "./Mocks/MocksPageComponents/Mock";

ReactDOM.render(


    <Router history={history}>
        <UserProvider >
            <Header/>

            <Switch>

                <SecureRoute path="/" exact component={HomePage}></SecureRoute>

                <SecureRoute path="/ask" exact component={NewQuestion}></SecureRoute>

                <Route path="/login" exact component={WelcomePage}></Route>

                <SecureRoute path="/question/:id" exact component={QuestionPage}></SecureRoute>

                <SecureRoute path="/reach" exact component={ReachUs}></SecureRoute>

                <SecureRoute path="/users" exact component={UsersPage}></SecureRoute>

                <SecureRoute path="/questions" exact component={AllQuestions}></SecureRoute>

                <SecureRoute path="/deneme" exact component={Deneme}></SecureRoute>
                <SecureRoute path="/mocks" exact component={MocksPage}></SecureRoute>

                <SecureRoute path="/mock/:id" exact component={Mock}></SecureRoute>

                <SecureRoute path="/profile" exact component={ProfilePage}></SecureRoute>
                <SecureRoute path="/user/:id" exact component={UserProfile}></SecureRoute>


                <Route path='*' exact={true} component={NotFound} />

            </Switch>
        </UserProvider>

    </Router>



    ,
    document.getElementById('root')
);

