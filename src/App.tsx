
import React from 'react';
import { Provider } from 'react-redux'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import NotFound from './pages/NotFound';
import Todo from './pages/todo';
import './module.css'

import store from './store/store'


export default function App() {
  return (
    <Provider store={store}> 
     <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Todo />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
     </BrowserRouter>
    </Provider>
  );
}
