import { Typography } from 'antd';
import React from 'react';
import { IMessageUser, IResponse } from '../../interface';
import ChatMarkDown from '../ChatMarkDown/ChatMarkDown';

const { Paragraph } = Typography;

const ChatItem: React.FC<{
    data: Partial<IResponse<any>>;
}> = ({ data }) => {
    if (!data.is_ai) {
        return (
            <div className="mb-3">
                <ChatItemForUser data={data} />
            </div>
        );
    }
    return (
        <div className="mb-3">
            <ChatItemForBot data={data} is_null_result={data.data ? false : true} />
        </div>
    );
};

export default ChatItem;

function ChatItemForBot({ data, is_null_result = false }: { data: Partial<IResponse<any>>; is_null_result?: boolean }) {
    return (
        <div
            className="d-flex mb-4  justify-content-start custom-gap custom-max-width"
            style={{ maxWidth: '85%', gap: '10px' }}
        >
            <img
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                    height: '30px',
                    width: '30px',
                    objectFit: 'cover',
                    flexShrink: 0,
                }}
                src="/robox.png"
                alt="Hình ảnh AI"
            />
            <div
                className="rounded shadow "
                style={{
                    background: '#fff',
                    padding: '8px 12px 4px',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'break-word',
                }}
            >
                {!is_null_result ? (
                    <>
                        {/* {data.is_point && <ChatPoint data={data} />} */}
                        {data.is_mark_down && <ChatMarkDown data={data} />}
                        {/* <p className="text-[#878734] opacity-[0.4] text-[12px] float-right mb-2">
                            Robox dự đoán {Math.floor(data.match_ai * 100)}% phù hợp với bạn
                        </p> */}
                    </>
                ) : (
                    <p>Bot xin lỗi vì chưa thể hiểu ý của bạn</p>
                )}
            </div>
        </div>
    );
}

function ChatItemForUser({ data }: { data: Partial<IMessageUser> }) {
    return (
        <div>
            <div
                className="d-flex mb-4 ms-auto justify-content-end custom-gap custom-max-width"
                style={{ gap: '10px', maxWidth: '85%' }}
            >
                <div
                    className="bg-white rounded shadow custom-padding"
                    style={{ paddingLeft: '12px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '4px' }}
                >
                    <p className="text-justify">
                        <Paragraph copyable>{data.data}</Paragraph>
                    </p>
                </div>
                <img
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '50%',
                        height: '30px',
                        width: '30px',
                        objectFit: 'cover',
                        flexShrink: 0,
                    }}
                    src="/user.png"
                    alt="Hình ảnh"
                />
            </div>
        </div>
    );
}
