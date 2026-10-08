// ─── User & Authentication ───────────────────────────────────────────────────

export type UserRole = 'student' | 'teacher' | 'researcher' | 'admin';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  bio?: string;
  languages: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── Verification System ─────────────────────────────────────────────────────

export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'not_submitted';

export interface Certificate {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: 'pdf' | 'image' | 'video' | 'audio';
  description: string;
  uploadedAt: string;
}

export interface MediaClip {
  id: string;
  fileName: string;
  fileUrl: string;
  mediaType: 'video' | 'audio';
  duration?: number; // seconds
  description: string;
  uploadedAt: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userRole: 'teacher' | 'researcher';
  displayName: string;
  email: string;
  
  // Teacher-specific
  certificates: Certificate[];
  recitationClips: MediaClip[];
  
  // Researcher-specific (alternative to certificates)
  hasAcademicCredentials: boolean;
  academicCertificates: Certificate[];
  previousResearchPapers: Certificate[]; // PDFs of published work
  
  // Common
  additionalNotes: string;
  submittedAt: string;
  status: VerificationStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

// ─── Teacher Profiles ────────────────────────────────────────────────────────

export interface TeacherProfile {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  bio: string;
  subjects: string[];
  languages: string[];
  qualifications: string[];
  experience: number; // years
  availability: string[];
  rating: number;
  totalStudents: number;
  hourlyRate?: number;
  currency?: string;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  certificates: Certificate[];
  recitationClips: MediaClip[];
  createdAt: string;
}

// ─── Student Profiles ────────────────────────────────────────────────────────

export interface StudentProfile {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  bio: string;
  learningGoals: string[];
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  languages: string[];
  enrolledTeachers: string[];
  createdAt: string;
}

// ─── Researcher Profiles ─────────────────────────────────────────────────────

export interface ResearcherProfile {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  bio: string;
  specializations: string[];
  languages: string[];
  institution?: string;
  hasAcademicCredentials: boolean;
  academicCertificates: Certificate[];
  previousResearchPapers: Certificate[]; // Alternative proof
  publishedPapers: string[]; // IDs of papers on platform
  verificationStatus: VerificationStatus;
  isVerified: boolean;
  createdAt: string;
}

// ─── Lesson Requests ─────────────────────────────────────────────────────────

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export interface LessonRequest {
  id: string;
  studentId: string;
  teacherId: string;
  subject: string;
  message: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Quran ───────────────────────────────────────────────────────────────────

export interface Surah {
  id: number;
  name: string;
  nameArabic: string;
  nameTranslation: string;
  revelationType: 'meccan' | 'medinan';
  ayahCount: number;
  chapterNumber: number;
}

export interface Ayah {
  id: number;
  surahId: number;
  number: number;
  textArabic: string;
  translation: string;
  transliteration?: string;
}

// ─── Hadith ──────────────────────────────────────────────────────────────────

export interface HadithCollection {
  id: string;
  name: string;
  nameArabic: string;
  author: string;
  totalHadiths: number;
  description: string;
}

export interface Hadith {
  id: string;
  collectionId: string;
  bookNumber: number;
  hadithNumber: number;
  arabic: string;
  translation: string;
  grade: string;
  narrator: string;
  topics: string[];
  references: string[];
}

// ─── Research ────────────────────────────────────────────────────────────────

export interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  authorId: string;
  authorName: string;
  keywords: string[];
  references: string[];
  citations: number;
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'under_review';
  doi?: string;
}

// ─── Community ───────────────────────────────────────────────────────────────

export interface CommunityTopic {
  id: string;
  title: string;
  slug: string;
  description: string;
  memberCount: number;
  postCount: number;
  category: string;
}

export interface CommunityPost {
  id: string;
  topicId: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  replies: number;
  isPinned: boolean;
  tags: string[];
}

// ─── Fiqh Schools ────────────────────────────────────────────────────────────

export interface FiqhSchool {
  id: string;
  name: string;
  nameArabic: string;
  founder: string;
  description: string;
  principles: string[];
}

export interface FiqhRuling {
  id: string;
  topic: string;
  schools: {
    schoolId: string;
    position: string;
    evidence: string[];
    source: string;
  }[];
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  requiresAuth?: boolean;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalStudents?: number;
  totalTeachers?: number;
  activeLessons: number;
  pendingRequests: number;
  completedLessons: number;
  researchPapers?: number;
}
