
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { QuestionCard } from '@/components/Questions/QuestionCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Question, Tag } from '@/types';
import { Search, TrendingUp, Clock, MessageSquare } from 'lucide-react';

// Mock data
const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'How to implement React hooks with TypeScript?',
    description: '<p>I\'m trying to use useState and useEffect hooks in my TypeScript React component, but I\'m getting type errors. What\'s the proper way to type these hooks?</p>',
    tags: ['react', 'typescript', 'hooks'],
    authorId: '1',
    author: {
      id: '1',
      username: 'reactdev',
      email: 'reactdev@example.com',
      reputation: 1250,
      role: 'user',
      createdAt: new Date(),
    },
    votes: 15,
    answers: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'JWT Authentication best practices',
    description: '<p>What are the current best practices for JWT authentication in web applications? Should I store tokens in localStorage or httpOnly cookies?</p>',
    tags: ['jwt', 'authentication', 'security'],
    authorId: '2',
    author: {
      id: '2',
      username: 'securitypro',
      email: 'security@example.com',
      reputation: 3500,
      role: 'user',
      createdAt: new Date(),
    },
    votes: 23,
    answers: [{ id: '1' }] as any,
    acceptedAnswerId: '1',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox - When to use which?',
    description: '<p>I often get confused about when to use CSS Grid versus Flexbox. Can someone explain the key differences and use cases for each?</p>',
    tags: ['css', 'grid', 'flexbox', 'layout'],
    authorId: '3',
    author: {
      id: '3',
      username: 'csswizard',
      email: 'css@example.com',
      reputation: 890,
      role: 'user',
      createdAt: new Date(),
    },
    votes: 8,
    answers: [{ id: '2' }, { id: '3' }] as any,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    updatedAt: new Date(),
  }
];

const mockTags: Tag[] = [
  { id: '1', name: 'react', questionsCount: 1250 },
  { id: '2', name: 'typescript', questionsCount: 980 },
  { id: '3', name: 'javascript', questionsCount: 2100 },
  { id: '4', name: 'css', questionsCount: 750 },
  { id: '5', name: 'jwt', questionsCount: 320 },
];

export const Home: React.FC = () => {
  const [questions] = useState<Question[]>(mockQuestions);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'votes' | 'activity'>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedQuestions = useMemo(() => {
    let filtered = questions;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(q => 
        selectedTags.some(tag => q.tags.includes(tag))
      );
    }

    // Sort questions
    switch (sortBy) {
      case 'votes':
        return [...filtered].sort((a, b) => b.votes - a.votes);
      case 'activity':
        return [...filtered].sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      case 'newest':
      default:
        return [...filtered].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [questions, selectedTags, sortBy, searchQuery]);

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">All Questions</h1>
            <Link to="/ask">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Ask Question
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Newest
                  </div>
                </SelectItem>
                <SelectItem value="votes">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Most Votes
                  </div>
                </SelectItem>
                <SelectItem value="activity">
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Recent Activity
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-gray-600">Filtered by:</span>
              {selectedTags.map(tag => (
                <Badge 
                  key={tag}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200"
                  onClick={() => toggleTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedTags([])}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            {filteredAndSortedQuestions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || selectedTags.length > 0 
                    ? "Try adjusting your search or filters" 
                    : "Be the first to ask a question!"
                  }
                </p>
                <Link to="/ask">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Ask a Question
                  </Button>
                </Link>
              </div>
            ) : (
              filteredAndSortedQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Popular Tags */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {mockTags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className={`cursor-pointer transition-colors ${
                    selectedTags.includes(tag.name)
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleTag(tag.name)}
                >
                  {tag.name} ({tag.questionsCount})
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Community Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Questions</span>
                <span className="font-medium">12,459</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Answers</span>
                <span className="font-medium">28,391</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Users</span>
                <span className="font-medium">3,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tags</span>
                <span className="font-medium">1,856</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
