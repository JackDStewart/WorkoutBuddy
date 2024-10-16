import React from 'react';
import '../../app/globals.css';
import Dashboard from '../dashboard';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div>
     <Header></Header>
     <Dashboard></Dashboard>
    </div>
  );
}
