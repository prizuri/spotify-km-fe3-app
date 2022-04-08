export default function Giphy(props) {
    return (
        <>
            <img width="25%" src={props.url} alt="" />
            <h2>{props.name}</h2>
            <h2>{props.album}</h2>
        </>
    )
}