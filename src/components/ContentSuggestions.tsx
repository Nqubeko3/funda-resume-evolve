
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lightbulb, RefreshCw } from 'lucide-react';

interface ContentSuggestionsProps {
  type: 'summary' | 'experience' | 'skills';
  jobTitle: string;
  industry: string;
  onSuggestionSelect: (suggestion: string) => void;
}

const ContentSuggestions: React.FC<ContentSuggestionsProps> = ({
  type,
  jobTitle,
  industry,
  onSuggestionSelect
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSuggestions = () => {
    setLoading(true);
    
    // Simulate AI-powered content generation
    setTimeout(() => {
      let newSuggestions: string[] = [];
      
      if (type === 'summary') {
        const summaryTemplates = [
          `Results-driven ${jobTitle} with 5+ years of experience in ${industry}, specializing in innovative solutions and team leadership. Proven track record of driving growth and delivering exceptional results.`,
          `Experienced ${jobTitle} professional with expertise in ${industry} operations. Skilled in strategic planning, process optimization, and cross-functional collaboration to achieve organizational goals.`,
          `Dynamic ${jobTitle} with a passion for ${industry} innovation. Strong background in project management, stakeholder engagement, and delivering high-quality solutions on time and within budget.`
        ];
        newSuggestions = summaryTemplates;
      } else if (type === 'experience') {
        const experienceTemplates = [
          `• Led cross-functional team of 10+ members to deliver key ${industry} initiatives, resulting in 25% improvement in operational efficiency`,
          `• Implemented innovative ${jobTitle} strategies that increased revenue by 30% and reduced costs by 15% within first year`,
          `• Collaborated with stakeholders to develop comprehensive ${industry} solutions, improving customer satisfaction scores by 40%`
        ];
        newSuggestions = experienceTemplates;
      } else if (type === 'skills') {
        const skillsByIndustry: Record<string, string[]> = {
          'technology': ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Git', 'Agile', 'SQL', 'API Development'],
          'healthcare': ['Electronic Health Records', 'HIPAA Compliance', 'Patient Care', 'Medical Terminology', 'Healthcare Analytics', 'Quality Assurance'],
          'finance': ['Financial Analysis', 'Risk Management', 'Excel', 'SAP', 'Bloomberg Terminal', 'Regulatory Compliance', 'Financial Modeling'],
          'marketing': ['Digital Marketing', 'SEO/SEM', 'Google Analytics', 'Social Media', 'Content Creation', 'A/B Testing', 'CRM'],
          'default': ['Communication', 'Leadership', 'Project Management', 'Problem Solving', 'Team Collaboration', 'Time Management']
        };
        newSuggestions = skillsByIndustry[industry] || skillsByIndustry['default'];
      }
      
      setSuggestions(newSuggestions);
      setLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionSelect(suggestion);
  };

  if (!jobTitle || !industry) {
    return null;
  }

  return (
    <Card className="mt-2 p-3 bg-blue-50 border-blue-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">AI Suggestions</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={generateSuggestions}
          disabled={loading}
          className="text-blue-600 hover:text-blue-800"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          {loading ? 'Generating...' : 'Generate'}
        </Button>
      </div>
      
      {suggestions.length > 0 && (
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="text-sm p-2 bg-white rounded border cursor-pointer hover:bg-blue-50 transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
          <p className="text-xs text-blue-600 mt-2">
            Click on any suggestion to use it in your resume
          </p>
        </div>
      )}
    </Card>
  );
};

export default ContentSuggestions;
