import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AudioOutlined, SendOutlined } from '@ant-design/icons';
import './Chat.css';
import { InputTypingEffect } from '../../InputTypingEffect/InputTypingEffect';
import ChatItem from '../../ChatItems/ChatItems';
import { IResponse } from '../../../interface';
import { handleGetAnswerAi } from '../../../api/chatAiService';
import Welcome, { TopChatHeading } from '../../Welcome/Welcome';
import { useLocation } from 'react-router-dom';

const Chat = () => {
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
    const [isWelcome, setIsWelcome] = useState<boolean>(true);

    const location = useLocation().pathname;

    // const { data_chat, updateDataChat } = useAppStore();

    useEffect(() => {
        if (location === '/chat-ai' || location === '/chat') {
            setIsWelcome(false);
            setIsWelcome(false);
        }
    }, [location]);

    useEffect(() => {
        setText('Xin chào, hiện tại bot có thể giúp gì cho bạn');
    }, []);

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

    // useEffect(() => {
    //     if (!divRenderChat.current) return;
    //     divRenderChat.current.scrollIntoView();
    // }, [data_chat]);

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
        console.log(inputText);
        if (!inputText) return;
        setData_hat((prev) => [...prev, { data: inputText, is_ai: true, is_null_result: false, is_mark_down: true }]);
        const data = await handleGetAnswerAi(inputText);
        // const fetchAPI = async () => {
        //     const chatUser: any = {
        //         data: inputText,
        //         is_ai: false,
        //     };
        //     // updateDataChat(chatUser);
        //     setIsLoading(true);
        //     const data = await GetRuntimeAI(inputText);
        //     if (data.is_mark_down && !data.is_table) {
        //         setText(data.data.content_mark_down);
        //     }
        //     if (data.is_unknown || !data) {
        //         const builderDataUnknown: IResponse<any> = {
        //             is_mark_down: true,
        //             is_ai: true,
        //             is_point: false,
        //             is_video: false,
        //             is_unknown: false,
        //             code: 200,
        //             match_query: 0,
        //             match_ai: 0,
        //             is_table: false,
        //             msg: 'ok',
        //             is_audio: false,
        //             data: {
        //                 content_html: `
        //                         <h2>Xin lỗi bot chưa hiểu ý của bạn</h2>
        //                         <p>I.  Bạn có thể hỏi về</p>
        //                         <ul>
        //                             <li>Điểm chuẩn</li>
        //                             <li>Địa điểm</li>
        //                             <li>Mã đăng ký xét tuyển</li>
        //                             <li>Các cơ sở đào tạo</li>
        //                             <li>Cơ sở vật chất</li>
        //                             <li>Thông tin khoa công nghệ thông tin</li>
        //                         </ul>
        //                     `,
        //             },
        //         };
        //         updateDataChat(builderDataUnknown);
        //     } else {
        //         updateDataChat(data);
        //     }
        //     setIsLoading(false);
        //     setInputText('');
        // };
        // fetchAPI();
        setInputText('');
    };

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCloseWelcome = () => {
        setIsWelcome(false);
    };

    return (
        <div
            className=" d-flex flex-column  position-relative"
            style={{ background: '#f0f3fa', width: '100%', height: '100%' }}
        >
            <>
                {' '}
                <div className="relative" style={{ display: 'flex', justifyContent: 'end' }}>
                    {/* {location === '/chat-ai' || location === '/chat' ? null : (
                        // <TopChatHeading
                        //     is_show_setting
                        //     height={300}
                        //     text="Hãy đặt câu hỏi ở phía dưới. bạn có thể sử dụng micro để quá trình nhanh hơn nhé 😉"
                        // dataMute={{
                        //     isMute,
                        //     setIsMute,
                        // }}
                        // />
                    )} */}
                    <Welcome
                        isWelcome={isWelcome}
                        handleCloseWelcome={handleCloseWelcome}
                        dataMute={{
                            isMute,
                            setIsMute,
                        }}
                    />
                </div>
                <div
                    className="body-form-chat flex-grow-1 bg-custom px-3  overflow-auto"
                    style={{ background: '#f0f3fa', paddingTop: '20px' }}
                >
                    {/* <HelloUser setQuestionSuggest={setQuestionSuggest} /> */}
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
                    {isWelcome ? (
                        <></>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
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
