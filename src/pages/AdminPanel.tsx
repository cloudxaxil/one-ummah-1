import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Shield, CheckCircle, XCircle, Clock, Eye, FileText,
  Play, Music, Users, AlertTriangle, Search, Filter,
  ChevronDown, ChevronUp, Download, UserCheck, UserX
} from 'lucide-react';
import type { VerificationRequest, VerificationStatus, Certificate, MediaClip } from '../types';

// Mock verification requests
const MOCK_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: 'vr-1',
    userId: 'usr_teacher_004',
    userRole: 'teacher',
    displayName: 'Sheikh Yusuf bin Khalid',
    email: 'yusuf@example.com',
    certificates: [
      { id: 'cert-6', fileName: 'ijazah_arabic_sciences.pdf', fileUrl: '#', fileType: 'pdf', description: 'Ijazah in Arabic Sciences from Sheikh Abdul Rahman', uploadedAt: '2024-04-01T10:00:00Z' },
      { id: 'cert-7', fileName: 'diploma_islamic_edu.pdf', fileUrl: '#', fileType: 'pdf', description: 'Diploma in Islamic Education — Open University', uploadedAt: '2024-04-01T10:00:00Z' },
    ],
    recitationClips: [
      { id: 'clip-5', fileName: 'recitation_surah_baqarah.mp3', fileUrl: '#', mediaType: 'audio', duration: 420, description: 'Recitation of first 2 pages of Surah Al-Baqarah with tajweed', uploadedAt: '2024-04-01T10:00:00Z' },
      { id: 'clip-6', fileName: 'teaching_demo.mp4', fileUrl: '#', mediaType: 'video', duration: 300, description: 'Teaching demonstration — explaining tajweed rules', uploadedAt: '2024-04-01T10:00:00Z' },
    ],
    hasAcademicCredentials: false,
    academicCertificates: [],
    previousResearchPapers: [],
    additionalNotes: 'I have been teaching Quran for 6 years privately. I have ijazah from my sheikh and would like to formalize my teaching on this platform.',
    submittedAt: '2024-04-05T10:00:00Z',
    status: 'pending',
  },
  {
    id: 'vr-2',
    userId: 'usr_researcher_004',
    userRole: 'researcher',
    displayName: 'Br. Abdullah Hassan',
    email: 'abdullah.h@example.com',
    certificates: [],
    recitationClips: [],
    hasAcademicCredentials: false,
    academicCertificates: [],
    previousResearchPapers: [
      { id: 'paper-1', fileName: 'maqasid_modern_finance.pdf', fileUrl: '#', fileType: 'pdf', description: 'Published in Journal of Islamic Economics, 2023', uploadedAt: '2024-05-10T10:00:00Z' },
      { id: 'paper-2', fileName: 'digital_waqf_framework.pdf', fileUrl: '#', fileType: 'pdf', description: 'Presented at International Islamic Finance Conference, 2022', uploadedAt: '2024-05-10T10:00:00Z' },
      { id: 'paper-3', fileName: 'crypto_shariah_analysis.pdf', fileUrl: '#', fileType: 'pdf', description: 'Co-authored paper published in ISRA International Journal', uploadedAt: '2024-05-10T10:00:00Z' },
    ],
    additionalNotes: 'I do not hold a formal PhD but have been researching Islamic finance for 8 years with 12 published papers in peer-reviewed journals. I believe my body of work demonstrates my expertise.',
    submittedAt: '2024-05-15T14:00:00Z',
    status: 'pending',
  },
  {
    id: 'vr-3',
    userId: 'usr_teacher_006',
    userRole: 'teacher',
    displayName: 'Ustadha Khadija Noor',
    email: 'khadija.n@example.com',
    certificates: [
      { id: 'cert-8', fileName: 'ijazah_hafs.pdf', fileUrl: '#', fileType: 'pdf', description: 'Ijazah in Hafs an Asim from Darul Uloom Karachi', uploadedAt: '2024-06-01T10:00:00Z' },
    ],
    recitationClips: [
      { id: 'clip-7', fileName: 'recitation_juz_amma.mp3', fileUrl: '#', mediaType: 'audio', duration: 600, description: 'Complete recitation of Juz Amma', uploadedAt: '2024-06-01T10:00:00Z' },
    ],
    hasAcademicCredentials: false,
    academicCertificates: [],
    previousResearchPapers: [],
    additionalNotes: 'Hafiza of Quran with ijazah. Teaching women and children for 4 years.',
    submittedAt: '2024-06-05T10:00:00Z',
    status: 'pending',
  },
  {
    id: 'vr-4',
    userId: 'usr_researcher_005',
    userRole: 'researcher',
    displayName: 'Sr. Amina Yusuf',
    email: 'amina.y@example.com',
    certificates: [],
    recitationClips: [],
    hasAcademicCredentials: true,
    academicCertificates: [
      { id: 'cert-9', fileName: 'phd_islamic_studies.pdf', fileUrl: '#', fileType: 'pdf', description: 'PhD Islamic Studies — University of Oxford, 2021', uploadedAt: '2024-06-10T10:00:00Z' },
      { id: 'cert-10', fileName: 'ma_middle_eastern.pdf', fileUrl: '#', fileType: 'pdf', description: 'MA Middle Eastern Studies — SOAS London', uploadedAt: '2024-06-10T10:00:00Z' },
    ],
    previousResearchPapers: [
      { id: 'paper-4', fileName: 'women_mosque_history.pdf', fileUrl: '#', fileType: 'pdf', description: 'Published in Journal of Islamic Studies, Oxford, 2022', uploadedAt: '2024-06-10T10:00:00Z' },
    ],
    additionalNotes: 'Academic researcher specializing in women\'s roles in Islamic history.',
    submittedAt: '2024-06-12T10:00:00Z',
    status: 'pending',
  },
  {
    id: 'vr-5',
    userId: 'usr_teacher_007',
    userRole: 'teacher',
    displayName: 'Qari Muhammad Idris',
    email: 'idris.q@example.com',
    certificates: [
      { id: 'cert-11', fileName: 'ijazah_10_qiraat.pdf', fileUrl: '#', fileType: 'pdf', description: 'Ijazah in 10 Qira\'at — complete chain to Prophet ﷺ', uploadedAt: '2024-03-20T10:00:00Z' },
    ],
    recitationClips: [
      { id: 'clip-8', fileName: 'warsh_recitation.mp3', fileUrl: '#', mediaType: 'audio', duration: 360, description: 'Recitation in Warsh an Nafi\' qira\'at', uploadedAt: '2024-03-20T10:00:00Z' },
    ],
    hasAcademicCredentials: false,
    academicCertificates: [],
    previousResearchPapers: [],
    additionalNotes: 'Qari with ijazah in all 10 qira\'at. Teaching internationally for 20 years.',
    submittedAt: '2024-03-25T10:00:00Z',
    status: 'approved',
    reviewedBy: 'admin@oneummah.org',
    reviewedAt: '2024-03-28T10:00:00Z',
  },
];

