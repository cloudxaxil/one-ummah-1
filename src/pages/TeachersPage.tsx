import { useState } from 'react';
import { Search, Star, MapPin, Clock, GraduationCap, Filter, MessageSquare, CheckCircle } from 'lucide-react';
import type { TeacherProfile } from '../types';

const TEACHERS: TeacherProfile[] = [
  {
    id: 't-1',
    userId: 'usr_teacher_001',
    displayName: 'Sheikh Ahmad Al-Rashidi',
    bio: 'Scholar of Quranic Sciences with ijazah in the ten qira\'at. 15 years teaching experience across multiple countries.',
    subjects: ['Quran Memorization', 'Tajweed', 'Tafsir', 'Arabic Language'],
    languages: ['Arabic', 'English', 'Urdu'],
    qualifications: ['Ijazah in 10 Qira\'at', 'MA Islamic Studies — Al-Azhar', 'Certified Quran Teacher'],
    experience: 15,
    availability: ['Mon-Fri', 'Evenings (GMT+3)'],
    rating: 4.9,
    totalStudents: 87,
    hourlyRate: 35,
    currency: 'USD',
    isVerified: true,
    verificationStatus: 'approved',
    certificates: [
      { id: 'cert-1', fileName: 'ijazah_10_qiraat.pdf', fileUrl: '#', fileType: 'pdf', description: 'Ijazah in 10 Qira\'at from Al-Azhar', uploadedAt: '2024-01-10T10:00:00Z' },
      { id: 'cert-2', fileName: 'ma_islamic_studies.pdf', fileUrl: '#', fileType: 'pdf', description: 'MA Islamic Studies — Al-Azhar University', uploadedAt: '2024-01-10T10:00:00Z' },
    ],
    recitationClips: [
      { id: 'clip-1', fileName: 'recitation_surah_rahman.mp3', fileUrl: '#', mediaType: 'audio', duration: 245, description: 'Recitation of Surah Ar-Rahman', uploadedAt: '2024-01-10T10:00:00Z' },
      { id: 'clip-2', fileName: 'tajweed_demonstration.mp4', fileUrl: '#', mediaType: 'video', duration: 180, description: 'Tajweed rules demonstration', uploadedAt: '2024-01-10T10:00:00Z' },
    ],
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 't-2',
    userId: 'usr_teacher_002',
    displayName: 'Ustadha Maryam Abdullah',
    bio: 'Specialist in Islamic studies for women and children. Expert in foundational Fiqh and Seerah.',
    subjects: ['Fiqh', 'Seerah', 'Islamic Studies', 'Hadith Sciences'],
    languages: ['English', 'Arabic', 'Malay'],
    qualifications: ['BA Islamic Studies — Islamic University of Madinah', 'Certified Islamic Educator'],
    experience: 8,
    availability: ['Mon-Thu', 'Mornings (GMT+8)'],
    rating: 4.8,
    totalStudents: 124,
    hourlyRate: 25,
    currency: 'USD',
    isVerified: true,
    verificationStatus: 'approved',
    certificates: [
      { id: 'cert-3', fileName: 'ba_islamic_studies.pdf', fileUrl: '#', fileType: 'pdf', description: 'BA Islamic Studies — Islamic University of Madinah', uploadedAt: '2024-02-15T10:00:00Z' },
    ],
    recitationClips: [
      { id: 'clip-3', fileName: 'recitation_surah_mulk.mp3', fileUrl: '#', mediaType: 'audio', duration: 320, description: 'Recitation of Surah Al-Mulk', uploadedAt: '2024-02-15T10:00:00Z' },
    ],
    createdAt: '2024-02-20T10:00:00Z',
  },
  {
    id: 't-3',
    userId: 'usr_teacher_003',
    displayName: 'Dr. Ibrahim Al-Turki',
    bio: 'PhD in Comparative Fiqh. Specializes in contemporary Islamic legal issues and usul al-fiqh.',
    subjects: ['Usul al-Fiqh', 'Comparative Fiqh', 'Contemporary Issues', 'Maqasid al-Shariah'],
    languages: ['Arabic', 'English', 'French'],
    qualifications: ['PhD Islamic Jurisprudence — IIUM', 'MA Comparative Religion', 'Published Researcher'],
    experience: 12,
    availability: ['Tue-Sat', 'Flexible'],
    rating: 4.7,
    totalStudents: 56,
    hourlyRate: 50,
    currency: 'USD',
    isVerified: true,
    verificationStatus: 'approved',
    certificates: [
      { id: 'cert-4', fileName: 'phd_islamic_jurisprudence.pdf', fileUrl: '#', fileType: 'pdf', description: 'PhD Islamic Jurisprudence — IIUM', uploadedAt: '2024-03-05T10:00:00Z' },
      { id: 'cert-5', fileName: 'ma_comparative_religion.pdf', fileUrl: '#', fileType: 'pdf', description: 'MA Comparative Religion', uploadedAt: '2024-03-05T10:00:00Z' },
    ],
    recitationClips: [
      { id: 'clip-4', fileName: 'quran_recitation_sample.mp3', fileUrl: '#', mediaType: 'audio', duration: 180, description: 'Quran recitation sample', uploadedAt: '2024-03-05T10:00:00Z' },
    ],
    createdAt: '2024-03-10T10:00:00Z',
  },
  {
    id: 't-4',
    userId: 'usr_teacher_004',
    displayName: 'Sheikh Yusuf bin Khalid',
    bio: 'Hafiz of Quran with specialization in Arabic grammar and Balagha. Teaches all levels from beginners to advanced.',
    subjects: ['Arabic Grammar', 'Balagha', 'Quran Memorization', 'Morphology'],
    languages: ['Arabic', 'English'],
    qualifications: ['Ijazah in Arabic Sciences', 'Diploma in Islamic Education'],
    experience: 6,
    availability: ['Mon-Fri', 'Afternoons (GMT)'],
    rating: 4.6,
    totalStudents: 43,
    hourlyRate: 20,
    currency: 'USD',
    isVerified: false,
    verificationStatus: 'pending',
    certificates: [
      { id: 'cert-6', fileName: 'ijazah_arabic_sciences.pdf', fileUrl: '#', fileType: 'pdf', description: 'Ijazah in Arabic Sciences', uploadedAt: '2024-04-01T10:00:00Z' },
    ],
    recitationClips: [
      { id: 'clip-5', fileName: 'recitation_sample.mp3', fileUrl: '#', mediaType: 'audio', duration: 150, description: 'Quran recitation sample', uploadedAt: '2024-04-01T10:00:00Z' },
    ],
    createdAt: '2024-04-05T10:00:00Z',
  },
  {
    id: 't-5',
    userId: 'usr_teacher_005',
    displayName: 'Ustadh Omar Farooq',
    bio: 'Specialist in Hadith sciences and authentication methodology. Teaches advanced students of knowledge.',
    subjects: ['Hadith Sciences', 'Mustalah al-Hadith', 'Rijal', 'Research Methodology'],
    languages: ['English', 'Arabic', 'Bengali'],
    qualifications: ['MA Hadith Studies', 'Ijazah in Sahih al-Bukhari'],
    experience: 10,
    availability: ['Weekends', 'Evenings (GMT+6)'],
    rating: 4.9,
    totalStudents: 38,
    hourlyRate: 40,
    currency: 'USD',
    isVerified: true,
    verificationStatus: 'approved',
    certificates: [
      { id: 'cert-7', fileName: 'ma_hadith_studies.pdf', fileUrl: '#', fileType: 'pdf', description: 'MA Hadith Studies', uploadedAt: '2024-01-25T10:00:00Z' },
      { id: 'cert-8', fileName: 'ijazah_bukhari.pdf', fileUrl: '#', fileType: 'pdf', description: 'Ijazah in Sahih al-Bukhari', uploadedAt: '2024-01-25T10:00:00Z' },
    ],
    recitationClips: [
      { id: 'clip-6', fileName: 'hadith_narration_sample.mp3', fileUrl: '#', mediaType: 'audio', duration: 200, description: 'Hadith narration sample', uploadedAt: '2024-01-25T10:00:00Z' },
    ],
    createdAt: '2024-01-28T10:00:00Z',
  },
];

