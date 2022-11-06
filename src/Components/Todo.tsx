import { ReactElement, useMemo, useState } from 'react'
import InputField from './InputField'
import TodoItem from './TodoItem'
import useLocalStorage from '../Utils/useLocalStorage'
import { typeTodoList, typeTodoItem }  from '../Utils/Interfaces'

export default function Todo() {

	const [Todos, setTodos] = useLocalStorage<typeTodoList>('todos', [])
	const [inputValue, setInputValue] = useState('')

	const todoCount = useMemo(() => {
		return Todos.length
	}, [ Todos ])
	const todoLeft = useMemo(() => {
		return Todos.filter((item: typeTodoItem):boolean => !item.isDone).length
	}, [Todos])
	
	function addTodo():void {
		// Creating a new todo item using the defined type and given statement
		const Todo: typeTodoItem = {
			id: new Date().getTime(),
			statement:inputValue,
			isDone:false
		}
		if(inputValue){
		// Setting the todoItem to useLocalStorage
		// setState taking a function (prevState:type):type
		setTodos((prev: typeTodoList):typeTodoList => {
			// copying the previous state
			const todoCopy = [...prev];
			// adding todo item backwards instead
			todoCopy.unshift(Todo);
			// returning modified todo Items
			return todoCopy
		})
		//defaulting the input value to ''
			setInputValue('')
		}
	}
	
	function toggleTodo(id: number, state: boolean):void {
		setTodos((prev: typeTodoList): typeTodoList => {
			// mapping over the array, if item is current return the modified
			// version toggling the state else return without modifying
			const filteredPrevCopy = prev.map((item: typeTodoItem) => {
				if (item.id === id) {
					return {...item, isDone:state}
				}
				return item
			})
		// mergin filtered array with changed required todo item	
		return filteredPrevCopy	
		})
	}

	function deleteTodo(id: number):void {
		setTodos((prev: typeTodoList): typeTodoList => {
			return prev.filter((item: typeTodoItem): boolean => {
				return item.id !== id
			})
		})
	}

	function deleteCheckedTodo(): void{
		setTodos((prev: typeTodoList): typeTodoList => {
			return prev.filter((item: typeTodoItem): boolean => {
				return item.isDone === false
			})
		})
	}

	function rearrangeTodos(): void{
		setTodos((prev: typeTodoList): typeTodoList => {
			return [
				...prev.filter((item:typeTodoItem) => item.isDone === false),
				...prev.filter((item:typeTodoItem) => item.isDone !== false)
			]
		})
	}

	return (
		<main>

			<h1>Todo App</h1>

			<InputField value={inputValue} onChange={setInputValue} onCreate={addTodo} />

			<div className="todo-header">
				<div className="todo-counter">
					{todoLeft} Left of {todoCount} Todos
				</div>
				<div className="actions">
					<button onClick={deleteCheckedTodo}>Delete Checked</button>
					<button onClick={rearrangeTodos}>Rearrange</button>
				</div>
			</div>

			<div className="Todos">
				{
					Todos.map((todo: typeTodoItem):ReactElement => {
						return <TodoItem key={todo.id} id={todo.id} statement={todo.statement} isDone={todo.isDone} onChange={toggleTodo} onDelete={deleteTodo} onDeleteCheckedTodo={deleteCheckedTodo} />
					})
				}
			</div>

		</main>
	)
}
