import React,{Component} from "react"
import "./MocksPageStyle.css"
import Exam from "./MocksPageComponents/Exam";

class MocksPage extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div
                id={"mocksPageDiv"}
            >
                <Exam
                    title={"Deneme 1"}
                    id = {"1"}
                />
                <Exam
                    title={"Deneme 2"}
                    id = {"2"}
                />

            </div>
        )
    }

}
export default MocksPage
