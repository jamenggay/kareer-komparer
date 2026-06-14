import React from 'react';
import type { Career } from '../data/careers';
import type { QuestionnaireAnswers } from './Questionnaire';
import { careerExpectations, careerRatings } from '../data/careerExpectations';

interface ComparisonViewProps {
  careerA: Career;
  careerB: Career;
  questionnaireAnswers: QuestionnaireAnswers;
  onConnectCoach: (career: Career, skillName?: string | null) => void;
}

// Reuse the similarity algorithm to find overlapping skills
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

// Calculate career match score based on Questionnaire Answers
export const calculateMatchScore = (career: Career, answers: QuestionnaireAnswers): number => {
  let score = 0;
  const ratings = careerRatings[career.title] || {
    creativity: 3,
    technicalIntensity: 3,
    collaboration: 3,
    communication: 3,
    leadership: 3,
    flexibility: 3
  };
  const category = career.category.toLowerCase();
  const title = career.title.toLowerCase();

  // 1. Interest Match (Max 35)
  if (answers.enjoyedWork === 'creative') {
    if (category.includes('arts') || category.includes('design') || category.includes('marketing') || title.includes('content') || title.includes('copy')) {
      score += 35;
    } else if (category.includes('software') || category.includes('data')) {
      score += 15;
    } else {
      score += 10;
    }
  } else if (answers.enjoyedWork === 'analytical') {
    if (category.includes('data') || title.includes('analyst') || title.includes('analysis') || title.includes('business')) {
      score += 35;
    } else if (category.includes('arts')) {
      score += 10;
    } else {
      score += 15;
    }
  } else if (answers.enjoyedWork === 'technical') {
    if (category.includes('software') || category.includes('application') || title.includes('developer') || title.includes('engineer') || title.includes('systems')) {
      score += 35;
    } else if (category.includes('marketing')) {
      score += 10;
    } else {
      score += 15;
    }
  } else if (answers.enjoyedWork === 'business') {
    if (category.includes('business') || category.includes('management') || title.includes('analyst') || title.includes('developer')) {
      score += 35;
    } else {
      score += 15;
    }
  } else if (answers.enjoyedWork === 'people') {
    if (title.includes('manager') || career.soft_skills.includes('Communication') || career.soft_skills.includes('Collaboration')) {
      score += 35;
    } else {
      score += 15;
    }
  }

  // 2. Strengths Match (Max 35)
  let matchedCount = 0;
  const combinedSkills = [...career.soft_skills, ...career.technical_skills];
  answers.strongestSkills.forEach(strength => {
    const hasMatch = combinedSkills.some(skill => 
      areSkillsSimilar(skill, strength) || 
      skill.toLowerCase().includes(strength.toLowerCase()) || 
      strength.toLowerCase().includes(skill.toLowerCase())
    );
    if (hasMatch) {
      matchedCount++;
    }
  });

  if (matchedCount >= 2) {
    score += 35;
  } else if (matchedCount === 1) {
    score += 22;
  } else {
    score += 12;
  }

  // 3. Priorities Match (Max 20)
  let priorityScore = 0;
  answers.mattersMost.forEach(priority => {
    if (priority === 'Creativity') {
      if (ratings.creativity >= 4 || career.soft_skills.includes('Creativity')) priorityScore += 10;
    } else if (priority === 'Stability') {
      if (category.includes('software') || title.includes('analyst') || title.includes('developer')) priorityScore += 10;
    } else if (priority === 'Growth') {
      if (ratings.technicalIntensity >= 4 || career.soft_skills.includes('Continuous Learning')) priorityScore += 10;
    } else if (priority === 'Leadership Opportunities') {
      if (ratings.leadership >= 4 || career.soft_skills.includes('Leadership')) priorityScore += 10;
    } else if (priority === 'High Income Potential') {
      if (category.includes('software') || title.includes('engineer') || title.includes('intelligence')) priorityScore += 10;
    } else if (priority === 'Flexibility') {
      if (ratings.flexibility >= 4 || title.includes('content') || title.includes('copywriter')) priorityScore += 10;
    }
  });
  score += Math.min(20, priorityScore === 0 ? 8 : priorityScore);

  // 4. Work Style Match (Max 10)
  if (answers.workStyle === 'independent') {
    if (ratings.collaboration <= 3) score += 10;
    else score += 5;
  } else if (answers.workStyle === 'team') {
    if (ratings.collaboration >= 4) score += 10;
    else score += 5;
  } else {
    score += 10; // Mix/both always fits
  }

  // Encouraging and realistic (avoid 100% since no career is fully perfect)
  return Math.min(96, Math.max(52, score));
};

