export default function CreatePlaylistForm(props){
    return (
        <form onSubmit={props.submit}>
            <p>Title</p>
            <input type="text" name="title" onChange={props.onChange} minLength={10} required/>
            <p>Description</p>
            <input name="description" onChange={props.onChange}/><br/>
            <button>Create</button>
        </form>

    )
}