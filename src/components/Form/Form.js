export default function Form(props) {
    return (
        <form onSubmit={props.searchTrack}>
            <input type="text" onChange={props.setSearchKey} />
            <button type="submit">Search</button>
        </form>
    )
}