// Generate dynamic fit explanations
export const getFitExplainer = (career: Career, answers: QuestionnaireAnswers): string[] => {
  const bullets: string[] = [];
  const ratings = careerRatings[career.title] || { creativity: 3, collaboration: 3 };
  const category = career.category.toLowerCase();
  
  // 1. Interest check
  if (answers.enjoyedWork === 'creative' && (category.includes('arts') || category.includes('design') || category.includes('marketing'))) {
    bullets.push('Strong alignment with your enjoyment of creative & visual processes.');
  } else if (answers.enjoyedWork === 'technical' && (category.includes('software') || category.includes('application'))) {
    bullets.push('Great match for your interest in building technical products & programming.');
  } else if (answers.enjoyedWork === 'analytical' && (category.includes('data') || career.title.includes('Analyst'))) {
    bullets.push('Matches your preference for structured analysis, statistics, and logical thinking.');
  } else if (answers.enjoyedWork === 'business' && (category.includes('business') || category.includes('management'))) {
    bullets.push('Aligns with your preference for business modeling, strategy, and operations.');
  } else if (answers.enjoyedWork === 'people' && (career.soft_skills.includes('Communication') || career.soft_skills.includes('Collaboration'))) {
    bullets.push('Complements your focus on community, message building, or client relationships.');
  } else {
    bullets.push(`Offers an interesting environment to expand your interest into ${career.category}.`);
  }

  // 2. Strengths check
  const matchedStrengths: string[] = [];
  const combinedSkills = [...career.soft_skills, ...career.technical_skills];
  answers.strongestSkills.forEach(s => {
    const hasMatch = combinedSkills.some(skill => 
      areSkillsSimilar(skill, s) || 
      skill.toLowerCase().includes(s.toLowerCase()) ||
      s.toLowerCase().includes(skill.toLowerCase())
    );
    if (hasMatch) matchedStrengths.push(s);
  });

  if (matchedStrengths.length > 0) {
    bullets.push(`Leverages your existing strengths in ${matchedStrengths.slice(0, 2).join(' and ')}.`);
  } else {
    bullets.push('Provides a clean learning path to build highly valued industry skills.');
  }

  // 3. Work Style check
  if (answers.workStyle === 'independent' && ratings.collaboration <= 3) {
    bullets.push('Supports your preferred work style of working independently on specific tasks.');
  } else if (answers.workStyle === 'team' && ratings.collaboration >= 4) {
    bullets.push('Fits your preference for highly collaborative, cross-functional team environments.');
  } else {
    bullets.push('Offers a healthy mix of independent execution and active team collaboration.');
  }

  return bullets;
};

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  careerA,
  careerB,
  questionnaireAnswers,
  onConnectCoach,
}) => {
  const allSkillsA = [...careerA.soft_skills, ...careerA.technical_skills];
  const allSkillsB = [...careerB.soft_skills, ...careerB.technical_skills];

  // Calculate Shared Skills (similarity matching check)
  const sharedSkills = allSkillsA.filter((skillA) =>
    allSkillsB.some((skillB) => areSkillsSimilar(skillA, skillB))
  );

  // Scores
  const scoreA = calculateMatchScore(careerA, questionnaireAnswers);
  const scoreB = calculateMatchScore(careerB, questionnaireAnswers);

  // Explanations
  const fitExplainerA = getFitExplainer(careerA, questionnaireAnswers);
  const fitExplainerB = getFitExplainer(careerB, questionnaireAnswers);

  // Ratings structures
  const ratingsA = careerRatings[careerA.title] || { creativity: 3, technicalIntensity: 3, collaboration: 3, communication: 3, leadership: 3, flexibility: 3 };
  const ratingsB = careerRatings[careerB.title] || { creativity: 3, technicalIntensity: 3, collaboration: 3, communication: 3, leadership: 3, flexibility: 3 };

  // Considerations
  const considerationsA = careerExpectations[careerA.title]?.considerations || ["Dynamic work environments.", "Requires high concentration."];
  const considerationsB = careerExpectations[careerB.title]?.considerations || ["Dynamic work environments.", "Requires high concentration."];

  // Goals Matrix configuration
  const matrixItems = [
    { key: 'creativity', label: 'Creativity & Original Expression', valA: ratingsA.creativity >= 4, valB: ratingsB.creativity >= 4 },
    { key: 'technical', label: 'Technical Problem Solving', valA: ratingsA.technicalIntensity >= 4, valB: ratingsB.technicalIntensity >= 4 },
    { key: 'collaboration', label: 'Teamwork & Active Collaboration', valA: ratingsA.collaboration >= 4, valB: ratingsB.collaboration >= 4 },
    { key: 'leadership', label: 'Leadership & Decision Making', valA: ratingsA.leadership >= 3.5, valB: ratingsB.leadership >= 3.5 },
    { key: 'flexibility', label: 'Flexibility & Autonomy', valA: ratingsA.flexibility >= 4, valB: ratingsB.flexibility >= 4 },
  ];

  const isComplete = !!(
    questionnaireAnswers.enjoyedWork &&
    questionnaireAnswers.strongestSkills &&
    questionnaireAnswers.strongestSkills.length > 0 &&
    questionnaireAnswers.mattersMost &&
    questionnaireAnswers.mattersMost.length > 0 &&
    questionnaireAnswers.workStyle
  );

  // Insight generator helper
  const enjoyedLabel = questionnaireAnswers.enjoyedWork
    ? questionnaireAnswers.enjoyedWork.charAt(0).toUpperCase() + questionnaireAnswers.enjoyedWork.slice(1)
    : '';
  const strongerCareer = scoreA >= scoreB ? careerA : careerB;
  const weakerCareer = scoreA >= scoreB ? careerB : careerA;
  const strongerScore = scoreA >= scoreB ? scoreA : scoreB;
  const weakerScore = scoreA >= scoreB ? scoreB : scoreA;

  return (
    <div className="comparison-wrapper">
      <div className="comparison-grid">
        
        {/* ================= FEATURE 2: CAREER FIT ANALYSIS (SCORE CARDS) ================= */}
        <div className="fit-analysis-container">
          {/* Card A */}
          <div className="left-card">
            <div className="fit-analysis-card">
              <div className="fit-info-wrapper">
                <span className="fit-match-label">
                  {isComplete ? 'Career Fit Match' : '--% Match'}
                </span>
                <h3 className="fit-card-title">{careerA.title}</h3>
                {isComplete ? (
                  <ul className="why-fit-list">
                    {fitExplainerA.map((bullet, idx) => (
                      <li key={idx} className="why-fit-item">
                        <span className="why-fit-check">✓</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.4' }}>
                    💡 Sagutan ang questionnaire sa itaas upang makuha ang iyong Career Fit Match at mga detalye kung bakit ito tugma sa iyo.
                  </p>
                )}
              </div>
              <div className="fit-gauge-circle" style={!isComplete ? { opacity: 0.5 } : {}}>
                {isComplete ? `${scoreA}%` : '--%'}
              </div>
            </div>
          </div>

          {/* Card B */}
          <div className="right-card">
            <div className="fit-analysis-card">
              <div className="fit-info-wrapper">
                <span className="fit-match-label">
                  {isComplete ? 'Career Fit Match' : '--% Match'}
                </span>
                <h3 className="fit-card-title">{careerB.title}</h3>
                {isComplete ? (
                  <ul className="why-fit-list">
                    {fitExplainerB.map((bullet, idx) => (
                      <li key={idx} className="why-fit-item">
                        <span className="why-fit-check">✓</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.4' }}>
                    💡 Sagutan ang questionnaire sa itaas upang makuha ang iyong Career Fit Match at mga detalye kung bakit ito tugma sa iyo.
                  </p>
                )}
              </div>
              <div className="fit-gauge-circle" style={!isComplete ? { opacity: 0.5 } : {}}>
                {isComplete ? `${scoreB}%` : '--%'}
              </div>
            </div>
          </div>
        </div>

        {/* Row: Main Career Details (Category, Description) */}
        <div className="left-card">
          <div className="career-card-header">
            <div>
              <span className="career-category-tag">{careerA.category}</span>
              <h2 className="career-title" style={{ fontSize: '1.8rem' }}>{careerA.title}</h2>
              <p className="career-description">{careerA.description}</p>
            </div>
          </div>
        </div>

        <div className="right-card">
          <div className="career-card-header">
            <div>
              <span className="career-category-tag">{careerB.category}</span>
              <h2 className="career-title" style={{ fontSize: '1.8rem' }}>{careerB.title}</h2>
              <p className="career-description">{careerB.description}</p>
            </div>
          </div>
        </div>

        {/* Row: Responsibilities */}
        <div className="left-card">
          <div className="comparison-section-card">
            <h3 className="section-title">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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

        {/* Row: Skills & Competencies */}
        <div className="left-card">
          <div className="comparison-section-card">
            <h3 className="section-title">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Skills & Competencies
            </h3>
            <div className="skills-container">
              {careerA.soft_skills.map((skill) => (
                <span key={skill} className="skill-badge soft">
                  {skill}
                </span>
              ))}
              {careerA.technical_skills.map((skill) => (
                <span key={skill} className="skill-badge technical">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="right-card">
          <div className="comparison-section-card">
            <h3 className="section-title">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Skills & Competencies
            </h3>
            <div className="skills-container">
              {careerB.soft_skills.map((skill) => (
                <span key={skill} className="skill-badge soft">
                  {skill}
                </span>
              ))}
              {careerB.technical_skills.map((skill) => (
                <span key={skill} className="skill-badge technical">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= FEATURE 4: GOALS ALIGNMENT MATRIX ================= */}
        <div className="matrix-bridge">
          <div className="matrix-header">
            <h3 className="matrix-title">
              <svg className="bridge-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="M12 6v12M6 12h12"></path>
              </svg>
              Alignment With Your Goals
            </h3>
            <span className="matrix-subtitle">Comparative summary of priorities supported by each career path</span>
          </div>
          <div className="matrix-grid">
            <div className="matrix-row" style={{ background: 'transparent', fontWeight: 800, paddingBottom: '4px' }}>
              <span>Priority Attribute</span>
              <span style={{ textAlign: 'center' }}>{careerA.title}</span>
              <span style={{ textAlign: 'center' }}>{careerB.title}</span>
            </div>
            {matrixItems.map(item => (
              <div key={item.key} className="matrix-row">
                <span className="matrix-priority-title">{item.label}</span>
                <span className="matrix-value">
                  {item.valA ? <span className="matrix-check">✓ Yes</span> : <span className="matrix-cross">✗ Limited</span>}
                </span>
                <span className="matrix-value">
                  {item.valB ? <span className="matrix-check">✓ Yes</span> : <span className="matrix-cross">✗ Limited</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FEATURE 5: WORK STYLE COMPARISON ================= */}
        <div className="left-card">
          <div className="comparison-section-card">
            <h3 className="section-title">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              Work Style & Environment
            </h3>
            <div className="work-style-scales">
              <div className="visual-scale-item">
                <div className="scale-label-row">
                  <span>Creativity Level</span>
                  <span>{ratingsA.creativity}/5</span>
                </div>
                <div className="scale-track">
                  <div className="scale-fill" style={{ width: `${ratingsA.creativity * 20}%` }} />
                </div>
              </div>
              <div className="visual-scale-item">
                <div className="scale-label-row">
                  <span>Technical Intensity</span>
                  <span>{ratingsA.technicalIntensity}/5</span>
                </div>
                <div className="scale-track">
                  <div className="scale-fill" style={{ width: `${ratingsA.technicalIntensity * 20}%` }} />
                </div>
              </div>
              <div className="visual-scale-item">
                <div className="scale-label-row">
                  <span>Collaboration Level</span>
                  <span>{ratingsA.collaboration}/5</span>
                </div>
                <div className="scale-track">
                  <div className="scale-fill" style={{ width: `${ratingsA.collaboration * 20}%` }} />
                </div>
              </div>
              <div className="visual-scale-item">
                <div className="scale-label-row">
                  <span>Communication Requirement</span>
                  <span>{ratingsA.communication}/5</span>
                </div>
                <div className="scale-track">
                  <div className="scale-fill" style={{ width: `${ratingsA.communication * 20}%` }} />
                </div>
              </div>
              <div className="visual-scale-item">
                <div className="scale-label-row">
                  <span>Leadership Opportunities</span>
                  <span>{ratingsA.leadership}/5</span>
                </div>
                <div className="scale-track">
                  <div className="scale-fill" style={{ width: `${ratingsA.leadership * 20}%` }} />
                </div>
              </div>
              <div className="visual-scale-item">
                <div className="scale-label-row">
                  <span>Work Flexibility</span>
                  <span>{ratingsA.flexibility}/5</span>
                </div>
                <div className="scale-track">
                  <div className="scale-fill" style={{ width: `${ratingsA.flexibility * 20}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-card">
          <div className="comparison-section-card">
            <h3 className="section-title">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              Work Style & Environment
            </h3>
            <div className="work-style-scales">
              <div className="visual-scale-item">
                <div className="scale-label-row">
                  <span>Creativity Level</span>
                  <span>{ratingsB.creativity}/5</span>
                </div>
                <div className="scale-track">
                  <div className="scale-fill" style={{ width: `${ratingsB.creativity * 20}%` }} />
                </div>
              </div>
              <div className="visual-scale-item">
                <div className="scale-label-row">
                  <span>Technical Intensity</span>
                  <span>{ratingsB.technicalIntensity}/5</span>
                </div>
                <div className="scale-track">
                  <div className="scale-fill" style={{ width: `${ratingsB.technicalIntensity * 20}%` }} />
                </div>
              </div>
              <div className="visual-scale-item">
                <div className="scale-label-row">
                  <span>Collaboration Level</span>
                  <span>{ratingsB.collaboration}/5</span>
                </div>
                <div className="scale-track">
                  <div className="scale-fill" style={{ width: `${ratingsB.collaboration * 20}%` }} />
                </div>
              </div>
              <div className="visual-scale-item">
                <div className="scale-label-row">
                  <span>Communication Requirement</span>
                  <span>{ratingsB.communication}/5</span>
                </div>
                <div className="scale-track">
                  <div className="scale-fill" style={{ width: `${ratingsB.communication * 20}%` }} />
                </div>
              </div>
              <div className="visual-scale-item">
                <div className="scale-label-row">
                  <span>Leadership Opportunities</span>
                  <span>{ratingsB.leadership}/5</span>
                </div>
                <div className="scale-track">
                  <div className="scale-fill" style={{ width: `${ratingsB.leadership * 20}%` }} />
                </div>
              </div>
              <div className="visual-scale-item">
                <div className="scale-label-row">
                  <span>Work Flexibility</span>
                  <span>{ratingsB.flexibility}/5</span>
                </div>
                <div className="scale-track">
                  <div className="scale-fill" style={{ width: `${ratingsB.flexibility * 20}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FEATURE 6: THINGS TO CONSIDER ================= */}
        <div className="left-card">
          <div className="comparison-section-card gap-card">
            <div>
              <span className="gap-label" style={{ color: 'var(--dark-neutral)', background: '#E2D7CD' }}>Expectations Check</span>
              <h3 className="gap-subtitle" style={{ fontSize: '1.25rem', marginTop: '4px' }}>Things To Consider</h3>
            </div>
            <ul className="responsibilities-list" style={{ marginTop: '8px' }}>
              {considerationsA.map((item, idx) => (
                <li key={idx} className="responsibility-item">
                  <span className="responsibility-bullet" style={{ backgroundColor: 'var(--primary)' }}></span>
                  <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="right-card">
          <div className="comparison-section-card gap-card">
            <div>
              <span className="gap-label" style={{ color: 'var(--dark-neutral)', background: '#E2D7CD' }}>Expectations Check</span>
              <h3 className="gap-subtitle" style={{ fontSize: '1.25rem', marginTop: '4px' }}>Things To Consider</h3>
            </div>
            <ul className="responsibilities-list" style={{ marginTop: '8px' }}>
              {considerationsB.map((item, idx) => (
                <li key={idx} className="responsibility-item">
                  <span className="responsibility-bullet" style={{ backgroundColor: 'var(--secondary)' }}></span>
                  <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Similar Skills & Knowledge Section (Bridging component) */}
        <div className="similar-skills-bridge">
          <div className="bridge-title-container">
            <h3 className="bridge-title">
              <svg className="bridge-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="M12 6v12M6 12h12"></path>
              </svg>
              Overlapping Skills & Competencies
            </h3>
            <span className="bridge-subtitle">Similar skills shared by both career paths</span>
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

        {/* ================= FEATURE 7: RECOMMENDATION SUMMARY ================= */}
        <div className="insight-card" style={!isComplete ? { border: '2px dashed var(--border-color)', background: 'rgba(30, 41, 59, 0.95)', opacity: 0.9 } : {}}>
          <div className="insight-header">
            <svg className="insight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <h3 className="insight-title">Kareer Komparer Insight</h3>
          </div>
          {isComplete ? (
            <>
              <p className="insight-body">
                Based on your interests in <strong>{enjoyedLabel || 'varied'}</strong> work, your strengths in <strong>{questionnaireAnswers.strongestSkills.join(', ')}</strong>, and your career priorities:
                <br /><br />
                <strong>{strongerCareer.title}</strong> appears to be a stronger alignment for your goals (scoring a <strong>{strongerScore}% Match</strong>) because it highlights elements of {fitExplainerA[0] ? fitExplainerA[0].toLowerCase().replace('✓ ', '').replace('.', '') : ''} and matches your work style.
                <br /><br />
                <strong>{weakerCareer.title}</strong> (scoring a <strong>{weakerScore}% Match</strong>) remains a very viable exploration pathway if you seek to strengthen your competencies in {weakerCareer.category.toLowerCase()} and focus on {weakerCareer.responsibilities[0] ? weakerCareer.responsibilities[0].toLowerCase() : ''}.
              </p>
              <div className="insight-tips-grid">
                <div className="insight-tip-column">
                  <span className="insight-tip-title">Decision Tip 1: Reflection</span>
                  <p className="insight-tip-desc">Look closely at the "Things to Consider" sections. Real career satisfaction often comes from accepting the everyday challenges of the work style, not just the highlights.</p>
                </div>
                <div className="insight-tip-column">
                  <span className="insight-tip-title">Decision Tip 2: Talk to a Mentor</span>
                  <p className="insight-tip-desc">Connecting with an Ate or Kuya in the field below can give you firsthand clarity on how these expectations play out in a real working day in the Philippines.</p>
                </div>
              </div>
            </>
          ) : (
            <p className="insight-body" style={{ color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic', margin: '20px 0', textAlign: 'center' }}>
              ✨ Tukuyin ang iyong mga sagot sa questionnaire sa itaas upang makuha ang Kareer Komparer Insight.
            </p>
          )}
        </div>

        {/* Action Layer CTA buttons */}
        <div className="left-card">
          <div className="column-action">
            <button type="button" className="coach-btn" onClick={() => onConnectCoach(careerA, null)}>
              <svg className="coach-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Connect with a Coach
            </button>
          </div>
        </div>

        <div className="right-card">
          <div className="column-action">
            <button type="button" className="coach-btn" onClick={() => onConnectCoach(careerB, null)}>
              <svg className="coach-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
