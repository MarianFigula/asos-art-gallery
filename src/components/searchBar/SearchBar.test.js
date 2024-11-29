import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import '@testing-library/jest-dom';

test('check if searchBar renders with correct default placeholder', () => {
    const { getByPlaceholderText } = render(<SearchBar searchId="search" handleFilter={jest.fn()} />);
    const input = getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();
});

