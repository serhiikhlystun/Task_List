import { useState } from 'react';
import Item from './Item';

export default function List({ tasks, setUpdate }) {
       
    // State for counting unfullfilled tasks
    const [counter, setCounter] = useState(0);

    // Function for update count of unfullfilled tasks
    function updateCounter(storedTodos){
        const fullfilledTasks = storedTodos.filter((item) => {
            if (item.status) {
                return false;
            } return true;
        });
        setCounter(fullfilledTasks.length);
    };
    
    return (
        <ul>
            <span>Unfulfilled tasks remain - {counter}</span>
            {tasks.map(item => <Item
                key={item.id} {...item}
                updateCounter={updateCounter}
                setUpdate={setUpdate}
            />)}
        </ul>
    );
}