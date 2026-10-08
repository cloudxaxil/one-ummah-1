import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen, Users, GraduationCap, Search, FileText,
  MessageSquare, ArrowRight, Star, Shield, Globe, Book
} from 'lucide-react';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-800/50 border border-emerald-600/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-emerald-200">Open Knowledge Ecosystem</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Seek Knowledge.<br />
              <span className="text-emerald-300">Illuminate Your Path.</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              A comprehensive platform for Islamic learning, research, and community. 
              Connect with qualified teachers, access authentic sources, and grow in knowledge together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-8 py-3.5 bg-white text-emerald-800 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg shadow-black/20 flex items-center gap-2"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-8 py-3.5 bg-white text-emerald-800 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg shadow-black/20 flex items-center gap-2"
                  >
                    Start Learning
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/quran"
                    className="px-8 py-3.5 border border-emerald-400/40 text-white font-semibold rounded-xl hover:bg-emerald-800/50 transition-all"
                  >
                    Explore Quran
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Learn & Grow</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From Quran and Hadith to academic research and community discussion — all in one trusted platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Book className="w-6 h-6" />}
              title="Quran"
              description="Access the complete Quran with translations, audio recitations, and study tools. No account required."
              link="/quran"
              color="emerald"
            />
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Hadith Collections"
              description="Browse authenticated hadith from major collections with proper source attribution and grading."
              link="/hadith"
              color="teal"
            />
            <FeatureCard
              icon={<GraduationCap className="w-6 h-6" />}
              title="Find Teachers"
              description="Connect with qualified Islamic scholars and teachers. View profiles, subjects, and availability."
              link="/teachers"
              color="cyan"
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="Islamic Research"
              description="Access peer-reviewed research papers, publish your own work, and cite properly sourced scholarship."
              link="/research"
              color="emerald"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Fiqh Schools"
              description="Study different schools of Islamic jurisprudence with respectful comparison and proper attribution."
              link="/fiqh"
              color="teal"
            />
            <FeatureCard
              icon={<MessageSquare className="w-6 h-6" />}
              title="Community"
              description="Discuss Islamic topics, ask questions, and share knowledge in moderated, topic-based communities."
              link="/community"
              color="cyan"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem value="114" label="Surahs Available" />
            <StatItem value="50+" label="Qualified Teachers" />
            <StatItem value="6" label="Hadith Collections" />
            <StatItem value="1,200+" label="Active Learners" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {isAuthenticated ? 'Continue Your Journey' : 'Begin Your Journey of Knowledge'}
          </h2>
          <p className="text-emerald-100/80 mb-8 max-w-xl mx-auto">
            "Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise." — Prophet Muhammad ﷺ
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-800 font-semibold rounded-xl hover:bg-emerald-50 transition-all"
            >
              Create Free Account
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, link, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-700',
    teal: 'bg-teal-50 text-teal-700',
    cyan: 'bg-cyan-50 text-cyan-700',
  };

  return (
    <Link
      to={link}
      className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </Link>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-emerald-700 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
