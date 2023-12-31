import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </MantineProvider>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </React.StrictMode>,
);
