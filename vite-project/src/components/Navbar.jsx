import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'border-teal-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const features = [
    { name: 'Convert', path: '/convert', icon: '🔄' },
    { name: 'Compress', path: '/compress', icon: '📦' },
    { name: 'HTML to Image', path: '/html-to-image', icon: '🌐' },
    { name: 'Rotate', path: '/rotate', icon: '↻' },
    { name: 'Crop', path: '/crop', icon: '✂️' },
    { name: 'Watermark', path: '/watermark', icon: '💧' },
    { name: 'Meme Generator', path: '/meme-generator', icon: '😄' },
    { name: 'Blur Face', path: '/blur-face', icon: '👤' },
    { name: 'Upscale', path: '/upscale', icon: '⬆️' }
  ];

  return (
    <nav className="bg-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-teal-400">
                ImagePivot
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {user?.isAdmin ? (
                // Admin Navigation
                <>
                  <Link
                    to="/admin"
                    className={`${isActive('/admin')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/users"
                    className={`${isActive('/admin/users')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/plans"
                    className={`${isActive('/admin/plans')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                  >
                    Plans
                  </Link>
                </>
              ) : (
                // Regular User Navigation
                <>
                  <Link
                    to="/convert"
                    className={`${isActive('/convert')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 text-teal-400 hover:text-teal-600`}
                  >
                    Convert
                  </Link>
                  <Link
                    to="/compress"
                    className={`${isActive('/compress')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 text-teal-400 hover:text-teal-600`}
                  >
                    Compress
                  </Link>
                  
                  {/* Features Dropdown */}
                  <div
                    className="relative inline-flex items-center"
                    onMouseEnter={() => setShowFeatures(true)}
                    onMouseLeave={() => setShowFeatures(false)}
                  >
                    <button
                      className={` hover:text-teal-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                        showFeatures ? 'border-indigo-500 text-teal-900' : 'border-transparent text-teal-400 hover:border-gray-300 hover:text-teal-700'
                      }`}
                    >
                      Features
                      <svg
                        className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                          showFeatures ? 'transform rotate-180' : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    
                    {/* Features Dropdown Menu */}
                    {showFeatures && (
                      <div className="absolute z-10 top-full right-0 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-2 max-h-[400px] overflow-y-auto">
                          {features.map((feature) => (
                            <Link
                              key={feature.path}
                              to={feature.path}
                              className="flex items-center px-4 py-2 text-sm text-indigo-700 hover:bg-indigo-50 hover:text-indigo-600"
                            >
                              <span className="mr-3 w-5 text-center">{feature.icon}</span>
                              {feature.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Desktop Auth Buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {!user.isAdmin && (
                  <>
                    <Link
                      to="/plans"
                      className={`${isActive('/plans')} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-teal-400`}
                    >
                      Plans
                    </Link>
                    <Link
                      to="/dashboard"
                      className={`${isActive('/dashboard')} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-teal-400`}
                    >
                      Dashboard
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`${isActive('/login')} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {user?.isAdmin ? (
            // Admin Mobile Navigation
            <>
              <Link
                to="/admin"
                className={`${isActive('/admin')} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/users"
                className={`${isActive('/admin/users')} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              >
                Users
              </Link>
              <Link
                to="/admin/plans"
                className={`${isActive('/admin/plans')} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              >
                Plans
              </Link>
            </>
          ) : (
            // Regular User Mobile Navigation
            <>
              <Link
                to="/convert"
                className={`${isActive('/convert')} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              >
                Convert
              </Link>
              <Link
                to="/compress"
                className={`${isActive('/compress')} block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              >
                Compress
              </Link>
            </>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div className="space-y-1">
              {!user.isAdmin && (
                <>
                  <Link
                    to="/plans"
                    className={`${isActive('/plans')} block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200`}
                  >
                    Plans
                  </Link>
                  <Link
                    to="/dashboard"
                    className={`${isActive('/dashboard')} block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200`}
                  >
                    Dashboard
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link
                to="/login"
                className={`${isActive('/login')} block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
