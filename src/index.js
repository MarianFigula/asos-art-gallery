import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import {BrowserRouter} from "react-router-dom";
import {CartProvider} from "./components/cartProvider/CartProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CartProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </CartProvider>
    </React.StrictMode>
);
