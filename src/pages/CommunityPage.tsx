import { useState } from 'react';
import { MessageSquare, Users, Search, Plus, Heart, Clock, Pin, Tag } from 'lucide-react';
import type { CommunityTopic, CommunityPost } from '../types';

const TOPICS: CommunityTopic[] = [
  { id: 'ct-1', title: 'Quran & Tafsir', slug: 'quran-tafsir', description: 'Discussion of Quranic verses, tafsir methodologies, and reflection.', memberCount: 342, postCount: 128, category: 'Knowledge' },
  { id: 'ct-2', title: 'Hadith Sciences', slug: 'hadith-sciences', description: 'Study and discussion of hadith authentication, narration chains, and understanding.', memberCount: 256, postCount: 89, category: 'Knowledge' },
  { id: 'ct-3', title: 'Fiqh Questions', slug: 'fiqh-questions', description: 'Ask questions about Islamic jurisprudence. Answers include proper source attribution.', memberCount: 512, postCount: 347, category: 'Q&A' },
  { id: 'ct-4', title: 'Arabic Language', slug: 'arabic-language', description: 'Learn and practice Arabic grammar, vocabulary, and classical texts.', memberCount: 198, postCount: 76, category: 'Learning' },
  { id: 'ct-5', title: 'Contemporary Issues', slug: 'contemporary-issues', description: 'Discuss modern challenges from an Islamic perspective with scholarly references.', memberCount: 423, postCount: 201, category: 'Discussion' },
  { id: 'ct-6', title: 'New Muslims', slug: 'new-muslims', description: 'Support and guidance for those new to Islam. All questions welcome.', memberCount: 167, postCount: 94, category: 'Support' },
];

const POSTS: CommunityPost[] = [
  {
    id: 'cp-1',
    topicId: 'ct-1',
    authorId: 'usr_1',
    authorName: 'Ahmad K.',
    title: 'Understanding the concept of "Naskh" (Abrogation) in Quranic Sciences',
    content: 'I\'ve been studying the concept of naskh and I\'m confused about how scholars determine which verses are abrogated. Can someone explain the methodology used and the conditions for accepting a claim of abrogation?',
    createdAt: '2024-07-15T10:30:00Z',
    updatedAt: '2024-07-15T10:30:00Z',
    likes: 24,
    replies: 8,
    isPinned: true,
    tags: ['Tafsir', 'Usul', 'Quran Sciences'],
  },
  {
    id: 'cp-2',
    topicId: 'ct-3',
    authorId: 'usr_2',
    authorName: 'Fatima S.',
    title: 'Ruling on combining prayers while traveling — what are the conditions?',
    content: 'Assalamu alaikum. I travel frequently for work and I\'m confused about when it\'s permissible to combine prayers. Different people tell me different things. What are the actual conditions according to the major schools?',
    createdAt: '2024-07-14T15:20:00Z',
    updatedAt: '2024-07-14T15:20:00Z',
    likes: 31,
    replies: 12,
    isPinned: false,
    tags: ['Fiqh', 'Travel', 'Prayer'],
  },
  {
    id: 'cp-3',
    topicId: 'ct-2',
    authorId: 'usr_3',
    authorName: 'Omar M.',
    title: 'The science of jarh wa ta\'dil — how did scholars evaluate narrators?',
    content: 'I\'m fascinated by the rigor of hadith criticism. Can someone recommend resources for understanding how scholars like Imam al-Bukhari evaluated narrator reliability? What criteria were used?',
    createdAt: '2024-07-13T09:15:00Z',
    updatedAt: '2024-07-13T09:15:00Z',
    likes: 18,
    replies: 6,
    isPinned: false,
    tags: ['Hadith', 'Rijal', 'Methodology'],
  },
  {
    id: 'cp-4',
    topicId: 'ct-5',
    authorId: 'usr_4',
    authorName: 'Dr. Khalid R.',
    title: 'Islamic perspectives on AI and automation — a scholarly discussion',
    content: 'As AI becomes more prevalent, what are the Islamic ethical considerations? I\'m looking for scholarly discussions on topics like: AI decision-making in healthcare, automated fatwa systems, and the impact on employment from an Islamic economic perspective.',
    createdAt: '2024-07-12T14:00:00Z',
    updatedAt: '2024-07-12T14:00:00Z',
    likes: 42,
    replies: 15,
    isPinned: false,
    tags: ['Contemporary', 'Technology', 'Ethics'],
  },
];

export function CommunityPage() {
  const [selectedTopic, setSelectedTopic] = useState<CommunityTopic | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = POSTS.filter(p => {
    const matchesTopic = !selectedTopic || p.topicId === selectedTopic.id;
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-800 to-pink-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-8 h-8 text-rose-300" />
            <h1 className="text-3xl font-bold">Community</h1>
          </div>
          <p className="text-rose-100/80 max-w-2xl">
            Discuss Islamic topics, ask questions, share knowledge, and learn together in moderated, topic-based communities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Topics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Topics</h3>
                <button className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                {TOPICS.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(selectedTopic?.id === topic.id ? null : topic)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedTopic?.id === topic.id
                        ? 'bg-rose-50 text-rose-800 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{topic.title}</span>
                      <span className="text-xs text-gray-400">{topic.postCount}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Posts */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search discussions..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

            {/* Topic Header */}
            {selectedTopic && (
              <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{selectedTopic.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{selectedTopic.description}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {selectedTopic.memberCount}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {selectedTopic.postCount}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Posts */}
            <div className="space-y-3">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-rose-100 hover:shadow-sm transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-700 text-sm font-bold shrink-0">
                      {post.authorName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {post.isPinned && <Pin className="w-3 h-3 text-rose-500" />}
                        <h3 className="font-semibold text-gray-900 text-sm">{post.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>{post.authorName}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {post.likes}</span>
                          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {post.replies}</span>
                        </div>
                        <div className="flex gap-1">
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">No discussions found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
