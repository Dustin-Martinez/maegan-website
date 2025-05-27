// src/app/buttons-container.js
'use client';

import { PrimaryButton, SecondaryButton } from './buttons';

export const ButtonsContainer = ({ setCurrentView }) => {
  return (
    <div style={{ 
      marginBottom: "15rem", 
      display: "flex", 
      gap: "4rem",
    }}>
      <PrimaryButton onClick={() => setCurrentView('login')}>
        Login
      </PrimaryButton>
      <SecondaryButton onClick={() => setCurrentView('signup')}>
        Sign up
      </SecondaryButton>
    </div>
  );
};