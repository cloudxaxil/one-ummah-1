import { useState } from 'react';
import { Search, FileText, Calendar, BookOpen, Tag, ExternalLink, Quote, Users } from 'lucide-react';
import type { ResearchPaper } from '../types';

const PAPERS: ResearchPaper[] = [
  {
    id: 'p-1',
    title: 'Maqasid al-Shariah in Contemporary Financial Transactions: A Critical Analysis',
    abstract: 'This paper examines the application of maqasid al-shariah (objectives of Islamic law) principles to modern financial instruments. It analyzes how classical frameworks can be extended to address cryptocurrency, digital banking, and decentralized finance while maintaining the preservation of wealth (hifz al-mal) as a core objective.',
    authorId: 'usr_researcher_001',
    authorName: 'Dr. Yusuf Ibrahim',
    keywords: ['Maqasid', 'Islamic Finance', 'Cryptocurrency', 'Contemporary Fiqh'],
    references: ['Al-Shatibi, Al-Muwafaqat', 'Ibn Ashur, Treatise on Maqasid', 'AAOIFI Standards'],
    citations: 12,
    publishedAt: '2024-06-15',
    updatedAt: '2024-06-15',
    status: 'published',
    doi: '10.xxxx/oneummah.2024.001',
  },
  {
    id: 'p-2',
    title: 'The Role of Istihsan in Addressing New Medical Ethics Issues',
    abstract: 'This research explores how the Hanafi principle of istihsan (juristic preference) can be applied to contemporary bioethical dilemmas including organ transplantation, genetic engineering, and end-of-life care. The paper proposes a framework for evaluating new medical technologies through the lens of classical usul methodology.',
    authorId: 'usr_researcher_002',
    authorName: 'Dr. Aisha Al-Mansouri',
    keywords: ['Istihsan', 'Bioethics', 'Medical Ethics', 'Hanafi Usul'],
    references: ['Ibn al-Humam, Fath al-Qadir', 'Contemporary Fiqh Academy Rulings'],
    citations: 8,
    publishedAt: '2024-05-20',
    updatedAt: '2024-05-20',
    status: 'published',
    doi: '10.xxxx/oneummah.2024.002',
  },
  {
    id: 'p-3',
    title: 'Digital Preservation of Islamic Manuscripts: Methodology and Challenges',
    abstract: 'A comprehensive study on the digitization of Islamic manuscript collections, examining best practices in metadata standards, Arabic OCR challenges, and the creation of searchable corpora for hadith and tafsir texts. Proposes a standardized framework for digital Islamic archives.',
    authorId: 'usr_researcher_003',
    authorName: 'Prof. Khalid Al-Dimashqi',
    keywords: ['Digital Humanities', 'Manuscripts', 'Preservation', 'Arabic OCR'],
    references: ['Various library science journals', 'IIIT Digital Projects'],
    citations: 5,
    publishedAt: '2024-04-10',
    updatedAt: '2024-04-10',
    status: 'published',
    doi: '10.xxxx/oneummah.2024.003',
  },
  {
    id: 'p-4',
    title: 'Comparative Analysis of Hadith Authentication Methodologies: Classical and Modern Approaches',
    abstract: 'This paper compares traditional hadith criticism (mustalah al-hadith) with modern historical-critical methods, examining their respective strengths and limitations. It argues for a complementary approach that respects traditional scholarship while incorporating valid insights from modern textual analysis.',
    authorId: 'usr_researcher_001',
    authorName: 'Dr. Yusuf Ibrahim',
    keywords: ['Hadith Sciences', 'Authentication', 'Historical Method', 'Mustalah'],
    references: ['Ibn al-Salah, Muqaddimah', 'Al-Dhahabi, Mizan al-Itidal'],
    citations: 15,
    publishedAt: '2024-03-28',
    updatedAt: '2024-03-28',
    status: 'published',
    doi: '10.xxxx/oneummah.2024.004',
  },
];

export function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState('');

  const allKeywords = [...new Set(PAPERS.flatMap(p => p.keywords))];

  const filteredPapers = PAPERS.filter(p => {
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesKeyword = !selectedKeyword || p.keywords.includes(selectedKeyword);
    return matchesSearch && matchesKeyword;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-slate-300" />
            <h1 className="text-3xl font-bold">Islamic Research</h1>
          </div>
          <p className="text-slate-100/80 max-w-2xl">
            Access peer-reviewed research papers, publish your scholarly work, and contribute to the advancement of Islamic knowledge with proper citation and attribution.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedPaper ? (
          /* Paper Detail View */
          <div>
            <button
              onClick={() => setSelectedPaper(null)}
              className="flex items-center gap-2 text-slate-700 hover:text-slate-800 font-medium mb-6"
            >
              ← Back to Papers
            </button>
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">Published</span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {selectedPaper.publishedAt}
                </span>
                {selectedPaper.doi && (
                  <span className="text-xs text-gray-400">DOI: {selectedPaper.doi}</span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedPaper.title}</h2>
              <p className="text-sm text-gray-600 mb-6 flex items-center gap-2">
                <Users className="w-4 h-4" /> {selectedPaper.authorName}
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Quote className="w-4 h-4 text-slate-400" /> Abstract
                  </h3>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{selectedPaper.abstract}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" /> Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPaper.keywords.map(kw => (
                      <span key={kw} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">{kw}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" /> References
                  </h3>
                  <ul className="space-y-1">
                    {selectedPaper.references.map((ref, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-gray-400 shrink-0">[{i + 1}]</span>
                        {ref}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Cited by {selectedPaper.citations} papers</span>
                  <button className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 transition-colors flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Papers List View */
          <div>
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search papers by title, abstract, or author..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none"
                />
              </div>
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedKeyword('')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  !selectedKeyword ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {allKeywords.map(kw => (
                <button
                  key={kw}
                  onClick={() => setSelectedKeyword(kw)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedKeyword === kw ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {kw}
                </button>
              ))}
            </div>

            {/* Papers */}
            <div className="space-y-4">
              {filteredPapers.map(paper => (
                <button
                  key={paper.id}
                  onClick={() => setSelectedPaper(paper)}
                  className="w-full bg-white rounded-xl border border-gray-100 p-6 text-left hover:border-slate-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">Published</span>
                    <span className="text-xs text-gray-400">{paper.publishedAt}</span>
                    <span className="text-xs text-gray-400">• {paper.citations} citations</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-slate-700">{paper.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{paper.authorName}</p>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">{paper.abstract}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {paper.keywords.map(kw => (
                      <span key={kw} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-full">{kw}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {filteredPapers.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">No papers found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
