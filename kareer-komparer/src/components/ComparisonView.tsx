import React from 'react';
import type { Career } from '../data/careers';
import { getSkillDescription } from '../data/skillDescriptions';

export const areSkillsSimilar = (s1: string, s2: string): boolean => {
  const c1 = s1.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/skills?$/, '');
  const c2 = s2.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/skills?$/, '');

  if (c1 === c2) return true;

  if (c1.length >= 4 && c2.length >= 4) {
    if (c1.includes(c2) || c2.includes(c1)) return true;
  }

  const t1 = s1.toLowerCase().split(/[\s/\-_]+/).map(t => t.replace(/[^a-z0-9]/g, '')).filter(t => t && t !== 'skill' && t !== 'skills').sort().join('');
  const t2 = s2.toLowerCase().split(/[\s/\-_]+/).map(t => t.replace(/[^a-z0-9]/g, '')).filter(t => t && t !== 'skill' && t !== 'skills').sort().join('');
  if (t1 === t2) return true;

  const stem = (s: string) => s
    .replace(/analysis$/, 'analys')
    .replace(/analytics$/, 'analys')
    .replace(/telling$/, 'tell')
    .replace(/illustration$/, 'illustrat')
    .replace(/modeling$/, 'model')
    .replace(/modelling$/, 'model')
    .replace(/development$/, 'develop');
  
  if (stem(c1) === stem(c2)) return true;

  return false;
};

export interface SkillGap {
  name: string;
  isTechnical: boolean;
  intensity: 'Very High' | 'High' | 'Medium' | 'Low';
  description: string;
}

export const getGapIntensity = (
  skillName: string,
  isTechnical: boolean,
  sourceCategory: string,
  targetCategory: string
): 'Very High' | 'High' | 'Medium' | 'Low' => {
  if (!isTechnical) {
    return 'Low';
  }

  if (sourceCategory !== targetCategory) {
    const name = skillName.toLowerCase();
    const isVeryHighKeywords = [
      'programming', 'python', 'java', 'c++', 'databases', 'sql', 'spark', 
      'hadoop', 'mongodb', 'algorithms', 'cloud', 'security', 'apis', 
      'operating systems', 'networks', 'analytics', 'statistics'
    ];
    if (isVeryHighKeywords.some(keyword => name.includes(keyword))) {
      return 'Very High';
    }
    return 'High';
  } else {
    return 'Medium';
  }
};

export const calculateGaps = (targetCareer: Career, sourceCareer: Career): SkillGap[] => {
  const sourceSkills = [...sourceCareer.soft_skills, ...sourceCareer.technical_skills];
  const gaps: SkillGap[] = [];

  // Technical skills unique to target
  targetCareer.technical_skills.forEach((skill) => {
    const isSimilar = sourceSkills.some((s) => areSkillsSimilar(skill, s));
    if (!isSimilar) {
      gaps.push({
        name: skill,
        isTechnical: true,
        intensity: getGapIntensity(skill, true, sourceCareer.category, targetCareer.category),
        description: getSkillDescription(skill),
      });
    }
  });

  // Soft skills unique to target
  targetCareer.soft_skills.forEach((skill) => {
    const isSimilar = sourceSkills.some((s) => areSkillsSimilar(skill, s));
    if (!isSimilar) {
      gaps.push({
        name: skill,
        isTechnical: false,
        intensity: getGapIntensity(skill, false, sourceCareer.category, targetCareer.category),
        description: getSkillDescription(skill),
      });
    }
  });

  const intensityWeight = {
    'Very High': 4,
    'High': 3,
    'Medium': 2,
    'Low': 1
  };
  return gaps.sort((a, b) => intensityWeight[b.intensity] - intensityWeight[a.intensity]);
};

