import { Button } from 'flowbite-react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from "../hooks/useAuthContext"
import { useCardsContext } from "../hooks/useCardsContext"
import { useEffect } from 'react';
import Card from './Card';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { useState } from 'react';
import { GoPlusCircle } from "react-icons/go";
const Home = () => {
    const API_URL=process.env.REACT_APP_AUTH_API_URL;
    const {cards, dispatch} = useCardsContext()
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [ selectedDate, setSelectedDate] = useState(Date());
    const handleLogout = async() => {
        await logout();
    }

    const getParsedDate = (date) => {
        const newDate = new Date(date);
        const day = String(newDate.getDate()).padStart(2, '0');
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const year = newDate.getFullYear();
        
        return `${day}.${month}.${year}`;
    }

    const changeDateDays = (changeAmount) => {
        const result = new Date(selectedDate);
        result.setDate(result.getDate() + changeAmount);
        console.log(result);
        setSelectedDate(result);
    }

    const onCardDelete = (id) => {
        dispatch({type: 'DELETE_CARD', payload: id})
        
        console.log("Deleting card with id: " + id)
    }

    useEffect(() => {
        const fetchCardsByDate = async (date) => {
            console.log("Fetching cards by date")
          const response = await fetch(API_URL + `/cards/date/${date}`, {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
          const json = await response.json()
    
          if (response.ok) {
            dispatch({type: 'SET_CARDS', payload: json})
          }else if(response.status === 401){
            console.log("Unauthorized")
            await handleLogout();
          }

        }
    
        if (user) {
          fetchCardsByDate(selectedDate)
        }
      }, [dispatch, user, selectedDate])
    
    const createCard = async () => {
        const response = await fetch(API_URL + '/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                title: "New card",
                date: selectedDate,
                amountRequired: 1
            })
        })
        const json = await response.json()
        if (response.ok) {
            console.log("Card created")
            dispatch({type: 'CREATE_CARD', payload: json})
        }else {
            console.log("Error creating card" + json)
        }
    }
    return (
        <div className="">
            <div className="flex w-screen text-white mt-4">
                <div className="flex-1 flex justify-center mr-auto">
                    <h1>Logged in as {user?.name}</h1>
                </div>
                <div className="mx-12 flex">
                    <SlArrowLeft
                    className="text-white mt-1 mr-2 cursor-pointer"
                    onClick={() => changeDateDays(-1)} 
                    />
                    <h1>{getParsedDate(selectedDate)} </h1>
                    <SlArrowRight
                    className="text-white mt-1 ml-2 cursor-pointer"
                    onClick={() => changeDateDays(1)} 
                    />
                </div>
                <div className="flex-1 flex justify-center ml-auto">
                <Button type="button" outline onClick={handleLogout} className="text-white bg-gradient-to-br from-pink-600 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg py-2.5 text-center w-20">
                    Log out
                </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-5 p-4 justify-items-center">
                {cards?.map((card) => (
                    console.log(card.amountRequired),
                    <Card key={card._id} card={card} onDelete={onCardDelete} />
                ))}
            </div>
            <div className="flex justify-center">
                <Button onClick={createCard}>
                    <GoPlusCircle size={42} className="text-white" />
                </Button>
            </div>
        </div>
    );
}


export default Home;