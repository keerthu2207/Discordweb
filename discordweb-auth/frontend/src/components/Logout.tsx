import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../services/authService';

const Logout: React.FC = () => {
    const history = useHistory();

    const handleLogout = async () => {
        await logout();
        history.push('/login');
    };

    return (
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;