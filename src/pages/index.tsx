import React from 'react';
import Header from '@/components/Header';
import '../app/globals.css';
import { useEffect, useState } from 'react';
import HomePage from './home';
import LoginPage from './login';


export default function App() { 

  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        setLoginStatus('success');
      }
    }, []);
  
    return (
      <div>
        <LoginPage></LoginPage>
      </div>
    );
}

