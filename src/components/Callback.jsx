import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Callback = () => {
  const navigate = useNavigate();
  const { handleCallback, error, loading } = useAuth();
  const processedRef = useRef(false);

  useEffect(() => {
    const processCallback = async () => {
      if (processedRef.current) return;
      processedRef.current = true;
      
      try {
        await handleCallback();
        navigate('/dashboard');
      } catch (err) {
        console.error('Callback processing error:', err);
        navigate('/login', { state: { error: err.message } });
      }
    };

    processCallback();
  }, [handleCallback, navigate]);

  if (loading) {
    return <div>Processing authentication...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Redirecting...</div>;
};

export default Callback; 