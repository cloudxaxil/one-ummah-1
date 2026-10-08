import { useState } from 'react';
import { Scale, BookOpen, Info, ChevronDown, ChevronUp } from 'lucide-react';
import type { FiqhSchool, FiqhRuling } from '../types';

const SCHOOLS: FiqhSchool[] = [
  {
    id: 'hanafi',
    name: 'Hanafi',
    nameArabic: 'الحنفي',
    founder: 'Imam Abu Hanifa (d. 150 AH)',
    description: 'The Hanafi school is the oldest of the four Sunni schools of jurisprudence. It is known for its emphasis on reason and analogy (qiyas) alongside the primary sources.',
    principles: ['Quran', 'Sunnah', 'Ijma (Consensus)', 'Qiyas (Analogy)', 'Istihsan (Juristic Preference)', 'Urf (Custom)'],
  },
  {
    id: 'maliki',
    name: 'Maliki',
    nameArabic: 'المالكي',
    founder: 'Imam Malik ibn Anas (d. 179 AH)',
    description: 'The Maliki school is based on the practice of the people of Madinah, which Imam Malik considered a living transmission of the Prophetic way.',
    principles: ['Quran', 'Sunnah', 'Amal of Madinah (Practice of Medina)', 'Ijma', 'Maslahah Mursalah (Public Interest)', 'Sadd al-Dhara\'i (Blocking the Means)'],
  },
  {
    id: 'shafii',
    name: 'Shafi\'i',
    nameArabic: 'الشافعي',
    founder: 'Imam Muhammad ibn Idris al-Shafi\'i (d. 204 AH)',
    description: 'The Shafi\'i school systematized the principles of Islamic jurisprudence (usul al-fiqh) and is known for its rigorous methodology.',
    principles: ['Quran', 'Sunnah', 'Ijma', 'Qiyas', 'Istishab (Presumption of Continuity)', 'Istidlal (Inference)'],
  },
  {
    id: 'hanbali',
    name: 'Hanbali',
    nameArabic: 'الحنبلي',
    founder: 'Imam Ahmad ibn Hanbal (d. 241 AH)',
    description: 'The Hanbali school is known for its emphasis on hadith and textual evidence, and its cautious approach to rational interpretation.',
    principles: ['Quran', 'Sunnah', 'Ijma', 'Fatwa of Companions', 'Weak Hadith (over analogy)', 'Istishab'],
  },
];

const RULINGS: FiqhRuling[] = [
  {
    id: 'r-1',
    topic: 'Basmalah in Salah (Prayer)',
    schools: [
      { schoolId: 'hanafi', position: 'Reciting Bismillah silently before Al-Fatihah; not considered a verse of Al-Fatihah.', evidence: ['Practice of the Companions in Kufa', 'Transmission from Ibn Mas\'ud'], source: 'Al-Hidayah, Vol. 1' },
      { schoolId: 'maliki', position: 'Bismillah is not recited in obligatory prayers, neither silently nor aloud.', evidence: ['Practice of the people of Madinah', 'Hadith of Anas'], source: 'Bidayat al-Mujtahid' },
      { schoolId: 'shafii', position: 'Bismillah is a verse of Al-Fatihah and must be recited aloud in audible prayers.', evidence: ['Hadith of Anas in Sahih Muslim', 'Uthman\'s Mushaf placement'], source: 'Al-Umm, Vol. 1' },
      { schoolId: 'hanbali', position: 'Bismillah is a verse of Al-Fatihah; recited silently in both audible and silent prayers.', evidence: ['Hadith collections', 'Consensus on its Quranic status'], source: 'Al-Mughni, Vol. 2' },
    ],
  },
  {
    id: 'r-2',
    topic: 'Touching a Woman and Wudu (Ablution)',
    schools: [
      { schoolId: 'shafii', position: 'Touching a woman (with desire) breaks wudu, based on the literal meaning of the Quranic verse.', evidence: ['Quran 5:6 — "or you have touched women"'], source: 'Al-Umm, Vol. 1' },
      { schoolId: 'hanafi', position: 'Touching a woman does not break wudu; "touching" in the verse refers to intercourse.', evidence: ['Contextual interpretation', 'Practice of the Companions'], source: 'Badai\' al-Sanai\' Vol. 1' },
      { schoolId: 'maliki', position: 'Touching with desire breaks wudu; touching without desire does not.', evidence: ['Hadith interpretation', 'Distinction based on intent'], source: 'Al-Sharh al-Kabir' },
      { schoolId: 'hanbali', position: 'Touching a woman with desire breaks wudu regardless of barrier.', evidence: ['Literal reading of verse', 'Hadith of Aisha'], source: 'Al-Mughni, Vol. 1' },
    ],
  },
];

export function FiqhPage() {
  const [activeTab, setActiveTab] = useState<'schools' | 'comparisons'>('schools');
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);
  const [expandedRuling, setExpandedRuling] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 to-orange-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-8 h-8 text-amber-300" />
            <h1 className="text-3xl font-bold">Fiqh & Islamic Jurisprudence</h1>
          </div>
          <p className="text-amber-100/80 max-w-2xl">
            Study the different schools of Islamic jurisprudence with respectful comparison. All positions are clearly attributed to their sources.
          </p>
          <div className="mt-4 p-3 bg-amber-900/30 border border-amber-700/30 rounded-lg">
            <p className="text-sm text-amber-200 flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              This section aims to educate about legitimate scholarly differences, not to create division. All four Sunni schools are recognized as valid.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-8 w-fit">
          <button
            onClick={() => setActiveTab('schools')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'schools' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Schools of Fiqh
          </button>
          <button
            onClick={() => setActiveTab('comparisons')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'comparisons' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Scholarly Comparisons
          </button>
        </div>

        {activeTab === 'schools' ? (
          /* Schools View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCHOOLS.map(school => (
              <div key={school.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{school.name} School</h3>
                      <p className="text-sm text-gray-500">{school.founder}</p>
                    </div>
                    <span className="text-xl font-arabic text-amber-700">{school.nameArabic}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{school.description}</p>
                  <button
                    onClick={() => setExpandedSchool(expandedSchool === school.id ? null : school.id)}
                    className="flex items-center gap-1 text-sm text-amber-700 hover:text-amber-800 font-medium"
                  >
                    {expandedSchool === school.id ? (
                      <><ChevronUp className="w-4 h-4" /> Hide principles</>
                    ) : (
                      <><ChevronDown className="w-4 h-4" /> View principles</>
                    )}
                  </button>
                </div>
                {expandedSchool === school.id && (
                  <div className="px-6 pb-6 border-t border-gray-50 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Sources & Principles (Usul):</h4>
                    <ul className="space-y-1.5">
                      {school.principles.map((principle, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                          {principle}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Comparisons View */
          <div className="space-y-6">
            {RULINGS.map(ruling => (
              <div key={ruling.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{ruling.topic}</h3>
                  <p className="text-sm text-gray-500">Comparing positions across all four schools</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ruling.schools.map(schoolPos => {
                      const school = SCHOOLS.find(s => s.id === schoolPos.schoolId);
                      return (
                        <div key={schoolPos.schoolId} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-amber-700">{school?.name}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">{schoolPos.position}</p>
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-gray-500">Evidence:</p>
                            {schoolPos.evidence.map((ev, i) => (
                              <p key={i} className="text-xs text-gray-600 pl-2 border-l-2 border-amber-200">{ev}</p>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 mt-2">Source: {schoolPos.source}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center py-8">
              <p className="text-sm text-gray-500">More comparative fiqh topics will be added as the database expands.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
