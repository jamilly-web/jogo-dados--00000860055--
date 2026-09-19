// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import JogoDados from './src/components/JogoDados';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <JogoDados />
    </>
  );
}