interface ComparisonViewProps {
  careerA: Career;
  careerB: Career;
  onConnectCoach: (career: Career, skillName?: string | null) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  careerA,
  careerB,
  onConnectCoach,
}) => {
  const allSkillsA = [...careerA.soft_skills, ...careerA.technical_skills];
  const allSkillsB = [...careerB.soft_skills, ...careerB.technical_skills];

  // Calculate Shared Skills (similarity matching check)
  const sharedSkills = allSkillsA.filter((skillA) =>
    allSkillsB.some((skillB) => areSkillsSimilar(skillA, skillB))
  );

  // Calculate dynamic gaps with intensity tiers
  const gapsA = calculateGaps(careerA, careerB);
  const gapsB = calculateGaps(careerB, careerA);

  return (
    <div className="comparison-wrapper">
      <div className="comparison-grid">
        {/* Row 1: Career Headers (Title, Category, Description) */}
        <div className="left-card">
          <div className="career-card-header">
            <div>
              <span className="career-category-tag">{careerA.category}</span>
              <h2 className="career-title">{careerA.title}</h2>
              <p className="career-description">{careerA.description}</p>
            </div>
          </div>
        </div>

        <div className="right-card">
          <div className="career-card-header">
            <div>
              <span className="career-category-tag">{careerB.category}</span>
              <h2 className="career-title">{careerB.title}</h2>
              <p className="career-description">{careerB.description}</p>
            </div>
          </div>
        </div>

        {/* Row 2: Responsibilities */}
        <div className="left-card">
          <div className="comparison-section-card">
            <h3 className="section-title">
              <svg
                className="section-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
              </svg>
              Key Responsibilities
            </h3>
            <ul className="responsibilities-list">
              {careerA.responsibilities.map((resp, i) => (
                <li key={i} className="responsibility-item">
                  <span className="responsibility-bullet"></span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="right-card">
          <div className="comparison-section-card">
            <h3 className="section-title">
              <svg
                className="section-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
              </svg>
              Key Responsibilities
            </h3>
            <ul className="responsibilities-list">
              {careerB.responsibilities.map((resp, i) => (
                <li key={i} className="responsibility-item">
                  <span className="responsibility-bullet"></span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3: General Skills List */}
        <div className="left-card">
          <div className="comparison-section-card">
            <h3 className="section-title">
              <svg
                className="section-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3-1.912 5.886H3.82l5.117 3.717L6.992 18.5 12 14.783l5.008 3.717-1.945-5.897 5.117-3.717h-6.268L12 3Z"></path>
              </svg>
              Skills & Competencies
            </h3>
            <div>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', opacity: 0.8 }}>Soft Skills</h4>
              <div className="skills-container" style={{ marginBottom: '16px' }}>
                {careerA.soft_skills.map((skill) => (
                  <span key={skill} className="skill-badge soft">
                    {skill}
                  </span>
                ))}
              </div>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', opacity: 0.8 }}>Technical Skills</h4>
              <div className="skills-container">
                {careerA.technical_skills.map((skill) => (
                  <span key={skill} className="skill-badge technical">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="right-card">
          <div className="comparison-section-card">
            <h3 className="section-title">
              <svg
                className="section-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3-1.912 5.886H3.82l5.117 3.717L6.992 18.5 12 14.783l5.008 3.717-1.945-5.897 5.117-3.717h-6.268L12 3Z"></path>
              </svg>
              Skills & Competencies
            </h3>
            <div>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', opacity: 0.8 }}>Soft Skills</h4>
              <div className="skills-container" style={{ marginBottom: '16px' }}>
                {careerB.soft_skills.map((skill) => (
                  <span key={skill} className="skill-badge soft">
                    {skill}
                  </span>
                ))}
              </div>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', opacity: 0.8 }}>Technical Skills</h4>
              <div className="skills-container">
                {careerB.technical_skills.map((skill) => (
                  <span key={skill} className="skill-badge technical">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 4 (SMART COMPARISON FEATURE): Overlapping/Similar Skills (Unified Bridge) */}
        <div className="similar-skills-bridge">
          <div className="bridge-title-container">
            <h3 className="bridge-title">
              <svg
                className="bridge-title-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="M12 6v12M6 12h12"></path>
              </svg>
              Similar Skills & Knowledge
            </h3>
            <span className="bridge-subtitle">Common strengths shared by both career paths</span>
          </div>
          {sharedSkills.length > 0 ? (
            <div className="similar-skills-list">
              {sharedSkills.map((skill) => (
                <span key={skill} className="skill-badge shared">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="no-similar-skills">No overlapping skills found between these two career paths.</p>
          )}
        </div>

        {/* Row 5 (SMART COMPARISON FEATURE): Skills Gaps */}
        <div className="left-card">
          <div className="comparison-section-card gap-card">
            <div>
              <span className="gap-label">What you need to learn if you switch to this path</span>
              <p className="gap-subtitle">Intelligent Gap Mapping for {careerA.title}:</p>
            </div>
            {gapsA.length > 0 ? (
              <div className="gaps-list">
                {gapsA.map((gap) => (
                  <div key={gap.name} className="gap-item left-accent">
                    <div className="gap-skill-header-row">
                      <span className={`intensity-badge ${gap.intensity.toLowerCase().replace(' ', '-')}`}>
                        {gap.intensity} Gap
                      </span>
                      <span className="gap-track-label">
                        {gap.isTechnical ? 'Technical Track' : 'Soft Skills Track'}
                      </span>
                    </div>
                    <h4 className="gap-skill-name">{gap.name}</h4>
                    <p className="gap-skill-description">{gap.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-gap-skills">You already have all the background skills needed!</p>
            )}
          </div>
        </div>

        <div className="right-card">
          <div className="comparison-section-card gap-card">
            <div>
              <span className="gap-label">What you need to learn if you switch to this path</span>
              <p className="gap-subtitle">Intelligent Gap Mapping for {careerB.title}:</p>
            </div>
            {gapsB.length > 0 ? (
              <div className="gaps-list">
                {gapsB.map((gap) => (
                  <div key={gap.name} className="gap-item right-accent">
                    <div className="gap-skill-header-row">
                      <span className={`intensity-badge ${gap.intensity.toLowerCase().replace(' ', '-')}`}>
                        {gap.intensity} Gap
                      </span>
                      <span className="gap-track-label">
                        {gap.isTechnical ? 'Technical Track' : 'Soft Skills Track'}
                      </span>
                    </div>
                    <h4 className="gap-skill-name">{gap.name}</h4>
                    <p className="gap-skill-description">{gap.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-gap-skills">You already have all the background skills needed!</p>
            )}
          </div>
        </div>

        {/* Row 6: Action Layer (CTA buttons) */}
        <div className="left-card">
          <div className="column-action">
            <button
              type="button"
              className="coach-btn"
              onClick={() => onConnectCoach(careerA)}
            >
              <svg
                className="coach-btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Connect with a Coach
            </button>
          </div>
        </div>

        <div className="right-card">
          <div className="column-action">
            <button
              type="button"
              className="coach-btn"
              onClick={() => onConnectCoach(careerB)}
            >
              <svg
                className="coach-btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Connect with a Coach
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
