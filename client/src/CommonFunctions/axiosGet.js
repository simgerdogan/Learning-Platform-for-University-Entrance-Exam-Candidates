import axios from "axios"

export function axiosGet(endPoint) {

    return new Promise((resolve, reject) => {

        axios.get(`http://localhost:160/${endPoint}`,{withCredentials:true}).then(res => {


            resolve(res.data)
        })
    })



}
