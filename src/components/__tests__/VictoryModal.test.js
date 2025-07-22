import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VictoryModal from '../VictoryModal';

const mockUser = {
  followers: 20000,
  energy: 15,
  maxEnergy: 20,
  totalPosts: 50,
  totalLikes: 230,
  totalComments: 120
};

describe('VictoryModal Component', () => {
  test('renders when open', () => {
    render(
      <VictoryModal 
        isOpen={true}
        onClose={() => {}}
        user={mockUser}
      />
    );
    
    expect(screen.getByText(/CONGRATULATIONS/)).toBeInTheDocument();
    expect(screen.getByText(/Global Influence Achieved/)).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(
      <VictoryModal 
        isOpen={false}
        onClose={() => {}}
        user={mockUser}
      />
    );
    
    expect(screen.queryByText(/CONGRATULATIONS/)).not.toBeInTheDocument();
  });

  test('shows user statistics', () => {
    render(
      <VictoryModal 
        isOpen={true}
        onClose={() => {}}
        user={mockUser}
      />
    );
    
    expect(screen.getByText('20,000')).toBeInTheDocument(); // Total followers
    expect(screen.getByText('50')).toBeInTheDocument(); // Posts created
    expect(screen.getByText('230')).toBeInTheDocument(); // Likes given
    expect(screen.getByText('120')).toBeInTheDocument(); // Comments made
  });

  test('shows achievements section', () => {
    render(
      <VictoryModal 
        isOpen={true}
        onClose={() => {}}
        user={mockUser}
      />
    );
    
    expect(screen.getByText(/Final Achievements/)).toBeInTheDocument();
    expect(screen.getByText(/Networking God/)).toBeInTheDocument();
  });

  test('shows completion message', () => {
    render(
      <VictoryModal 
        isOpen={true}
        onClose={() => {}}
        user={mockUser}
      />
    );
    
    expect(screen.getByText(/From 47 to 8 billion followers/)).toBeInTheDocument();
    expect(screen.getByText(/Want to play again/)).toBeInTheDocument();
  });
});