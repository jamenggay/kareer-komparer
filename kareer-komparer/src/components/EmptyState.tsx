import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon-wrapper">
        <svg
          className="empty-state-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 3h5v5"></path>
          <path d="M8 3H3v5"></path>
          <path d="M12 2v20"></path>
          <path d="M3 12h18"></path>
          <path d="m21 3-7 7"></path>
          <path d="m3 3 7 7"></path>
          <path d="m21 21-7-7"></path>
          <path d="m3 21 7-7"></path>
          <path d="M16 21h5v-5"></path>
          <path d="M8 21H3v-5"></path>
        </svg>
      </div>
      <h2 className="empty-state-text">
        Choose two careers to compare!
      </h2>
      <p className="empty-state-subtext">
        Select a career in each dropdown above to see a detailed comparison of responsibilities, similar skills, and skill gaps.
      </p>
    </div>
  );
};
