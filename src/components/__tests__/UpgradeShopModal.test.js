import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpgradeShopModal from '../UpgradeShopModal';

const mockUser = {
  followers: 250,
  energy: 50,
  maxEnergy: 20,
  upgrades: {}
};

describe('UpgradeShopModal Component', () => {
  test('renders when open', () => {
    render(
      <UpgradeShopModal 
        isOpen={true}
        onClose={() => {}}
        user={mockUser}
        onPurchaseUpgrade={() => {}}
      />
    );
    
    expect(screen.getByText('Upgrade Shop')).toBeInTheDocument();
    expect(screen.getByText('50 Energy Available')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(
      <UpgradeShopModal 
        isOpen={false}
        onClose={() => {}}
        user={mockUser}
        onPurchaseUpgrade={() => {}}
      />
    );
    
    expect(screen.queryByText('Upgrade Shop')).not.toBeInTheDocument();
  });

  test('displays upgrade content', () => {
    render(
      <UpgradeShopModal 
        isOpen={true}
        onClose={() => {}}
        user={mockUser}
        onPurchaseUpgrade={() => {}}
      />
    );
    
    expect(screen.getByText(/How to Earn Energy/)).toBeInTheDocument();
  });
});