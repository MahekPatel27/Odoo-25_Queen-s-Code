
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Question, Answer } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { RichTextEditor } from '@/components/Editor/RichTextEditor';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChevronUp, 
  ChevronDown, 
  Check, 
  MessageSquare, 
  Share2,
  Flag,
  Edit,
  Calendar
} from 'lucide-react';

// Mock question data - in real app this would come from API
const mockQuestionDetails: Question = {
  id: '1',
  title: 'How to implement React hooks with TypeScript?',
  description: '<p>I\'m trying to use useState and useEffect hooks in my TypeScript React component, but I\'m getting type errors. What\'s the proper way to type these hooks?</p><p>Here\'s what I\'ve tried:</p><pre><code>const [count, setCount] = useState(0);\nconst [user, setUser] = useState(null);</code></pre><p>But TypeScript complains about the types. Any help would be appreciated!</p>',
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
  answers: [
    {
      id: '1',
      content: '<p>You need to specify the types explicitly when TypeScript can\'t infer them:</p><pre><code>const [count, setCount] = useState&lt;number&gt;(0);\nconst [user, setUser] = useState&lt;User | null&gt;(null);</code></pre><p>This tells TypeScript exactly what types to expect.</p>',
      questionId: '1',
      authorId: '2',
      author: {
        id: '2',
        username: 'typescriptpro',
        email: 'ts@example.com',
        reputation: 2500,
        role: 'user',
        createdAt: new Date(),
      },
      votes: 8,
      isAccepted: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      updatedAt: new Date(),
    }
  ],
  acceptedAnswerId: '1',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  updatedAt: new Date(),
};

export const QuestionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answerContent, setAnswerContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // In real app, fetch question by ID from API
    setQuestion(mockQuestionDetails);
  }, [id]);

  const handleVote = (targetId: string, type: 'up' | 'down', targetType: 'question' | 'answer') => {
    // Handle voting logic here
    console.log(`Voting ${type} on ${targetType} ${targetId}`);
  };

  const handleAcceptAnswer = (answerId: string) => {
    if (!question || !user || question.authorId !== user.id) return;
    
    setQuestion(prev => prev ? {
      ...prev,
      acceptedAnswerId: prev.acceptedAnswerId === answerId ? undefined : answerId,
      answers: prev.answers.map(answer => ({
        ...answer,
        isAccepted: answer.id === answerId ? !answer.isAccepted : false
      }))
    } : null);
  };

  const handleSubmitAnswer = async () => {
    if (!user || !answerContent.trim()) return;
    
    setIsSubmitting(true);
    try {
      // In real app, submit to API
      const newAnswer: Answer = {
        id: Date.now().toString(),
        content: answerContent,
        questionId: question!.id,
        authorId: user.id,
        author: user,
        votes: 0,
        isAccepted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setQuestion(prev => prev ? {
        ...prev,
        answers: [...prev.answers, newAnswer]
      } : null);
      
      setAnswerContent('');
    } catch (error) {
      console.error('Failed to submit answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Question not found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isQuestionOwner = user?.id === question.authorId;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <span>Question</span>
      </nav>

      {/* Question */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex space-x-4">
          {/* Vote Column */}
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(question.id, 'up', 'question')}
              className="p-2 hover:bg-orange-50"
            >
              <ChevronUp className="w-6 h-6 text-gray-600 hover:text-orange-600" />
            </Button>
            <span className="text-xl font-bold text-gray-900">{question.votes}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(question.id, 'down', 'question')}
              className="p-2 hover:bg-orange-50"
            >
              <ChevronDown className="w-6 h-6 text-gray-600 hover:text-orange-600" />
            </Button>
          </div>

          {/* Question Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>
            
            <div 
              className="prose max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: question.description }}
            />
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700">
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* Question Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
                {isQuestionOwner && (
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Flag className="w-4 h-4 mr-1" />
                  Flag
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                    {question.author.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{question.author.username}</div>
                  <div className="text-gray-500">
                    asked {formatDistanceToNow(question.createdAt, { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
        </h2>
        
        <div className="space-y-6">
          {question.answers.map((answer) => (
            <div 
              key={answer.id}
              className={`bg-white rounded-lg border p-6 ${
                answer.isAccepted ? 'border-green-200 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex space-x-4">
                {/* Vote Column */}
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(answer.id, 'up', 'answer')}
                    className="p-2 hover:bg-orange-50"
                  >
                    <ChevronUp className="w-6 h-6 text-gray-600 hover:text-orange-600" />
                  </Button>
                  <span className="text-xl font-bold text-gray-900">{answer.votes}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(answer.id, 'down', 'answer')}
                    className="p-2 hover:bg-orange-50"
                  >
                    <ChevronDown className="w-6 h-6 text-gray-600 hover:text-orange-600" />
                  </Button>
                  
                  {isQuestionOwner && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAcceptAnswer(answer.id)}
                      className={`p-2 ${
                        answer.isAccepted 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-gray-400 hover:bg-green-50 hover:text-green-600'
                      }`}
                    >
                      <Check className="w-6 h-6" />
                    </Button>
                  )}
                </div>

                {/* Answer Content */}
                <div className="flex-1">
                  <div 
                    className="prose max-w-none mb-4"
                    dangerouslySetInnerHTML={{ __html: answer.content }}
                  />
                  
                  {answer.isAccepted && (
                    <div className="flex items-center space-x-2 mb-4">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Accepted Answer</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Flag className="w-4 h-4 mr-1" />
                        Flag
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                          {answer.author.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{answer.author.username}</div>
                        <div className="text-gray-500">
                          answered {formatDistanceToNow(answer.createdAt, { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Form */}
      {user ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Answer</h3>
          
          <RichTextEditor
            value={answerContent}
            onChange={setAnswerContent}
            placeholder="Write your answer here..."
            className="mb-4"
          />
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Be sure to answer the question. Provide details and share your research!
            </p>
            <Button
              onClick={handleSubmitAnswer}
              disabled={!answerContent.trim() || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? 'Posting...' : 'Post Your Answer'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Want to answer?</h3>
          <p className="text-gray-600 mb-4">Sign in to post your answer</p>
          <Link to="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
