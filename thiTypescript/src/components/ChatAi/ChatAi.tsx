import { useEffect } from 'react';
import Header from '../Header/Header';
import Chat from './Chat/Chat';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const ChatAi = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || _.isEmpty(user)) {
            alert('Vui lòng đăng nhập để dùng tính năng này ');
            navigate('/login');
            return;
        }
    }, []);

    return (
        <>
            <Header />
            <div className="chat-wp-render">
                <Chat />
            </div>
        </>
    );
};

export default ChatAi;
