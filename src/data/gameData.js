// Career levels with prestige indicators
export const careerLevels = [
  {
    title: "Intern",
    min: 0,
    max: 100,
    color: "text-gray-600",
    description: "Starting your professional journey",
    prestigeBonus: "+1 energy per 10 followers gained",
    icon: "📝"
  },
  {
    title: "Professional",
    min: 100,
    max: 500,
    color: "text-blue-600",
    description: "Building your professional brand",
    prestigeBonus: "+2 energy per 10 followers gained",
    icon: "💼"
  },
  {
    title: "Manager",
    min: 500,
    max: 1500,
    color: "text-green-600",
    description: "Leading teams and projects",
    prestigeBonus: "+3 energy per 10 followers gained",
    icon: "👔"
  },
  {
    title: "Director",
    min: 1500,
    max: 5000,
    color: "text-purple-600",
    description: "Strategic leadership role",
    prestigeBonus: "+4 energy per 10 followers gained",
    icon: "🎯"
  },
  {
    title: "VP",
    min: 5000,
    max: 15000,
    color: "text-orange-600",
    description: "Executive leadership position",
    prestigeBonus: "+5 energy per 10 followers gained",
    icon: "👑"
  },
  {
    title: "C-Suite",
    min: 15000,
    max: 8000000000,
    color: "text-red-600",
    description: "Ultimate professional achievement - Global influence",
    prestigeBonus: "+10 energy per 10 followers gained",
    icon: "💎"
  }
];

// Upgrade shop items
export const upgradeShop = [
  {
    id: 'maxEnergy',
    name: 'Energy Storage Upgrade',
    description: 'Increase maximum energy capacity by 10',
    cost: 15,
    unlockLevel: 'Intern',
    icon: '🔋',
    repeatable: true
  },
  {
    id: 'fastPosting',
    name: 'Fast Posting',
    description: 'Reduce post cooldown by 5 seconds',
    cost: 25,
    unlockLevel: 'Intern',
    icon: '⏱️',
    repeatable: true
  },
  {
    id: 'ultraFastPosting',
    name: 'Ultra Fast Posting',
    description: 'Cut remaining cooldown time in half',
    cost: 50,
    unlockLevel: 'Intern',
    icon: '⚡',
    repeatable: true,
    special: true // Only shows when fast posting is maxed
  },
  {
    id: 'batchActions',
    name: 'Batch Actions',
    description: 'Like multiple posts at once with a single click',
    cost: 50,
    unlockLevel: 'Professional',
    icon: '⚡'
  },
  {
    id: 'autoEngagement',
    name: 'Auto-Engagement',
    description: 'Automatically gain followers every 10 seconds',
    cost: 100,
    unlockLevel: 'Manager',
    icon: '🤖'
  },
  {
    id: 'viralBoost',
    name: 'Viral Boost',
    description: 'Increase chance of posts going viral by 10%',
    cost: 150,
    unlockLevel: 'Director',
    icon: '🔥'
  },
  {
    id: 'energyEfficiency',
    name: 'Energy Efficiency',
    description: 'All actions cost 50% less energy',
    cost: 200,
    unlockLevel: 'VP',
    icon: '💚'
  },
  {
    id: 'speedMultiplier',
    name: 'Speed Multiplier Upgrade',
    description: 'Permanently increase follower gains by 50%',
    cost: 300,
    unlockLevel: 'C-Suite',
    icon: '🚀',
    repeatable: true
  }
];

// Pre-generated content templates
export const contentTemplates = {
  "Thought Leadership": [
    "After 5 years in tech, I've learned that the most important skill isn't coding—it's listening. What's the most valuable lesson your career has taught you?",
    "Unpopular opinion: The best leaders aren't the ones with all the answers. They're the ones asking the right questions. Thoughts?",
    "I used to think networking was about collecting business cards. Now I know it's about collecting meaningful conversations. How has your perspective on networking evolved?"
  ],
  "Personal Win": [
    "Excited to announce that I've just completed my certification in Digital Marketing! Grateful for the support from my amazing team throughout this journey. 🎉",
    "Just hit a major milestone - our team delivered the project 2 weeks ahead of schedule! Proud of what we can accomplish when we work together.",
    "Thrilled to share that I've been promoted to Senior Analyst! Looking forward to taking on new challenges and growing with this incredible company."
  ],
  "Industry Insight": [
    "AI is transforming how we approach customer service, but the human touch remains irreplaceable. The future belongs to companies that blend technology with empathy.",
    "Remote work isn't just a trend—it's a fundamental shift in how we think about productivity and work-life balance. What changes have you noticed in your industry?",
    "Sustainability isn't just good for the planet; it's becoming a competitive advantage. Companies that ignore this shift do so at their own peril."
  ],
  "Team Appreciation": [
    "Shoutout to my incredible team for pulling together on this quarter's biggest launch! Individual contributors: Sarah (design magic), Mike (dev wizardry), and Lisa (project management perfection). We couldn't have done it without each of you! 🙌",
    "Friday recognition post: Huge thanks to the marketing team for their creativity and dedication. Your innovative campaigns are what make our company shine!",
    "Grateful to work alongside such talented professionals. Today our team hit 95% customer satisfaction - a true testament to everyone's hard work and commitment to excellence."
  ]
};

