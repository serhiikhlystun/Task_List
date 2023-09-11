import { useState, useEffect, useRef } from "react";
import ModalWind from './Modal/ModalWind.jsx';


export default function Item({
    title, id, status, date, updateCounter, setUpdate
}) {

    // State for check the status of the task
    const [checked, setChecked] = useState(status);
    const classes = ['todo'];

    // Adding style to css
    if (checked) {
        classes.push('status');
    }

    // Function for change status tasks
    const updateStatus = () => {
        setChecked(!checked);
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        storedTodos.map((el) => {
            if (el.id === id) {
                el.status = !checked;
            }
            return true;
        });
        localStorage.setItem('tasks', JSON.stringify(storedTodos));
    }

    // State for hide deleted tasks
    const [visible, setVisible] = useState(true);

    // Function for remove task
    const removeElement = () => {
        setVisible(false);
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        let removeTodos = storedTodos.filter(item => {
            if (item.id !== id) {
                return true
            };
            return false
        });
        setModalState(false)
        localStorage.setItem('tasks', JSON.stringify(removeTodos));
    };

    // Hook for update display count of unfullfilled tasks
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('tasks')); 
        updateCounter(storedTodos)
    }, [checked, visible]);
    
   // State for hide/display task editing field
    const [edit, setEdit] = useState(false);

   // Function for display task editing field
    const handleEdit = () => {
        setEdit(true);
    };

    // Styles for hide/display edit field
    let viewMode = {};
    let editMode = {};
    if (edit) {
        viewMode.display = 'none';
    } else {
        editMode.display = 'none';
    };

    // Hook to access the editing field
    const editInputRef = useRef(null);

    // Function to update the edited task
    const handleUpdateDone = (event) => {
        if (event.key === 'Enter') {
            setUpdate(editInputRef.current.value, id);
            setEdit(false);
        }
    };

    // State for hide/display the modal window
    const [modalState, setModalState] = useState(false);

    return (
        <>
            {visible && (
            <li className={classes.join(' ')}>
                <label style={viewMode}>
                    <input type="checkbox"
                        checked={checked}
                        onChange={updateStatus}/>
                        <span>{title}</span>        
                        <p>{date}</p>
                </label>
                    <input
                        type="text"
                        className="input-field"
                        ref={editInputRef}
                        defaultValue={title}
                        style={editMode}
                        onKeyDown={handleUpdateDone}
                        />
                    <i className="material-icons red-text"
                    onClick={handleEdit}>Edit</i>
                <i className="material-icons red-text"
                    onClick={() => setModalState(true)}>Del</i>
            </li>    
            )} 
            <ModalWind call={modalState} onDestroy={()=> setModalState(false)} removeElement={removeElement} />
        </>
    );
}