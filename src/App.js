import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useTelegram } from './hooks';
import { router } from './config';


const App = () => {
    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