export function AdminPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  // If not admin, show access denied
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <Shield className="w-16 h-16 text-red-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to access this panel.</p>
          <p className="text-sm text-gray-500 mt-2">Login with admin@oneummah.org to access.</p>
        </div>
      </div>
    );
  }

  const filteredRequests = MOCK_VERIFICATION_REQUESTS.filter(r => {
    const matchesTab = activeTab === 'all' || r.status === activeTab;
    const matchesSearch = !searchQuery ||
      r.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const pendingCount = MOCK_VERIFICATION_REQUESTS.filter(r => r.status === 'pending').length;
  const approvedCount = MOCK_VERIFICATION_REQUESTS.filter(r => r.status === 'approved').length;
  const rejectedCount = MOCK_VERIFICATION_REQUESTS.filter(r => r.status === 'rejected').length;

  const handleApprove = (id: string) => {
    alert(`✅ Request ${id} approved. In production, this would update the database and notify the user.`);
    setSelectedRequest(null);
  };

  const handleReject = (id: string) => {
    if (!rejectionReason.trim()) return;
    alert(`❌ Request ${id} rejected. Reason: ${rejectionReason}. In production, this would update the database and notify the user.`);
    setShowRejectModal(false);
    setRejectingId(null);
    setRejectionReason('');
    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-slate-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-emerald-400" />
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-gray-300">Review and manage teacher & researcher verification requests.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{approvedCount}</p>
                <p className="text-sm text-gray-500">Approved</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{rejectedCount}</p>
                <p className="text-sm text-gray-500">Rejected</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{MOCK_VERIFICATION_REQUESTS.length}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex gap-1 bg-white border border-gray-100 rounded-lg p-1">
            {(['pending', 'approved', 'rejected', 'all'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                  activeTab === tab ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab} {tab === 'pending' && pendingCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">{pendingCount}</span>
                )}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64"
            />
          </div>
        </div>

        {/* Requests List */}
        {selectedRequest ? (
          /* Detail View */
          <div>
            <button
              onClick={() => setSelectedRequest(null)}
              className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium mb-6"
            >
              ← Back to list
            </button>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-gray-900">{selectedRequest.displayName}</h2>
                      <StatusBadge status={selectedRequest.status} />
                    </div>
                    <p className="text-sm text-gray-500">{selectedRequest.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        selectedRequest.userRole === 'teacher' ? 'bg-indigo-50 text-indigo-700' : 'bg-purple-50 text-purple-700'
                      }`}>
                        {selectedRequest.userRole === 'teacher' ? '👨‍🏫 Teacher' : '🔬 Researcher'}
                      </span>
                      <span className="text-xs text-gray-400">Submitted {new Date(selectedRequest.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {selectedRequest.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(selectedRequest.id)}
                        className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                      >
                        <UserCheck className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={() => { setRejectingId(selectedRequest.id); setShowRejectModal(true); }}
                        className="px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <UserX className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Teacher: Certificates */}
                {selectedRequest.userRole === 'teacher' && selectedRequest.certificates.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" /> Certificates & Degrees
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedRequest.certificates.map(cert => (
                        <DocumentCard key={cert.id} document={cert} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Teacher: Recitation Clips */}
                {selectedRequest.userRole === 'teacher' && selectedRequest.recitationClips.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Play className="w-4 h-4 text-emerald-600" /> Voice & Video Recitation Clips
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedRequest.recitationClips.map(clip => (
                        <MediaCard key={clip.id} clip={clip} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Researcher: Academic Credentials */}
                {selectedRequest.userRole === 'researcher' && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" /> Academic Credentials
                    </h3>
                    {selectedRequest.hasAcademicCredentials && selectedRequest.academicCertificates.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedRequest.academicCertificates.map(cert => (
                          <DocumentCard key={cert.id} document={cert} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No formal academic credentials. Evaluation based on published research papers below.</p>
                    )}
                  </div>
                )}

                {/* Researcher: Previous Papers */}
                {selectedRequest.userRole === 'researcher' && selectedRequest.previousResearchPapers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" /> Previously Published Research Papers
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">These papers serve as proof of research capability (alternative to formal degrees).</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedRequest.previousResearchPapers.map(paper => (
                        <DocumentCard key={paper.id} document={paper} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Notes */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Additional Notes from Applicant</h3>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-700 leading-relaxed">{selectedRequest.additionalNotes}</p>
                  </div>
                </div>

                {/* Review Info */}
                {selectedRequest.status === 'approved' && selectedRequest.reviewedBy && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-sm text-green-700">
                      ✅ Approved by {selectedRequest.reviewedBy} on {new Date(selectedRequest.reviewedAt!).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {selectedRequest.status === 'rejected' && selectedRequest.rejectionReason && (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                    <p className="text-sm text-red-700">
                      ❌ Rejected — Reason: {selectedRequest.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {filteredRequests.map(request => (
              <button
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                className="w-full bg-white rounded-xl border border-gray-100 p-5 text-left hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
                      request.userRole === 'teacher' ? 'bg-indigo-50 text-indigo-700' : 'bg-purple-50 text-purple-700'
                    }`}>
                      {request.userRole === 'teacher' ? '👨‍🏫' : '🔬'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{request.displayName}</h3>
                        <StatusBadge status={request.status} />
                      </div>
                      <p className="text-sm text-gray-500">{request.email}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span>{request.userRole === 'teacher' ? 'Teacher' : 'Researcher'}</span>
                        <span>•</span>
                        {request.userRole === 'teacher' && (
                          <span>{request.certificates.length} cert{request.certificates.length !== 1 ? 's' : ''}, {request.recitationClips.length} clip{request.recitationClips.length !== 1 ? 's' : ''}</span>
                        )}
                        {request.userRole === 'researcher' && (
                          <span>{request.hasAcademicCredentials ? 'Has degree' : 'No degree'}</span>
                        )}
                        {request.userRole === 'researcher' && request.previousResearchPapers.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{request.previousResearchPapers.length} paper{request.previousResearchPapers.length !== 1 ? 's' : ''}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{new Date(request.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {request.status === 'pending' && (
                      <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-lg flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Needs Review
                      </span>
                    )}
                    <Eye className="w-5 h-5 text-gray-300" />
                  </div>
                </div>
              </button>
            ))}

            {filteredRequests.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">No verification requests found.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reject Verification Request</h3>
            <p className="text-sm text-gray-500 mb-4">Please provide a reason for rejection. This will be shared with the applicant.</p>
            <textarea
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              placeholder="e.g., Certificate not clearly readable, recitation quality insufficient, etc."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm resize-none h-24"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => { setShowRejectModal(false); setRejectingId(null); setRejectionReason(''); }}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => rejectingId && handleReject(rejectingId)}
                disabled={!rejectionReason.trim()}
                className="px-4 py-2 text-sm bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: VerificationStatus }) {
  const styles: Record<VerificationStatus, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    approved: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
    not_submitted: 'bg-gray-50 text-gray-500 border-gray-200',
  };
  const labels: Record<VerificationStatus, string> = {
    pending: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected',
    not_submitted: 'Not Submitted',
  };
  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function DocumentCard({ document }: { document: Certificate }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
        <FileText className="w-5 h-5 text-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{document.fileName}</p>
        <p className="text-xs text-gray-500 truncate">{document.description}</p>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0">
        <Download className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );
}

function MediaCard({ clip }: { clip: MediaClip }) {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
        clip.mediaType === 'video' ? 'bg-blue-50' : 'bg-emerald-50'
      }`}>
        {clip.mediaType === 'video' ? (
          <Play className="w-5 h-5 text-blue-500" />
        ) : (
          <Music className="w-5 h-5 text-emerald-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{clip.fileName}</p>
        <p className="text-xs text-gray-500">
          {clip.description}
          {clip.duration && ` • ${formatDuration(clip.duration)}`}
        </p>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0">
        <Play className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );
}
