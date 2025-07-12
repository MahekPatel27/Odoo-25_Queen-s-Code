
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Question } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, ChevronUp, ChevronDown, Check } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const hasAcceptedAnswer = question.acceptedAnswerId !== undefined;
  const answerCount = question.answers?.length || 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex space-x-4">
        {/* Vote and Stats Column */}
        <div className="flex flex-col items-center space-y-3 text-sm text-gray-600 min-w-[60px]">
          <div className="flex flex-col items-center">
            <span className="font-medium text-gray-900">{question.votes}</span>
            <span className="text-xs">votes</span>
          </div>
          
          <div className={`flex flex-col items-center ${hasAcceptedAnswer ? 'text-green-600' : ''}`}>
            <span className={`font-medium ${hasAcceptedAnswer ? 'text-green-600' : 'text-gray-900'}`}>
              {answerCount}
            </span>
            <span className="text-xs">answers</span>
            {hasAcceptedAnswer && <Check className="w-3 h-3 mt-1" />}
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1">
          <Link 
            to={`/questions/${question.id}`}
            className="block hover:text-blue-600 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
              {question.title}
            </h3>
          </Link>
          
          <div className="text-gray-600 mb-3 line-clamp-2">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: question.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
              }} 
            />
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {question.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Author and Timestamp */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                  {question.author?.username?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-700">{question.author?.username}</span>
              <span>•</span>
              <span>{formatDistanceToNow(question.createdAt, { addSuffix: true })}</span>
            </div>
            
            {question.author?.reputation && (
              <div className="text-xs text-gray-500">
                <span className="font-medium">{question.author.reputation}</span> rep
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
