import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';

export const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" exact element={<HomePage />}/>
        </Routes>
    );
}