import React, { useState, useCallback } from 'react';
import { ConfigProvider } from './context/ConfigContext';
import { ReviewProvider, useReview } from './context/ReviewContext';
import { DiffNavigationProvider } from './context/DiffNavigationContext';
import { TooltipProvider } from './components/ui/tooltip';
import Toolbar from './components/Toolbar';
import Layout from './components/Layout';
import CloseConfirmDialog from './components/CloseConfirmDialog';
import { KeyboardNavigationManager } from './components/KeyboardNavigationManager';
import { FindBar } from './components/FindBar';
import WelcomeScreen from './components/WelcomeScreen';

function AppContent() {
  const { diffSource } = useReview();
  const [isFindBarOpen, setIsFindBarOpen] = useState(false);

  const toggleFindBar = useCallback(() => {
    setIsFindBarOpen(prev => !prev);
  }, []);

  if (diffSource.type === 'loading') {
    return null;
  }

  if (diffSource.type === 'welcome') {
    return <WelcomeScreen />;
  }

  return (
    <DiffNavigationProvider>
      <TooltipProvider>
        <KeyboardNavigationManager onToggleFindBar={toggleFindBar} />
        <div className='flex flex-col h-screen bg-background text-foreground antialiased'>
          <Toolbar />
          <Layout />
        </div>
        <FindBar isOpen={isFindBarOpen} onClose={() => setIsFindBarOpen(false)} />
        <CloseConfirmDialog />
      </TooltipProvider>
    </DiffNavigationProvider>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <ReviewProvider>
        <AppContent />
      </ReviewProvider>
    </ConfigProvider>
  );
}
