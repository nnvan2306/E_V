import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Add from './admin/add';
import Admin from './admin/admin';
import Update from './admin/update';
import Signup from './home/signup';
import HomePage from './pages/HomePage';
import MainTranslate from './components/Translate/MainTranslate';
import TextToSpeech from './Test';
import Login from './pages/Login';
import Resigter from './pages/Resigter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Permission from './Permission';
import UserSaved from './admin/UserSaved';
import { Community_done } from './community/Community_done';
import TextEditor from './community/TextEditor';
import DetailsComunity from './community/DetailsComunity';
import './App.css';
import ChatAi from './components/ChatAi/ChatAi';
import Chat from './components/ChatAi/Chat/Chat';

function App() {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isIcon, setIsIcon] = useState<boolean>(true);

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = '../public/sdk.js';
    //     script.async = true;
    //     document.body.appendChild(script);

    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);

    const handleSetOpenIcon = () => {
        setIsIcon(true);
    };

    const handleClose = () => {
        setIsActive(false);
        setIsIcon(false);
    };

    const handleToggleModal = () => {
        setIsActive(!isActive);
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <BrowserRouter>
                <div
                    className="form-content"
                    style={{ position: 'absolute', zIndex: '1', width: '100%', height: '100%' }}
                >
                    <Routes>
                        <Route path="/admin" element={<Permission element={<Admin />} />} />
                        <Route path="/auth/admin/add" element={<Add />} />
                        <Route path="/auth/admin/update/:id" element={<Update />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Resigter />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/user-saved" element={<UserSaved />} />
                        <Route path="/test" element={<TextToSpeech />} />
                        <Route path="/community" element={<Community_done />} />
                        <Route path="/community/:id" element={<DetailsComunity />} />
                        <Route path="/okok" element={<TextEditor />} />
                        <Route path="/chat-ai" element={<ChatAi />} />
                        <Route path="/chat" element={<Chat />} />
                    </Routes>
                </div>

                <PluginToggle handleClose={handleClose} handleSetOpenIcon={handleSetOpenIcon} />

                {/* <div className="" id="plugin"></div> */}
                {/* render plugin */}

                {isActive ? (
                    <div
                        style={{
                            width: '400px',
                            height: '80vh',
                            position: 'fixed',
                            bottom: '100px',
                            right: '40px',
                            zIndex: 100,
                            marginTop: '10vh',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                        }}
                    >
                        <Chat />
                    </div>
                ) : (
                    <></>
                )}

                {isIcon ? (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 6px',
                            color: '#fff',
                            position: 'fixed',
                            zIndex: 100,
                            bottom: '20px',
                            right: '40px',
                        }}
                        className="icon-plugin"
                        onClick={() => handleToggleModal()}
                    >
                        <span>Robox AI</span>
                        <img src="https://cdn-icons-png.freepik.com/512/8593/8593325.png" alt="chat icon" />
                    </div>
                ) : (
                    <></>
                )}
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

export default App;

function PluginToggle({ handleClose, handleSetOpenIcon }: { handleClose: () => void; handleSetOpenIcon: () => void }) {
    const location = useLocation().pathname;

    useEffect(() => {
        // const plugin = document.querySelector('#plugin');

        if (location === '/chat-ai' || location === '/chat') {
            handleClose();
            const input = document.querySelector('.chat_input');
            const body = document.querySelector('.body-form-chat');
            input?.classList.add('position_fixed');
            body?.classList.add('padding-x-body');
        } else {
            handleSetOpenIcon();
        }
    }, [location]);

    return <div className="" id="plugin"></div>;
}
