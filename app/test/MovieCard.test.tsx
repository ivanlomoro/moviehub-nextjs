import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCard from '../ui/components/MovieCard/MovieCard';

test('renders MovieCard component with all details', () => {
  const movieProps = {
    title: 'Test Movie',
    genre: 'Action',
    score: 8,
    posterImage: '/test-poster.jpg',
    onDelete: jest.fn(),
    onEdit: jest.fn(),
  };

  render(<MovieCard {...movieProps} />);
  

  expect(screen.getByText('Test Movie')).toBeInTheDocument();
  expect(screen.getByText('Genre: Action')).toBeInTheDocument();
  expect(screen.getByText('Rate: 8')).toBeInTheDocument();
});
