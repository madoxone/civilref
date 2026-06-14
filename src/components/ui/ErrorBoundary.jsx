import { Component } from 'react';

/**
 * Catches render errors anywhere in the tree below and shows a recoverable
 * error page with a reload button instead of crashing the whole app.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-bg text-text font-sans px-6 py-16 flex justify-center">
          <div className="max-w-xl">
            <div className="text-2xl mb-3">◈</div>
            <h2 className="text-xl font-semibold mb-2">Something went wrong on this page.</h2>
            <p className="text-sm text-textSub leading-relaxed mb-5">
              The error has been logged. Reload to continue. If it happens again, use the Flag
              button on a related entry to let us know what you were doing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90"
            >
              Reload
            </button>
            <details className="mt-6 text-xs text-textMuted">
              <summary className="cursor-pointer">Technical details</summary>
              <pre className="mt-2 font-mono text-[11px] whitespace-pre-wrap">
                {String(this.state.error?.stack || this.state.error)}
              </pre>
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
