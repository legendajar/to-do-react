import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ToDoList() {
    const [toDos, setToDos] = useState([{ task: "Sample-task", id: uuidv4(), isDone: false }]);
    const [newToDo, setNewToDo] = useState('');

    const addNewTask = () => {
        if (newToDo === '') {
            alert("Please enter a task");
        } else if (newToDo.length < 3) {
            alert("Add a bit lengthy task above 3 character.");
        } else {
            setToDos((prevToDos) => [...prevToDos, { task: newToDo, id: uuidv4() }]);
            setNewToDo('');
        }
    };

    const updateToDoValue = (event) => {
        setNewToDo(event.target.value);
    };

    const removeToDo = (id) => {
        setToDos((prevToDos) => prevToDos.filter((todo) => todo.id !== id));
    };

    const markSingleDone = (id) => {
        setToDos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isDone: true }; // Example: adding a 'done' property
                }
                return todo;
            });
        });
    };

    const markSingleNotDone = (id) => {
        setToDos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isDone: false }; // Example: adding a 'done' property
                }
                return todo;
            });
        });
    }

    const markAll = () => {
        setToDos((prevTodos) =>
            prevTodos.map((todo) => ({ ...todo, isDone: true }))
        );
    };

    const revertAll = () => {
        setToDos((prevTodos) =>
            prevTodos.map((todo) => ({ ...todo, isDone: false }))
        );
    };

    return (
        <div>
            <h2>To Do List</h2>
            <input
                type="text"
                value={newToDo}
                onChange={updateToDoValue}
                placeholder="Add a Task..."
            />
            &nbsp;
            <button onClick={addNewTask}>Add Task</button>
            <br />
            <br />
            <br />
            <hr />
            <h4>Tasks</h4>
            <ul>
                {toDos.map((todo) => (
                    <li key={todo.id}>
                        <span style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>{todo.task}</span>&nbsp;&nbsp;
                        <button onClick={() => removeToDo(todo.id)}>Remove Task</button>&nbsp;&nbsp;
                        <button onClick={() => markSingleDone(todo.id)}>Mark Done</button>&nbsp;&nbsp;
                        <button onClick={() => markSingleNotDone(todo.id)}>Mark Not Done</button>
                        <br />
                    </li>
                ))}
            </ul>
            <br />
            <br />
            <button onClick={markAll}>Mark All Done</button>&nbsp; &nbsp;
            <button onClick={revertAll}>Revert All</button>&nbsp; &nbsp;
        </div>
    );
}
