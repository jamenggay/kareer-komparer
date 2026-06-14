import { useState } from 'react';
import { careersData, type Career } from './data/careers';
import { Header } from './components/Header';
import { CareerDropdown } from './components/CareerDropdown';
import { EmptyState } from './components/EmptyState';
import { ComparisonView } from './components/ComparisonView';
import { CoachModal } from './components/CoachModal';
import { Questionnaire, type QuestionnaireAnswers } from './components/Questionnaire';

function App() {
  const [careerA, setCareerA] = useState<Career | null>(null);
  const [careerB, setCareerB] = useState<Career | null>(null);
  const [modalCareer, setModalCareer] = useState<Career | null>(null);
  const [modalSkill, setModalSkill] = useState<string | null>(null);
  
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers>({
    enjoyedWork: '',
    strongestSkills: [],
    mattersMost: [],
    workStyle: ''
  });

  // Filter out the already selected career from each opposite dropdown options list (optional, but premium feel)
  const optionsForA = careersData.filter((c) => !careerB || c.title !== careerB.title);
  const optionsForB = careersData.filter((c) => !careerA || c.title !== careerA.title);

  const handleSwap = () => {
    const temp = careerA;
    setCareerA(careerB);
    setCareerB(temp);
  };

  const handleClear = () => {
    setCareerA(null);
    setCareerB(null);
  };

  return (
    <>
      {/* 1. Header */}
      <Header />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Questionnaire Component */}
        <Questionnaire
          answers={questionnaireAnswers}
          onChange={setQuestionnaireAnswers}
        />

        {/* 2. Dual Selectors panel */}
        <section className="selectors-panel">
          <CareerDropdown
            label="Select First Career"
            careers={optionsForA}
            selectedCareer={careerA}
            onSelect={setCareerA}
            placeholder="Choose a career path..."
          />
          <CareerDropdown
            label="Select Second Career"
            careers={optionsForB}
            selectedCareer={careerB}
            onSelect={setCareerB}
            placeholder="Choose a career path..."
          />
        </section>

        {/* Swap & Clear Actions helper if at least one is selected */}
        {(careerA || careerB) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '32px',
              marginTop: '-24px',
            }}
          >
            {careerA && careerB && (
              <button
                type="button"
                onClick={handleSwap}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--dark-neutral)';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-color)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m16 3 4 4-4 4"></path>
                  <path d="M20 7H4"></path>
                  <path d="m8 21-4-4 4-4"></path>
                  <path d="M4 17h16"></path>
                </svg>
                Swap Columns
              </button>
            )}
            <button
              type="button"
              onClick={handleClear}
              style={{
                background: 'none',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all var(--transition-fast)',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#ef4444';
                (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-color)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              Clear Selections
            </button>
          </div>
        )}

        {/* 3. Empty State or 4. Comparison View */}
        {careerA && careerB ? (
          <ComparisonView
            careerA={careerA}
            careerB={careerB}
            questionnaireAnswers={questionnaireAnswers}
            onConnectCoach={(career, skill) => {
              setModalCareer(career);
              setModalSkill(skill || null);
            }}
          />
        ) : (
          <EmptyState />
        )}
      </main>

      {/* 5. Coach Modal layer */}
      {modalCareer && (
        <CoachModal
          career={modalCareer}
          skillName={modalSkill}
          onClose={() => {
            setModalCareer(null);
            setModalSkill(null);
          }}
        />
      )}

      {/* KadaKareer Footer Accent */}
      <footer className="footer-credit">
        <span>Made with <span className="footer-credit-heart">❤</span> by </span>
        <a href="https://www.kadakareer.com" target="_blank" rel="noreferrer" className="footer-link">
          KadaKareer
        </a>
      </footer>
    </>
  );
}

export default App;
