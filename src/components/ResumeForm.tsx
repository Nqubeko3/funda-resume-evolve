
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ResumeData, PersonalInfo, Experience, Education, Skill, Project, Certification, Reference } from '@/types/resume';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, Award, Users, Lightbulb } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ContentSuggestions from './ContentSuggestions';

interface ResumeFormProps {
  onDataChange: (data: ResumeData) => void;
  initialData: ResumeData | null;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    references: [],
    jobTitle: '',
    industry: '',
    targetJobDescription: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
      location: ''
    };
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: ''
    };
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkillCategory = () => {
    const newSkill: Skill = {
      category: '',
      skills: []
    };
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkillCategory = (index: number, category: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, category } : skill
      )
    }));
  };

  const updateSkills = (index: number, skillsText: string) => {
    const skillsArray = skillsText.split(',').map(s => s.trim()).filter(s => s);
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, skills: skillsArray } : skill
      )
    }));
  };

  const removeSkillCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: ''
    };
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (id: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: ''
    };
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (id: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const addReference = () => {
    const newRef: Reference = {
      id: Date.now().toString(),
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      relationship: ''
    };
    setFormData(prev => ({
      ...prev,
      references: [...prev.references, newRef]
    }));
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.map(ref => 
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const removeReference = (id: string) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                placeholder="New York, NY"
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={formData.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div>
              <Label htmlFor="website">Website/Portfolio</Label>
              <Input
                id="website"
                value={formData.personalInfo.website}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                placeholder="johndoe.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobTitle">Target Job Title *</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="summary">Professional Summary *</Label>
            <Textarea
              id="summary"
              value={formData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              placeholder="A brief summary of your professional background and key achievements..."
              className="min-h-24"
            />
            <ContentSuggestions 
              type="summary"
              jobTitle={formData.jobTitle}
              industry={formData.industry}
              onSuggestionSelect={(suggestion) => updatePersonalInfo('summary', suggestion)}
            />
          </div>

          <div>
            <Label htmlFor="targetJob">Target Job Description (Optional)</Label>
            <Textarea
              id="targetJob"
              value={formData.targetJobDescription || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, targetJobDescription: e.target.value }))}
              placeholder="Paste the job description you're targeting to get better keyword optimization..."
              className="min-h-20"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="experience" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Work Experience</span>
              </CardTitle>
              <Button onClick={addExperience} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.experience.map((exp, index) => (
                <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Experience {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Company *</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <Label>Position *</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        placeholder="Job Title"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={exp.current}
                          onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
                        />
                        <Label>Current Position</Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date *</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      />
                    </div>
                    {!exp.current && (
                      <div>
                        <Label>End Date *</Label>
                        <Input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Description *</Label>
                    <Textarea
                      value={exp.description.join('\n')}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                      placeholder="• Achieved 25% increase in sales through strategic client relationship management&#10;• Led cross-functional team of 8 members to deliver project 2 weeks ahead of schedule&#10;• Implemented new process that reduced operational costs by 15%"
                      className="min-h-24"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use bullet points (•) and quantify achievements with numbers when possible
                    </p>
                  </div>
                </div>
              ))}
              
              {formData.experience.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No work experience added yet</p>
                  <p className="text-sm">Click "Add Experience" to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5" />
                <span>Education</span>
              </CardTitle>
              <Button onClick={addEducation} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Education {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Institution *</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <Label>Degree *</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <Label>Field of Study *</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <Label>GPA (Optional)</Label>
                      <Input
                        value={edu.gpa || ''}
                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        placeholder="3.8/4.0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date *</Label>
                      <Input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Date *</Label>
                      <Input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Honors/Awards (Optional)</Label>
                    <Input
                      value={edu.honors || ''}
                      onChange={(e) => updateEducation(edu.id, 'honors', e.target.value)}
                      placeholder="Magna Cum Laude, Dean's List"
                    />
                  </div>
                </div>
              ))}
              
              {formData.education.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No education added yet</p>
                  <p className="text-sm">Click "Add Education" to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <span>Skills</span>
              </CardTitle>
              <Button onClick={addSkillCategory} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.skills.map((skill, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Skill Category {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkillCategory(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <Label>Category Name *</Label>
                    <Input
                      value={skill.category}
                      onChange={(e) => updateSkillCategory(index, e.target.value)}
                      placeholder="Technical Skills, Languages, etc."
                    />
                  </div>

                  <div>
                    <Label>Skills *</Label>
                    <Input
                      value={skill.skills.join(', ')}
                      onChange={(e) => updateSkills(index, e.target.value)}
                      placeholder="JavaScript, React, Node.js, Python"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate skills with commas
                    </p>
                    {skill.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skill.skills.map((s, i) => (
                          <Badge key={i} variant="secondary">{s}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {formData.skills.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No skills added yet</p>
                  <p className="text-sm">Click "Add Category" to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5" />
                <span>Projects</span>
              </CardTitle>
              <Button onClick={addProject} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.projects.map((project, index) => (
                <div key={project.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Project {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Project Name *</Label>
                      <Input
                        value={project.name}
                        onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                        placeholder="E-commerce Platform"
                      />
                    </div>
                    <div>
                      <Label>Project Link (Optional)</Label>
                      <Input
                        value={project.link || ''}
                        onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date *</Label>
                      <Input
                        type="month"
                        value={project.startDate}
                        onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Date *</Label>
                      <Input
                        type="month"
                        value={project.endDate}
                        onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description *</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      placeholder="Developed a full-stack e-commerce platform that increased customer engagement by 40%..."
                      className="min-h-20"
                    />
                  </div>

                  <div>
                    <Label>Technologies Used *</Label>
                    <Input
                      value={project.technologies.join(', ')}
                      onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                      placeholder="React, Node.js, MongoDB, AWS"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate technologies with commas
                    </p>
                  </div>
                </div>
              ))}
              
              {formData.projects.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No projects added yet</p>
                  <p className="text-sm">Click "Add Project" to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other" className="space-y-4">
          <div className="grid gap-6">
            {/* Certifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Certifications</span>
                </CardTitle>
                <Button onClick={addCertification} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certification
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.certifications.map((cert, index) => (
                  <div key={cert.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Certification {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCertification(cert.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Certification Name *</Label>
                        <Input
                          value={cert.name}
                          onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                          placeholder="AWS Certified Solutions Architect"
                        />
                      </div>
                      <div>
                        <Label>Issuing Organization *</Label>
                        <Input
                          value={cert.issuer}
                          onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                          placeholder="Amazon Web Services"
                        />
                      </div>
                      <div>
                        <Label>Issue Date *</Label>
                        <Input
                          type="month"
                          value={cert.date}
                          onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Expiry Date (Optional)</Label>
                        <Input
                          type="month"
                          value={cert.expiryDate || ''}
                          onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Credential ID (Optional)</Label>
                        <Input
                          value={cert.credentialId || ''}
                          onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                          placeholder="ABC123XYZ"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                {formData.certifications.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No certifications added yet</p>
                    <p className="text-sm">Click "Add Certification" to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* References */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>References</span>
                </CardTitle>
                <Button onClick={addReference} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reference
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.references.map((ref, index) => (
                  <div key={ref.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Reference {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeReference(ref.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name *</Label>
                        <Input
                          value={ref.name}
                          onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                          placeholder="Jane Smith"
                        />
                      </div>
                      <div>
                        <Label>Job Title *</Label>
                        <Input
                          value={ref.title}
                          onChange={(e) => updateReference(ref.id, 'title', e.target.value)}
                          placeholder="Senior Manager"
                        />
                      </div>
                      <div>
                        <Label>Company *</Label>
                        <Input
                          value={ref.company}
                          onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                          placeholder="Tech Corp"
                        />
                      </div>
                      <div>
                        <Label>Relationship *</Label>
                        <Input
                          value={ref.relationship}
                          onChange={(e) => updateReference(ref.id, 'relationship', e.target.value)}
                          placeholder="Former Manager"
                        />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={ref.email}
                          onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                          placeholder="jane@techcorp.com"
                        />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        <Input
                          value={ref.phone}
                          onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                          placeholder="+1 (555) 987-6543"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                {formData.references.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No references added yet</p>
                    <p className="text-sm">Click "Add Reference" to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeForm;
