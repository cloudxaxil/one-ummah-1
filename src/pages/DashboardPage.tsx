import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Users, BookOpen, Calendar, Clock, CheckCircle, XCircle,
  TrendingUp, MessageSquare, FileText, GraduationCap, Bell, Shield
} from 'lucide-react';
import type { LessonRequest, DashboardStats } from '../types';

const MOCK_STATS: DashboardStats = {
  totalStudents: 87,
  totalTeachers: 5,
  activeLessons: 12,
  pendingRequests: 3,
  completedLessons: 156,
  researchPapers: 4,
};

const MOCK_REQUESTS: LessonRequest[] = [
  {
    id: 'lr-1',
    studentId: 'usr_student_001',
    teacherId: 'usr_teacher_001',
    subject: 'Quran Memorization',
    message: 'I would like to begin memorizing Juz Amma with proper tajweed.',
    status: 'pending',
    createdAt: '2024-07-15T10:00:00Z',
    updatedAt: '2024-07-15T10:00:00Z',
  },
  {
    id: 'lr-2',
    studentId: 'usr_student_002',
    teacherId: 'usr_teacher_001',
    subject: 'Tafsir',
    message: 'Interested in studying Tafsir of Surah Al-Baqarah.',
    status: 'accepted',
    createdAt: '2024-07-10T14:00:00Z',
    updatedAt: '2024-07-11T09:00:00Z',
  },
  {
    id: 'lr-3',
    studentId: 'usr_student_003',
    teacherId: 'usr_teacher_001',
    subject: 'Arabic Language',
    message: 'Beginner level Arabic grammar course.',
    status: 'pending',
    createdAt: '2024-07-14T16:30:00Z',
    updatedAt: '2024-07-14T16:30:00Z',
  },
  {
    id: 'lr-4',
    studentId: 'usr_student_001',
    teacherId: 'usr_teacher_002',
    subject: 'Fiqh',
    message: 'Would like to study Hanafi fiqh for beginners.',
    status: 'completed',
    createdAt: '2024-06-20T10:00:00Z',
    updatedAt: '2024-07-01T15:00:00Z',
  },
];

