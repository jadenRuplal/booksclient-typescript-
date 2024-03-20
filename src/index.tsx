import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import { store } from "./app/store"
import { BrowserRouter } from 'react-router-dom'
import { ProSidebarProvider } from 'react-pro-sidebar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
    <ProSidebarProvider>
    <BrowserRouter>
      <App user={null} />
      </BrowserRouter>
      </ProSidebarProvider>
    </Provider>
    
  </React.StrictMode>
)


reportWebVitals()
