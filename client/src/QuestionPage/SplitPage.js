import React from "react"
function SplitPage(props)
 {
     return (
         <div className={"SplitPage"}>


             <div className={"SplitPage-Center"}>
                 {props.center}

             </div>

             {
                 props.showRight && <div className={"SplitPage-Right"}>
                     {props.right}
                 </div>
             }

         </div>
         )
 }

 export default SplitPage
