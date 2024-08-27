import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { MdClose } from "react-icons/md";
import { Button } from 'flowbite-react';
const Card = (props) => {
    const [isChecked, setIsChecked] = useState(props.card.amountCompleted >= props.card.amountRequired); 
    const API_URL=process.env.REACT_APP_AUTH_API_URL;
    const { user } = useAuthContext();
    const [title, setTitle] = useState(props.card.title);
    const [ amountCompleted, setAmountCompleted ] = useState(props.card.amountCompleted);
    const [ amountRequired, setAmountRequired ] = useState(props.card.amountRequired);
    const handleCheckboxChange = (e) => {
        console.log(props.card.amountRequired)
        setIsChecked(!isChecked);
        if(!isChecked){
            setAmountCompleted(amountRequired);
        }else{
            setAmountCompleted(amountRequired-1);
        }
        fetch(API_URL + '/cards/' + props.card._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                amountCompleted: isChecked ? props.card.amountRequired - 1 : props.card.amountRequired
            })
        })
    }

    useEffect(() => {
        setIsChecked(amountCompleted >= amountRequired);
    }, [amountCompleted, amountRequired])

    const handleTitleChange = () => {
        setTitle(title);
        document.activeElement.blur();
        fetch(API_URL + '/cards/' + props.card._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                title: title
            })
        })
    }

    const handleAmountRequiredChange = () => {
        setAmountRequired(amountRequired);
        document.activeElement.blur();
        fetch(API_URL + '/cards/' + props.card._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                amountRequired: amountRequired
            })
        })
    }

    const handleAmountCompletedChange = () => {
        setAmountCompleted(amountCompleted);
        document.activeElement.blur();
        fetch(API_URL + '/cards/' + props.card._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                amountCompleted: amountCompleted
            })
        })
    }
    
    return(
        <div className={isChecked ? "bg-green-700 p-4 rounded-lg shadow-lg text-white w-96 " : "bg-red-500 p-4 rounded-lg shadow-lg text-white w-96"}>
            <div className="flex justify-end">
            <Button className="text-white" onClick={() => {
                                    fetch(API_URL + '/cards/' + props.card._id, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${user.token}`
                                        }
                                    })
                                    .then(() => {
                                        props.onDelete(props.card);
                                    })
                                    }
                                    }>
                                <MdClose size={20} />
                            </Button>
            </div>
            <div className="flex justify-between mx-10">
                <div className="grid grid-cols-1 text-left">
                    <form onSubmit={handleTitleChange}>
                        <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleTitleChange}
                        className="bg-transparent"
                        />
                    </form>
                    <p>{props.card.date.split('T')[0]}</p>
                </div>
                <div className="flex">
                    <div className="mt-2 mr-5">
                            
                    </div>
                    <div>
                        {amountCompleted < amountRequired && amountRequired-amountCompleted !== 1
                            ?
                            <Button className="w-8 h-8 mt-2" onClick={() => setAmountCompleted(Number(amountCompleted) + 1)}>
                            +
                            </Button>
                            :
                            <input 
                                checked={isChecked}
                                id="default-checkbox"
                                type="checkbox"
                                onChange={handleCheckboxChange}
                                value="1"
                                className="w-8 h-8 mt-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                    
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-between mx-32">
                <form onSubmit={handleAmountCompletedChange}>
                    <input 
                        type="text"
                        value={amountCompleted}
                        onChange={(e) => setAmountCompleted(e.target.value)}
                        onBlur={handleAmountCompletedChange}
                        className="bg-transparent text-center w-10"
                    />
                </form>
                <p>/</p>
                <form onSubmit={handleAmountRequiredChange}>
                    <input 
                        type="text"
                        value={amountRequired}
                        onChange={(e) => setAmountRequired(e.target.value)}
                        onBlur={handleAmountRequiredChange}
                        className="bg-transparent text-center w-10"
                    />
                </form>
            </div>
        </div>
    )
}

export default Card;