import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Dashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Loading your profile...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }
console.log("user",user.profile);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <button
                onClick={logout}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Profile Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.profile &&user.profile.email && (
                  <div className="space-y-2 flex">
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900 font-medium">{user.profile.email}</p>
                  </div>
                )}
                {user.profile && user.profile.name && (
                  <div className="space-y-2 flex">
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <p className="text-gray-900 font-medium">{user.profile.name}</p>
                  </div>
                )}
                {user.sub && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">Subject</label>
                    <p className="text-gray-900 font-medium">{user.sub}</p>
                  </div>
                )}
                {user.email_verified && (
                  <div className="mt-4 flex items-center text-green-600">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Email Verified</span>
                  </div>
                )}
              </div>
            </div>

            {/* Token Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Token Information</h2>
              <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                <pre className="text-sm text-gray-800">{JSON.stringify(user, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 