import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container text-center py-5 mt-5">
          <h1 className="text-danger fw-bold display-4">Oops!</h1>
          <h3 className="text-muted mt-3">Something went wrong.</h3>
          <p className="text-muted mb-4">We are sorry for the inconvenience. Please try refreshing the page.</p>
          <button 
            className="btn btn-success px-4 py-2" 
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
