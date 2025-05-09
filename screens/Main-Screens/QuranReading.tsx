import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
  FlatList
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalColors } from '../../constants/GlobalColors';

// Define type for a single verse
interface Verse {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  audio: string;
  verseNumber: number;
}

// Define type for a Surah
interface Surah {
  id: number;
  name: string;
  englishName: string;
  revelationType: string;
  versesCount: number;
  verses: Verse[];
}

// Define types for user interactions
interface UserNote {
  verseId: number;
  note: string;
  timestamp: Date;
}

interface Bookmark {
  verseId: number;
  surahId: number;
  timestamp: Date;
}

const QuranReading: React.FC = () => {
  // State management
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [currentAudioPlaying, setCurrentAudioPlaying] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSurahModal, setShowSurahModal] = useState<boolean>(false);
  const [showTafsir, setShowTafsir] = useState<boolean>(false);
  const [currentTafsirVerse, setCurrentTafsirVerse] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<number>(24);
  const [translationFontSize, setTranslationFontSize] = useState<number>(16);

  // Mock data - in a real app, this would come from an API or local storage
  const mockSurahs: Surah[] = [
    {
      id: 1,
      name: 'الفاتحة',
      englishName: 'Al-Fatiha',
      revelationType: 'Meccan',
      versesCount: 7,
      verses: [
        {
          id: 1,
          arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          transliteration: 'Bismi Allahi alrrahmani alrraheemi',
          translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
          audio: 'path/to/audio/1-1.mp3',
          verseNumber: 1
        },
        {
          id: 2,
          arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
          transliteration: 'Alhamdu lillahi rabbi alAAalameena',
          translation: '[All] praise is [due] to Allah, Lord of the worlds -',
          audio: 'path/to/audio/1-2.mp3',
          verseNumber: 2
        },
        // More verses would be here...
      ]
    },
    {
      id: 2,
      name: 'البقرة',
      englishName: 'Al-Baqarah',
      revelationType: 'Medinan',
      versesCount: 286,
      verses: []
    },
    // More surahs would be here...
  ];

  // Mock tafsir data
  const mockTafsir = {
    1: "This surah is the opening of the Book (Quran). It is recited in every prayer and is an essential part of the Quran. It contains praise of Allah, acknowledgment of His sovereignty, and a supplication for guidance.",
    2: "This verse establishes that all praise belongs to Allah alone, who is the Lord and Sustainer of all creation. It sets the foundation for monotheism."
  };

  // Load initial surah
  useEffect(() => {
    setSelectedSurah(mockSurahs[0]);
  }, []);

  // Handle audio playback - in a real app, this would use a proper audio player
  const playAudio = (verseId: number): void => {
    if (currentAudioPlaying === verseId) {
      // Stop audio
      setCurrentAudioPlaying(null);
    } else {
      // Play new audio
      setCurrentAudioPlaying(verseId);
      // Actual audio playing logic would go here
      
      // Auto-stop after 5 seconds (simulating audio completion)
      setTimeout(() => {
        setCurrentAudioPlaying(null);
      }, 5000);
    }
  };

  // Toggle bookmark for a verse
  const toggleBookmark = (verseId: number, surahId: number): void => {
    const existingBookmark = bookmarks.find(b => b.verseId === verseId);
    
    if (existingBookmark) {
      setBookmarks(bookmarks.filter(b => b.verseId !== verseId));
    } else {
      setBookmarks([...bookmarks, {
        verseId,
        surahId,
        timestamp: new Date()
      }]);
    }
  };

  // Check if a verse is bookmarked
  const isBookmarked = (verseId: number): boolean => {
    return bookmarks.some(b => b.verseId === verseId);
  };

  // Handle tafsir display
  const toggleTafsir = (verseId: number): void => {
    if (currentTafsirVerse === verseId) {
      setShowTafsir(false);
      setCurrentTafsirVerse(null);
    } else {
      setShowTafsir(true);
      setCurrentTafsirVerse(verseId);
    }
  };

  // Filter surahs based on search query
  const filteredSurahs = mockSurahs.filter(surah => 
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to next/previous surah
  const navigateToSurah = (direction: 'next' | 'prev'): void => {
    if (!selectedSurah) return;
    
    const currentIndex = mockSurahs.findIndex(s => s.id === selectedSurah.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex < mockSurahs.length - 1 ? currentIndex + 1 : currentIndex;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    }
    
    setSelectedSurah(mockSurahs[newIndex]);
    // Reset scroll position
  };

  // Render main content
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with search and settings */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => console.log('Navigate back')}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={GlobalColors.darkGray} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.surahSelector}
          onPress={() => setShowSurahModal(true)}
        >
          <Text style={styles.surahSelectorText}>
            {selectedSurah ? selectedSurah.englishName : 'Select Surah'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={20} color={GlobalColors.darkGray} />
        </TouchableOpacity>
        
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="bookmark-outline" size={24} color={GlobalColors.blue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="cog-outline" size={24} color={GlobalColors.darkGray} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Reading controls */}
      <View style={styles.controlsBar}>
        <View style={styles.controlsLeft}>
          <TouchableOpacity 
            style={[styles.controlButton, showTranslation && styles.activeControlButton]} 
            onPress={() => setShowTranslation(!showTranslation)}
          >
            <MaterialCommunityIcons 
              name="translate" 
              size={18} 
              color={showTranslation ? GlobalColors.neutralTone : GlobalColors.darkGray} 
            />
            <Text style={[
              styles.controlText, 
              showTranslation && styles.activeControlText
            ]}>Translation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, showTransliteration && styles.activeControlButton]} 
            onPress={() => setShowTransliteration(!showTransliteration)}
          >
            <MaterialCommunityIcons 
              name="format-text" 
              size={18} 
              color={showTransliteration ? GlobalColors.neutralTone : GlobalColors.darkGray} 
            />
            <Text style={[
              styles.controlText, 
              showTransliteration && styles.activeControlText
            ]}>Transliteration</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.controlsRight}>
          <TouchableOpacity style={styles.fontSizeButton} onPress={() => setFontSize(Math.max(fontSize - 2, 18))}>
            <Text style={styles.fontSizeButtonText}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fontSizeButton} onPress={() => setFontSize(Math.min(fontSize + 2, 32))}>
            <Text style={styles.fontSizeButtonText}>A+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Main reading area */}
      {selectedSurah && (
        <ScrollView style={styles.readingContainer}>
          {/* Surah header */}
          <View style={styles.surahHeader}>
            <Text style={styles.surahTitle}>{selectedSurah.name}</Text>
            <Text style={styles.surahSubtitle}>{selectedSurah.englishName}</Text>
            <Text style={styles.surahInfo}>
              {selectedSurah.revelationType} • {selectedSurah.versesCount} verses
            </Text>
            
            <View style={styles.bismillah}>
              <Text style={[styles.bismillahText, { fontSize: fontSize }]}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </Text>
            </View>
          </View>
          
          {/* Verses */}
          {selectedSurah.verses.map((verse) => (
            <View key={verse.id} style={styles.verseContainer}>
              {/* Verse number and actions */}
              <View style={styles.verseHeader}>
                <View style={styles.verseNumberContainer}>
                  <Text style={styles.verseNumber}>{verse.verseNumber}</Text>
                </View>
                
                <View style={styles.verseActions}>
                  <TouchableOpacity onPress={() => toggleTafsir(verse.id)}>
                    <MaterialCommunityIcons 
                      name="book-open-variant" 
                      size={20} 
                      color={currentTafsirVerse === verse.id ? GlobalColors.warmOrange : GlobalColors.darkGray} 
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={() => toggleBookmark(verse.id, selectedSurah.id)}>
                    <MaterialCommunityIcons 
                      name={isBookmarked(verse.id) ? "bookmark" : "bookmark-outline"} 
                      size={20} 
                      color={isBookmarked(verse.id) ? GlobalColors.softGreen : GlobalColors.darkGray} 
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={() => playAudio(verse.id)}>
                    <MaterialCommunityIcons 
                      name={currentAudioPlaying === verse.id ? "pause-circle" : "play-circle"} 
                      size={24} 
                      color={GlobalColors.blue} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* Arabic text */}
              <Text style={[styles.arabicText, { fontSize: fontSize }]}>
                {verse.arabic}
              </Text>
              
              {/* Transliteration (conditional) */}
              {showTransliteration && (
                <Text style={styles.transliterationText}>{verse.transliteration}</Text>
              )}
              
              {/* Translation (conditional) */}
              {showTranslation && (
                <Text style={[styles.translationText, { fontSize: translationFontSize }]}>
                  {verse.translation}
                </Text>
              )}
              
              {/* Tafsir expansion (conditional) */}
              {showTafsir && currentTafsirVerse === verse.id && (
                <View style={styles.tafsirContainer}>
                  <Text style={styles.tafsirTitle}>Tafsir</Text>
                  <Text style={styles.tafsirText}>
                    {mockTafsir[verse.id as keyof typeof mockTafsir] || 
                      "Tafsir not available for this verse."}
                  </Text>
                </View>
              )}
            </View>
          ))}
          
          {/* Navigation between surahs */}
          <View style={styles.navigationFooter}>
            <TouchableOpacity 
              style={styles.navigationButton}
              onPress={() => navigateToSurah('prev')}
              disabled={selectedSurah.id === 1}
            >
              <MaterialCommunityIcons 
                name="chevron-left" 
                size={24} 
                color={selectedSurah.id === 1 ? '#ccc' : GlobalColors.darkGray} 
              />
              <Text style={[
                styles.navigationText,
                selectedSurah.id === 1 && styles.disabledText
              ]}>Previous Surah</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.navigationButton}
              onPress={() => navigateToSurah('next')}
              disabled={selectedSurah.id === mockSurahs.length}
            >
              <Text style={[
                styles.navigationText,
                selectedSurah.id === mockSurahs.length && styles.disabledText
              ]}>Next Surah</Text>
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color={selectedSurah.id === mockSurahs.length ? '#ccc' : GlobalColors.darkGray} 
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      
      {/* Surah Selection Modal */}
      <Modal
        visible={showSurahModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSurahModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Surah</Text>
              <TouchableOpacity onPress={() => setShowSurahModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color={GlobalColors.darkGray} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <MaterialCommunityIcons name="magnify" size={20} color={GlobalColors.darkGray} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearch}>
                  <MaterialCommunityIcons name="close-circle" size={16} color="#999" />
                </TouchableOpacity>
              )}
            </View>
            
            <FlatList
              data={filteredSurahs}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.surahItem,
                    selectedSurah?.id === item.id && styles.selectedSurahItem
                  ]}
                  onPress={() => {
                    setSelectedSurah(item);
                    setShowSurahModal(false);
                  }}
                >
                  <View style={styles.surahNumberContainer}>
                    <Text style={styles.surahNumber}>{item.id}</Text>
                  </View>
                  <View style={styles.surahItemContent}>
                    <Text style={styles.surahItemName}>{item.englishName}</Text>
                    <Text style={styles.surahItemArabic}>{item.name}</Text>
                  </View>
                  <Text style={styles.surahItemVerses}>{item.versesCount} verses</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
      
      {/* Audio Player Controls (Fixed at bottom when playing) */}
      {currentAudioPlaying !== null && (
        <View style={styles.audioPlayerBar}>
          <View style={styles.audioPlayerInfo}>
            <MaterialCommunityIcons name="music-note" size={20} color={GlobalColors.neutralTone} />
            <Text style={styles.audioPlayerText}>
              Playing Verse {selectedSurah?.verses.find(v => v.id === currentAudioPlaying)?.verseNumber}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setCurrentAudioPlaying(null)}>
            <MaterialCommunityIcons name="stop-circle" size={28} color={GlobalColors.neutralTone} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.neutralTone,
    marginTop: 30
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  surahSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  surahSelectorText: {
    fontSize: 16,
    fontWeight: '500',
    color: GlobalColors.darkGray,
    marginRight: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
  },
  controlsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  controlsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  activeControlButton: {
    backgroundColor: GlobalColors.softGreen,
  },
  controlText: {
    fontSize: 14,
    marginLeft: 4,
    color: GlobalColors.darkGray,
  },
  activeControlText: {
    color: GlobalColors.neutralTone,
  },
  fontSizeButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  fontSizeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  readingContainer: {
    flex: 1,
    padding: 16,
  },
  surahHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  surahTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'sans-serif',
  },
  surahSubtitle: {
    fontSize: 18,
    color: GlobalColors.darkGray,
    marginBottom: 4,
  },
  surahInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  bismillah: {
    alignItems: 'center',
    marginVertical: 16,
  },
  bismillahText: {
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'sans-serif',
    textAlign: 'center',
    color: GlobalColors.softGreen,
  },
  verseContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: GlobalColors.softGreen,
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  verseNumberContainer: {
    backgroundColor: GlobalColors.softGreen,
    height: 26,
    width: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseNumber: {
    color: GlobalColors.neutralTone,
    fontSize: 14,
    fontWeight: 'bold',
  },
  verseActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  arabicText: {
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'sans-serif',
    textAlign: 'right',
    lineHeight: 44,
    marginBottom: 16,
  },
  transliterationText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 8,
  },
  translationText: {
    fontSize: 16,
    color: GlobalColors.darkGray,
    lineHeight: 24,
  },
  tafsirContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fff8e1',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: GlobalColors.warmOrange,
  },
  tafsirTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: GlobalColors.warmOrange,
    marginBottom: 6,
  },
  tafsirText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  navigationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  navigationText: {
    fontSize: 16,
    color: GlobalColors.darkGray,
  },
  disabledText: {
    color: '#ccc',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: GlobalColors.neutralTone,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: GlobalColors.darkGray,
  },
  clearSearch: {
    padding: 4,
  },
  surahItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedSurahItem: {
    backgroundColor: '#f0f7ff',
    borderLeftWidth: 3,
    borderLeftColor: GlobalColors.blue,
  },
  surahNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  surahNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  surahItemContent: {
    flex: 1,
  },
  surahItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: GlobalColors.darkGray,
  },
  surahItemArabic: {
    fontSize: 14,
    color: '#666',
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'sans-serif',
  },
  surahItemVerses: {
    fontSize: 12,
    color: '#999',
  },
  audioPlayerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: GlobalColors.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  audioPlayerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioPlayerText: {
    color: GlobalColors.neutralTone,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default QuranReading;