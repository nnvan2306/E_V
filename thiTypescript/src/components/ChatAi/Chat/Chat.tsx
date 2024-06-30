import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AudioOutlined, SendOutlined } from '@ant-design/icons';
import './Chat.css';
import { InputTypingEffect } from '../../InputTypingEffect/InputTypingEffect';
import ChatItem from '../../ChatItems/ChatItems';
import { IResponse } from '../../../interface';
import { handleGetAnswerAi } from '../../../api/chatAiService';
import Welcome, { TopChatHeading } from '../../Welcome/Welcome';
import { useLocation } from 'react-router-dom';
import { Button, Popover } from 'antd';

const Chat = ({
    toggle,
    isShow = false,
    hiddenWelcome,
    setTextSearchSuggestions,
}: {
    toggle?: () => void;
    isShow?: boolean;
    hiddenWelcome?: Function;
    setTextSearchSuggestions?: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [text, setText] = useState<string>('');
    const [inputText, setInputText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMute, setIsMute] = useState<boolean>(true);
    const refAudio = useRef<SpeechRecognition | null>(null);
    const [isActiveAudio, setIsActiveAudio] = useState<boolean>(false);
    const divRenderChat = useRef<HTMLDivElement>(null);
    const [shouldSpeak, setShouldSpeak] = useState<boolean>(true);
    const [questionSuggest, setQuestionSuggest] = useState<string>('');
    const [data_chat, setData_hat] = useState<Partial<IResponse<any>>[]>([]);
    const [isSuggest, setIsSuggest] = useState<boolean>(false);
    const [textSuggest, setTextSuggest] = useState<string>('');

    useEffect(() => {
        setText('Xin chào, hiện tại bot có thể giúp gì cho bạn');
    }, []);

    useEffect(() => {
        if (!inputText.trim()) {
            setIsSuggest(false);
            setTextSuggest('');
            return;
        }

        const textInput = inputText.toLowerCase().includes('nghĩa là');

        if (textInput) {
            const text = inputText.toLowerCase().split('nghĩa là')[0];
            if (text) {
                if (setTextSearchSuggestions) {
                    setIsSuggest(true);
                    setTextSuggest(text);
                }
            }
        } else {
            const regex =
                /(?:từ\s+)?(\w+)\s+(có\s+nghĩa\s+là|là|có\s+nghĩa\s+là\s+gì|là\s+gì|nghĩa\s+của\s+\1\s+là\s+gì)/i;
            const match = inputText.match(regex);
            if (match) {
                const text = match[1];
                if (text) {
                    if (setTextSearchSuggestions) {
                        setIsSuggest(true);
                        setTextSuggest(text);
                    }
                }
            }
        }
    }, [inputText]);

    useEffect(() => {
        if (isMute) {
            setShouldSpeak(false);
            return;
        }
        setShouldSpeak(true);
    }, [isMute]);

    useEffect(() => {
        if (shouldSpeak) {
            const msg = new SpeechSynthesisUtterance();
            msg.text = text;
            window.speechSynthesis.speak(msg);
        }
        setText('');
    }, [text, shouldSpeak]);

    useEffect(() => {
        if (!divRenderChat.current) return;
        divRenderChat.current.scrollIntoView();
    }, [data_chat]);

    useEffect(() => {
        if (data_chat.length > 0) {
            localStorage.setItem('chats', JSON.stringify(data_chat));
        }
    }, [data_chat]);

    const handleGetAudioAndSend = () => {
        if (!refAudio.current) return;

        refAudio.current.start();
        setIsActiveAudio(true);
    };

    useEffect(() => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        refAudio.current = recognition;
        recognition.continuous = false;
        recognition.lang = 'vi';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = function (event) {
            setIsActiveAudio(false);
            setInputText(event.results[0][0].transcript);
        };

        recognition.onspeechend = function () {
            recognition.stop();
        };
        recognition.onspeechend = function (e) {
            console.log(e);
        };

        recognition.onerror = function (event) {
            console.log(event);
            console.log(event.error);
        };
    }, []);

    const handleSendMessage = async () => {
        if (!inputText) return;
        setData_hat((prev) => [...prev, { data: inputText, is_ai: false, is_null_result: false, is_mark_down: true }]);
        const data = await handleGetAnswerAi(inputText);
        setInputText('');
    };

    useEffect(() => {
        const chats = JSON.parse(localStorage.getItem('chats') || 'null');
        if (!chats) {
            localStorage.setItem('chats', '[]');
        } else {
            setData_hat(chats);
        }
    }, []);

    useEffect(() => {
        if (!questionSuggest.trim()) {
            return;
        }
        setInputText(questionSuggest.trim());
    }, [questionSuggest]);

    const handleKeyDown = (e: KeyboardEvent): void => {
        if (e.keyCode === 13) {
            handleSendMessage();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div
            className=" d-flex flex-col umn  position-relative"
            style={{ background: '#f0f3fa', width: '100%', height: '100%' }}
        >
            <>
                {isShow ? (
                    <div className="relative" style={{ display: 'flex', justifyContent: 'end' }}>
                        <Welcome
                            handleCloseWelcome={() => {
                                if (hiddenWelcome) {
                                    hiddenWelcome(false);
                                }
                            }}
                            dataMute={{
                                isMute,
                                setIsMute,
                            }}
                            toggle={toggle}
                            isHidden={false}
                        />
                    </div>
                ) : (
                    <>
                        <Welcome
                            toggle={toggle}
                            dataMute={{
                                isMute: isMute,
                                setIsMute: setIsMute,
                            }}
                            handleCloseWelcome={() => {}}
                            isHidden
                        />
                        <div
                            className="body-form-chat flex-grow-1 bg-custom px-3  overflow-auto"
                            style={{ background: '#f0f3fa', paddingTop: '20px' }}
                        >
                            {data_chat &&
                                data_chat.length > 0 &&
                                data_chat.map((chatItem, index) => {
                                    return <ChatItem data={chatItem} key={index} />;
                                })}
                            {isLoading && <PendingResChatUser />}
                            <div ref={divRenderChat} />
                        </div>
                        <div
                            className="chat_input d-flex justify-content-between align-items-center custom-height"
                            style={{
                                width: '100%',
                                height: '50px',
                                borderTop: '1.5px solid #ccc',
                                alignItems: 'end',
                                bottom: '0px',
                                zIndex: '1000',
                                overflow: 'hidden',
                                background: '#fff',
                            }}
                        >
                            <Popover
                                content={
                                    <div>
                                        <h3
                                            style={{
                                                fontWeight: 600,
                                                fontSize: 18,
                                                marginBottom: 14,
                                            }}
                                        >
                                            Có thể bạn đang muốn
                                        </h3>
                                        <p>
                                            Dịch từ <strong>{textSuggest}</strong> đúng không
                                        </p>
                                        <p className="mb-3 mt-2">
                                            Nếu đúng hãy click{' '}
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    if (setTextSearchSuggestions) {
                                                        setTextSearchSuggestions(textSuggest);
                                                        setIsSuggest(false);
                                                        setTextSuggest('');
                                                    }
                                                }}
                                            >
                                                Vào đây
                                            </Button>{' '}
                                            để dịch
                                        </p>
                                        <p>
                                            Nếu không hãy click{' '}
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    setIsSuggest(false);
                                                    setIsSuggest(false);
                                                    setTextSuggest('');
                                                }}
                                            >
                                                Vào đây
                                            </Button>{' '}
                                            để hủy
                                        </p>
                                    </div>
                                }
                                placement="top"
                                open={setTextSearchSuggestions ? isSuggest : false}
                            >
                                <InputTypingEffect
                                    placeholder="Hãy nhập câu hỏi bạn cần giải đáp ..."
                                    className="w-100 d-block custom-outline-none custom-padding custom-height custom-font-size"
                                    style={{
                                        outline: 'none',
                                        paddingLeft: '15px',
                                        height: '100%',
                                        font: ' 14px',
                                        border: 'none',
                                        borderBottomLeftRadius: '10px',
                                    }}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
                                    value={inputText}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            handleSendMessage();
                                        }
                                    }}
                                />
                            </Popover>
                            <div className="" style={{ padding: '0 10px' }}>
                                {inputText ? (
                                    <SendOutlined
                                        style={{
                                            fontSize: 16,
                                            color: '#1677ff',
                                        }}
                                        className="rotate-[-45deg] cursor-pointer"
                                        onClick={handleSendMessage}
                                    />
                                ) : (
                                    <AudioOutlined
                                        onClick={handleGetAudioAndSend}
                                        style={{
                                            fontSize: 16,
                                            color: '#1677ff',
                                        }}
                                        className={`cursor-pointer  ${isActiveAudio ? 'micro-active' : ''}`}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </>
        </div>
    );
};

export default Chat;

export const PendingResChatUser = () => {
    return (
        <div
            className="is-typing"
            style={{
                paddingBottom: 40,
                marginTop: 50,
            }}
        >
            <div className="jump1"></div>
            <div className="jump2"></div>
            <div className="jump3"></div>
        </div>
    );
};
