import { useState, useEffect } from 'react'

// fetches the saved value from localstorage
function getSavedValue<type>(key: string, initialValue:type): type{
	// the value returned from getItem can be a string or null(if key is unexisting)
	const value: string | null = localStorage.getItem(key);
	// if value value is present, return it
	if (value) return JSON.parse(value)
	// otherwise return initial value given as arg
	return initialValue 
}

// sets / updates the saved localstorage value
function setSavedValue<type>(key: string, value: type): void{
	// assuming all the arguments provided are valid
	localStorage.setItem(key, JSON.stringify(value))	
}

// The main useLocalStorage hook
// Typing: takes args of key:string and initialValue:assignedType
// return value of tuple with one value of :assignedType and other of
// a function that takes an argument of :assigned type and returns void
// Essentially forcing to always use the function version of setState
export default function useLocalStorage<type>(key:string, initialValue:type):[type, (arg:(prev: type) =>type) => void] {

	// initialise it's state with savedValue OR initial value
	const [state, setState] = useState(getSavedValue(key, initialValue));
	// Updates the saved local value whenever the state is changed
	// i.e. when setState is called by the user
	useEffect(() => {
		setSavedValue(key, state)
	}, [state, key])
	// return the state and setState
	return [state, setState]

}