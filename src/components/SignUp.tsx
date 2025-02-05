import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import validationSchema from '../validations/sign-up';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [error, setError] = useState(null);

  const createUser = async (formInfo: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    try {
      const res = await axios.post(
        'http://localhost:3000/auth/sign-up',
        formInfo
      );
      const data = res.data;

      console.log(data);
      const navigate = useNavigate();

      navigate('/auth/sign-in');
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  const onSubmit = async (data: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    createUser(data);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-6 rounded-lg shadow-lg w-96'
      >
        <h2 className='text-2xl font-bold mb-4 text-center'>Sign Up</h2>

        <label className='block mb-2 text-sm font-medium'>Full Name</label>
        <input
          type='text'
          {...register('fullName', { required: 'Full Name is required' })}
          className='w-full p-2 border rounded mb-2'
        />
        {errors.fullName && (
          <p className='text-red-500 text-sm'>{errors.fullName.message}</p>
        )}

        <label className='block mb-2 text-sm font-medium'>Email</label>
        <input
          type='email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
          className='w-full p-2 border rounded mb-2'
        />
        {errors.email && (
          <p className='text-red-500 text-sm'>{errors.email.message}</p>
        )}

        <label className='block mb-2 text-sm font-medium'>Password</label>
        <input
          type='password'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          className='w-full p-2 border rounded mb-2'
        />
        {errors.password && (
          <p className='text-red-500 text-sm'>{errors.password.message}</p>
        )}

        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          Sign Up
        </button>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <div className='mt-4 text-center'>
          <p className='text-sm'>
            Already have an account?{' '}
            <Link to='/auth/sign-in' className='text-blue-500 hover:underline'>
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
