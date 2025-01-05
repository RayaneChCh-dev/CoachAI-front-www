import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FormMessage } from '../common/FormMessage';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formMessage, setFormMessage] = useState({ type: '', message: '' });
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setFormMessage({ type: 'success', message: 'Login successful!' });
    } catch (error) {
      setFormMessage({ type: 'error', message: 'Login failed' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-200">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {formMessage.message && (
        <FormMessage type={formMessage.type as 'success' | 'error'} message={formMessage.message} />
      )}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign In
      </button>
    </form>
  );
}