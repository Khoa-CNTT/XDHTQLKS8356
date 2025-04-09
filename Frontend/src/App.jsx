import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from 'react-hot-toast';

const App = () => {
    return (
        <div className='App'>
            <RouterProvider router={router} />
            <Toaster position="top-center" reverseOrder={false}/>
        </div>
    );
};

export default App;