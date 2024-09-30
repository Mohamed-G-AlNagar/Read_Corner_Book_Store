import { useMutation, useQuery } from '@tanstack/react-query';
import { forgotPass, ResetPass, updateMyAccount, userLogin, userSignup } from '../Services/userAPI.js';
import { ILoginUser } from '../models/ILoginUser';
import { ISignupUser } from '../models/ISignupUser.ts';
import { IUser } from '../models/IUser';
import toast from 'react-hot-toast';

export function useUserLogin(userData: ILoginUser) {
  // prettier-ignore
  const { data } = useQuery({
    queryKey: ['logedInUser'],
    queryFn: () => userLogin(userData)
  });
  console.log(data, 'userData from custom hook');
}

export function useUserSignup(userData: ISignupUser) {
  // prettier-ignore
  const { data } = useQuery({
    queryKey: ['signupUser'],
    queryFn: () => userSignup(userData)
  });
  console.log(data, 'userData from custom hook');
}

export function useUpdateMyAccount() {
  const { mutate } = useMutation({
    mutationFn: (userData: IUser) => updateMyAccount(userData),
    onSuccess: () => {
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate };
}


export function useForgotPassword() {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (email: string) => forgotPass(email),

  });

  return { mutate, isPending, data };
}

interface IResetPass {
  password: string,
  code: string
}
export function useResetPassword() {
  const { mutate, isPending, data } = useMutation({
    mutationFn: ({ password, code }: IResetPass) => ResetPass(password, code),

  });

  return { mutate, isPending, data };
}

