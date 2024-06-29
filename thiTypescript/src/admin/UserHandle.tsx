import { Empty, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

interface Note {
    noteVI: string;
    nodeEN: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    note: Note[];
    createdAt: string;
    updatedAt: string;
}

interface Comment {
    comments: string;
    idUser: string;
    nameUser: string;
    id: string;
}

interface IPost {
    _id: string;
    title: string;
    user: User;
    content: string;
    tym: string[];
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
}

export default function UserHandle({ id }: { id: string }) {
    const [post, setPost] = useState<IPost[]>([]);

    useEffect(() => {
        const _fetch = async () => {
            const { data } = await axios.get(`http://localhost:3090/api/getAll-post/user/${id}`);
            const dataComment = data?.map((item: any) => {
                item.comments = item?.comments?.map((comment: any) => {
                    return {
                        id: uuidv4(),
                        ...comment,
                    };
                });
                return item;
            });
            setPost(dataComment);
        };

        _fetch();
    }, [id]);

    const handleDeletePost =async (id: string) => {
        const check = confirm("Bạn chắc chắn xóa chứ?");
        if(!check) return;
        try {
            await axios.post(`http://localhost:3090/api/remove-post/${id}`);
            toast.success("Đã xóa thành công!",{
                autoClose:500
            })
            window.location.reload();
        } catch (error) {
            alert("Khong xoa duoc co loi!");
        }
    }

    return (
        <div>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên Tài Khoản</th>
                        <th scope="col">Tên bài viết</th>
                        <th scope="col">Số Tym</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {post.length > 0 ? (
                        post.map((item, index: number) => (
                            <tr key={uuidv4()}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.user.name}</td>
                                <td>{item.title ? item.title : 'Đang cập nhật'}</td>
                                <td>{item.tym.length}</td>
                                <td>
                                    <SlectItem idPost={item._id} item={item} />
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={()  =>handleDeletePost(item._id)}>Xóa bài đăng</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <div>
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{ height: 60 }}
                                description={<span>Không có bài viết nào</span>}
                            />
                        </div>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function SlectItem({ item, idPost }: { item: IPost; idPost: string }) {
    const handleChange = async (value: string[]) => {
        const newComment = item?.comments.filter((itemComment) =>
            value.find((itemValue) => itemComment.id === itemValue),
        );

        try {
            await axios.post(`http://localhost:3090/api/update-post/${idPost}`, {
                comments: newComment,
            });
        } catch (error) {}
    };

    return (
        <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handleChange}
            options={item.comments.map((itemChild) => ({
                value: itemChild.id,
                label: (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: itemChild.comments ? itemChild.comments : 'empty',
                        }}
                    ></div>
                ),
            }))}
            defaultValue={item.comments.map((itemChild) => itemChild.id)}
        />
    );
}
