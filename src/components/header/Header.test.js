import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Header';
import CartSite from '../../sites/cartSite/CartSite.js';
import '@testing-library/jest-dom';

test('navigates to CartSite when bi bi-cart is clicked', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/cart" element={<CartSite />} />
            </Routes>
        </MemoryRouter>
    );

    const cartLink = screen.getByRole('link', { name: /cart/i });


    fireEvent.click(cartLink);

    expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
});

test('open sidebar when click on sidebar icon', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" element={<Header />} />
            </Routes>
        </MemoryRouter>
    );

    const sidebarLink = screen.getByRole('link', { name: /sidebar/i });


    fireEvent.click(sidebarLink);

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
});
