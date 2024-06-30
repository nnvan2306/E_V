import React, { useState } from 'react';
// // import { useAppStore } from '@/stores/appStore';
import { Modal, Space, Switch } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { IconMessenger, IconPhone, IconZalo } from '../Icon/Icon';
import { useLocation } from 'react-router-dom';

export default function Welcome({
    handleCloseWelcome,
    dataMute,
    toggle,
    isHidden,
}: {
    toggle?: () => void;
    dataMute: {
        isMute: boolean;
        setIsMute: React.Dispatch<React.SetStateAction<boolean>>;
    };
    handleCloseWelcome: Function;
    isHidden?: boolean;
}) {
    const handleClickStartChat = () => {
        handleCloseWelcome();
    };

    const location = useLocation().pathname;

    const handleCheckPathName = () => {
        if (location === '/chat-ai' || location === '/chat') {
            return true;
        }
        return false;
    };

    return (
        <div className="relative">
            <div
                className=""
                style={{
                    width: `${handleCheckPathName() ? '50px' : '100%'}`,
                    display: 'flex',
                    justifyContent: `${handleCheckPathName() ? 'end' : ''}`,
                    paddingRight: `${handleCheckPathName() ? '20px' : ''}`,
                }}
            >
                <TopChatHeading dataMute={dataMute} toggle={toggle} />
            </div>
            {!isHidden ? (
                <>
                    <div
                        style={{
                            border: '1px solid #eee',
                        }}
                        className="bg-[#fff] w-[90%] mx-auto mt-[-25px] relative z-[888] rounded-[6px] px-[10px] py-[20px] shadow-md flex flex-col items-center gap-[10px]"
                    >
                        <p>Câu hỏi của bạn sẽ được Robox trả lời ngay 🔥 cùng bắt đầu ngay</p>
                        <button
                            onClick={handleClickStartChat}
                            className=" text-[#fff] px-4 py-1 "
                            style={{ backgroundColor: '#634bea', borderRadius: '5px' }}
                        >
                            Bắt Đầu Chat
                        </button>
                    </div>
                    <div
                        className="bg-[#fff] w-[90%] mx-auto mt-[20px] border-cyan-200 rounded-[6px] px-[10px] py-[20px]"
                        style={{
                            border: '1px solid #eee',
                        }}
                    >
                        <h3 className="font-[600] text-[18px] mb-3">Bạn cũng có thể liên hệ qua</h3>
                        <a
                            href=""
                            target="_blank"
                            className="mx-auto mb-3 flex justify-between text-current items-center pr-2 rounded-sm overflow-hidden px-[6px] py-[8px] hover:bg-[rgba(0,0,0,0.05)]"
                            style={{
                                border: '1px solid #ccc',
                            }}
                        >
                            <div className="inline-flex items-center gap-[6px]">
                                <IconZalo /> <span>Liên hệ qua zalo</span>
                            </div>
                            <i className="bi bi-arrow-right"></i>
                        </a>
                        <a
                            href=""
                            target="_blank"
                            className="mx-auto mb-3 flex justify-between text-current items-center pr-2 rounded-sm overflow-hidden px-[6px] py-[8px] hover:bg-[rgba(0,0,0,0.05)]"
                            style={{
                                border: '1px solid #ccc',
                            }}
                        >
                            <div className="inline-flex items-center gap-[6px]">
                                <IconMessenger /> <span>Liên hệ qua messenger</span>
                            </div>
                            <i className="bi bi-arrow-right"></i>
                        </a>
                        <a
                            href=""
                            target="_blank"
                            className="mx-auto mb-3 flex justify-between text-current items-center pr-2 rounded-sm overflow-hidden px-[6px] py-[8px] hover:bg-[rgba(0,0,0,0.05)]"
                            style={{
                                border: '1px solid #ccc',
                            }}
                        >
                            <div className="inline-flex items-center gap-[6px]">
                                <IconPhone /> <span>Liên hệ qua điện thoại khoa CNTT</span>
                            </div>
                            <i className="bi bi-arrow-right"></i>
                        </a>
                        <a
                            href=""
                            target="_blank"
                            className="mx-auto flex justify-between text-current items-center pr-2 rounded-sm overflow-hidden px-[6px] py-[8px] hover:bg-[rgba(0,0,0,0.05)]"
                            style={{
                                border: '1px solid #ccc',
                            }}
                        >
                            <div className="inline-flex items-center gap-[6px]">
                                <IconPhone /> <span>Liên hệ qua điện thoại tuyển sinh</span>
                            </div>
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </>
            ) : (
                ''
            )}
        </div>
    );
}

export const TopChatHeading: React.FC<{
    height?: number;
    text?: string;
    is_show_setting?: boolean;
    dataMute?: {
        isMute: boolean;
        setIsMute: React.Dispatch<React.SetStateAction<boolean>>;
    };
    toggle?: () => void;
}> = ({
    height = 150,
    text = 'AI rất vui vì được hỗ trợ các bạn, hãy ấn bắt đầu ngay ở dưới.',
    dataMute,
    is_show_setting = true,
    toggle,
}) => {
    const location = useLocation().pathname;
    const handleCheckPathName = () => {
        if (location === '/chat-ai' || location === '/chat') {
            return true;
        }
        return false;
    };

    return (
        <div
            className={`h-[${height}px] py-[12px] pb-[20px] relative`}
            style={{
                backgroundColor: `${handleCheckPathName() ? '' : '#5644b7   '}`,
                width: `${handleCheckPathName() ? '50px' : '100%'}`,
                height: `${handleCheckPathName() ? '50px' : '100%'}`,
            }}
        >
            {!handleCheckPathName() && (
                <CloseOutlined
                    onClick={() => {
                        if (toggle) {
                            toggle();
                        }
                    }}
                    className={`bg-[#fff] p-1 rounded-[50%] absolute right-[10px] cursor-pointer`}
                    style={{
                        fontSize: `${handleCheckPathName() ? '25px' : ''}`,
                    }}
                />
            )}

            {location === '/chat-ai' || location === '/chat' ? null : (
                <div className="h-[100%] px-[20px]">
                    <div className="flex gap-[6px] items-center">
                        <img
                            src="/robox.png"
                            alt="Hình ảnh logo Đại Học Kinh Tế Kỹ Thuật Công Nghiệp Hà Nội"
                            className="object-contain w-[60px] h-[60px]"
                            style={{
                                width: '30px',
                                height: '30px',
                            }}
                        />
                        <span className="text-[#fff] font-[600]">Xin chào 👋</span>
                    </div>
                    <div>
                        <h2 className="italic text-[#fff]">
                            <strong>Robox</strong> {text}
                        </h2>
                    </div>
                </div>
            )}
        </div>
    );
};
