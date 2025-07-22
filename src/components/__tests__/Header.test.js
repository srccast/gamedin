import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

const mockUser = {
  energy: 15,
  maxEnergy: 20,
  followers: 150,
  combo: 0,
  upgrades: {}
};

describe('Header Component', () => {
  test('renders GamedIn title', () => {
    render(
      <Header 
        user={mockUser}
        speedBoost={1}
        onShowUpgradeShop={() => {}}
        onShowLevelsModal={() => {}}
      />
    );
    
    expect(screen.getByText('GamedIn')).toBeInTheDocument();
    expect(screen.getByText('Professional Gaming Network')).toBeInTheDocument();
  });

  test('displays user energy correctly', () => {
    render(
      <Header 
        user={mockUser}
        speedBoost={1}
        onShowUpgradeShop={() => {}}
        onShowLevelsModal={() => {}}
      />
    );
    
    expect(screen.getByText('15/20')).toBeInTheDocument();
  });

  test('displays follower count', () => {
    render(
      <Header 
        user={mockUser}
        speedBoost={1}
        onShowUpgradeShop={() => {}}
        onShowLevelsModal={() => {}}
      />
    );
    
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  test('shows combo indicator when combo > 0', () => {
    const userWithCombo = { ...mockUser, combo: 5 };
    
    render(
      <Header 
        user={userWithCombo}
        speedBoost={1}
        onShowUpgradeShop={() => {}}
        onShowLevelsModal={() => {}}
      />
    );
    
    expect(screen.getByText('🔥 5x COMBO')).toBeInTheDocument();
  });

  test('shows speed boost when speedBoost > 1', () => {
    render(
      <Header 
        user={mockUser}
        speedBoost={2.5}
        onShowUpgradeShop={() => {}}
        onShowLevelsModal={() => {}}
      />
    );
    
    expect(screen.getByText('2.5x SPEED')).toBeInTheDocument();
  });
});