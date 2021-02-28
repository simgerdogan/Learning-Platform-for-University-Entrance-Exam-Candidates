import React,{useState} from "react"

function MockNavigation(props) {

    const [selectedNav,setSelectedNav] = useState(0)
    return <div
    id={"mockNavigation"}
    >
        <p
            className={`mockNav ${selectedNav == 0 ? "selectedNav":"notSelectedNav"}`}
        onClick={()=>{setSelectedNav(0); props.subjectChanged("Türkçe")}}
        >Türkçe</p>
        <p
            className={`mockNav ${selectedNav == 1 ? "selectedNav":"notSelectedNav"}`}
            onClick={()=>{setSelectedNav(1); props.subjectChanged("Sosyal Bilimler")}}
        >Sosyal Bilimler</p>
        <p             className={`mockNav ${selectedNav == 2 ? "selectedNav":"notSelectedNav"}`}
                       onClick={()=>{setSelectedNav(2); props.subjectChanged("Temel Matematik")}}
        >Temel Matematik</p>
        <p          className={`mockNav ${selectedNav == 3 ? "selectedNav":"notSelectedNav"}`}
                    onClick={()=>{setSelectedNav(3); props.subjectChanged("Fen Bilimleri")}}
        >Fen Bilimleri</p>
    </div>
}
export default MockNavigation
