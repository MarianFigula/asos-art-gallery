import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MainSite } from './MainSite';
import '@testing-library/jest-dom';
import { CartProvider } from '../../components/cartProvider/CartProvider';

import axios from 'axios';
jest.mock('axios'); // Mock axios

test('activates the sort by price ascending button and toggles the active class', () => {

    render(
        <BrowserRouter>
            <CartProvider>
                <MainSite />
            </CartProvider>
        </BrowserRouter>
    );

    const priceButton = screen.getByText(/Price/i, {
        selector: 'button:has(i.bi.bi-arrow-up)',
    });
    fireEvent.click(priceButton);

    expect(priceButton).toHaveClass('active');

    fireEvent.click(priceButton);
    expect(priceButton).not.toHaveClass('active');
});


test('button does not have "active" class when not clicked', () => {
    const toggleSortByPriceAsc = jest.fn();

    render(
        <BrowserRouter>
            <CartProvider>
                <MainSite toggleSortByPriceAsc={toggleSortByPriceAsc} />
            </CartProvider>
        </BrowserRouter>
    );

    const priceButton = screen.getByText(/Price/i, {
        selector: 'button:has(i.bi.bi-arrow-up)',
    });

    expect(priceButton).not.toHaveClass('active');
});
