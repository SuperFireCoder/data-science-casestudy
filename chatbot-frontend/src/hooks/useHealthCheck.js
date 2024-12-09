import { useState, useEffect, useCallback } from 'react';

const useHealthCheck = () => {
  const [isHealthy, setIsHealthy] = useState(null);
  const [error, setError] = useState(null);

  const checkServerHealth = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);

      const response = await fetch('http://localhost:8000/api/health', {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setIsHealthy(true);
      } else {
        setIsHealthy(false);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        setIsHealthy(false);
      } else {
        setIsHealthy(false);
        setError(error);
      }
    }
  }, []);

  useEffect(() => {
    checkServerHealth();

    const interval = setInterval(() => {
      checkServerHealth();
    }, 5000);

    return () => clearInterval(interval);
  }, [checkServerHealth]);

  const retry = () => {
    setIsHealthy(null);
    checkServerHealth();
  };
  return { isHealthy, retry, error };
};

export default useHealthCheck;
