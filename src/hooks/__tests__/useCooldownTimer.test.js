import { renderHook, act } from '@testing-library/react';
import { useCooldownTimer } from '../useCooldownTimer';

// Mock the utility functions
jest.mock('../../utils/gameUtils', () => ({
  canCreatePost: jest.fn(),
  formatCooldownTime: jest.fn()
}));

import { canCreatePost, formatCooldownTime } from '../../utils/gameUtils';

describe('useCooldownTimer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns true when can post', () => {
    canCreatePost.mockReturnValue(true);
    formatCooldownTime.mockReturnValue('0s');

    const { result } = renderHook(() => 
      useCooldownTimer(Date.now() - 35000, 30000)
    );

    expect(result.current.canPost).toBe(true);
    expect(canCreatePost).toHaveBeenCalled();
  });

  test('returns false when cooldown active', () => {
    canCreatePost.mockReturnValue(false);
    formatCooldownTime.mockReturnValue('15s');

    const { result } = renderHook(() => 
      useCooldownTimer(Date.now() - 15000, 30000)
    );

    expect(result.current.canPost).toBe(false);
    expect(result.current.remainingTime).toBe('15s');
  });

  test('updates every 100ms during cooldown', async () => {
    let canPostValue = false;
    canCreatePost.mockImplementation(() => canPostValue);
    formatCooldownTime.mockReturnValue('10s');

    const { result } = renderHook(() => 
      useCooldownTimer(Date.now() - 20000, 30000)
    );

    expect(result.current.canPost).toBe(false);

    // Simulate cooldown ending
    await act(async () => {
      canPostValue = true;
      await new Promise(resolve => setTimeout(resolve, 150)); // Wait longer than 100ms
    });

    expect(result.current.canPost).toBe(true);
  });
});