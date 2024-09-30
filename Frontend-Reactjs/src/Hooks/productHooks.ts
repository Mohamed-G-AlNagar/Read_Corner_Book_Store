import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addBook, deleteBook, getAllProducts, getNewNineProducts, getProduct, updateBook } from '../Services/productAPI';
import toast from 'react-hot-toast';
import { BookFormData } from '../models/IBook';

export function useProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  return { products, error, isLoading };
}

export function useNewArrival() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['NewNineProducts'],
    queryFn: getNewNineProducts,
  });

  return { products, error, isLoading };
}

export function useProductDatails(id: string | null) {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProduct(id),
    enabled: !!id,  // Only run if id excist
  });

  return { product, error, isLoading };
}


export function useDeleteBook() {

  //? to use it to invalidate the quire to update the data after insterting in the DB
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (itemId: number) =>
      deleteBook(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'An error occurred while deleting the book');
      console.log(error.response);
    },
  });

  return { mutate };
}


export function useAddBook() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => addBook(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Book Successfully Added');
    },
    onError: (error: any) => {
      console.error(error);
      if (error.response?.data?.validationErrors) {
        error.response.data.validationErrors.forEach((err: string) => {
          toast.error(err);
        });
      } else {
        console.log(error.response.data)
        toast.error(error.response?.data?.error || 'An error occurred while adding the book');
      }
    },
  });

  return { mutate };
}


interface IupdateBook {
  bookId: number,
  formData: FormData
}
export function useUpdateBook() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ bookId, formData }: IupdateBook) => updateBook(bookId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Book Successfully Added');
    },
    onError: (error: any) => {
      console.error(error);
      if (error.response?.data?.validationErrors) {
        error.response.data.validationErrors.forEach((err: string) => {
          toast.error(err);
        });
      } else {
        console.log(error.response.data)
        toast.error(error.response?.data?.error || 'An error occurred while updating the book');
      }
    },
  });

  return { mutate };
}
