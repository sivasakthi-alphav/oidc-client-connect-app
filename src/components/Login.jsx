import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Login() {
  const { login, user, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/dashboard');
    }
  }, [user, isAuthenticated, navigate]);

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-[90%] max-w-md transform transition-all hover:scale-[1.02]">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Welcome</h1>
          <p className="text-lg text-gray-600">Please sign in to continue</p>
        </div>
        <div className="mt-8">
          {error && <p style={{color: 'red'}} className="text-red-500">{error}</p>}
          <button 
            onClick={login} 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connecting...' : 'Sign In with OpenID Connect'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login; 