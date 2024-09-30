import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  addItemToCart,
  deleteItemFromCart,
  getCartById,
} from '../Services/cartAPI';

export function useCart() {

  // prettier-ignore
  const { data, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartById,
  });

  return { data, isLoading, error };
}

export function useAddItemToCart() {
  //? to use it to invalidate the quire to update the data after insterting in the DB
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (bookId: number) => addItemToCart(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate };
}


interface MutationFnParams {
  itemId: number;
  quantity?: number;
}

export function useRemoveItemFromCart() {

  //? to use it to invalidate the quire to update the data after insterting in the DB
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ itemId, quantity = 1 }: MutationFnParams) =>
      deleteItemFromCart(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return { mutate };
}
