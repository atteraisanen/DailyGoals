import React from 'react';
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { useLogin } from '../hooks/useLogin';

const OAuth = () => {
    const { login } = useLogin();
    const handleGoogleClick = async () => {
        await login();
    }
    return (
        <div className="">
            <Button type="button" outline onClick={handleGoogleClick} className="ml-2 mt-2 text-white bg-gradient-to-br from-pink-600 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-5 py-2.5 text-center me-2 mb-2">
                <AiFillGoogleCircle className="w-6 h-6 mr-2 mt-1" />
                <div className="mt-1">
                    Sign in with google
                </div>
            </Button>
        </div>
    );
}
export default OAuth;