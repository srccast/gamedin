import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActionBar from '../ActionBar';

// Mock the cooldown timer hook
jest.mock('../../hooks/useCooldownTimer', () => ({
  useCooldownTimer: jest.fn()
}));

import { useCooldownTimer } from '../../hooks/useCooldownTimer';

const mockUser = {
  energy: 15,
  maxEnergy: 20,
  totalPosts: 5,
  totalLikes: 23,
  totalComments: 12,
  combo: 0,
  streak: 0,
  upgrades: {},
  lastPostTime: Date.now() - 35000,
  postCooldown: 30000
};

const mockTrendingTopics = [
  { name: "AI & Technology", emoji: "🤖" },
  { name: "Remote Work", emoji: "💻" },
  { name: "Leadership", emoji: "👑" }
];

describe('ActionBar Component', () => {
  beforeEach(() => {
    useCooldownTimer.mockReturnValue({
      canPost: true,
      remainingTime: '0s'
    });
  });

  test('renders create post button when can post', () => {
    render(
      <ActionBar 
        user={mockUser}
        trendingTopics={mockTrendingTopics}
        speedBoost={1}
        onCreatePost={() => {}}
        onBatchLike={() => {}}
      />
    );
    
    expect(screen.getByText(/Create Post/)).toBeInTheDocument();
    expect(screen.getByText(/3 ⚡/)).toBeInTheDocument();
  });

  test('shows cooldown when cannot post', () => {
    useCooldownTimer.mockReturnValue({
      canPost: false,
      remainingTime: '15s'
    });

    render(
      <ActionBar 
        user={mockUser}
        trendingTopics={mockTrendingTopics}
        speedBoost={1}
        onCreatePost={() => {}}
        onBatchLike={() => {}}
      />
    );
    
    expect(screen.getByText('Cooldown: 15s')).toBeInTheDocument();
  });

  test('displays trending topics', () => {
    render(
      <ActionBar 
        user={mockUser}
        trendingTopics={mockTrendingTopics}
        speedBoost={1}
        onCreatePost={() => {}}
        onBatchLike={() => {}}
      />
    );
    
    expect(screen.getByText(/Trending Now/)).toBeInTheDocument();
    expect(screen.getByText('AI & Technology')).toBeInTheDocument();
    expect(screen.getByText('Remote Work')).toBeInTheDocument();
    expect(screen.getByText('Leadership')).toBeInTheDocument();
  });

  test('shows batch like button when upgrade available', () => {
    const userWithBatchActions = {
      ...mockUser,
      upgrades: { batchActions: true }
    };

    render(
      <ActionBar 
        user={userWithBatchActions}
        trendingTopics={mockTrendingTopics}
        speedBoost={1}
        onCreatePost={() => {}}
        onBatchLike={() => {}}
      />
    );
    
    expect(screen.getByText(/Batch Like/)).toBeInTheDocument();
  });

  test('shows speed boost notification', () => {
    render(
      <ActionBar 
        user={mockUser}
        trendingTopics={mockTrendingTopics}
        speedBoost={2.5}
        onCreatePost={() => {}}
        onBatchLike={() => {}}
      />
    );
    
    expect(screen.getByText(/2.5x speed multiplier active/)).toBeInTheDocument();
  });

  test('displays user stats correctly', () => {
    render(
      <ActionBar 
        user={mockUser}
        trendingTopics={mockTrendingTopics}
        speedBoost={1}
        onCreatePost={() => {}}
        onBatchLike={() => {}}
      />
    );
    
    expect(screen.getByText('5 posts')).toBeInTheDocument();
    expect(screen.getByText('23 likes given')).toBeInTheDocument();
    expect(screen.getByText('12 comments')).toBeInTheDocument();
  });
});