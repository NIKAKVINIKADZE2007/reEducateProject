import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import signInSchema from '../validations/sign-in';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Declare navigate here outside the onSubmit function

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post('http://localhost:3000/auth/sign-in', data);
      const { accsessToken } = res.data;

      // Navigate after successful login
      navigate('/');

      const cookies = new Cookies(null, { path: '/' });
      cookies.set('token', accsessToken); // Set token in cookies
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-6 rounded-lg shadow-lg w-96'
      >
        <h2 className='text-2xl font-bold mb-4 text-center'>Sign In</h2>

        <label className='block mb-2 text-sm font-medium'>Email</label>
        <input
          type='email'
          {...register('email')}
          className='w-full p-2 border rounded mb-2'
        />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}

        <label className='block mb-2 text-sm font-medium'>Password</label>
        <input
          type='password'
          {...register('password')}
          className='w-full p-2 border rounded mb-2'
        />
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          Sign In
        </button>

        <div className='mt-4 text-center'>
          <p className='text-sm'>
            Don't have an account?{' '}
            <Link to='/sign-up' className='text-blue-500 hover:underline'>
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
