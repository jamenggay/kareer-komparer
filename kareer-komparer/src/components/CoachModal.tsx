import React, { useState } from 'react';
import type { Career } from '../data/careers';

interface Coach {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  avatarLetter: string;
}

const MOCK_COACHES: Coach[] = [
  {
    id: 'coach-1',
    name: 'Ate Angela Ramos',
    role: 'Senior Product Designer at Canva',
    specialty: 'Arts, Entertainment, Design & Digital Marketing',
    bio: 'Angela helps aspiring designers refine their portfolios, master UX principles, and transition from traditional arts to digital designs.',
    avatarLetter: 'AR',
  },
  {
    id: 'coach-2',
    name: 'Kuya Mark Santos',
    role: 'Lead Cloud Architect at AWS',
    specialty: 'Software & Application Development',
    bio: 'Mark specializes in mentoring career shifters into tech, teaching cloud infrastructure, and preparing students for software interviews.',
    avatarLetter: 'MS',
  },
  {
    id: 'coach-3',
    name: 'Ate Bianca Lim',
    role: 'Director of Business Intelligence at Grab',
    specialty: 'Data & Business Management',
    bio: 'Bianca is passionate about data storytelling and helping analysts bridge the gap between technical metrics and business decisions.',
    avatarLetter: 'BL',
  },
];

interface CoachModalProps {
  career: Career | null;
  skillName?: string | null;
  onClose: () => void;
}

export const CoachModal: React.FC<CoachModalProps> = ({ career, skillName, onClose }) => {
  const [selectedCoachId, setSelectedCoachId] = useState<string>(MOCK_COACHES[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState(
    skillName 
      ? `Hi! I'm interested in transitioning to the ${career?.title} path. I noticed a skill gap in "${skillName}" and would love to ask about the best KadaKareer bootcamps or training courses for it.`
      : ''
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // Simulate sending application
    setIsSubmitted(true);
  };

  const selectedCoach = MOCK_COACHES.find(c => c.id === selectedCoachId) || MOCK_COACHES[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isSubmitted ? 'Application Sent!' : 'Connect with a Coach'}
          </h2>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <svg className="modal-close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {isSubmitted ? (
            <div className="success-view">
              <div className="success-icon-wrapper">
                <svg className="success-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="success-title">Mabuhay! Connection Requested</h3>
              <p className="success-message">
                You have successfully requested a session with <strong>{selectedCoach.name}</strong> regarding the <strong>{career?.title}</strong> path. 
                Keep an eye on your email (<strong>{email}</strong>). We'll connect you within 24-48 hours.
              </p>
              <button type="button" className="success-dismiss-btn" onClick={onClose}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="coach-selection-intro">
                We'll match you with one of KadaKareer's elite industry mentors to guide your journey into <strong>{career?.title || 'this field'}</strong>.
              </p>

              <div className="modal-form-group">
                <label className="modal-form-label">Choose your Mentor</label>
                <div className="coaches-list">
                  {MOCK_COACHES.map((coach) => (
                    <div
                      key={coach.id}
                      className={`coach-card ${selectedCoachId === coach.id ? 'selected' : ''}`}
                      onClick={() => setSelectedCoachId(coach.id)}
                    >
                      <div className="coach-avatar-wrapper">
                        <span className="coach-avatar-fallback">{coach.avatarLetter}</span>
                      </div>
                      <div className="coach-info">
                        <span className="coach-name">{coach.name}</span>
                        <span className="coach-role">{coach.role}</span>
                        <span className="coach-bio">{coach.bio}</span>
                      </div>
                      <div className="coach-radio"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-form-group">
                <label htmlFor="student-name" className="modal-form-label">
                  Your Full Name
                </label>
                <input
                  id="student-name"
                  type="text"
                  required
                  className="modal-input"
                  placeholder="e.g. Juan Dela Cruz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="modal-form-group">
                <label htmlFor="student-email" className="modal-form-label">
                  Email Address
                </label>
                <input
                  id="student-email"
                  type="email"
                  required
                  className="modal-input"
                  placeholder="e.g. juan.delacruz@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="modal-form-group">
                <label htmlFor="student-notes" className="modal-form-label">
                  Message for the Coach (Optional)
                </label>
                <textarea
                  id="student-notes"
                  className="modal-input modal-textarea"
                  placeholder={`Hi ${selectedCoach.name.split(' ')[1]}, I want to learn more about starting a career in ${career?.title}...`}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="modal-submit-btn"
                disabled={!name.trim() || !email.trim()}
              >
                Submit Connection Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
