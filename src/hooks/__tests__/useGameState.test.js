import { renderHook, act } from '@testing-library/react';
import { useGameState } from '../useGameState';

// Mock the utility functions
jest.mock('../../utils/gameUtils', () => ({
  getCurrentLevel: jest.fn(),
  getSpeedMultiplier: jest.fn()
}));

import { getCurrentLevel, getSpeedMultiplier } from '../../utils/gameUtils';

describe('useGameState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getCurrentLevel.mockReturnValue({ title: 'Intern' });
    getSpeedMultiplier.mockReturnValue(1);
  });

  test('addFollowers accumulates fractional energy', () => {
    const { result } = renderHook(() => useGameState());

    // Reduce energy so we can see energy gain (user starts at max energy)
    act(() => {
      result.current.consumeEnergy(5); // Now at 15 energy
    });

    expect(result.current.user.energy).toBe(15);
    expect(result.current.user.followers).toBe(47);
    expect(result.current.user.fractionalEnergy).toBe(0);

    act(() => {
      // Like action: 3 followers at Intern level (0.1 per follower) = 0.3 fractional energy
      result.current.addFollowers(3, "Like");
    });

    // Should gain followers but no whole energy yet
    expect(result.current.user.followers).toBe(50);
    expect(result.current.user.energy).toBe(15); // No whole energy gained yet
    expect(result.current.user.fractionalEnergy).toBeCloseTo(0.3); // Fractional energy stored

    act(() => {
      // Another like action: 3 followers = 0.3 more, total 0.6
      result.current.addFollowers(3, "Like");
    });

    expect(result.current.user.followers).toBe(53);
    expect(result.current.user.energy).toBe(15); // Still no whole energy
    expect(result.current.user.fractionalEnergy).toBeCloseTo(0.6);

    act(() => {
      // Comment action: 5 followers = 0.5 more, total 1.1 → gain 1 energy
      result.current.addFollowers(5, "Comment");
    });

    expect(result.current.user.followers).toBe(58);
    expect(result.current.user.energy).toBe(16); // Gained 1 whole energy!
    expect(result.current.user.fractionalEnergy).toBeCloseTo(0.1); // 0.1 remaining
  });

  test('addFollowers gives energy for larger follower gains', () => {
    // Ensure mock returns exactly what we expect
    getCurrentLevel.mockReturnValue({ title: 'Intern' });
    getSpeedMultiplier.mockReturnValue(1);
    
    const { result } = renderHook(() => useGameState());

    // Reduce energy so we can see energy gain (user starts at max energy)
    act(() => {
      result.current.consumeEnergy(5); // Now at 15 energy
    });

    expect(result.current.user.energy).toBe(15); // Reduced energy
    expect(result.current.user.followers).toBe(47); // Initial followers
    expect(result.current.user.fractionalEnergy).toBe(0);

    act(() => {
      // Post action: 15 followers should give energy at Intern level
      result.current.addFollowers(15, "Post");
    });
    
    // Should gain followers
    expect(result.current.user.followers).toBe(62); // 47 + 15
    // Should gain energy: 15 * 0.1 = 1.5 → 1 whole energy + 0.5 fractional
    expect(result.current.user.energy).toBe(16); // 15 + 1
    expect(result.current.user.fractionalEnergy).toBeCloseTo(0.5); // 0.5 remaining
  });

  test('energy gain scales with level', () => {
    getCurrentLevel.mockReturnValue({ title: 'Manager' });
    getSpeedMultiplier.mockReturnValue(1);
    const { result } = renderHook(() => useGameState());

    // Reduce energy so we can see energy gain
    act(() => {
      result.current.consumeEnergy(10); // Now at 10 energy
    });

    expect(result.current.user.energy).toBe(10);
    expect(result.current.user.fractionalEnergy).toBe(0);

    act(() => {
      // Same 15 followers but at Manager level (0.2 per follower)
      result.current.addFollowers(15, "Post");
    });

    // Should gain energy: 15 * 0.2 = 3.0 → 3 whole energy + 0 fractional
    expect(result.current.user.energy).toBe(13); // 10 + 3
    expect(result.current.user.fractionalEnergy).toBe(0); // No fractional remainder
  });

  test('energy is capped at maxEnergy', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      // Massive follower gain that would exceed max energy
      result.current.addFollowers(500, "Viral Post");
    });

    // Energy should be capped at maxEnergy
    expect(result.current.user.energy).toBe(result.current.user.maxEnergy);
  });

  test('consumeEnergy reduces energy correctly', () => {
    const { result } = renderHook(() => useGameState());

    const initialEnergy = result.current.user.energy;

    act(() => {
      const success = result.current.consumeEnergy(5);
      expect(success).toBe(true);
    });

    expect(result.current.user.energy).toBe(initialEnergy - 5);
  });

  test('consumeEnergy fails when insufficient energy', () => {
    const { result } = renderHook(() => useGameState());

    act(() => {
      const success = result.current.consumeEnergy(25); // More than max energy
      expect(success).toBe(false);
    });

    // Energy should remain unchanged
    expect(result.current.user.energy).toBe(20);
  });

  test('cumulative energy system allows many small actions to eventually gain energy', () => {
    const { result } = renderHook(() => useGameState());

    // Start with some energy consumed so we can see gains
    act(() => {
      result.current.consumeEnergy(10); // Now at 10 energy
    });

    expect(result.current.user.energy).toBe(10);
    expect(result.current.user.fractionalEnergy).toBe(0);

    // Perform 10 small "like" actions (2 followers each = 0.2 energy each)
    for (let i = 0; i < 10; i++) {
      act(() => {
        result.current.addFollowers(2, "Like");
      });
    }

    // After 10 actions: 10 * (2 followers * 0.1 energy/follower) = 2.0 total energy
    expect(result.current.user.followers).toBe(67); // 47 + (10 * 2)
    expect(result.current.user.energy).toBe(12); // 10 + 2 energy gained
    expect(result.current.user.fractionalEnergy).toBeCloseTo(0); // Should be exactly 0
  });
});