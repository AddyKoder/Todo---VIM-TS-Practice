export default function InputField({value, onChange, onCreate}:{value:string, onChange:Function, onCreate:Function}) {

	return (
	<div className="add-todo-form">

		<input type="text" value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => {
			if (e.key === "Enter") {
				onCreate()
			}	
		}} />

		<button onClick={(e)=>onCreate()}>Add Todo</button>
	</div>	
	)
}