// Simulated users for auto-generated posts
export const simulatedUsers = [
  { name: "Jennifer Walsh", role: "Marketing Director" },
  { name: "David Kim", role: "Software Engineer" },
  { name: "Rachel Thompson", role: "HR Manager" },
  { name: "Michael Chen", role: "Sales Lead" },
  { name: "Lisa Garcia", role: "UX Designer" },
  { name: "James Wilson", role: "Data Analyst" },
  { name: "Amanda Foster", role: "Product Manager" },
  { name: "Kevin Rodriguez", role: "Business Analyst" },
  { name: "Samantha Lee", role: "Operations Manager" },
  { name: "Robert Taylor", role: "Technical Writer" }
];

// Trending topics system
export const allTopics = [
  { name: "AI & Technology", emoji: "🤖", category: "Industry Insight" },
  { name: "Remote Work", emoji: "💻", category: "Industry Insight" },
  { name: "Leadership", emoji: "👑", category: "Thought Leadership" },
  { name: "Team Building", emoji: "🤝", category: "Team Appreciation" },
  { name: "Innovation", emoji: "💡", category: "Thought Leadership" },
  { name: "Career Growth", emoji: "📈", category: "Personal Win" },
  { name: "Sustainability", emoji: "🌱", category: "Industry Insight" },
  { name: "Mentorship", emoji: "🎯", category: "Thought Leadership" },
  { name: "Work-Life Balance", emoji: "⚖️", category: "Industry Insight" },
  { name: "Digital Marketing", emoji: "📱", category: "Industry Insight" },
  { name: "Data Analytics", emoji: "📊", category: "Industry Insight" },
  { name: "Customer Success", emoji: "⭐", category: "Personal Win" }
];

// Auto-generated post content
export const autoPostContent = [
  "Just completed an amazing workshop on digital transformation! The future of work is evolving rapidly, and I'm excited to implement these new strategies with my team.",
  "Reflecting on Q4 goals and feeling grateful for the incredible team I work with. Together, we've exceeded expectations and set the bar high for next year!",
  "Anyone else finding that remote collaboration tools have completely changed how we approach project management? The productivity gains have been remarkable.",
  "Attended an insightful conference today about sustainable business practices. It's inspiring to see how companies are prioritizing both profit and purpose.",
  "Big shoutout to my colleague for their innovative approach to solving our biggest client challenge. Teamwork really does make the dream work! 🙌",
  "The intersection of AI and human creativity continues to fascinate me. We're living in such an exciting time for technological advancement.",
  "Just hit a major milestone in our current project! Sometimes the best solutions come from taking a step back and approaching problems from a fresh angle.",
  "Mentor Monday: Remember that every expert was once a beginner. Embrace the learning process and don't be afraid to ask questions. Growth happens outside your comfort zone.",
  "Coffee chat with industry leaders always leaves me energized and full of new ideas. The power of networking and genuine conversations cannot be overstated.",
  "Celebrating our team's latest product launch! From concept to deployment, this has been an incredible journey of collaboration and innovation."
];

// Initial posts data
export const initialPosts = [
  {
    id: 1,
    author: "Sarah Chen",
    role: "Senior Designer",
    content: "Just wrapped up an amazing design sprint! There's something magical about watching ideas transform into beautiful, functional products. Grateful for a team that values creativity and user experience. What's been inspiring you at work lately?",
    likes: 127,
    comments: 23,
    shares: 8,
    timeAgo: "2h",
    liked: false,
    commented: false,
    category: "Personal Win"
  },
  {
    id: 2,
    author: "Marcus Johnson",
    role: "Product Manager",
    content: "Unpopular opinion: The best product features are often the ones you remove, not the ones you add. Simplicity beats complexity every time. Less is more isn't just a design principle—it's a life philosophy.",
    likes: 89,
    comments: 34,
    shares: 15,
    timeAgo: "4h",
    liked: false,
    commented: false,
    category: "Thought Leadership"
  },
  {
    id: 3,
    author: "Emma Rodriguez",
    role: "Data Scientist",
    content: "AI and machine learning are incredible tools, but they're only as good as the questions we ask them. The future belongs to curious minds who can bridge the gap between human intuition and algorithmic precision.",
    likes: 203,
    comments: 67,
    shares: 31,
    timeAgo: "6h",
    liked: false,
    commented: false,
    category: "Industry Insight"
  }
];