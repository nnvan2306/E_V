export interface IResponse<T> {
    // code: number;
    // match_query: number;
    // match_ai: number;
    // is_table: boolean;
    is_mark_down: boolean;
    msg: string;
    data: T;
    is_ai: boolean;
    // is_point: boolean;
    // is_video: boolean;
    // is_audio: boolean;
    // is_unknown: boolean;
    is_stream?: boolean;
}

export interface IMessageUser {
    is_ai: boolean;
    data: string;
}
