'use client';

import { useState } from 'react';
import { Button } from '@heroui/react';
import NormalInput from '../../components/InputFields/NormalInput';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [psdError, setPsdError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setEmailError('');
    setPsdError('');

    // Basic validation
    if (!email) {
      setEmailError('Email is required');
    }

    if (!password) {
      setPsdError('Password is required');
    }

    setLoading(true);

    // try {
    //   // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   console.log('Login successful', { email, password });

    //   // Reset form or redirect after login
    //   setEmail('');
    //   setPassword('');
    // } catch (err) {
    //   // setError('Login failed. Please try again.');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="max-w-sm mx-auto p-6 border border-gray-100 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {/* Email input */}
      <NormalInput
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
        error={emailError}
      />

      {/* Password input */}
      <NormalInput
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
        error={psdError}
      />

      <Button onPress={handleLogin} disabled={loading} className="w-full">
        {loading ? 'Logging in...' : 'Login'}
      </Button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Do not have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
