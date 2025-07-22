# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "GamedIn" - a professional network simulation game built with React. The app simulates professional networking growth through engaging with posts, creating content, and building followers. It's a React 19 single-page application that gamifies the professional networking experience with RPG-like mechanics including levels, energy systems, upgrades, and achievements.

## Development Commands

- **Start development server**: `npm start` (runs on port 3001)
- **Build for production**: `npm run build`
- **Run tests**: `npm run test`
- **Eject from Create React App**: `npm run eject` (one-way operation)

## Architecture

### Component-Based Design
The application has been refactored from a monolithic structure into a clean, modular architecture:

#### Directory Structure
```
src/
├── components/          # React components
│   ├── GamedIn.jsx     # Main game component
│   ├── Header.jsx      # Top navigation and stats
│   ├── ActionBar.jsx   # Post creation and trending topics
│   └── Post.jsx        # Individual post component
├── hooks/              # Custom React hooks
│   └── useGameState.js # Main game state management
├── utils/              # Utility functions
│   └── gameUtils.js    # Game logic utilities
├── data/               # Static game data
│   └── gameData.js     # Career levels, upgrades, content
├── App.js              # Application root
└── index.js            # React mounting point
```

### Key Game Systems
- **Energy System**: Actions consume energy, gained by earning followers
- **Career Levels**: 6-tier progression from Intern to C-Suite based on follower count
- **Upgrade Shop**: Purchasable improvements using energy currency
- **Trending Topics**: Dynamic content that affects post engagement multipliers
- **Combo System**: Rapid actions create multipliers and bonuses
- **Auto-engagement**: Background systems that generate content and followers

### State Management
- **useGameState Hook**: Centralized game state management with React hooks
- **Component Props**: Clean data flow between components
- **Local State**: Modal visibility and UI-specific state managed locally

### Dependencies
- React 19 with StrictMode enabled
- Lucide React for icons
- Tailwind CSS for styling (implied from class usage)
- Standard Create React App testing utilities

## Development Notes

### State Management Pattern
The app uses a complex useState pattern with a single user object containing nested state for upgrades, followers, energy, and progression. When modifying game mechanics, ensure state updates maintain proper immutability patterns.

### Game Balance Considerations
- Energy costs are carefully balanced with follower gain rates
- Upgrade pricing follows exponential scaling
- Combo system has timing windows (3-second intervals)
- Trending topics rotate every 2 minutes with 2x engagement multipliers

### Performance Considerations
- Auto-generated posts are limited to 20 most recent
- Multiple setInterval timers manage game progression
- Floating animations are cleaned up after 2-3 seconds
- Modal interactions use event propagation control

### Content Systems
- Pre-written content templates categorized by type
- Simulated user profiles for auto-generated posts
- Topic-based trending system affects post performance
- Achievement triggers based on milestone follower counts