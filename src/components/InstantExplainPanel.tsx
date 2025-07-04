import React, { useState, CSSProperties } from "react";
import styles from './InstantExplainPanel.module.css'; // Import CSS Modules

// Assuming mockExplain.ts is in ../mock/mockExplain.ts
// If you want to use it, uncomment the line below and ensure the path is correct.
// import { mockExplain } from "../mock/mockExplain";

type Levels = "layperson" | "intermediate" | "developer";

const TITLES: Record<Levels, string> = {
  layperson: "Layperson",
  intermediate: "Intermediate",
  developer: "Developer",
};

interface Props {
  explanation: Record<Levels, string>;
  // No theme prop needed anymore
}

// Helper function to combine CSS module classes
// Filters out falsy values and joins with space
function cx(...classNames: (string | undefined | false | null)[]): string {
  return classNames.filter(Boolean).join(' ');
}

// Default icon color (can be overridden by specific icon styles if needed)
const defaultIconColor = '#4b5563'; // Equivalent to neutral-600

// Basic SVG icons
const ChevronDownIcon = ({ style }: { style?: CSSProperties }) => (
  <svg style={{ width: '16px', height: '16px', color: defaultIconColor, ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUpIcon = ({ style }: { style?: CSSProperties }) => (
  <svg style={{ width: '16px', height: '16px', color: defaultIconColor, ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ClipboardCopyIcon = ({ style }: { style?: CSSProperties }) => (
  <svg style={{ width: '14px', height: '14px', ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const MessageSquarePlusIcon = ({ style }: { style?: CSSProperties }) => (
  <svg style={{ width: '14px', height: '14px', ...style }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5zM9 10h6m-3-3v6" />
  </svg>
);


export default function InstantExplainPanel({ explanation }: Props) {
  const [openLevel, setOpenLevel] = useState<Levels | null>("layperson");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // isDark and theme prop removed

  const handleCopyText = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setToastMessage("Copied to clipboard!");
    } catch (err) {
      setToastMessage("Failed to copy.");
      console.error("Failed to copy text: ", err);
    }
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleAskFollowUp = (seedText: string) => {
    console.log("Ask follow-up based on:", seedText);
    // chrome.runtime.sendMessage({ type: "FOLLOW_UP", seed: seedText });
    setToastMessage("Follow-up action triggered (see console).");
    setTimeout(() => setToastMessage(null), 2000);
  };

  return (
    <div className={styles.iepPanelContainer}> {/* No more conditional dark class */}
      {(Object.keys(TITLES) as Levels[]).map((level) => {
        const isOpen = openLevel === level;
        return (
          <div
            key={level}
            className={cx(
              styles.iepCard,
              isOpen ? styles.open : styles.dashed
              // No more conditional dark class
            )}
          >
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={`${level}-content`}
              onClick={() => setOpenLevel(isOpen ? null : level)}
              onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenLevel(isOpen ? null : level)}}
              className={cx(
                styles.iepHeader,
                isOpen && styles.open
                // No more conditional dark class
              )}
            >
              <h3 className={styles.iepTitle}>{TITLES[level]}</h3>
              {/* Icon color is now handled by default in SVG or can be overridden by CSS if needed */}
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>

            {isOpen && (
              <div className={styles.iepContent}> {/* No more conditional dark class */}
                <p className={styles.iepExplanationText}>
                  {explanation[level]}
                </p>
                <div className={styles.iepActions}>
                  <button
                    onClick={() => handleCopyText(explanation[level])}
                    className={styles.iepButton} // No more conditional dark class
                  >
                    <ClipboardCopyIcon style={{ marginRight: '4px' }} /> Copy
                  </button>

                  <button
                    onClick={() => handleAskFollowUp(explanation[level])}
                    className={cx(
                      styles.iepButton,
                      styles.iepButtonPrimary
                      // No more conditional dark class
                    )}
                  >
                    <MessageSquarePlusIcon style={{ marginRight: '4px' }} /> Ask follow-up
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={styles.iepToast} // No more conditional dark class
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

// Example of how to use it:
//
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import InstantExplainPanel from './InstantExplainPanel';
// import { mockExplain } from '../mock/mockExplain';
//
// const App = () => {
//   const appStyle: React.CSSProperties = {
//     padding: '20px',
//     backgroundColor: '#f0f0f0', // Default background
//     minHeight: '100vh',
//     fontFamily: 'system-ui, sans-serif',
//   };
//
//   const panelWrapperStyle: React.CSSProperties = {
//     width: '400px',
//     margin: '20px auto',
//   };
//
//   return (
//     <div style={appStyle}>
//       <div style={panelWrapperStyle}>
//         <InstantExplainPanel explanation={mockExplain} />
//       </div>
//     </div>
//   );
// };
//
// // ReactDOM.createRoot(document.getElementById('root')!).render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );
