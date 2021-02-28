import React,{Component} from "react"
import UsersPageSearch from "./UsersComponent/UsersPageSearch";
import UsersPageResults from "./UsersComponent/UsersPageResults";
import {axiosGet} from "../CommonFunctions/axiosGet";
import UsersPageUser from "./UsersComponent/UsersPageUser";
import "./UsersPage.css"
class UsersPage extends Component
{

    constructor(props) {
        super(props);

        this.state = {
            usersResults :[],
            searchName : null
        }

        this.searchUsers = this.searchUsers.bind(this)
    }

    async searchUsers(searchName)
    {
      const users = await axiosGet(searchName ? `searchUsers/${searchName}` : `searchUsers`)

      const usersResults  = []
        users.map(user => (
            usersResults.push(
               <UsersPageUser
                user = {user}
               />
                )
        ))


        this.setState({

          usersResults : usersResults
      })

    }
    componentWillMount() {
        this.searchUsers(null)

    }

    render() {
        return(
            <div
            id={"usersPageDiv"}
            >
                <UsersPageSearch
                    searchUsers = {this.searchUsers}
                />
                <UsersPageResults

                >{this.state.usersResults}
                </UsersPageResults>
            </div>
        )
    }
}

export default UsersPage
