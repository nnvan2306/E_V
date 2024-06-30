import { Typography } from 'antd';
import React from 'react';
import { IMessageUser, IResponse } from '../../interface';
import ChatMarkDown from '../ChatMarkDown/ChatMarkDown';

const { Paragraph } = Typography;

const ChatItem: React.FC<{
    data: Partial<IResponse<any>>;
    toggle?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, toggle }) => {
    if (!data.is_ai) {
        return (
            <div className="mb-3">
                <ChatItemForUser data={data} />
            </div>
        );
    }
    return (
        <div className="mb-3">
            <ChatItemForBot toggle={toggle} data={data} is_null_result={data.data ? false : true} />
        </div>
    );
};

export default ChatItem;

function ChatItemForBot({
    data,
    is_null_result = false,
    toggle,
}: {
    data: Partial<IResponse<any>>;
    is_null_result?: boolean;
    toggle?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
                    <>{data.is_mark_down && <ChatMarkDown toggle={toggle} data={data} />}</>
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
