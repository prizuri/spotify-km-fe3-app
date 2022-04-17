// import { useState } from "react"

// export default function SelectButton(props){
//     const [isSelect, setIsSelect]=useState({})
//     props.tracks.map(track=>{
//         return(
//             {!isSelect[track.uri] ?
//                 <button onClick={() => {
//                     setIsSelect({ ...isSelect, [track.uri]:true })
//                     console.log("isSelect", isSelect)
//                 }}>Select</button>
//                 : <button onClick={() => {
//                     setIsSelect({...isSelect, [track.uri]:false})
//                 }}>Deselect</button>
//             }
//         )
        
//     })
// }