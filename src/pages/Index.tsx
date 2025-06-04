
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResumeForm from '@/components/ResumeForm';
import TemplateSelector from '@/components/TemplateSelector';
import ResumePreview from '@/components/ResumePreview';
import ExportOptions from '@/components/ExportOptions';
import ATSAnalyzer from '@/components/ATSAnalyzer';
import { ResumeData, Template } from '@/types/resume';
import { UserCircle, FileText, Download, BarChart3, Sparkles } from 'lucide-react';

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('professional1');
  const [currentStep, setCurrentStep] = useState('input');

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    if (resumeData) {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }
  }, [resumeData]);

  const handleDataChange = (data: ResumeData) => {
    setResumeData(data);
  };

  const handleTemplateChange = (template: Template) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Funda Resume Maker
                </h1>
                <p className="text-sm text-gray-600">Create ATS-friendly, professional resumes in minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={currentStep} onValueChange={setCurrentStep} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2 mx-auto">
            <TabsTrigger value="input" className="flex items-center space-x-2">
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Input</span>
            </TabsTrigger>
            <TabsTrigger value="template" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Template</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ResumeForm onDataChange={handleDataChange} initialData={resumeData} />
              </div>
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Use action verbs to start bullet points</li>
                    <li>• Quantify achievements with numbers</li>
                    <li>• Tailor keywords to your target job</li>
                    <li>• Keep descriptions concise and impactful</li>
                  </ul>
                </Card>
                {resumeData && (
                  <ATSAnalyzer resumeData={resumeData} />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="template" className="space-y-6">
            <TemplateSelector 
              selectedTemplate={selectedTemplate}
              onTemplateChange={handleTemplateChange}
              resumeData={resumeData}
            />
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {resumeData ? (
              <ResumePreview 
                resumeData={resumeData}
                template={selectedTemplate}
              />
            ) : (
              <Card className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Resume Data</h3>
                <p className="text-gray-500">Please fill out the form in the Input tab to see your resume preview.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            {resumeData ? (
              <ExportOptions 
                resumeData={resumeData}
                template={selectedTemplate}
              />
            ) : (
              <Card className="p-12 text-center">
                <Download className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Resume to Export</h3>
                <p className="text-gray-500">Please complete your resume to access export options.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
