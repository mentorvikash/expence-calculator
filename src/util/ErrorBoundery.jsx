import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event) => {
      setHasError(true);
      // Log the error to an error reporting service
      console.error(event.error);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (hasError) {
    return typeof fallback === 'function' ? fallback() : fallback;
  }

  return children;
};

export default ErrorBoundary;
