import React from 'react';

interface ButtonVisibleProps {
  isVisible: boolean;
  onToggle: () => void;
  ariaLabel: string;
}

const ButtonVisible: React.FC<ButtonVisibleProps> = ({ isVisible, onToggle, ariaLabel }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute inset-y-0 right-0 px-3 py-1"
      aria-label={ariaLabel}
    >
      {isVisible ? (
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 3 12 3a10.05 10.05 0 011.875.175M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.071 19.071l-2.828-2.828M4.929 4.929l2.828 2.828"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.455 5 12 5c4.546 0 8.268 2.943 9.542 7-.846 2.81-3.016 5.062-5.741 6.234M12 5c4.546 0 8.268 2.943 9.542 7"
          />
        </svg>
      )}
    </button>
  );
};

export default ButtonVisible;
