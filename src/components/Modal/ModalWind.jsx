import './ModalWind.css';

function ModalWind({ call, onDestroy, removeElement }) {
    
    if (!call) return null;
    
    // Function to close the modal window
    const closeWind = (event) => {
        if (event.target.className === 'modal-wind')
            onDestroy();
    };

    return (
        <div onClick={closeWind} className='modal-wind'>
            <div className='modal-content'>
                <i onClick={onDestroy} className='close'>X</i>
                <h3>Видалити запис?</h3>
                <div className="btns">
                    <button onClick={removeElement} className='accept'>Так, видалити</button>
                    <button onClick={onDestroy} className='reject'>Ні, залишити</button>
                </div>
            </div>
        </div>
    );
};

export default ModalWind;