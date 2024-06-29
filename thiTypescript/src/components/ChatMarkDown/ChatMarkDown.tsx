import { Typography } from 'antd';
import { useState } from 'react';
import { IResponse } from '../../interface';
import ReactMarkdown from 'react-markdown';
import Typical from 'react-typical';

const { Paragraph } = Typography;

const ChatMarkDown: React.FC<{ data: Partial<IResponse<any>> }> = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // if (!data.is_video) {
    return (
        <div>
            {data.data.content_html ? (
                <div
                    className="preview-markdown"
                    dangerouslySetInnerHTML={{
                        __html: data.data.content_html,
                    }}
                ></div>
            ) : (
                <ReactMarkdown>{data.data}</ReactMarkdown>
                // <Typical steps={[data.data, 1000]} loop={Infinity} wrapper="p" />
            )}
        </div>
    );
    // }

    // return (
    //     <div>
    //         <div>
    //             <iframe
    //                 width="100%"
    //                 style={{
    //                     borderRadius: 10,
    //                 }}
    //                 src={`https://www.youtube.com/embed/${data.data.iframe_url}?autoplay=1`}
    //                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //                 referrerPolicy="strict-origin-when-cross-origin"
    //                 allowFullScreen
    //             ></iframe>
    //         </div>
    //         <div className={!isExpanded ? 'max-h-[180px] overflow-hidden' : ''}>
    //             <Paragraph>
    //                 <blockquote>
    //                     <a target="_blank" href={`https://www.youtube.com/watch?v=${data.data.iframe_url}`}>
    //                         https://www.youtube.com/watch?v={data.data.iframe_url}
    //                     </a>
    //                 </blockquote>
    //             </Paragraph>
    //             {data.data.content_html ? (
    //                 <div
    //                     className="preview-markdown"
    //                     dangerouslySetInnerHTML={{
    //                         __html: data.data.content_html,
    //                     }}
    //                 ></div>
    //             ) : (
    //                 <Paragraph>
    //                     <ReactMarkdown>{data.data.description}</ReactMarkdown>
    //                 </Paragraph>
    //             )}
    //         </div>
    //         <span className="text-[#5f5fe8] cursor-pointer float-right" onClick={() => setIsExpanded(!isExpanded)}>
    //             {!isExpanded ? 'xem thêm' : 'thu gọn'}
    //         </span>
    //     </div>
    // );
};

export default ChatMarkDown;
