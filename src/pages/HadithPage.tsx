import { useState } from 'react';
import { Search, BookOpen, Filter, ChevronRight, Star, ExternalLink } from 'lucide-react';
import type { HadithCollection, Hadith } from '../types';

const COLLECTIONS: HadithCollection[] = [
  { id: 'bukhari', name: 'Sahih al-Bukhari', nameArabic: 'صحيح البخاري', author: 'Imam Muhammad al-Bukhari', totalHadiths: 7563, description: 'The most authentic collection of hadith, compiled by Imam al-Bukhari (d. 256 AH).' },
  { id: 'muslim', name: 'Sahih Muslim', nameArabic: 'صحيح مسلم', author: 'Imam Muslim ibn al-Hajjaj', totalHadiths: 7563, description: 'Second most authentic collection, compiled by Imam Muslim (d. 261 AH).' },
  { id: 'abu-dawud', name: 'Sunan Abu Dawud', nameArabic: 'سنن أبي داود', author: 'Imam Abu Dawud', totalHadiths: 5274, description: 'One of the six canonical hadith collections, focusing on legal hadith.' },
  { id: 'tirmidhi', name: 'Jami\' at-Tirmidhi', nameArabic: 'جامع الترمذي', author: 'Imam at-Tirmidhi', totalHadiths: 3956, description: 'Known for grading hadith and mentioning scholarly opinions.' },
  { id: 'nasai', name: 'Sunan an-Nasa\'i', nameArabic: 'سنن النسائي', author: 'Imam an-Nasa\'i', totalHadiths: 5758, description: 'Considered by many scholars as the third most authentic after Bukhari and Muslim.' },
  { id: 'ibn-majah', name: 'Sunan Ibn Majah', nameArabic: 'سنن ابن ماجه', author: 'Imam Ibn Majah', totalHadiths: 4341, description: 'The sixth of the canonical hadith collections.' },
];

const SAMPLE_HADITHS: Record<string, Hadith[]> = {
  'bukhari': [
    {
      id: 'b-1',
      collectionId: 'bukhari',
      bookNumber: 1,
      hadithNumber: 1,
      arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
      translation: 'Actions are judged by intentions, and every person will get what they intended.',
      grade: 'Sahih',
      narrator: 'Umar ibn al-Khattab (رضي الله عنه)',
      topics: ['Intentions', 'Sincerity', 'Worship'],
      references: ['Sahih al-Bukhari, Book 1, Hadith 1', 'Fath al-Bari, 1/9'],
    },
    {
      id: 'b-2',
      collectionId: 'bukhari',
      bookNumber: 1,
      hadithNumber: 2,
      arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
      translation: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.',
      grade: 'Sahih',
      narrator: 'Abu Hurairah (رضي الله عنه)',
      topics: ['Speech', 'Character', 'Faith'],
      references: ['Sahih al-Bukhari, Book 1, Hadith 2', 'Sahih Muslim, Book 1, Hadith 74'],
    },
    {
      id: 'b-3',
      collectionId: 'bukhari',
      bookNumber: 2,
      hadithNumber: 8,
      arabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
      translation: 'None of you truly believes until he loves for his brother what he loves for himself.',
      grade: 'Sahih',
      narrator: 'Anas ibn Malik (رضي الله عنه)',
      topics: ['Brotherhood', 'Faith', 'Love'],
      references: ['Sahih al-Bukhari, Book 2, Hadith 8', 'Sahih Muslim, Book 1, Hadith 72'],
    },
  ],
  'muslim': [
    {
      id: 'm-1',
      collectionId: 'muslim',
      bookNumber: 1,
      hadithNumber: 1,
      arabic: 'إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ',
      translation: 'Verily, Allah does not look at your appearances or your wealth, but rather He looks at your hearts and your deeds.',
      grade: 'Sahih',
      narrator: 'Abu Hurairah (رضي الله عنه)',
      topics: ['Sincerity', 'Heart', 'Deeds'],
      references: ['Sahih Muslim, Book 32, Hadith 6219'],
    },
  ],
};

export function HadithPage() {
  const [selectedCollection, setSelectedCollection] = useState<HadithCollection | null>(null);
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const hadiths = selectedCollection ? (SAMPLE_HADITHS[selectedCollection.id] || []) : [];

  const filteredHadiths = hadiths.filter(h =>
    h.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
    h.narrator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-teal-300" />
            <h1 className="text-3xl font-bold">Hadith Collections</h1>
          </div>
          <p className="text-teal-100/80 max-w-2xl">
            Browse authenticated hadith from the major collections with proper source attribution, grading, and scholarly references.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCollection ? (
          /* Collections Grid */
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Major Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COLLECTIONS.map(collection => (
                <button
                  key={collection.id}
                  onClick={() => setSelectedCollection(collection)}
                  className="bg-white rounded-xl border border-gray-100 p-6 text-left hover:border-teal-200 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">{collection.name}</h3>
                      <p className="text-sm text-gray-500">{collection.author}</p>
                    </div>
                    <span className="text-xl font-arabic text-teal-600">{collection.nameArabic}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{collection.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{collection.totalHadiths.toLocaleString()} hadiths</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : selectedHadith ? (
          /* Single Hadith View */
          <div>
            <button
              onClick={() => setSelectedHadith(null)}
              className="flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium mb-6"
            >
              ← Back to {selectedCollection.name}
            </button>
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">{selectedHadith.grade}</span>
                <span className="text-sm text-gray-500">Book {selectedHadith.bookNumber}, Hadith {selectedHadith.hadithNumber}</span>
              </div>
              <p className="text-2xl text-right font-arabic leading-loose text-gray-900 mb-6 p-6 bg-gray-50 rounded-xl" dir="rtl">
                {selectedHadith.arabic}
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Translation</h4>
                  <p className="text-gray-800 leading-relaxed">{selectedHadith.translation}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Narrator</h4>
                  <p className="text-gray-800">{selectedHadith.narrator}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedHadith.topics.map(topic => (
                      <span key={topic} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{topic}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">References</h4>
                  <ul className="space-y-1">
                    {selectedHadith.references.map((ref, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                        {ref}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Hadith List View */
          <div>
            <button
              onClick={() => setSelectedCollection(null)}
              className="flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium mb-6"
            >
              ← Back to Collections
            </button>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{selectedCollection.name}</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search hadith..."
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none w-64"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredHadiths.map(hadith => (
                <button
                  key={hadith.id}
                  onClick={() => setSelectedHadith(hadith)}
                  className="w-full bg-white rounded-xl border border-gray-100 p-5 text-left hover:border-teal-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">{hadith.grade}</span>
                      <span className="text-xs text-gray-400">#{hadith.hadithNumber}</span>
                    </div>
                    <span className="text-xs text-gray-400">{hadith.narrator}</span>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed line-clamp-2">{hadith.translation}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {hadith.topics.map(topic => (
                      <span key={topic} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded">{topic}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {filteredHadiths.length === 0 && (
              <p className="text-center text-gray-500 py-12">No hadith found matching your search.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
