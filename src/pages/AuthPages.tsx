import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Book, Eye, EyeOff, Loader2 } from 'lucide-react';
import type { UserRole } from '../types';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await login(email, password, role);
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Book className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-1">Sign in to continue your learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Sign in as</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as UserRole)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="researcher">Researcher</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 px-4 py-2.5 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign In
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-700 font-medium hover:text-emerald-800">
              Create one
            </Link>
          </p>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center mb-2">Demo accounts:</p>
            <div className="grid grid-cols-1 gap-2 text-xs text-gray-500">
              <div className="flex items-start gap-2">
                <span className="shrink-0">👨‍🏫 Teacher:</span>
                <span className="text-gray-700">teacher@oneummah.org</span>
                <span className="text-gray-400">(any password)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="shrink-0">🎓 Student:</span>
                <span className="text-gray-700">student@oneummah.org</span>
                <span className="text-gray-400">(any password)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="shrink-0">🔬 Researcher:</span>
                <span className="text-gray-700">researcher@oneummah.org</span>
                <span className="text-gray-400">(any password)</span>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
                <span className="shrink-0">🛡️ Admin:</span>
                <div className="flex-1">
                  <div className="text-gray-700">admin@oneummah.org</div>
                  <div className="text-amber-600 font-mono text-[10px] mt-0.5">Password: Admin@2024!Secure</div>
                  <div className="text-gray-400 text-[10px]">Pre-configured credentials</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !displayName) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    try {
      await register(email, password, displayName, role);
      navigate('/dashboard');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Book className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Your Account</h1>
          <p className="text-gray-600 mt-1">Join the One Ummah community</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all pr-10"
                  placeholder="Minimum 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">I am a</label>
              <div className="grid grid-cols-3 gap-2">
                {(['student', 'teacher', 'researcher'] as UserRole[]).map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all ${
                      role === r
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 px-4 py-2.5 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-700 font-medium hover:text-emerald-800">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