export function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'schedule'>('overview');

  if (!user) return null;

  const isTeacher = user.role === 'teacher';
  const isStudent = user.role === 'student';
  const isResearcher = user.role === 'researcher';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isTeacher ? 'Teacher Dashboard' : isStudent ? 'Student Dashboard' : 'Researcher Dashboard'}
            </h1>
            <p className="text-gray-500 mt-1">Welcome back, {user.displayName}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
          </div>
        </div>

        {/* Verification Status Banner */}
        {(isTeacher || isResearcher) && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-800">Verification Required</p>
                <p className="text-xs text-amber-600">
                  {isTeacher
                    ? 'Upload your certificates and recitation clips to get verified as a teacher.'
                    : 'Submit your credentials or research papers to get verified as a researcher.'
                  }
                </p>
              </div>
            </div>
            <Link
              to="/verify"
              className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors shrink-0"
            >
              Get Verified
            </Link>
          </div>
        )}

        {/* Admin Quick Link */}
        {user.role === 'admin' && (
          <div className="mb-6 p-4 bg-gray-900 border border-gray-700 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Admin Panel</p>
                <p className="text-xs text-gray-400">3 pending verification requests need your review.</p>
              </div>
            </div>
            <Link
              to="/admin"
              className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shrink-0"
            >
              Open Admin Panel
            </Link>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-lg p-1 mb-8 w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'overview' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'requests' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {isTeacher ? 'Student Requests' : 'My Requests'}
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'schedule' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Schedule
          </button>
        </div>

        {activeTab === 'overview' && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {isTeacher && (
                <>
                  <StatCard icon={<Users className="w-5 h-5" />} label="Total Students" value={MOCK_STATS.totalStudents!} color="emerald" />
                  <StatCard icon={<BookOpen className="w-5 h-5" />} label="Active Lessons" value={MOCK_STATS.activeLessons} color="blue" />
                  <StatCard icon={<Clock className="w-5 h-5" />} label="Pending Requests" value={MOCK_STATS.pendingRequests} color="amber" />
                  <StatCard icon={<CheckCircle className="w-5 h-5" />} label="Completed" value={MOCK_STATS.completedLessons} color="green" />
                </>
              )}
              {isStudent && (
                <>
                  <StatCard icon={<GraduationCap className="w-5 h-5" />} label="My Teachers" value={2} color="emerald" />
                  <StatCard icon={<BookOpen className="w-5 h-5" />} label="Active Lessons" value={3} color="blue" />
                  <StatCard icon={<Clock className="w-5 h-5" />} label="Pending" value={1} color="amber" />
                  <StatCard icon={<CheckCircle className="w-5 h-5" />} label="Completed" value={12} color="green" />
                </>
              )}
              {isResearcher && (
                <>
                  <StatCard icon={<FileText className="w-5 h-5" />} label="Published Papers" value={MOCK_STATS.researchPapers!} color="emerald" />
                  <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Total Citations" value={40} color="blue" />
                  <StatCard icon={<Users className="w-5 h-5" />} label="Collaborators" value={3} color="purple" />
                  <StatCard icon={<MessageSquare className="w-5 h-5" />} label="Reviews" value={7} color="amber" />
                </>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {isTeacher && (
                    <>
                      <Link to="/teachers" className="block p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">View your public profile</Link>
                      <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">Update availability</button>
                      <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">View student progress</button>
                    </>
                  )}
                  {isStudent && (
                    <>
                      <Link to="/teachers" className="block p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">Find a new teacher</Link>
                      <Link to="/quran" className="block p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">Continue Quran study</Link>
                      <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">View learning progress</button>
                    </>
                  )}
                  {isResearcher && (
                    <>
                      <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">Submit new paper</button>
                      <Link to="/research" className="block p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">View my publications</Link>
                      <button className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700">Manage citations</button>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <ActivityItem text="New lesson request from Fatima H." time="2 hours ago" type="request" />
                  <ActivityItem text="Completed Tajweed session with Ahmed M." time="Yesterday" type="completed" />
                  <ActivityItem text="Student Omar K. completed Juz 30" time="2 days ago" type="milestone" />
                  <ActivityItem text="New review received (5 stars)" time="3 days ago" type="review" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {isTeacher ? 'Incoming Student Requests' : 'My Lesson Requests'}
            </h2>
            {MOCK_REQUESTS.map(request => (
              <div key={request.id} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{request.subject}</h3>
                      <StatusBadge status={request.status} />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{request.message}</p>
                    <p className="text-xs text-gray-400">
                      {isTeacher ? `From: Student ${request.studentId}` : `To: Teacher ${request.teacherId}`}
                      {' • '}{new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {request.status === 'pending' && isTeacher && (
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors">Accept</button>
                      <button className="px-3 py-1.5 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors">Decline</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule</h3>
            <p className="text-gray-500 text-sm">
              Calendar integration coming soon. You'll be able to manage lesson times, send reminders, and track attendance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-700',
    blue: 'bg-blue-50 text-blue-700',
    amber: 'bg-amber-50 text-amber-700',
    green: 'bg-green-50 text-green-700',
    purple: 'bg-purple-50 text-purple-700',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700',
    accepted: 'bg-blue-50 text-blue-700',
    rejected: 'bg-red-50 text-red-700',
    completed: 'bg-green-50 text-green-700',
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-50 text-gray-600'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function ActivityItem({ text, time, type }: { text: string; time: string; type: string }) {
  const icons: Record<string, React.ReactNode> = {
    request: <MessageSquare className="w-4 h-4 text-blue-500" />,
    completed: <CheckCircle className="w-4 h-4 text-green-500" />,
    milestone: <TrendingUp className="w-4 h-4 text-emerald-500" />,
    review: <StarFilled className="w-4 h-4 text-amber-500" />,
  };

  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icons[type]}</div>
      <div>
        <p className="text-sm text-gray-700">{text}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
}

function StarFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
