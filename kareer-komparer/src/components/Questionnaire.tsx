import React from 'react';

export interface QuestionnaireAnswers {
  enjoyedWork: string;
  strongestSkills: string[];
  mattersMost: string[];
  workStyle: string;
}

interface QuestionnaireProps {
  answers: QuestionnaireAnswers;
  onChange: (updatedAnswers: QuestionnaireAnswers) => void;
}

const INTERESTS = [
  { id: 'creative', label: 'Creative', icon: '🎨' },
  { id: 'analytical', label: 'Analytical', icon: '📊' },
  { id: 'technical', label: 'Technical', icon: '💻' },
  { id: 'business', label: 'Business', icon: '👔' },
  { id: 'people', label: 'People-focused', icon: '🤝' },
];

const STRENGTHS = [
  { id: 'Communication', label: 'Communication', icon: '🗣️' },
  { id: 'Problem Solving', label: 'Problem Solving', icon: '🧩' },
  { id: 'Creativity', label: 'Creativity', icon: '💡' },
  { id: 'Leadership', label: 'Leadership', icon: '👑' },
  { id: 'Collaboration', label: 'Collaboration', icon: '👥' },
  { id: 'Technical Skills', label: 'Technical Skills', icon: '⚙️' },
];

const PRIORITIES = [
  { id: 'Creativity', label: 'Creativity', icon: '✨' },
  { id: 'Stability', label: 'Stability', icon: '🛡️' },
  { id: 'Growth', label: 'Growth & Learning', icon: '📈' },
  { id: 'Leadership Opportunities', label: 'Leadership', icon: '🚀' },
  { id: 'High Income Potential', label: 'High Income', icon: '💰' },
  { id: 'Flexibility', label: 'Flexibility', icon: '🏡' },
];

const WORK_STYLES = [
  { id: 'independent', label: 'Independently', icon: '👤' },
  { id: 'team', label: 'In Teams', icon: '👥' },
  { id: 'both', label: 'Both / Mixed', icon: '🔄' },
];

export const Questionnaire: React.FC<QuestionnaireProps> = ({ answers, onChange }) => {
  
  const handleInterestSelect = (interestId: string) => {
    onChange({ ...answers, enjoyedWork: interestId });
  };

  const handleStrengthToggle = (strengthId: string) => {
    let updated = [...answers.strongestSkills];
    if (updated.includes(strengthId)) {
      updated = updated.filter(s => s !== strengthId);
    } else {
      if (updated.length < 3) {
        updated.push(strengthId);
      } else {
        // Replace first element if selecting more than 3
        updated.shift();
        updated.push(strengthId);
      }
    }
    onChange({ ...answers, strongestSkills: updated });
  };

  const handlePriorityToggle = (priorityId: string) => {
    let updated = [...answers.mattersMost];
    if (updated.includes(priorityId)) {
      updated = updated.filter(p => p !== priorityId);
    } else {
      if (updated.length < 2) {
        updated.push(priorityId);
      } else {
        updated.shift();
        updated.push(priorityId);
      }
    }
    onChange({ ...answers, mattersMost: updated });
  };

  const handleWorkStyleSelect = (styleId: string) => {
    onChange({ ...answers, workStyle: styleId });
  };

  return (
    <section className="questionnaire-card">
      <div className="questionnaire-header">
        <span className="questionnaire-tag">Step 1</span>
        <h2 className="questionnaire-title">Personal Fit Questionnaire</h2>
        <p className="questionnaire-subtitle">
          Define your preferences below to dynamically analyze matches and view aligned alignments in the career cards.
        </p>
      </div>

      <div className="questionnaire-grid">
        {/* Q1: Interests */}
        <div className="question-group">
          <label className="question-label">
            <span className="question-num">1</span>
            What type of work do you enjoy most?
          </label>
          <div className="options-grid">
            {INTERESTS.map(item => (
              <button
                key={item.id}
                type="button"
                className={`option-btn ${answers.enjoyedWork === item.id ? 'active' : ''}`}
                onClick={() => handleInterestSelect(item.id)}
              >
                <span className="option-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Q2: Strengths */}
        <div className="question-group">
          <label className="question-label">
            <span className="question-num">2</span>
            What are your strongest skills? <span className="label-helper">(Select up to 3)</span>
          </label>
          <div className="options-grid">
            {STRENGTHS.map(item => (
              <button
                key={item.id}
                type="button"
                className={`option-btn ${answers.strongestSkills.includes(item.id) ? 'active' : ''}`}
                onClick={() => handleStrengthToggle(item.id)}
              >
                <span className="option-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Q3: Priorities */}
        <div className="question-group">
          <label className="question-label">
            <span className="question-num">3</span>
            What matters most in a future career? <span className="label-helper">(Select up to 2)</span>
          </label>
          <div className="options-grid">
            {PRIORITIES.map(item => (
              <button
                key={item.id}
                type="button"
                className={`option-btn ${answers.mattersMost.includes(item.id) ? 'active' : ''}`}
                onClick={() => handlePriorityToggle(item.id)}
              >
                <span className="option-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Q4: Work Style */}
        <div className="question-group">
          <label className="question-label">
            <span className="question-num">4</span>
            How do you prefer to work?
          </label>
          <div className="options-grid">
            {WORK_STYLES.map(item => (
              <button
                key={item.id}
                type="button"
                className={`option-btn ${answers.workStyle === item.id ? 'active' : ''}`}
                onClick={() => handleWorkStyleSelect(item.id)}
              >
                <span className="option-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
