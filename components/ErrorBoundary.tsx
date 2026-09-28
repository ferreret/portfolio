import React from 'react';
import { AppContent } from '@/types';

interface ErrorBoundaryProps {
  ui: AppContent['ui'];
  resetKey: string;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Catches render errors and failed lazy-chunk loads (e.g. a tab left open across a
// deploy that renamed the hashed chunks) so the page doesn't go blank.
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // Navigating away from the broken route gives the new one a fresh try.
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    const { ui } = this.props;
    return (
      <div role="alert" className="pt-24 pb-20 min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-4 leading-tight">
            {ui.errorTitle}
          </h1>
          <p className="text-lg text-warm-600 dark:text-warm-400 leading-relaxed mb-10">{ui.errorDescription}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-warm-900 dark:bg-warm-50 text-white dark:text-warm-900 font-medium hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors"
          >
            {ui.errorReload}
          </button>
        </div>
      </div>
    );
  }
}
