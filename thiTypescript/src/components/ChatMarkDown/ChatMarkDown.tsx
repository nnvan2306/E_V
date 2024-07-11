import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { IResponse } from '../../interface';
import ReactMarkdown from 'react-markdown';
import Typical from 'react-typical';
import Typewriter from 'typewriter-effect';

const { Paragraph } = Typography;

const ChatMarkDown: React.FC<{
    data: Partial<IResponse<any>>;
    toggle?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, toggle }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>('');
    const [position, setPosition] = useState<number>(0);

    useEffect(() => {
        if (!data.is_stream) {
            setAnswer(data.data);
            return;
        }
        const intr = setInterval(() => {
            setAnswer(data.data.slice(0, position));
            if (position + 1 > data.data.length) {
            } else {
                setPosition(position + 1);
                if (toggle) {
                    toggle((prev) => !prev);
                }
            }
        }, 15);
        return () => {
            clearInterval(intr);
        };
    }, [data, position]);

    useEffect(() => {
        let data_chat: IResponse<any>[] = JSON.parse(localStorage.getItem('chats') || '[]');
        if (data_chat.length > 0) {
            data_chat = data_chat.map((item) => {
                if (item.is_ai) {
                    item.is_stream = false;
                }
                return item;
            });
            localStorage.setItem('chats', JSON.stringify(data_chat));
        }
    }, [data]);

    return (
        <div>
            <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
    );
};

export default ChatMarkDown;
