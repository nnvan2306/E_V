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
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <BrowserRouter>
                <div
                    className="form-content"
                    style={{
                        position: 'absolute',
                        zIndex: '1',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
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
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

export default App;
