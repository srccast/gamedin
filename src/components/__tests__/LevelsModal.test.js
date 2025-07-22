import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LevelsModal from '../LevelsModal';

const mockUser = {
  followers: 250,
  energy: 15,
  maxEnergy: 20,
  totalPosts: 5,
  totalLikes: 23,
  totalComments: 12
};

describe('LevelsModal Component', () => {
  test('renders when open', () => {
    render(
      <LevelsModal 
        isOpen={true}
        onClose={() => {}}
        user={mockUser}
      />
    );
    
    expect(screen.getByText('Career Progression')).toBeInTheDocument();
    expect(screen.getByText('All Career Levels')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(
      <LevelsModal 
        isOpen={false}
        onClose={() => {}}
        user={mockUser}
      />
    );
    
    expect(screen.queryByText('Career Progression')).not.toBeInTheDocument();
  });

  test('displays modal content', () => {
    render(
      <LevelsModal 
        isOpen={true}
        onClose={() => {}}
        user={mockUser}
      />
    );
    
    expect(screen.getByText(/Prestige Bonus/)).toBeInTheDocument();
  });
});