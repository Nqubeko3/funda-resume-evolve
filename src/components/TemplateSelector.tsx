
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Template, TemplateInfo, ResumeData } from '@/types/resume';
import { FileText, Sparkles, Palette, Eye, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onTemplateChange: (template: Template) => void;
  resumeData: ResumeData | null;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
  resumeData
}) => {
  const templates: TemplateInfo[] = [
    // Professional Templates
    {
      id: 'professional1',
      name: 'Executive Classic',
      category: 'Professional',
      description: 'Clean, traditional layout perfect for corporate positions',
      preview: '/api/placeholder/300/400',
      features: ['ATS-Friendly', 'Clean Layout', 'Professional Typography', 'Contact Sidebar']
    },
    {
      id: 'professional2',
      name: 'Corporate Elite',
      category: 'Professional',
      description: 'Sophisticated design for senior-level positions',
      preview: '/api/placeholder/300/400',
      features: ['Executive Focus', 'Skills Matrix', 'Achievement Highlights', 'Professional Header']
    },
    {
      id: 'professional3',
      name: 'Business Standard',
      category: 'Professional',
      description: 'Versatile template suitable for various industries',
      preview: '/api/placeholder/300/400',
      features: ['Industry Agnostic', 'Balanced Layout', 'Clear Sections', 'Conservative Design']
    },
    {
      id: 'professional4',
      name: 'Finance Pro',
      category: 'Professional',
      description: 'Tailored for finance and consulting professionals',
      preview: '/api/placeholder/300/400',
      features: ['Numbers Focus', 'Achievement Metrics', 'Conservative Colors', 'Data Emphasis']
    },
    {
      id: 'professional5',
      name: 'Legal Expert',
      category: 'Professional',
      description: 'Formal design for legal and government positions',
      preview: '/api/placeholder/300/400',
      features: ['Formal Structure', 'Detailed Sections', 'Traditional Font', 'Compliance Ready']
    },
    // Modern Templates
    {
      id: 'modern1',
      name: 'Tech Innovator',
      category: 'Modern',
      description: 'Contemporary design for tech professionals',
      preview: '/api/placeholder/300/400',
      features: ['Tech-Focused', 'Skills Visualization', 'Modern Typography', 'Project Showcase']
    },
    {
      id: 'modern2',
      name: 'Digital Native',
      category: 'Modern',
      description: 'Fresh, dynamic layout for digital professionals',
      preview: '/api/placeholder/300/400',
      features: ['Digital Focus', 'Portfolio Integration', 'Social Links', 'Interactive Elements']
    },
    {
      id: 'modern3',
      name: 'Startup Spirit',
      category: 'Modern',
      description: 'Flexible design for startup and entrepreneurial roles',
      preview: '/api/placeholder/300/400',
      features: ['Startup Culture', 'Growth Metrics', 'Innovation Focus', 'Agile Methodology']
    },
    // Creative Template
    {
      id: 'creative1',
      name: 'Designer Portfolio',
      category: 'Creative',
      description: 'Visual-first design for creative professionals',
      preview: '/api/placeholder/300/400',
      features: ['Visual Portfolio', 'Creative Sections', 'Color Accents', 'Design Elements']
    }
  ];

  const handleCustomDesignRequest = (formData: any) => {
    toast({
      title: "Custom Design Request Submitted",
      description: "We'll review your requirements and create a tailored template within 48 hours.",
    });
  };

  const renderTemplatePreview = (template: TemplateInfo) => {
    if (!resumeData) {
      return (
        <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <FileText className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Add resume data to preview</p>
          </div>
        </div>
      );
    }

    // Simplified preview based on template style
    const getTemplateStyles = (templateId: Template) => {
      switch (templateId) {
        case 'professional1':
          return 'bg-white border-2 border-gray-300';
        case 'professional2':
          return 'bg-gray-50 border-2 border-gray-400';
        case 'professional3':
          return 'bg-white border border-gray-300 shadow-sm';
        case 'professional4':
          return 'bg-blue-50 border-2 border-blue-200';
        case 'professional5':
          return 'bg-white border-2 border-black';
        case 'modern1':
          return 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-300';
        case 'modern2':
          return 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-300';
        case 'modern3':
          return 'bg-gradient-to-br from-orange-50 to-red-50 border border-orange-300';
        case 'creative1':
          return 'bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 border-2 border-purple-300';
        default:
          return 'bg-white border border-gray-300';
      }
    };

    return (
      <div className={`h-48 p-3 rounded-lg text-xs ${getTemplateStyles(template.id)} overflow-hidden`}>
        <div className="space-y-2">
          <div className="font-bold text-sm">{resumeData.personalInfo.fullName}</div>
          <div className="text-gray-600">{resumeData.jobTitle}</div>
          <div className="text-gray-500 text-xs">{resumeData.personalInfo.email}</div>
          
          <div className="pt-2">
            <div className="font-semibold text-xs">EXPERIENCE</div>
            <div className="h-1 bg-gray-300 rounded mt-1"></div>
            {resumeData.experience.slice(0, 2).map((exp, i) => (
              <div key={i} className="mt-2">
                <div className="font-medium text-xs">{exp.company}</div>
                <div className="text-gray-600 text-xs">{exp.position}</div>
              </div>
            ))}
          </div>
          
          <div className="pt-2">
            <div className="font-semibold text-xs">EDUCATION</div>
            <div className="h-1 bg-gray-300 rounded mt-1"></div>
            {resumeData.education.slice(0, 1).map((edu, i) => (
              <div key={i} className="mt-1">
                <div className="font-medium text-xs">{edu.institution}</div>
                <div className="text-gray-600 text-xs">{edu.degree}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Resume Template</h2>
        <p className="text-gray-600">Select a professional template that matches your industry and style</p>
      </div>

      <Tabs defaultValue="Professional" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Professional">Professional</TabsTrigger>
          <TabsTrigger value="Modern">Modern</TabsTrigger>
          <TabsTrigger value="Creative">Creative</TabsTrigger>
        </TabsList>

        {['Professional', 'Modern', 'Creative'].map(category => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.filter(template => template.category === category).map((template) => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedTemplate === template.id 
                      ? 'ring-2 ring-blue-500 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => onTemplateChange(template.id)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {template.name}
                      {selectedTemplate === template.id && (
                        <Badge variant="default">Selected</Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {renderTemplatePreview(template)}
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {template.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant={selectedTemplate === template.id ? "default" : "outline"}
                          size="sm"
                          className="flex-1"
                          onClick={() => onTemplateChange(template.id)}
                        >
                          {selectedTemplate === template.id ? (
                            <>
                              <Eye className="h-4 w-4 mr-2" />
                              Selected
                            </>
                          ) : (
                            'Select Template'
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Custom Design Request */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Palette className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Need a Custom Design?</h3>
              <p className="text-gray-600 mb-4">
                Can't find the perfect template? Request a custom design tailored to your specific needs and industry requirements.
              </p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Request Custom Design
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Request Custom Template</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleCustomDesignRequest(Object.fromEntries(formData));
                  }} className="space-y-4">
                    <div>
                      <Label htmlFor="industry">Industry/Field</Label>
                      <Input
                        id="industry"
                        name="industry"
                        placeholder="e.g., Healthcare, Law, Creative, etc."
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="position">Target Position</Label>
                      <Input
                        id="position"
                        name="position"
                        placeholder="e.g., Senior Developer, Marketing Manager"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="style">Preferred Style</Label>
                      <Input
                        id="style"
                        name="style"
                        placeholder="e.g., Modern, Conservative, Creative"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="requirements">Special Requirements</Label>
                      <Textarea
                        id="requirements"
                        name="requirements"
                        placeholder="Describe any specific layout preferences, color schemes, or unique requirements..."
                        className="min-h-20"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Contact Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Submit Request
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateSelector;
