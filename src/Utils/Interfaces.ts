export interface typeTodoItem{
	id: number, // initialised by new Date().getTime()
	statement: string, // the statement OR context of the TODO
	isDone: boolean, // whether the todo is completed or pending
}

export type typeTodoList =  Array<typeTodoItem>

export interface typeTodoData{
	inputContent: string,
	length: number,
	Items: typeTodoList;
}
