import React from 'react';
import { Card } from '@/components/ui/card';
import { ResumeData, Template } from '@/types/resume';
import { Calendar, MapPin, Mail, Phone, Globe, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: Template;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template }) => {
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

  const renderProfessionalTemplate = () => {
    const getTemplateStyles = () => {
      switch (template) {
        case 'professional1':
          return {
            container: 'bg-white max-w-4xl mx-auto min-h-screen',
            header: 'bg-gray-50 p-8 border-b-2 border-gray-300',
            name: 'text-3xl font-bold text-gray-800 mb-2',
            title: 'text-xl text-gray-600 mb-4',
            contact: 'grid grid-cols-2 gap-4 text-sm text-gray-600',
            section: 'mb-8',
            sectionTitle: 'text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300 uppercase tracking-wide',
            content: 'text-gray-700 leading-relaxed'
          };
        case 'professional2':
          return {
            container: 'bg-white max-w-4xl mx-auto min-h-screen shadow-lg',
            header: 'bg-gray-800 text-white p-8',
            name: 'text-3xl font-bold mb-2',
            title: 'text-xl text-gray-300 mb-4',
            contact: 'grid grid-cols-2 gap-4 text-sm text-gray-300',
            section: 'p-8 mb-0',
            sectionTitle: 'text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-800 uppercase tracking-wide',
            content: 'text-gray-700 leading-relaxed'
          };
        case 'professional3':
          return {
            container: 'bg-white max-w-4xl mx-auto min-h-screen border border-gray-200',
            header: 'p-8 border-b border-gray-200',
            name: 'text-3xl font-bold text-gray-900 mb-2',
            title: 'text-xl text-blue-600 mb-4',
            contact: 'grid grid-cols-2 gap-4 text-sm text-gray-600',
            section: 'p-8 mb-0',
            sectionTitle: 'text-lg font-bold text-blue-600 mb-4 pb-2 border-b border-blue-200 uppercase tracking-wide',
            content: 'text-gray-700 leading-relaxed'
          };
        case 'professional4':
          return {
            container: 'bg-white max-w-4xl mx-auto min-h-screen',
            header: 'bg-blue-50 p-8 border-l-4 border-blue-600',
            name: 'text-3xl font-bold text-gray-900 mb-2',
            title: 'text-xl text-blue-700 mb-4',
            contact: 'grid grid-cols-2 gap-4 text-sm text-gray-600',
            section: 'p-8 mb-0',
            sectionTitle: 'text-lg font-bold text-blue-700 mb-4 pb-2 border-b border-blue-300 uppercase tracking-wide',
            content: 'text-gray-700 leading-relaxed'
          };
        case 'professional5':
          return {
            container: 'bg-white max-w-4xl mx-auto min-h-screen border-2 border-black',
            header: 'p-8 border-b-2 border-black',
            name: 'text-3xl font-bold text-black mb-2',
            title: 'text-xl text-gray-700 mb-4',
            contact: 'grid grid-cols-2 gap-4 text-sm text-gray-700',
            section: 'p-8 mb-0',
            sectionTitle: 'text-lg font-bold text-black mb-4 pb-2 border-b-2 border-black uppercase tracking-wide',
            content: 'text-gray-700 leading-relaxed'
          };
        default:
          return {
            container: 'bg-white max-w-4xl mx-auto min-h-screen',
            header: 'p-8 border-b border-gray-200',
            name: 'text-3xl font-bold text-gray-900 mb-2',
            title: 'text-xl text-gray-600 mb-4',
            contact: 'grid grid-cols-2 gap-4 text-sm text-gray-600',
            section: 'p-8 mb-0',
            sectionTitle: 'text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300 uppercase tracking-wide',
            content: 'text-gray-700 leading-relaxed'
          };
      }
    };

    const styles = getTemplateStyles();

    return (
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.name}>{resumeData.personalInfo.fullName}</h1>
          <h2 className={styles.title}>{resumeData.jobTitle}</h2>
          
          <div className={styles.contact}>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{resumeData.personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
            {resumeData.personalInfo.linkedin && (
              <div className="flex items-center space-x-2">
                <Linkedin className="h-4 w-4" />
                <span>{resumeData.personalInfo.linkedin}</span>
              </div>
            )}
            {resumeData.personalInfo.website && (
              <div className="flex items-center space-x-2 col-span-2">
                <Globe className="h-4 w-4" />
                <span>{resumeData.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Professional Summary</h3>
          <p className={styles.content}>{resumeData.personalInfo.summary}</p>
        </div>

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Professional Experience</h3>
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{exp.position}</h4>
                      <p className="text-base font-medium text-gray-700">{exp.company} • {exp.location}</p>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {exp.description.filter(desc => desc.trim()).map((desc, index) => (
                      <li key={index} className={`${styles.content} flex items-start`}>
                        <span className="mr-2">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Education</h3>
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{edu.degree} in {edu.field}</h4>
                    <p className="text-base font-medium text-gray-700">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    {edu.honors && <p className="text-sm text-gray-600">{edu.honors}</p>}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Skills</h3>
            <div className="space-y-3">
              {resumeData.skills.map((skillCategory, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-gray-900 mb-2">{skillCategory.category}</h4>
                  <p className={styles.content}>{skillCategory.skills.join(' • ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Projects</h3>
            <div className="space-y-4">
              {resumeData.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{project.name}</h4>
                      {project.link && (
                        <p className="text-sm text-blue-600">{project.link}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDateRange(project.startDate, project.endDate)}
                    </div>
                  </div>
                  <p className={`${styles.content} mb-2`}>{project.description}</p>
                  <p className="text-sm text-gray-600">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Certifications</h3>
            <div className="space-y-3">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                    <p className="text-gray-700">{cert.issuer}</p>
                    {cert.credentialId && (
                      <p className="text-sm text-gray-600">Credential ID: {cert.credentialId}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(cert.date)}
                    {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {resumeData.references.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>References</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.references.map((ref) => (
                <div key={ref.id} className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-semibold text-gray-900">{ref.name}</h4>
                  <p className="text-gray-700">{ref.title}</p>
                  <p className="text-gray-700">{ref.company}</p>
                  <p className="text-sm text-gray-600">{ref.relationship}</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>{ref.email}</p>
                    <p>{ref.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderModernTemplate = () => {
    const getModernStyles = () => {
      switch (template) {
        case 'modern1':
          return {
            container: 'bg-gradient-to-br from-blue-50 to-purple-50 max-w-4xl mx-auto min-h-screen',
            header: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8',
            name: 'text-4xl font-bold mb-2',
            title: 'text-xl text-blue-100 mb-4',
            section: 'p-8 mb-0',
            sectionTitle: 'text-lg font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-300'
          };
        case 'modern2':
          return {
            container: 'bg-gradient-to-r from-green-50 to-blue-50 max-w-4xl mx-auto min-h-screen',
            header: 'bg-gradient-to-r from-green-600 to-blue-600 text-white p-8',
            name: 'text-4xl font-bold mb-2',
            title: 'text-xl text-green-100 mb-4',
            section: 'p-8 mb-0',
            sectionTitle: 'text-lg font-bold text-green-700 mb-4 pb-2 border-b-2 border-green-300'
          };
        case 'modern3':
          return {
            container: 'bg-gradient-to-br from-orange-50 to-red-50 max-w-4xl mx-auto min-h-screen',
            header: 'bg-gradient-to-r from-orange-600 to-red-600 text-white p-8',
            name: 'text-4xl font-bold mb-2',
            title: 'text-xl text-orange-100 mb-4',
            section: 'p-8 mb-0',
            sectionTitle: 'text-lg font-bold text-orange-700 mb-4 pb-2 border-b-2 border-orange-300'
          };
        default:
          return {
            container: 'bg-gradient-to-br from-blue-50 to-purple-50 max-w-4xl mx-auto min-h-screen',
            header: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8',
            name: 'text-4xl font-bold mb-2',
            title: 'text-xl text-blue-100 mb-4',
            section: 'p-8 mb-0',
            sectionTitle: 'text-lg font-bold text-blue-700 mb-4 pb-2 border-b-2 border-blue-300'
          };
      }
    };

    const styles = getModernStyles();

    return (
      <div className={styles.container}>
        {/* Similar structure but with modern styling */}
        <div className={styles.header}>
          <h1 className={styles.name}>{resumeData.personalInfo.fullName}</h1>
          <h2 className={styles.title}>{resumeData.jobTitle}</h2>
          {/* Contact info with modern styling */}
        </div>
        {/* Rest of the sections with modern styling */}
        {/* ... similar to professional but with gradient backgrounds and modern colors */}
      </div>
    );
  };

  const renderCreativeTemplate = () => {
    return (
      <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 max-w-4xl mx-auto min-h-screen">
        {/* Creative template with unique layout and styling */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white p-8">
          <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.fullName}</h1>
          <h2 className="text-xl text-purple-100 mb-4">{resumeData.jobTitle}</h2>
          {/* Creative contact section */}
        </div>
        {/* Creative sections with unique styling */}
      </div>
    );
  };

  const renderTemplate = () => {
    if (template.startsWith('modern')) {
      return renderModernTemplate();
    } else if (template === 'creative1') {
      return renderCreativeTemplate();
    } else {
      return renderProfessionalTemplate();
    }
  };

  return (
    <Card className="w-full">
      <div className="p-4">
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Resume Preview</h2>
          <p className="text-sm text-gray-600">
            This is how your resume will appear when exported. Scroll down to see all sections.
          </p>
        </div>
        
        <div className="border rounded-lg overflow-hidden shadow-lg bg-white" style={{ minHeight: '800px' }}>
          <div className="transform scale-75 origin-top-left" style={{ width: '133.33%' }}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResumePreview;
