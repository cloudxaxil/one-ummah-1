import { Link } from 'react-router-dom';
import { Book, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Book className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">One Ummah</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A comprehensive Islamic knowledge ecosystem for students, teachers, researchers, and the wider Muslim community.
            </p>
          </div>

          {/* Knowledge */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Knowledge</h3>
            <ul className="space-y-2">
              <li><Link to="/quran" className="text-sm hover:text-emerald-400 transition-colors">Quran</Link></li>
              <li><Link to="/hadith" className="text-sm hover:text-emerald-400 transition-colors">Hadith</Link></li>
              <li><Link to="/fiqh" className="text-sm hover:text-emerald-400 transition-colors">Fiqh & Schools</Link></li>
              <li><Link to="/research" className="text-sm hover:text-emerald-400 transition-colors">Research Papers</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link to="/teachers" className="text-sm hover:text-emerald-400 transition-colors">Find Teachers</Link></li>
              <li><Link to="/community" className="text-sm hover:text-emerald-400 transition-colors">Discussion Forums</Link></li>
              <li><Link to="/register" className="text-sm hover:text-emerald-400 transition-colors">Become a Teacher</Link></li>
              <li><Link to="/register" className="text-sm hover:text-emerald-400 transition-colors">Student Registration</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>contact@oneummah.org</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Global — Online Platform</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} One Ummah. Built with the intention of serving the Ummah.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/architecture" className="text-xs text-gray-500 hover:text-emerald-400 transition-colors">Architecture</Link>
            <span className="text-xs text-gray-500">Privacy Policy</span>
            <span className="text-xs text-gray-500">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
