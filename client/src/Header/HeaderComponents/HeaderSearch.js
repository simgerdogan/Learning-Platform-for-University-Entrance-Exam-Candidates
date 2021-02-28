import React ,{useState} from "react"
import axios from "axios"
import HeaderSearchResults from "./HeaderSearchResults/HeaderSearchResults";

function search(setSearchResults,setSearchInput) {
    //get the typed input
    const searchInput  =document.getElementById("searchValue").value
    //update searchInput state
    setSearchInput(searchInput)
    //if searchInput is not empty | user typed something
    if(searchInput != "")
    {

        //make request to server to get search results
        axios.get(`http://localhost:161/searchQuestion/${searchInput}`).then(res => {

            //if any data is found set results with the data of respond
            if(res.data.length > 0)
            {
                setSearchResults(res.data)

            }
            //if no data is found set results an empty array
            else
            {
                setSearchResults([])

            }
        })
    }
    //searchInput is empty | user not typed or deleted all input
    else
    {
        setSearchResults([])

    }

}

function HeaderSearch(props)
{
    const [searchInput,setSearchInput] = useState("");
    const [searchResults,setSearchResults]= useState([])
    const [isLoading,setIsLoading] = useState(false)
    const inputPlaceHolder = "Soru Ara";
    console.log("search resılt>= " + searchResults.length)

    return(
        <div
        id={"headerSearchDiv"}
        >

            <input
          //  onInput={e => setSearchInput(e.target.value)}
            onInput={()=>{search(setSearchResults,setSearchInput)}}
            placeholder={inputPlaceHolder}
            id = {"searchValue"}
            autoComplete={"off"}
            />
            <img
                src={"../visuals/icons/headerIcons/search.png"}
            />

            {
                (searchInput !="") &&
                <HeaderSearchResults
                    results = {searchResults}
                    inputs = {searchInput}
                    setSearchInput = {setSearchInput}
                />

            }


        </div>
    )
}

export default HeaderSearch
