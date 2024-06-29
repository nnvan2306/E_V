import { apiAi } from '.';

export const handleGetAnswerAi = (question: string) => {
    const url = '/answer';
    return apiAi.get(url);
};
