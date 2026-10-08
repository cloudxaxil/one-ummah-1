import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Upload, FileText, Video, Mic, Shield, CheckCircle,
  AlertCircle, Plus, X, Info, ArrowRight
} from 'lucide-react';

export function VerificationPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [hasAcademicCredentials, setHasAcademicCredentials] = useState(true);
  const [certificates, setCertificates] = useState<{ name: string; description: string }[]>([]);
  const [recitationClips, setRecitationClips] = useState<{ name: string; description: string; type: 'audio' | 'video' }[]>([]);
  const [researchPapers, setResearchPapers] = useState<{ name: string; description: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (user.role !== 'teacher' && user.role !== 'researcher') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Not Required</h1>
          <p className="text-gray-600">Only teachers and researchers need to complete verification.</p>
        </div>
      </div>
    );
  }

  const isTeacher = user.role === 'teacher';
  const isResearcher = user.role === 'researcher';

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your documents have been submitted for review. Our admin team will review your credentials within 3-5 business days.
          </p>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg mb-6">
            <p className="text-sm text-amber-700">
              You will receive an email notification once your verification is complete. Your profile will show as "Pending Verification" until approved.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full px-4 py-2.5 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-7 h-7 text-emerald-300" />
            <h1 className="text-2xl font-bold">Identity & Credential Verification</h1>
          </div>
          <p className="text-emerald-100/80">
            {isTeacher
              ? 'Submit your certificates and recitation clips to get verified as a teacher on One Ummah.'
              : 'Submit your academic credentials or published research papers to get verified as a researcher.'
            }
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                s <= step ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              <span className={`text-sm hidden sm:block ${s <= step ? 'text-emerald-700 font-medium' : 'text-gray-400'}`}>
                {s === 1 ? (isTeacher ? 'Certificates' : 'Credentials') : s === 2 ? (isTeacher ? 'Recitation Clips' : 'Research Papers') : 'Review'}
              </span>
              {s < 3 && <div className={`flex-1 h-0.5 ${s < step ? 'bg-emerald-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Certificates / Academic Credentials */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            {isTeacher ? (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Upload Certificates & Degrees</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Upload your Islamic studies certificates, ijazah, degrees, or any relevant qualifications. Accepted formats: PDF, JPG, PNG.
                </p>
                <div className="space-y-3 mb-4">
                  {certificates.map((cert, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <FileText className="w-5 h-5 text-red-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{cert.name}</p>
                        <p className="text-xs text-gray-500">{cert.description}</p>
                      </div>
                      <button onClick={() => setCertificates(certificates.filter((_, idx) => idx !== i))} className="p-1 hover:bg-gray-200 rounded">
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setCertificates([...certificates, { name: `certificate_${certificates.length + 1}.pdf`, description: 'Certificate description' }])}
                  className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-center hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors"
                >
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Click to upload certificate</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (max 10MB each)</p>
                </button>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Academic Credentials</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Do you hold formal academic degrees (BA, MA, PhD) in Islamic studies or related fields?
                </p>
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setHasAcademicCredentials(true)}
                    className={`flex-1 p-4 rounded-xl border-2 text-center transition-colors ${
                      hasAcademicCredentials ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CheckCircle className={`w-6 h-6 mx-auto mb-2 ${hasAcademicCredentials ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <p className="text-sm font-medium text-gray-800">Yes, I have degrees</p>
                    <p className="text-xs text-gray-500 mt-1">Upload degree certificates</p>
                  </button>
                  <button
                    onClick={() => setHasAcademicCredentials(false)}
                    className={`flex-1 p-4 rounded-xl border-2 text-center transition-colors ${
                      !hasAcademicCredentials ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FileText className={`w-6 h-6 mx-auto mb-2 ${!hasAcademicCredentials ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <p className="text-sm font-medium text-gray-800">No formal degree</p>
                    <p className="text-xs text-gray-500 mt-1">Show published research instead</p>
                  </button>
                </div>

                {hasAcademicCredentials ? (
                  <>
                    <div className="space-y-3 mb-4">
                      {certificates.map((cert, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <FileText className="w-5 h-5 text-red-500 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{cert.name}</p>
                            <p className="text-xs text-gray-500">{cert.description}</p>
                          </div>
                          <button onClick={() => setCertificates(certificates.filter((_, idx) => idx !== i))} className="p-1 hover:bg-gray-200 rounded">
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setCertificates([...certificates, { name: `degree_${certificates.length + 1}.pdf`, description: 'Degree certificate' }])}
                      className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-center hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors"
                    >
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-600">Upload degree certificate</p>
                    </button>
                  </>
                ) : (
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-sm text-blue-700 flex items-center gap-2">
                      <Info className="w-4 h-4 shrink-0" />
                      No problem! On the next step, you'll upload your previously published research papers as proof of expertise.
                    </p>
                  </div>
                )}
              </>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 transition-colors flex items-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Recitation Clips / Research Papers */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            {isTeacher ? (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Voice & Video Recitation Clips</h2>
                <p className="text-sm text-gray-500 mb-2">
                  Upload audio or video clips of you reciting the Quran. This helps us verify your tajweed and recitation quality.
                </p>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg mb-6">
                  <p className="text-xs text-amber-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Minimum 1 clip required. Recommended: at least 2 minutes of clear recitation with tajweed.
                  </p>
                </div>
                <div className="space-y-3 mb-4">
                  {recitationClips.map((clip, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      {clip.type === 'video' ? (
                        <Video className="w-5 h-5 text-blue-500 shrink-0" />
                      ) : (
                        <Mic className="w-5 h-5 text-emerald-500 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{clip.name}</p>
                        <p className="text-xs text-gray-500">{clip.description} • {clip.type}</p>
                      </div>
                      <button onClick={() => setRecitationClips(recitationClips.filter((_, idx) => idx !== i))} className="p-1 hover:bg-gray-200 rounded">
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setRecitationClips([...recitationClips, { name: `recitation_${recitationClips.length + 1}.mp3`, description: 'Quran recitation', type: 'audio' }])}
                    className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors"
                  >
                    <Mic className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-600">Audio Clip</p>
                    <p className="text-xs text-gray-400">MP3, WAV</p>
                  </button>
                  <button
                    onClick={() => setRecitationClips([...recitationClips, { name: `recitation_${recitationClips.length + 1}.mp4`, description: 'Video recitation', type: 'video' }])}
                    className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
                  >
                    <Video className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-600">Video Clip</p>
                    <p className="text-xs text-gray-400">MP4, MOV</p>
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {hasAcademicCredentials ? 'Additional Research Papers (Optional)' : 'Upload Published Research Papers'}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  {hasAcademicCredentials
                    ? 'Optionally upload any published research papers to strengthen your profile.'
                    : 'Upload your previously published research papers. These serve as proof of your research capability.'
                  }
                </p>
                {!hasAcademicCredentials && researchPapers.length === 0 && (
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg mb-6">
                    <p className="text-sm text-amber-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      At least 1 published paper is required if you don't have formal academic credentials.
                    </p>
                  </div>
                )}
                <div className="space-y-3 mb-4">
                  {researchPapers.map((paper, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <FileText className="w-5 h-5 text-purple-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{paper.name}</p>
                        <p className="text-xs text-gray-500">{paper.description}</p>
                      </div>
                      <button onClick={() => setResearchPapers(researchPapers.filter((_, idx) => idx !== i))} className="p-1 hover:bg-gray-200 rounded">
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setResearchPapers([...researchPapers, { name: `research_paper_${researchPapers.length + 1}.pdf`, description: 'Published research paper' }])}
                  className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-center hover:border-purple-300 hover:bg-purple-50/30 transition-colors"
                >
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Upload research paper</p>
                  <p className="text-xs text-gray-400 mt-1">PDF format preferred</p>
                </button>
              </>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 transition-colors flex items-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Review & Submit</h2>
            <p className="text-sm text-gray-500 mb-6">Review your submission before sending it for admin approval.</p>

            <div className="space-y-4 mb-6">
              {/* Summary */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Submission Summary</h3>
                <div className="space-y-2 text-sm">
                  {isTeacher && (
                    <>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Certificates uploaded:</span>
                        <span className="font-medium">{certificates.length}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Recitation clips uploaded:</span>
                        <span className="font-medium">{recitationClips.length}</span>
                      </p>
                    </>
                  )}
                  {isResearcher && (
                    <>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Has academic credentials:</span>
                        <span className="font-medium">{hasAcademicCredentials ? 'Yes' : 'No'}</span>
                      </p>
                      {hasAcademicCredentials && (
                        <p className="flex justify-between">
                          <span className="text-gray-500">Degree certificates:</span>
                          <span className="font-medium">{certificates.length}</span>
                        </p>
                      )}
                      <p className="flex justify-between">
                        <span className="text-gray-500">Research papers uploaded:</span>
                        <span className="font-medium">{researchPapers.length}</span>
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                <textarea
                  value={additionalNotes}
                  onChange={e => setAdditionalNotes(e.target.value)}
                  placeholder="Any additional information you'd like to share with the review team..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm resize-none h-24"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg mb-6">
              <p className="text-sm text-emerald-700 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>By submitting, you confirm that all uploaded documents are authentic and belong to you. False submissions will result in permanent account suspension.</span>
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 transition-colors flex items-center gap-2"
              >
                <Shield className="w-4 h-4" /> Submit for Verification
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
