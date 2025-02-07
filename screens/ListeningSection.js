import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';
import SQLite from 'react-native-sqlite-storage';
import questions from './data/listeningquestions';

Sound.setCategory('Playback');
SQLite.enablePromise(true); // Enabling promise API for SQLite

export default function ListeningSection({ navigation }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [soundInstance, setSoundInstance] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [db, setDb] = useState(null);  // Database instance


  const currentQuestion = questions[currentQuestionIndex];

  // Open SQLite database
  useEffect(() => {
    const openDatabase = async () => {
      try {
        const dbInstance = await SQLite.openDatabase({ name: 'audioquiz.db', location: 'default' });
        setDb(dbInstance);  // Save the database instance to state
        await dbInstance.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS progress (id INTEGER PRIMARY KEY, currentQuestionIndex INTEGER, selectedAnswer INTEGER);'
          );
        });

        // Load progress from SQLite when the component is mounted
        dbInstance.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM progress WHERE id = 1',
            [],
            (tx, results) => {
              if (results.rows.length > 0) {
                const progress = results.rows.item(0);
                setCurrentQuestionIndex(progress.currentQuestionIndex || 0);
                setSelectedAnswer(progress.selectedAnswer || null);
              }
            }
          );
        });
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    openDatabase();
  }, []);

   // Stop and release audio
   const stopAndReleaseAudio = () => {
    if (soundInstance) {
      soundInstance.stop(() => {
        soundInstance.release();
      });
      setSoundInstance(null);
      setIsPlaying(false);
    }
  };

  const handleAnswerPress = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowNextButton(true);
   
    if (db) {
      db.transaction(tx => {
        tx.executeSql(
          'REPLACE INTO progress (id, currentQuestionIndex, selectedAnswer) VALUES (1, ?, ?)',
          [currentQuestionIndex, answerIndex]
        );
      });
    }
  };

  const handleNextPress = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowNextButton(false);
      stopAndReleaseAudio();
    
      if (db) {
        db.transaction(tx => {
          tx.executeSql(
            'REPLACE INTO progress (id, currentQuestionIndex, selectedAnswer) VALUES (1, ?, ?)',
            [currentQuestionIndex + 1, null]
          );
        });
      }
    } else {
      alert('おめでとうございます、問題を完了しました。');
      setShowNextButton(false);
    }
  };

  const resetQuizState = () => {
    stopAndReleaseAudio();
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowNextButton(false);
    
    if (db) {
      db.transaction(tx => {
        tx.executeSql('DELETE FROM progress WHERE id = 1');
      });
    }
  };

  const handleStartAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowNextButton(true);
  
    if (db) {
      db.transaction(tx => {
        tx.executeSql('DELETE FROM progress WHERE id = 1');
      });
    }
  
    stopAndReleaseAudio();
  };
  
  
  const restartAudio = () => {
    stopAndReleaseAudio();
    playAudio();
  };

  const playAudio = () => {
    stopAndReleaseAudio();

    const sound = new Sound(currentQuestion.audio, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound:', error.message);
        return;
      }

      sound.play((success) => {
        if (success) {
          setIsPlaying(false);
        } else {
          console.log('Playback failed');
        }
      });

      setSoundInstance(sound);
      setIsPlaying(true);
    });
  };

  const togglePlayPause = () => {
    if (soundInstance) {
      if (isPlaying) {
        soundInstance.pause();
        setIsPlaying(false);
      } else {
        soundInstance.play((success) => {
          if (!success) {
            console.log('Playback failed');
          }
        });
        setIsPlaying(true);
      }
    } else {
      playAudio();
    }
  };

  useLayoutEffect(() => {
    if (showQuiz) {
      navigation.setOptions({
        headerShown: true,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => resetQuizState()}
            style={styles.closeButton}
          >
            <Ionicons name='close-outline' size={24} color='black' />
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [navigation, showQuiz]);

  
if (!showQuiz) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonCenter}>
        {/* Headphones Icon */}
        <Icon
          name="headphones"
          size={50}
          color="black"
          onPress={() => {
            setShowQuiz(true);
          }}
        />
        {/* Text Below Icon */}
        <Text style={styles.listeningText}>Jlpt 5 聴解</Text>
      </View>
    </View>
  );
}

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Display the question text */}
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      {currentQuestion.image && (
        <Image source={currentQuestion.image} style={styles.questionImage} />
      )}
      <View style={styles.buttonContainer}>
        {/* Play/Stop Button */}
        <TouchableOpacity onPress={togglePlayPause} style={styles.audioButton}>
          <Icon
            name={isPlaying ? 'stop' : 'play'} // 'stop' icon for stopping, 'play' for playing
            size={24}
            color="#000"
          />
        </TouchableOpacity>
  
        {/* Restart Button */}
        <TouchableOpacity onPress={restartAudio} style={styles.audioButton}>
          <Icon
            name="repeat" // 'repeat' icon for restarting the audio
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      </View>
  
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedAnswer === option.id && currentQuestion.correctAnswer === option.id && styles.correctOption,
              selectedAnswer === option.id && currentQuestion.correctAnswer !== option.id && styles.wrongOption,
              selectedAnswer !== null && currentQuestion.correctAnswer === option.id && styles.correctOption,
            ]}
            onPress={() => handleAnswerPress(option.id)}
            disabled={selectedAnswer !== null}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
  
        {showNextButton && (
          <TouchableOpacity
            style={[styles.optionButton, styles.nextButton]}
            onPress={handleNextPress}
          >
            <Text style={[styles.optionText, styles.nextButtonText]}>次の問題</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );  
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  scrollContainer: {
    paddingBottom: 100, // 스크롤이 계속 가능하도록 여유 공간 추가
    paddingHorizontal: 20,
  },
  buttonCenter: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  audioButton: {
    width: '40%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  audioButtonText: {
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    width: '100%', // Set width to 100% to stretch
  },
  optionButton: {
    flex: 1, // Allow buttons to stretch equally
    padding: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    width: '90%', // Adjust width to fit
  },
  correctOption: {
    backgroundColor: 'green',
  },
  wrongOption: {
    backgroundColor: 'red',
  },
  nextButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  endMessage: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15, // Align the button to the top
    left: 10,
    zIndex: 10,
    padding: 0, // No padding
    margin: 0, // No margin
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  questionImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  nextButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    alignItems: 'center',
  },
});