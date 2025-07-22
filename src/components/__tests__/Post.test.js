import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Post from '../Post';

const mockPost = {
  id: 1,
  author: "John Doe",
  role: "Senior Developer",
  content: "This is a test post about React testing.",
  likes: 25,
  comments: 8,
  shares: 3,
  timeAgo: "2h",
  liked: false,
  commented: false,
  category: "Tech"
};

const mockUser = {
  name: "Test User",
  energy: 10
};

describe('Post Component', () => {
  test('renders post content correctly', () => {
    render(
      <Post 
        post={mockPost}
        user={mockUser}
        onLike={() => {}}
        onComment={() => {}}
        onShare={() => {}}
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Developer • 2h')).toBeInTheDocument();
    expect(screen.getByText('This is a test post about React testing.')).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
  });

  test('displays interaction counts', () => {
    render(
      <Post 
        post={mockPost}
        user={mockUser}
        onLike={() => {}}
        onComment={() => {}}
        onShare={() => {}}
      />
    );
    
    expect(screen.getByText('25')).toBeInTheDocument(); // likes
    expect(screen.getByText('8')).toBeInTheDocument(); // comments  
    expect(screen.getByText('3')).toBeInTheDocument(); // shares
  });

  test('calls onLike when like button is clicked', () => {
    const mockOnLike = jest.fn();
    
    render(
      <Post 
        post={mockPost}
        user={mockUser}
        onLike={mockOnLike}
        onComment={() => {}}
        onShare={() => {}}
      />
    );
    
    const likeButton = screen.getByRole('button', { name: /25/ });
    fireEvent.click(likeButton);
    
    expect(mockOnLike).toHaveBeenCalledWith(1);
  });

  test('disables buttons when user has insufficient energy', () => {
    const lowEnergyUser = { ...mockUser, energy: 0 };
    
    render(
      <Post 
        post={mockPost}
        user={lowEnergyUser}
        onLike={() => {}}
        onComment={() => {}}
        onShare={() => {}}
      />
    );
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });
});