import React from 'react';
import fetchMock from "jest-fetch-mock";
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';
import products from '../../../public/products.json'
import { ProductSearch } from '../ProductSearch/ProductSearch';

test('renders all products on initial load', async () => {

    fetchMock.mockResolvedValue({ status: 200, json: jest.fn(() => products) })

    render(<App />)
    expect(await screen.findByText('Pure Blonde Crate')).toBeInTheDocument()
    expect(await screen.findByText('Kirin Megumi 4x6x330ml')).toBeInTheDocument()

    expect(screen.queryByText('Sorry, something went wrong.')).not.toBeInTheDocument()
})

test('search input onchange is fired', () => {
    const onNameValueChange = jest.fn();
    render(<App />)
    const { queryByPlaceholderText } = render(<ProductSearch onNameValueChange={onNameValueChange} />)
    const searchBox = queryByPlaceholderText('Search Product By Name');
    fireEvent.change(searchBox, { target: { value: "test" } })
    expect(onNameValueChange).not.toHaveBeenCalled()
})

test('check product finder exists on home page', () => {
    render(<App />);
    const linkElement = screen.getByText(/Product Finder/i);
    expect(linkElement).toBeInTheDocument();
});

