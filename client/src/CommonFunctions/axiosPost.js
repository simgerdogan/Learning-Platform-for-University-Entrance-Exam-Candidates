import axios from "axios"

export function axiosPost(endpoint,data) {

    return new Promise((resolve, reject) => {

        axios.post(`http://localhost:160/${endpoint}` ,{data},{withCredentials:true}).then(res => {

            //TODO in here we need to check if requeset is succeeded
            resolve(res.data ? res.data : "done")
        })
    })



}
