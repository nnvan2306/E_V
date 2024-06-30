import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { IResponse } from '../../interface';
import ReactMarkdown from 'react-markdown';
import Typical from 'react-typical';
import Typewriter from 'typewriter-effect';

const { Paragraph } = Typography;

const ChatMarkDown: React.FC<{ data: Partial<IResponse<any>> }> = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>('');
    const [position, setPosition] = useState<number>(0);

    console.log('data:', data);

    useEffect(() => {
        const intr = setInterval(() => {
            setAnswer(data.data.slice(0, position));
            if (position + 1 > data.data.length) {
                setPosition(0);
            } else {
                setPosition(position + 1);
            }
        }, 100);
        return () => {
            clearInterval(intr);
        };
    }, [data]);

    return (
        <div>
            <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
    );
};

export default ChatMarkDown;
