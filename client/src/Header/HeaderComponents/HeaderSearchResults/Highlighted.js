import React from "react"

const Highlighted = ({text = '', highlight = ""}) => {
    if (!highlight.trim()) {
        return <span>{text}</span>
    }
    else
    {
        const inputs = highlight.split(" ")

        let regexString = "";

        inputs.map(currentInput => {
            if(currentInput!= "")
            {
                if(regexString != "")
                {
                    regexString = regexString +"|"+ `${(currentInput)}`

                }
                else
                {
                    regexString = `${(currentInput)}`

                }

            }

        })
        const regex = new RegExp(`(${regexString})`, 'gi')

        const parts = text.split(regex)

        return (
            <span>
         {parts.map((part, i) => (
             regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
         ))}
             </span>
        )
    }

}
export default Highlighted
