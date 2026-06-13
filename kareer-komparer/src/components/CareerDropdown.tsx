import React, { useState, useRef, useEffect } from 'react';
import type { Career } from '../data/careers';

interface CareerDropdownProps {
  label: string;
  careers: Career[];
  selectedCareer: Career | null;
  onSelect: (career: Career | null) => void;
  placeholder: string;
}

export const CareerDropdown: React.FC<CareerDropdownProps> = ({
  label,
  careers,
  selectedCareer,
  onSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter options based on search text
  const filteredCareers = careers.filter((career) =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  const handleSelectOption = (career: Career) => {
    onSelect(career);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container" ref={containerRef}>
      <span className="dropdown-label">{label}</span>
      <button
        type="button"
        className={`dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="dropdown-trigger-text">
          {selectedCareer ? selectedCareer.title : placeholder}
        </span>
        <svg
          className="dropdown-arrow"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-search-wrapper">
            <input
              type="text"
              className="dropdown-search-input"
              placeholder="Search careers or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          <ul className="dropdown-options-list" role="listbox">
            {filteredCareers.length > 0 ? (
              filteredCareers.map((career) => (
                <li
                  key={career.title}
                  className={`dropdown-option ${
                    selectedCareer?.title === career.title ? 'selected' : ''
                  }`}
                  role="option"
                  aria-selected={selectedCareer?.title === career.title}
                  onClick={() => handleSelectOption(career)}
                >
                  <span className="dropdown-option-title">{career.title}</span>
                  <span className="dropdown-option-category">{career.category}</span>
                </li>
              ))
            ) : (
              <li className="dropdown-no-results">No careers found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
