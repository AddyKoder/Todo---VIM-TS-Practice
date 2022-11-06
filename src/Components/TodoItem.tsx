// Taking props with defined data type
export default function TodoItem({id, statement, isDone, onChange, onDelete, onDeleteCheckedTodo }: {id:number, statement:string, isDone:boolean, onChange:Function, onDelete:Function, onDeleteCheckedTodo:Function}) {
	// returning the rendered todo Item
	return (
		<div className='todo-item'>
			{/* checkbox input item */}
			<input type="checkbox" name={`${id}`} checked={isDone} id={`${id}`} onChange={(e) =>
			// changing the state of the todo Item on click
			{
				onChange(id, e.target.checked)
			}} />	
			{/* label for showing statement */}
			<label style={{opacity: isDone? '0.5':1, textDecoration: isDone? 'line-through': ''}} htmlFor={ `${id}` }> { statement }</label>

			{/* button for deleting the Todo */}
			<button onClick={(e) => onDelete(id)}>Delete</button>
		</div>
	)
}
