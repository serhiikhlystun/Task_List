import { useState, useEffect } from "react";
import List from './components/List'
import { v4 as uuidv4 } from 'uuid';

function Main() {
    
    // State to create an array of tasks or take from local storage
    const [tasks, setTasks] = useState(() => {
        const storedTodos = localStorage.getItem('tasks');
        if (!storedTodos) {
            return []
        }
        else {
            return JSON.parse(storedTodos)
        }
    });

    // State for create new task title
    const [tasksTitle, setTasksTitle] = useState('');

    // Hook for save current tasks array in local storage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    // Function for adding new task
    const addTask = (e) => {
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        if (e.key === 'Enter' && e.target.value !== '') {
            setTasks([
                ...storedTodos, {
                    id: uuidv4(),
                    title: tasksTitle,
                    status: false,
                    date: fullDate
                }
            ]);
            setTasksTitle('');
        };
    };

    const date = new Date();
    const monthNames = ['January', 'February',  'March', 'April', 'May', 'June', 'Jule', 'August', 'September',
        'October', 'November', 'December'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const fullDate = month + ' ' + day + ', ' + year;

    // State for editing the task
    const setUpdate = (updatedTitle, id) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === id) {
                    task.title = updatedTitle;
                }
                return task;
            })
        );
    };

    return (
        <div className="container">
            <h1>Note your tasks</h1>
            <span>{fullDate}</span>
            <div className="input-field">
                <input type="text" value={tasksTitle}
                    onChange={event => setTasksTitle(event.target.value)}
                    onKeyDown={addTask}
                />
                <label>Task name</label>
            </div>
            <List tasks={tasks} setUpdate={setUpdate} />
        </div>
    );
}

export default Main;