const ALL_SUBJECTS = ['Quran Memorization', 'Tajweed', 'Tafsir', 'Arabic Language', 'Fiqh', 'Seerah', 'Islamic Studies', 'Hadith Sciences', 'Usul al-Fiqh', 'Comparative Fiqh', 'Arabic Grammar', 'Balagha', 'Hadith Sciences', 'Research Methodology'];

export function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTeachers = TEACHERS.filter(t => {
    const matchesSearch = !searchQuery || 
      t.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = !selectedSubject || t.subjects.includes(selectedSubject);
    const matchesLanguage = !selectedLanguage || t.languages.includes(selectedLanguage);
    return matchesSearch && matchesSubject && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-indigo-300" />
            <h1 className="text-3xl font-bold">Find a Teacher</h1>
          </div>
          <p className="text-indigo-100/80 max-w-2xl">
            Connect with qualified Islamic scholars and teachers. Browse profiles, check availability, and request lessons.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, subject, or specialty..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 border rounded-xl flex items-center gap-2 transition-colors ${
                showFilters ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
          
          {showFilters && (
            <div className="flex flex-wrap gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">All Subjects</option>
                {ALL_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select
                value={selectedLanguage}
                onChange={e => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">All Languages</option>
                <option value="Arabic">Arabic</option>
                <option value="English">English</option>
                <option value="Urdu">Urdu</option>
                <option value="French">French</option>
                <option value="Malay">Malay</option>
                <option value="Bengali">Bengali</option>
              </select>
              {(selectedSubject || selectedLanguage) && (
                <button
                  onClick={() => { setSelectedSubject(''); setSelectedLanguage(''); }}
                  className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <p className="text-sm text-gray-500 mb-4">{filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''} found</p>

        <div className="space-y-4">
          {filteredTeachers.map(teacher => (
            <div key={teacher.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-indigo-100 transition-all">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar & Basic Info */}
                <div className="flex items-start gap-4 md:w-1/3">
                  <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 text-xl font-bold shrink-0">
                    {teacher.displayName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{teacher.displayName}</h3>
                      {teacher.isVerified && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-gray-700">{teacher.rating}</span>
                      <span className="text-sm text-gray-400">({teacher.totalStudents} students)</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{teacher.experience} years experience</p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{teacher.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {teacher.subjects.map(subject => (
                      <span key={subject} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full">{subject}</span>
                    ))}
                  </div>
                  {/* Verification badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {teacher.verificationStatus === 'approved' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                    {teacher.verificationStatus === 'pending' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
                        <Clock className="w-3 h-3" /> Pending Verification
                      </span>
                    )}
                    {teacher.certificates.length > 0 && (
                      <span className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200">
                        📜 {teacher.certificates.length} certificate{teacher.certificates.length > 1 ? 's' : ''}
                      </span>
                    )}
                    {teacher.recitationClips.length > 0 && (
                      <span className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200">
                        🎤 {teacher.recitationClips.length} recitation clip{teacher.recitationClips.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {teacher.availability[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      🌐 {teacher.languages.join(', ')}
                    </span>
                    {teacher.hourlyRate && (
                      <span className="font-medium text-gray-700">${teacher.hourlyRate}/hr</span>
                    )}
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center">
                  <button className="px-5 py-2.5 bg-indigo-700 text-white text-sm font-medium rounded-lg hover:bg-indigo-800 transition-colors flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Request Lesson
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No teachers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
