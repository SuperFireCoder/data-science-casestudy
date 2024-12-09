import { useState, useEffect } from 'react';

const useHealthCheck = () => {
  const [isHealthy, setIsHealthy] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const checkServerHealth = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/health', {
          signal: controller.signal,
        });

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
        }
        setError(error);
      } finally {
        clearTimeout(timeoutId);
      }
    };

    checkServerHealth();

    const intervalId = setInterval(checkServerHealth, 3000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return { isHealthy, error };
};

export default useHealthCheck;
