export default function CreatePlaylistForm(props){
    return (
        <form onSubmit={props.submit}>
            <p>Title</p>
            <input type="text" />
            <p>Description</p>
            <textarea></textarea><br/>
            <button>Create</button>
        </form>

    )
}