import React, { useState } from 'react';
import type { ActiveScreen, Language, LabTest } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TestExplanationModal } from './components/TestExplanationModal';
import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { ReportAnalysisView } from './views/ReportAnalysisView';
import { ReportHistoryView } from './views/ReportHistoryView';
import { PrivacyView } from './views/PrivacyView';

export const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedReportId, setSelectedReportId] = useState<string>('rep-001');
  const [explanationTest, setExplanationTest] = useState<LabTest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenExplanation = (test: LabTest) => {
    setExplanationTest(test);
    setIsModalOpen(true);
  };

  const handleCloseExplanation = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Ambient Gradient Glows in Background */}
      <div className="ambient-glow ambient-glow-1" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-2" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-3" aria-hidden="true" />

      {/* Navigation Header */}
      <Navbar
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />

      {/* Main Dynamic Screen Content */}
      <main style={{ flex: 1 }}>
        {activeScreen === 'landing' && (
          <LandingView
            onNavigate={setActiveScreen}
            language={language}
            onOpenReport={(id) => {
              setSelectedReportId(id);
              setActiveScreen('analysis');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeScreen === 'dashboard' && (
          <DashboardView
            onNavigate={setActiveScreen}
            language={language}
            onSelectReport={(id) => {
              setSelectedReportId(id);
            }}
          />
        )}

        {activeScreen === 'analysis' && (
          <ReportAnalysisView
            reportId={selectedReportId}
            onNavigate={setActiveScreen}
            language={language}
            onOpenExplanation={handleOpenExplanation}
            onSelectReport={setSelectedReportId}
          />
        )}

        {activeScreen === 'history' && (
          <ReportHistoryView
            onNavigate={setActiveScreen}
            language={language}
            onOpenExplanation={handleOpenExplanation}
            onSelectReport={setSelectedReportId}
          />
        )}

        {activeScreen === 'privacy' && (
          <PrivacyView language={language} />
        )}
      </main>

      {/* Multilingual Explanation Modal (Screen D) */}
      <TestExplanationModal
        test={explanationTest}
        isOpen={isModalOpen}
        onClose={handleCloseExplanation}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={setActiveScreen}
        language={language}
      />
    </div>
  );
};

export default App;
