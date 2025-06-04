
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResumeData, Template } from '@/types/resume';
import { Download, FileText, Globe, Printer, Zap, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ExportOptionsProps {
  resumeData: ResumeData;
  template: Template;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ resumeData, template }) => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx' | 'html'>('pdf');
  const [includeReferences, setIncludeReferences] = useState(true);
  const [quality, setQuality] = useState<'standard' | 'high'>('high');
  const [exporting, setExporting] = useState(false);

  const generateHTMLContent = (): string => {
    // Generate complete HTML resume
    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    const formatDateRange = (startDate: string, endDate: string, current: boolean = false) => {
      const start = formatDate(startDate);
      const end = current ? 'Present' : formatDate(endDate);
      return `${start} - ${end}`;
    };

    const getTemplateCSS = () => {
      switch (template) {
        case 'professional1':
          return `
            body { font-family: 'Times New Roman', serif; color: #333; line-height: 1.6; }
            .header { background: #f8f9fa; padding: 2rem; border-bottom: 2px solid #dee2e6; }
            .section-title { color: #333; border-bottom: 1px solid #dee2e6; padding-bottom: 0.5rem; margin-bottom: 1rem; font-weight: bold; text-transform: uppercase; }
          `;
        case 'modern1':
          return `
            body { font-family: 'Arial', sans-serif; color: #333; line-height: 1.6; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; }
            .section-title { color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 0.5rem; margin-bottom: 1rem; font-weight: bold; }
          `;
        default:
          return `
            body { font-family: 'Arial', sans-serif; color: #333; line-height: 1.6; }
            .header { background: #f8f9fa; padding: 2rem; border-bottom: 1px solid #dee2e6; }
            .section-title { color: #333; border-bottom: 1px solid #dee2e6; padding-bottom: 0.5rem; margin-bottom: 1rem; font-weight: bold; }
          `;
      }
    };

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.personalInfo.fullName} - Resume</title>
    <style>
        ${getTemplateCSS()}
        .container { max-width: 800px; margin: 0 auto; background: white; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .section { padding: 1.5rem; }
        .contact-info { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
        .experience-item, .education-item { margin-bottom: 1.5rem; }
        .job-title { font-weight: bold; color: #333; }
        .company { color: #666; }
        .date-range { color: #888; font-size: 0.9em; }
        .description { margin-top: 0.5rem; }
        .description li { margin-bottom: 0.3rem; }
        .skills-category { margin-bottom: 1rem; }
        .skills-list { color: #666; }
        ul { padding-left: 1.2rem; }
        @media print {
            .container { box-shadow: none; }
            .header { background: #f8f9fa !important; color: #333 !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 2.5rem;">${resumeData.personalInfo.fullName}</h1>
            <h2 style="margin: 0.5rem 0; font-size: 1.5rem; opacity: 0.8;">${resumeData.jobTitle}</h2>
            <div class="contact-info">
                <div>📧 ${resumeData.personalInfo.email}</div>
                <div>📱 ${resumeData.personalInfo.phone}</div>
                <div>📍 ${resumeData.personalInfo.location}</div>
                ${resumeData.personalInfo.linkedin ? `<div>💼 ${resumeData.personalInfo.linkedin}</div>` : ''}
                ${resumeData.personalInfo.website ? `<div>🌐 ${resumeData.personalInfo.website}</div>` : ''}
            </div>
        </div>

        <div class="section">
            <h3 class="section-title">Professional Summary</h3>
            <p>${resumeData.personalInfo.summary}</p>
        </div>

        ${resumeData.experience.length > 0 ? `
        <div class="section">
            <h3 class="section-title">Professional Experience</h3>
            ${resumeData.experience.map(exp => `
                <div class="experience-item">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                        <div>
                            <div class="job-title">${exp.position}</div>
                            <div class="company">${exp.company} • ${exp.location}</div>
                        </div>
                        <div class="date-range">${formatDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                    </div>
                    <div class="description">
                        <ul>
                            ${exp.description.filter(desc => desc.trim()).map(desc => `<li>${desc}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resumeData.education.length > 0 ? `
        <div class="section">
            <h3 class="section-title">Education</h3>
            ${resumeData.education.map(edu => `
                <div class="education-item">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <div class="job-title">${edu.degree} in ${edu.field}</div>
                            <div class="company">${edu.institution}</div>
                            ${edu.gpa ? `<div style="font-size: 0.9em; color: #666;">GPA: ${edu.gpa}</div>` : ''}
                            ${edu.honors ? `<div style="font-size: 0.9em; color: #666;">${edu.honors}</div>` : ''}
                        </div>
                        <div class="date-range">${formatDateRange(edu.startDate, edu.endDate)}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resumeData.skills.length > 0 ? `
        <div class="section">
            <h3 class="section-title">Skills</h3>
            ${resumeData.skills.map(skillCategory => `
                <div class="skills-category">
                    <div class="job-title">${skillCategory.category}</div>
                    <div class="skills-list">${skillCategory.skills.join(' • ')}</div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resumeData.projects.length > 0 ? `
        <div class="section">
            <h3 class="section-title">Projects</h3>
            ${resumeData.projects.map(project => `
                <div class="experience-item">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                        <div>
                            <div class="job-title">${project.name}</div>
                            ${project.link ? `<div style="font-size: 0.9em; color: #0066cc;">${project.link}</div>` : ''}
                        </div>
                        <div class="date-range">${formatDateRange(project.startDate, project.endDate)}</div>
                    </div>
                    <div class="description">
                        <p>${project.description}</p>
                        <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${resumeData.certifications.length > 0 ? `
        <div class="section">
            <h3 class="section-title">Certifications</h3>
            ${resumeData.certifications.map(cert => `
                <div style="margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <div class="job-title">${cert.name}</div>
                            <div class="company">${cert.issuer}</div>
                            ${cert.credentialId ? `<div style="font-size: 0.9em; color: #666;">Credential ID: ${cert.credentialId}</div>` : ''}
                        </div>
                        <div class="date-range">${formatDate(cert.date)}${cert.expiryDate ? ` - ${formatDate(cert.expiryDate)}` : ''}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${includeReferences && resumeData.references.length > 0 ? `
        <div class="section">
            <h3 class="section-title">References</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                ${resumeData.references.map(ref => `
                    <div style="border-left: 2px solid #dee2e6; padding-left: 1rem;">
                        <div class="job-title">${ref.name}</div>
                        <div class="company">${ref.title}</div>
                        <div class="company">${ref.company}</div>
                        <div style="font-size: 0.9em; color: #666; margin-top: 0.5rem;">${ref.relationship}</div>
                        <div style="font-size: 0.9em; color: #666;">
                            <div>${ref.email}</div>
                            <div>${ref.phone}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    </div>
</body>
</html>
    `;
  };

  const exportToPDF = async () => {
    try {
      // For this demo, we'll use html2pdf.js (you would need to add this library)
      // In a real implementation, you'd use libraries like jsPDF with html2canvas or Puppeteer
      const htmlContent = generateHTMLContent();
      
      // Create a blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Resume Exported",
        description: "Your resume has been downloaded as an HTML file. You can open it in a browser and print to PDF.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportToHTML = () => {
    const htmlContent = generateHTMLContent();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "HTML Export Complete",
      description: "Your resume has been downloaded as an HTML file.",
    });
  };

  const exportToDOCX = () => {
    // For DOCX export, you would typically use libraries like docx.js
    // For this demo, we'll provide the HTML content
    toast({
      title: "DOCX Export",
      description: "DOCX export feature coming soon! Use HTML export and convert using online tools.",
    });
  };

  const handleExport = async () => {
    setExporting(true);
    
    try {
      switch (exportFormat) {
        case 'pdf':
          await exportToPDF();
          break;
        case 'html':
          exportToHTML();
          break;
        case 'docx':
          exportToDOCX();
          break;
      }
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  const previewInBrowser = () => {
    const htmlContent = generateHTMLContent();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    
    toast({
      title: "Preview Opened",
      description: "Your resume has been opened in a new tab for preview.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Export Your Resume</h2>
        <p className="text-gray-600">Choose your preferred format and quality settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Options */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Export Format</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                  className={`cursor-pointer transition-all ${exportFormat === 'pdf' ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
                  onClick={() => setExportFormat('pdf')}
                >
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-red-600" />
                    <h3 className="font-semibold">PDF</h3>
                    <p className="text-sm text-gray-600">Best for applications</p>
                    <Badge variant="secondary" className="mt-2">Recommended</Badge>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all ${exportFormat === 'html' ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
                  onClick={() => setExportFormat('html')}
                >
                  <CardContent className="p-4 text-center">
                    <Globe className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold">HTML</h3>
                    <p className="text-sm text-gray-600">For web sharing</p>
                    <Badge variant="outline" className="mt-2">Available</Badge>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all ${exportFormat === 'docx' ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
                  onClick={() => setExportFormat('docx')}
                >
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-blue-800" />
                    <h3 className="font-semibold">DOCX</h3>
                    <p className="text-sm text-gray-600">For editing</p>
                    <Badge variant="outline" className="mt-2">Coming Soon</Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="quality">Export Quality</Label>
                  <Select value={quality} onValueChange={(value: 'standard' | 'high') => setQuality(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Quality</SelectItem>
                      <SelectItem value="high">High Quality (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="includeReferences"
                    checked={includeReferences}
                    onCheckedChange={setIncludeReferences}
                  />
                  <Label htmlFor="includeReferences">Include References Section</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Export Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={previewInBrowser}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Globe className="h-4 w-4" />
                  <span>Preview in Browser</span>
                </Button>

                <Button 
                  onClick={handleExport}
                  disabled={exporting}
                  className="flex items-center space-x-2"
                >
                  {exporting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Exporting...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Export Resume</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Zap className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">Pro Tips:</p>
                    <ul className="mt-1 space-y-1 text-blue-700">
                      <li>• PDF format is most widely accepted by employers</li>
                      <li>• Always preview before sending to ensure formatting is correct</li>
                      <li>• Save multiple versions for different job applications</li>
                      <li>• HTML format allows for easy online sharing and portfolio integration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Export Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Format:</span>
                  <Badge variant="default">{exportFormat.toUpperCase()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quality:</span>
                  <Badge variant="secondary">{quality === 'high' ? 'High' : 'Standard'}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">References:</span>
                  <Badge variant={includeReferences ? 'default' : 'outline'}>
                    {includeReferences ? 'Included' : 'Excluded'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Template:</span>
                  <Badge variant="outline">{template}</Badge>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <h4 className="font-medium text-sm">Resume Sections:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Personal Information</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Professional Summary</span>
                  </div>
                  {resumeData.experience.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Experience ({resumeData.experience.length})</span>
                    </div>
                  )}
                  {resumeData.education.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Education ({resumeData.education.length})</span>
                    </div>
                  )}
                  {resumeData.skills.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Skills ({resumeData.skills.length} categories)</span>
                    </div>
                  )}
                  {resumeData.projects.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Projects ({resumeData.projects.length})</span>
                    </div>
                  )}
                  {resumeData.certifications.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Certifications ({resumeData.certifications.length})</span>
                    </div>
                  )}
                  {includeReferences && resumeData.references.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>References ({resumeData.references.length})</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Print Instructions */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Printer className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Print Instructions</h3>
              </div>
              
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Use "Preview in Browser" then print from browser</li>
                <li>• Select "Save as PDF" in your print dialog</li>
                <li>• Use high-quality paper for physical prints</li>
                <li>• Review alignment and spacing before final print</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;
