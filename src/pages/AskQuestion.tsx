
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RichTextEditor } from '@/components/Editor/RichTextEditor';
import { useAuth } from '@/contexts/AuthContext';
import { X, Plus, HelpCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const COMMON_TAGS = [
  'javascript', 'react', 'typescript', 'css', 'html', 'node.js', 
  'python', 'java', 'php', 'sql', 'mongodb', 'express',
  'vue', 'angular', 'redux', 'graphql', 'jwt', 'api'
];

export const AskQuestion: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const addTag = (tagName: string) => {
    const normalizedTag = tagName.toLowerCase().trim();
    if (normalizedTag && !tags.includes(normalizedTag) && tags.length < 5) {
      setTags([...tags, normalizedTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      setError('Title is required');
      return false;
    }
    if (title.length < 10) {
      setError('Title must be at least 10 characters long');
      return false;
    }
    if (!description.trim() || description.replace(/<[^>]*>/g, '').trim().length < 20) {
      setError('Description must be at least 20 characters long');
      return false;
    }
    if (tags.length === 0) {
      setError('At least one tag is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Question posted successfully!",
        description: "Your question has been published and is now visible to the community.",
      });
      
      navigate('/');
    } catch (err) {
      setError('Failed to post question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask a Question</h1>
        <p className="text-gray-600">
          Get help from the community by asking a clear, well-structured question.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Title */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              Title
              <HelpCircle className="w-4 h-4 ml-2 text-gray-400" />
            </CardTitle>
            <CardDescription>
              Be specific and imagine you're asking a question to another person
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to implement JWT authentication in React?"
              className="text-base"
              maxLength={150}
            />
            <div className="mt-2 text-sm text-gray-500">
              {title.length}/150 characters
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>
              Include all the information someone would need to answer your question
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Describe your problem in detail. Include what you've tried, what you expected to happen, and what actually happened."
              className="min-h-[250px]"
            />
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>
              Add up to 5 tags to describe what your question is about
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Current Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 px-3 py-1 flex items-center space-x-2"
                    >
                      <span>{tag}</span>
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-600"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Tag Input */}
              {tags.length < 5 && (
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    placeholder="Type a tag and press Enter"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addTag(tagInput)}
                    disabled={!tagInput.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Common Tags */}
              <div>
                <Label className="text-sm text-gray-600 mb-2 block">Popular tags:</Label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_TAGS.filter(tag => !tags.includes(tag)).slice(0, 12).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => addTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-between items-center pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Question'}
          </Button>
        </div>
      </form>
    </div>
  );
};
