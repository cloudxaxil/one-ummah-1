import { useState } from 'react';
import { Search, BookOpen, Volume2, Bookmark, ChevronRight, Globe } from 'lucide-react';
import type { Surah } from '../types';

// Representative sample data
const SURAHS: Surah[] = [
  { id: 1, name: 'Al-Fatihah', nameArabic: 'الفاتحة', nameTranslation: 'The Opening', revelationType: 'meccan', ayahCount: 7, chapterNumber: 1 },
  { id: 2, name: 'Al-Baqarah', nameArabic: 'البقرة', nameTranslation: 'The Cow', revelationType: 'medinan', ayahCount: 286, chapterNumber: 2 },
  { id: 3, name: 'Aal-Imran', nameArabic: 'آل عمران', nameTranslation: 'The Family of Imran', revelationType: 'medinan', ayahCount: 200, chapterNumber: 3 },
  { id: 36, name: 'Ya-Sin', nameArabic: 'يس', nameTranslation: 'Ya-Sin', revelationType: 'meccan', ayahCount: 83, chapterNumber: 36 },
  { id: 55, name: 'Ar-Rahman', nameArabic: 'الرحمن', nameTranslation: 'The Most Merciful', revelationType: 'medinan', ayahCount: 78, chapterNumber: 55 },
  { id: 67, name: 'Al-Mulk', nameArabic: 'الملك', nameTranslation: 'The Sovereignty', revelationType: 'meccan', ayahCount: 30, chapterNumber: 67 },
  { id: 112, name: 'Al-Ikhlas', nameArabic: 'الإخلاص', nameTranslation: 'Sincerity', revelationType: 'meccan', ayahCount: 4, chapterNumber: 112 },
  { id: 113, name: 'Al-Falaq', nameArabic: 'الفلق', nameTranslation: 'The Daybreak', revelationType: 'meccan', ayahCount: 5, chapterNumber: 113 },
  { id: 114, name: 'An-Nas', nameArabic: 'الناس', nameTranslation: 'Mankind', revelationType: 'meccan', ayahCount: 6, chapterNumber: 114 },
];

interface AyahDisplay {
  number: number;
  arabic: string;
  translation: string;
}

const SAMPLE_AYAHS: Record<number, AyahDisplay[]> = {
  1: [
    { number: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'In the name of Allah, the Most Gracious, the Most Merciful.' },
    { number: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translation: 'All praise is due to Allah, Lord of all the worlds.' },
    { number: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', translation: 'The Most Gracious, the Most Merciful.' },
    { number: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', translation: 'Master of the Day of Judgment.' },
    { number: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translation: 'You alone we worship, and You alone we ask for help.' },
    { number: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', translation: 'Guide us on the Straight Path.' },
    { number: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', translation: 'The path of those You have blessed — not those who incurred wrath, nor those who went astray.' },
  ],
  112: [
    { number: 1, arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', translation: 'Say: He is Allah, the One.' },
    { number: 2, arabic: 'اللَّهُ الصَّمَدُ', translation: 'Allah, the Eternal Refuge.' },
    { number: 3, arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', translation: 'He neither begets nor is born.' },
    { number: 4, arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', translation: 'Nor is there to Him any equivalent.' },
  ],
};

export function QuranPage() {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [translation, setTranslation] = useState('en');

  const filteredSurahs = SURAHS.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.chapterNumber.toString().includes(searchQuery)
  );

  const ayahs = selectedSurah ? (SAMPLE_AYAHS[selectedSurah.id] || [
    { number: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'In the name of Allah, the Most Gracious, the Most Merciful.' },
  ]) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-emerald-300" />
            <h1 className="text-3xl font-bold">The Noble Quran</h1>
          </div>
          <p className="text-emerald-100/80 max-w-2xl">
            Read, study, and reflect upon the Quran. Access translations in multiple languages with proper references.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedSurah ? (
          /* Surah List View */
          <div>
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search surahs by name or number..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
              <select
                value={translation}
                onChange={e => setTranslation(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="en">English (Sahih International)</option>
                <option value="fr">French</option>
                <option value="ur">Urdu</option>
                <option value="tr">Turkish</option>
              </select>
            </div>

            {/* Surah Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSurahs.map(surah => (
                <button
                  key={surah.id}
                  onClick={() => setSelectedSurah(surah)}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-700 font-bold text-sm group-hover:bg-emerald-100 transition-colors">
                    {surah.chapterNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{surah.name}</h3>
                      <span className="text-lg font-arabic text-emerald-700">{surah.nameArabic}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                      <span>{surah.nameTranslation}</span>
                      <span>•</span>
                      <span>{surah.ayahCount} ayahs</span>
                      <span>•</span>
                      <span className="capitalize">{surah.revelationType}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              Showing {filteredSurahs.length} of 114 surahs. Full Quran database integration coming soon.
            </p>
          </div>
        ) : (
          /* Surah Detail View */
          <div>
            <button
              onClick={() => setSelectedSurah(null)}
              className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium mb-6"
            >
              ← Back to Surahs
            </button>

            {/* Surah Header */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6 text-center">
              <h2 className="text-4xl font-arabic text-emerald-800 mb-2">{selectedSurah.nameArabic}</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{selectedSurah.name}</h3>
              <p className="text-gray-500">{selectedSurah.nameTranslation} • {selectedSurah.ayahCount} Ayahs • {selectedSurah.revelationType === 'meccan' ? 'Meccan' : 'Medinan'}</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Volume2 className="w-4 h-4" /> Listen
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Bookmark className="w-4 h-4" /> Bookmark
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Globe className="w-4 h-4" /> {translation.toUpperCase()}
                </button>
              </div>
            </div>

            {/* Ayahs */}
            <div className="space-y-4">
              {ayahs.map(ayah => (
                <div key={ayah.number} className="bg-white rounded-xl border border-gray-100 p-6 hover:border-emerald-100 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 text-sm font-bold shrink-0">
                      {ayah.number}
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl text-right font-arabic leading-loose text-gray-900 mb-4" dir="rtl">
                        {ayah.arabic}
                      </p>
                      <p className="text-gray-700 leading-relaxed">{ayah.translation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
