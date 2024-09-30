
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addfeedbackToBook, deletefeedback } from '../Services/feedbackAPI';


interface Iaddfeedback {
    comment: string;
    rating: number;
    bookId: number;
}
export function useAddfeedbackToBook() {
    //? to use it to invalidate the quire to update the data after insterting in the DB
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: ({ comment, rating, bookId }: Iaddfeedback) => addfeedbackToBook(comment, rating, bookId),
        onSuccess: (_, { bookId }) => {
            queryClient.invalidateQueries({ queryKey: ['productDetail', `${bookId}`] });
        },

        onError: (error) => {
            console.log(error, "error");
            toast.error(error?.message);
        },
    });

    return { mutate };
}

interface Ideletefeedback {
    feedbackId: number;
    bookId: number;
}

export function useDeleteFeedback() {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: ({ feedbackId, bookId }: Ideletefeedback) => deletefeedback(feedbackId, bookId),
        onSuccess: (_, { bookId }) => {
            queryClient.invalidateQueries({ queryKey: ['productDetail', `${bookId}`] });
        },

        onError: (error) => {
            console.log(error, "error");
            toast.error(error?.message);
        },
    });

    return { mutate };
}
