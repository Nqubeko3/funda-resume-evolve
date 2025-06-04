
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ResumeData, ATSScore } from '@/types/resume';
import { BarChart3, CheckCircle, AlertTriangle, TrendingUp, Target } from 'lucide-react';

interface ATSAnalyzerProps {
  resumeData: ResumeData;
}

const ATSAnalyzer: React.FC<ATSAnalyzerProps> = ({ resumeData }) => {
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeData) {
      analyzeResume();
    }
  }, [resumeData]);

  const analyzeResume = () => {
    setLoading(true);
    
    // Simulate ATS analysis
    setTimeout(() => {
      const analysis = performATSAnalysis(resumeData);
      setAtsScore(analysis);
      setLoading(false);
    }, 1500);
  };

  const performATSAnalysis = (data: ResumeData): ATSScore => {
    // Keyword analysis based on industry
    const industryKeywords: Record<string, string[]> = {
      'technology': [
        'software development', 'programming', 'agile', 'scrum', 'javascript', 'python', 
        'react', 'node.js', 'api', 'database', 'cloud', 'aws', 'git', 'testing'
      ],
      'healthcare': [
        'patient care', 'medical records', 'hipaa', 'clinical', 'healthcare', 
        'nursing', 'treatment', 'diagnosis', 'medical terminology', 'compliance'
      ],
      'finance': [
        'financial analysis', 'risk management', 'investment', 'portfolio', 
        'banking', 'accounting', 'excel', 'financial modeling', 'compliance', 'audit'
      ],
      'marketing': [
        'digital marketing', 'seo', 'social media', 'content creation', 'analytics', 
        'campaigns', 'brand management', 'lead generation', 'conversion', 'roi'
      ],
      'sales': [
        'sales', 'customer relationship', 'lead generation', 'closing deals', 
        'pipeline', 'crm', 'revenue', 'targets', 'negotiation', 'account management'
      ],
      'education': [
        'curriculum', 'teaching', 'student', 'learning', 'assessment', 
        'classroom management', 'educational technology', 'pedagogy', 'development'
      ]
    };

    const defaultKeywords = [
      'leadership', 'communication', 'teamwork', 'problem solving', 
      'project management', 'collaboration', 'innovation', 'results-driven'
    ];

    const relevantKeywords = industryKeywords[data.industry] || defaultKeywords;
    
    // Extract all text from resume
    const resumeText = [
      data.personalInfo.summary,
      ...data.experience.flatMap(exp => exp.description),
      ...data.education.map(edu => `${edu.degree} ${edu.field}`),
      ...data.skills.flatMap(skill => skill.skills),
      ...data.projects.map(proj => proj.description),
      data.jobTitle
    ].join(' ').toLowerCase();

    // Find matched keywords
    const matchedKeywords = relevantKeywords.filter(keyword => 
      resumeText.includes(keyword.toLowerCase())
    );

    const missingKeywords = relevantKeywords.filter(keyword => 
      !resumeText.includes(keyword.toLowerCase())
    ).slice(0, 10); // Limit to top 10 missing

    // Calculate scores
    const keywordMatch = Math.min((matchedKeywords.length / relevantKeywords.length) * 100, 100);
    
    // Formatting score (check for common ATS-friendly practices)
    let formattingScore = 100;
    if (!data.personalInfo.email) formattingScore -= 20;
    if (!data.personalInfo.phone) formattingScore -= 15;
    if (data.experience.length === 0) formattingScore -= 30;
    if (data.education.length === 0) formattingScore -= 20;
    if (data.skills.length === 0) formattingScore -= 15;

    // Readability score (based on content quality)
    let readabilityScore = 85;
    if (data.personalInfo.summary.length < 100) readabilityScore -= 15;
    if (data.experience.some(exp => exp.description.length < 2)) readabilityScore -= 10;

    const overall = (keywordMatch * 0.4 + formattingScore * 0.3 + readabilityScore * 0.3);

    // Generate suggestions
    const suggestions: string[] = [];
    
    if (keywordMatch < 60) {
      suggestions.push(`Include more industry-relevant keywords. You're missing ${missingKeywords.length} important terms.`);
    }
    
    if (!data.personalInfo.linkedin) {
      suggestions.push('Add your LinkedIn profile URL to improve professional visibility.');
    }
    
    if (data.experience.some(exp => exp.description.some(desc => !desc.includes('•')))) {
      suggestions.push('Use bullet points for experience descriptions to improve readability.');
    }
    
    if (data.skills.length < 3) {
      suggestions.push('Add more skill categories to showcase your diverse capabilities.');
    }
    
    if (data.personalInfo.summary.length < 150) {
      suggestions.push('Expand your professional summary to 150-200 words for better impact.');
    }

    if (data.experience.some(exp => !exp.description.some(desc => /\d+/.test(desc)))) {
      suggestions.push('Quantify your achievements with specific numbers and metrics.');
    }

    return {
      overall: Math.round(overall),
      keywordMatch: Math.round(keywordMatch),
      formatting: Math.round(formattingScore),
      readability: Math.round(readabilityScore),
      suggestions,
      matchedKeywords,
      missingKeywords
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>ATS Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing your resume...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!atsScore) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>ATS Compatibility Score</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(atsScore.overall)}`}>
            {atsScore.overall}%
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {getScoreLevel(atsScore.overall)} ATS Compatibility
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Keyword Match</span>
              <span className={getScoreColor(atsScore.keywordMatch)}>
                {atsScore.keywordMatch}%
              </span>
            </div>
            <Progress value={atsScore.keywordMatch} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Formatting</span>
              <span className={getScoreColor(atsScore.formatting)}>
                {atsScore.formatting}%
              </span>
            </div>
            <Progress value={atsScore.formatting} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Readability</span>
              <span className={getScoreColor(atsScore.readability)}>
                {atsScore.readability}%
              </span>
            </div>
            <Progress value={atsScore.readability} className="h-2" />
          </div>
        </div>

        {/* Matched Keywords */}
        {atsScore.matchedKeywords.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              Matched Keywords ({atsScore.matchedKeywords.length})
            </h4>
            <div className="flex flex-wrap gap-1">
              {atsScore.matchedKeywords.slice(0, 10).map((keyword, index) => (
                <Badge key={index} variant="default" className="text-xs bg-green-100 text-green-800">
                  {keyword}
                </Badge>
              ))}
              {atsScore.matchedKeywords.length > 10 && (
                <Badge variant="secondary" className="text-xs">
                  +{atsScore.matchedKeywords.length - 10} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Missing Keywords */}
        {atsScore.missingKeywords.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <Target className="h-4 w-4 text-orange-600 mr-2" />
              Suggested Keywords to Add
            </h4>
            <div className="flex flex-wrap gap-1">
              {atsScore.missingKeywords.slice(0, 8).map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-xs border-orange-300 text-orange-700">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {atsScore.suggestions.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
              Improvement Suggestions
            </h4>
            <div className="space-y-2">
              {atsScore.suggestions.map((suggestion, index) => (
                <Alert key={index}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    {suggestion}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ATSAnalyzer;
