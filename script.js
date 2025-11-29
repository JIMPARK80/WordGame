// Game state
let gameState = {
    currentQuestion: 0,
    score: 0,
    correctCount: 0,
    questions: [],
    currentAnswer: '',
    hintShown: false,
    stageNumber: 1,
    stageGoal: 10  // Default goal, will be set from stages.json
};

// Timer state
let timerInterval = null;
let timeLeft = 10;
let autoNextTimeout = null;

// Current language (default: English)
let currentLanguage = 'en';

// Game mode (default: multiple choice)
let gameMode = 'multiple'; // 'typing' or 'multiple'

// Picture-words database (loaded from JSON)
let pictureDatabase = [];

// Stages database (loaded from JSON)
let stagesDatabase = {};

// Emoji auto-generation mapping (단어 의미에 따른 이모지 자동 매칭)
const emojiMapping = {
    // 동물 (Animals)
    'cat': '🐱', 'dog': '🐶', 'panda': '🐼', 'tiger': '🐯', 'lion': '🦁', 'elephant': '🐘',
    'giraffe': '🦒', 'rabbit': '🐰', 'bear': '🐻', 'frog': '🐸', 'pig': '🐷', 'cow': '🐮',
    'horse': '🐴', 'chicken': '🐔', 'duck': '🦆', 'bird': '🐦', 'owl': '🦉', 'bee': '🐝',
    'fox': '🦊', 'wolf': '🐺', 'deer': '🦌', 'monkey': '🐵', 'zebra': '🦓', 'kangaroo': '🦘',
    'koala': '🐨', 'dolphin': '🐬', 'whale': '🐋', 'shark': '🦈', 'turtle': '🐢', 'snake': '🐍',
    'mouse': '🐭', 'squirrel': '🐿️', 'camel': '🐫', 'penguin': '🐧', 'chick': '🐤', 'baby': '👶',
    
    // 과일 (Fruits)
    'apple': '🍎', 'banana': '🍌', 'grape': '🍇', 'strawberry': '🍓', 'orange': '🍊',
    'watermelon': '🍉', 'peach': '🍑', 'cherry': '🍒', 'kiwi': '🥝', 'pineapple': '🍍',
    
    // 음식 (Food)
    'pizza': '🍕', 'hamburger': '🍔', 'french fries': '🍟', 'taco': '🌮', 'ramen': '🍜',
    'bento box': '🍱', 'rice ball': '🍙', 'sushi': '🍣', 'cake': '🎂', 'cookie': '🍪',
    'chocolate': '🍫', 'candy': '🍬', 'coffee': '☕', 'tea': '🍵', 'milk': '🥛', 'bread': '🍞',
    'butter': '🧈', 'cheese': '🧀', 'egg': '🥚', 'juice': '🧃', 'soup': '🍲', 'salad': '🥗',
    'donut': '🍩', 'muffin': '🧁', 'spaghetti': '🍝', 'hotdog': '🌭', 'steak': '🥩',
    'shrimp': '🦐', 'sandwich': '🥪', 'yogurt': '🥛', 'honey': '🍯', 'jam': '🍯', 'ice cream': '🍦',
    
    // 교통수단 (Vehicles)
    'car': '🚗', 'bus': '🚌', 'taxi': '🚕', 'ambulance': '🚑', 'fire truck': '🚒',
    'police car': '🚓', 'bicycle': '🚲', 'airplane': '✈️', 'ship': '🚢', 'train': '🚂',
    
    // 장소 (Places)
    'house': '🏠', 'school': '🏫', 'hospital': '🏥', 'convenience store': '🏪',
    'department store': '🏬', 'barn': '🏚️', 'ocean': '🌊', 'mountain': '🏔️', 'beach': '🏖️',
    'kitchen': '🍳', 'bathroom': '🚿', 'garden': '🌳', 'table': '🪑', 'chair': '🪑', 'bed': '🛏️',
    'window': '🪟', 'door': '🚪', 'floor': '🪵', 'wall': '🧱',
    
    // 자연 (Nature)
    'tree': '🌳', 'flower': '🌺', 'sun': '🌞', 'moon': '🌙', 'star': '⭐', 'cloud': '☁️',
    'thunderstorm': '⛈️', 'rainbow': '🌈', 'snow': '❄️', 'river': '🌊', 'lake': '🏞️',
    'forest': '🌲', 'desert': '🏜️', 'hill': '⛰️', 'volcano': '🌋', 'leaf': '🍃', 'rock': '🪨',
    'wind': '💨', 'snowflake': '❄️', 'lightning': '⚡', 'storm': '🌪️', 'wave': '🌊',
    'island': '🏝️', 'field': '🌾',
    
    // 동사 (Verbs)
    'run': '🏃', 'walk': '🚶', 'eat': '🍽️', 'drink': '🥤', 'sleep': '😴', 'play': '🎮',
    'sing': '🎤', 'dance': '💃', 'read': '📖', 'write': '✍️', 'swim': '🏊', 'climb': '🧗',
    'open': '🚪', 'close': '🚪', 'draw': '🎨', 'cook': '👨‍🍳', 'wash': '🧼', 'clean': '🧹',
    'talk': '💬', 'listen': '👂', 'look': '👀', 'smile': '😊', 'cry': '😢', 'help': '🤝',
    'catch': '🤲', 'throw': '⚾', 'build': '🏗️', 'ride': '🚴', 'plant': '🌱', 'jump': '🤸',
    
    // 형용사 (Adjectives)
    'big': '📦', 'small': '🔹', 'tall': '🏗️', 'short': '🔻', 'long': '➖', 'fast': '⚡',
    'slow': '🐌', 'hot': '🔥', 'cold': '❄️', 'warm': '☀️', 'cool': '💨', 'happy': '😄',
    'sad': '😢', 'angry': '😠', 'tired': '😴', 'hungry': '🍽️', 'full': '😋', 'dirty': '💩',
    'pretty': '💐', 'cute': '🐰', 'funny': '😄', 'noisy': '🔊', 'quiet': '🔇', 'bright': '💡',
    'dark': '🌙', 'strong': '💪', 'weak': '🪶', 'new': '🆕', 'old': '🏛️',
    
    // 물건/도구 (Objects/Tools)
    'umbrella': '☔', 'balloon': '🎈', 'gift': '🎁', 'christmas tree': '🎄', 'soccer ball': '⚽',
    'basketball': '🏀', 'tennis ball': '🎾', 'volleyball': '🏐', 'guitar': '🎸', 'piano': '🎹',
    'microphone': '🎤', 'smartphone': '📱', 'laptop': '💻', 'watch': '⌚', 'book': '📚',
    'pencil': '✏️', 'palette': '🎨', 'mask': '🎭', 'glasses': '👓', 'ring': '💍', 'camera': '📷',
    'candle': '🕯️', 'knife': '🔪', 'ruler': '📏', 'broom': '🧹', 'bottle': '🪣', 'basket': '🧺',
    'lightbulb': '💡', 'radio': '📻', 'telescope': '🔭', 'map': '🗺️', 'rope': '🪢', 'eraser': '📐',
    'backpack': '🎒', 'hammer': '🔨', 'ladder': '🪜', 'heater': '🌡️', 'speaker': '📢', 'shovel': '⛏️',
    'fan': '🌀', 'towel': '🧻', 'cup': '☕', 'soap': '🧴', 'plate': '🍽️', 'fork': '🍴', 'spoon': '🥄',
    'bag': '👜', 'key': '🔑', 'picture': '🖼️', 'clock': '🕐',
    
    // 직업 (Professions)
    'bus driver': '🚌👨‍✈️', 'firefighter': '👨‍🚒', 'nurse': '👩‍⚕️', 'doctor': '👨‍⚕️',
    'teacher': '👩‍🏫', 'chef': '👨‍🍳', 'pilot': '✈️', 'farmer': '👨‍🌾', 'police officer': '👮',
    'scientist': '👩‍🔬', 'painter': '🎨', 'singer': '🎤', 'astronaut': '👨‍🚀',
    
    // 옷/의류 (Clothing)
    'shirt': '👕', 'pants': '👖', 'sneakers': '👟', 'crown': '👑', 'hat': '🎩',
    
    // 기타
    'help': '🆘', 'bath': '🛁', 'song': '🎵', 'cereal': '🥣', 'cereal': '🥣'
};

// 이모지 자동 생성 함수 (단어에 맞는 이모지 찾기)
function generateEmoji(word, hint = '') {
    if (!word) return '❓';
    
    const wordLower = word.toLowerCase().trim();
    
    // 1. 직접 매칭 시도
    if (emojiMapping[wordLower]) {
        return emojiMapping[wordLower];
    }
    
    // 2. 부분 매칭 시도 (복합 단어)
    for (const [key, emoji] of Object.entries(emojiMapping)) {
        if (wordLower.includes(key) || key.includes(wordLower)) {
            return emoji;
        }
    }
    
    // 3. 힌트에서 키워드 추출하여 매칭
    if (hint) {
        const hintLower = hint.toLowerCase();
        for (const [key, emoji] of Object.entries(emojiMapping)) {
            if (hintLower.includes(key)) {
                return emoji;
            }
        }
    }
    
    // 4. 카테고리 기반 기본 이모지
    if (wordLower.includes('animal') || wordLower.includes('동물')) return '🐾';
    if (wordLower.includes('food') || wordLower.includes('음식')) return '🍽️';
    if (wordLower.includes('fruit') || wordLower.includes('과일')) return '🍎';
    if (wordLower.includes('vehicle') || wordLower.includes('교통')) return '🚗';
    if (wordLower.includes('place') || wordLower.includes('장소')) return '📍';
    if (wordLower.includes('action') || wordLower.includes('동작') || wordLower.includes('하다')) return '🎬';
    if (wordLower.includes('big') || wordLower.includes('큰')) return '📦';
    if (wordLower.includes('small') || wordLower.includes('작은')) return '🔹';
    
    // 5. 기본 이모지 (매칭 실패 시)
    return '❓';
}

// 이모지 자동 할당 함수 (words.json 데이터에 이모지가 없거나 "?"인 경우)
function assignEmojiIfMissing(wordData) {
    if (!wordData.emoji || wordData.emoji === '?' || wordData.emoji === '' || wordData.emoji === '❓') {
        const wordEn = typeof wordData.word === 'object' ? wordData.word.en : wordData.word;
        const wordKo = typeof wordData.word === 'object' ? wordData.word.ko : wordData.word;
        const hintEn = typeof wordData.hint === 'object' ? wordData.hint.en : wordData.hint;
        const hintKo = typeof wordData.hint === 'object' ? wordData.hint.ko : wordData.hint;
        
        // 영어 단어로 먼저 시도, 실패 시 한국어 단어로 시도
        let emoji = generateEmoji(wordEn, hintEn);
        if (emoji === '❓') {
            emoji = generateEmoji(wordKo, hintKo);
        }
        
        wordData.emoji = emoji;
    }
    return wordData;
}

// Sound effects
let soundEnabled = true;

// TTS (Text-to-Speech) function
function speak(text) {
    if (!text) return;
    
    try {
        // Check if SpeechSynthesis is available
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = "en-US"; // 영어 단어 읽기
            utter.rate = 0.9; // Slightly slower for clarity
            utter.pitch = 1.0;
            utter.volume = 1.0;
            
            window.speechSynthesis.speak(utter);
        }
    } catch (error) {
        console.log('TTS not supported:', error);
    }
}

// Play sound effect
function playSound(type) {
    if (!soundEnabled) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (type === 'correct') {
            // Success sound - ascending melody
            playCorrectSound(audioContext);
        } else if (type === 'incorrect') {
            // Failure sound - descending tone
            playIncorrectSound(audioContext);
        } else if (type === 'click') {
            // Button click sound
            playClickSound(audioContext);
        }
    } catch (error) {
        console.log('Audio not supported:', error);
    }
}

// Play correct answer sound (success melody)
function playCorrectSound(audioContext) {
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (major chord)
    const duration = 0.15;
    const startTime = audioContext.currentTime;
    
    frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime + index * duration);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + index * duration + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, startTime + index * duration + duration);
        
        oscillator.start(startTime + index * duration);
        oscillator.stop(startTime + index * duration + duration);
    });
}

// Play incorrect answer sound (failure tone)
function playIncorrectSound(audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(100, audioContext.currentTime + 0.3);
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Play click sound
function playClickSound(audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.05);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
}

// Toggle sound on/off
function toggleSound() {
    soundEnabled = !soundEnabled;
    updateSoundButtonIcon();
    // Test sound when enabling
    if (soundEnabled) {
        playSound('click');
    }
}

// Update sound button icon
function updateSoundButtonIcon() {
    const menuSoundBtn = document.getElementById('menuSoundBtn');
    const modalSoundBtn = document.getElementById('modalSoundBtn');
    const icon = soundEnabled ? '🔊' : '🔇';
    const soundText = soundEnabled ? t('soundOn') : t('soundOff');
    
    // Update in-game menu sound button
    if (menuSoundBtn) {
        const iconElement = menuSoundBtn.querySelector('.menu-option-icon');
        if (iconElement) {
            iconElement.textContent = icon;
        }
        const textElement = menuSoundBtn.querySelector('.menu-option-text');
        if (textElement) {
            textElement.textContent = soundText;
        }
        menuSoundBtn.classList.toggle('active', soundEnabled);
    }
    
    // Update modal sound button
    if (modalSoundBtn) {
        const iconElement = modalSoundBtn.querySelector('.menu-option-icon');
        if (iconElement) {
            iconElement.textContent = icon;
        }
        const textElement = modalSoundBtn.querySelector('.menu-option-text');
        if (textElement) {
            textElement.textContent = soundText;
        }
        modalSoundBtn.classList.toggle('active', soundEnabled);
    }
}

// Language translations
const translations = {
    ko: {
        gameTitle: '🎨 그림 맞추기 게임',
        score: '점수',
        correct: '정답',
        question: '문제',
        stage: '스테이지',
        placeholder: '그림에 맞는 단어를 입력하세요...',
        submit: '정답 확인',
        next: '다음 문제',
        hint: '힌트 보기',
        newGame: '새 게임',
        correctMsg: '정답입니다! 🎉',
        wrongMsg: '틀렸습니다. 정답은 "{word}"입니다.',
        pointsMsg: '정답! +{points}점',
        wrongMsg2: '틀렸습니다!',
        enterWord: '단어를 입력해주세요!',
        alreadyFound: '이미 찾은 단어입니다!',
        invalidWord: '유효하지 않은 단어입니다!',
        gameOver: '게임 종료! 최종 점수: {score}점 (정답: {correct}/{total})',
        gameComplete: '게임 완료! 최종 점수: {score}점',
        loadError: '단어 데이터를 불러오는데 실패했습니다.',
        noData: '단어 데이터가 없습니다.',
        hintAlreadyShown: '이미 힌트를 보셨습니다!',
        hintUsed: '힌트를 사용했습니다!',
        typingMode: '타이핑',
        multipleMode: '객관식',
        stageClear: '스테이지 클리어!',
        stageAgain: '스테이지 다시!',
        accuracy: '정확도',
        nextStage: '다음 스테이지',
        tryAgain: '다시 시도',
        settings: '설정',
        sound: '사운드',
        soundOn: '사운드 켜기',
        soundOff: '사운드 끄기',
        time: '시간',
        timeUp: '시간 초과!',
        startGame: '게임 시작',
        options: '옵션',
        exitGame: '게임 종료',
        backToStart: '시작 화면으로',
        backToGame: '게임 화면으로',
        goal: '목표'
    },
    en: {
        gameTitle: '🎨 Picture Word Game',
        score: 'Score',
        correct: 'Correct',
        question: 'Question',
        stage: 'Stage',
        placeholder: 'Enter the word that matches the picture...',
        submit: 'Check Answer',
        next: 'Next Question',
        hint: 'Show Hint',
        newGame: 'New Game',
        correctMsg: 'Correct! 🎉',
        wrongMsg: 'Wrong. The answer is "{word}".',
        pointsMsg: 'Correct! +{points} points',
        wrongMsg2: 'Wrong!',
        enterWord: 'Please enter a word!',
        alreadyFound: 'You already found this word!',
        invalidWord: 'Invalid word!',
        gameOver: 'Game Over! Final Score: {score} points (Correct: {correct}/{total})',
        gameComplete: 'Game Complete! Final Score: {score} points',
        loadError: 'Failed to load word data.',
        noData: 'No word data available.',
        hintAlreadyShown: 'You already saw the hint!',
        hintUsed: 'Hint used!',
        typingMode: 'Typing',
        multipleMode: 'Multiple Choice',
        stageClear: 'Stage Clear!',
        stageAgain: 'Stage Again!',
        accuracy: 'Accuracy',
        nextStage: 'Next Stage',
        tryAgain: 'Try Again',
        settings: 'Settings',
        sound: 'Sound',
        soundOn: 'Sound ON',
        soundOff: 'Sound OFF',
        time: 'Time',
        timeUp: 'Time Up!',
        startGame: 'Start Game',
        options: 'Options',
        exitGame: 'Exit Game',
        backToStart: 'Back to Start',
        backToGame: 'Back to Game',
        goal: 'Goal'
    }
};

// Get translation
function t(key, params = {}) {
    let text = translations[currentLanguage][key] || key;
    // Replace parameters
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });
    return text;
}

// Update UI language
function updateUILanguage() {
    document.getElementById('gameTitle').textContent = t('gameTitle');
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            el.textContent = t(key);
        }
    });
    
    const wordInput = document.getElementById('wordInput');
    wordInput.placeholder = t('placeholder');
    
    // Update game mode button text (desktop - removed, using menu panel now)
    
    // Update menu panel active states
    document.querySelectorAll('.menu-option[data-mode]').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.mode === gameMode) {
            opt.classList.add('active');
        }
    });
    
    document.querySelectorAll('.menu-option[data-lang]').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.lang === currentLanguage) {
            opt.classList.add('active');
        }
    });
    
    // Update score labels - match by data-i18n attribute instead of index
    document.querySelectorAll('.score-item .label[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            el.textContent = t(key);
        }
    });
    
    // Update sound button
    updateSoundButtonIcon();
}

// Toggle language dropdown
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    const isVisible = dropdown.style.display !== 'none';
    dropdown.style.display = isVisible ? 'none' : 'block';
}

// Change language
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update language button text (desktop - removed, using menu panel now)
    
    // Close dropdown (desktop)
    const languageDropdown = document.getElementById('languageDropdown');
    if (languageDropdown) {
        languageDropdown.style.display = 'none';
    }
    
    // Update menu panel active state
    document.querySelectorAll('.menu-option[data-lang]').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.lang === lang) {
            opt.classList.add('active');
        }
    });
    
    // Update UI
    updateUILanguage();
    
    // Reload current question with new language
    if (gameState.questions.length > 0) {
        loadQuestion();
    }
}

// Toggle game mode dropdown
function toggleGameModeDropdown() {
    const dropdown = document.getElementById('modeDropdown');
    const isVisible = dropdown.style.display !== 'none';
    dropdown.style.display = isVisible ? 'none' : 'block';
}

// Change game mode
function changeGameMode(mode) {
    gameMode = mode;
    
    // Update mode button text (desktop - removed, using menu panel now)
    
    // Close dropdown (desktop)
    const modeDropdown = document.getElementById('modeDropdown');
    if (modeDropdown) {
        modeDropdown.style.display = 'none';
    }
    
    // Update menu panel active state
    document.querySelectorAll('.menu-option[data-mode]').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.mode === mode) {
            opt.classList.add('active');
        }
    });
    
    // Show/hide appropriate UI
    const typingArea = document.getElementById('typingArea');
    const multipleArea = document.getElementById('multipleChoiceArea');
    
    if (mode === 'typing') {
        typingArea.style.display = 'flex';
        multipleArea.style.display = 'none';
    } else {
        typingArea.style.display = 'none';
        multipleArea.style.display = 'block';
    }
    
    // Reload current question with new mode
    if (gameState.questions.length > 0) {
        loadQuestion();
    }
}

// Generate multiple choice options
function generateMultipleChoice(correctAnswer) {
    // Get all words from database for current language
    const allWords = pictureDatabase
        .map(item => {
            const word = typeof item.word === 'object' ? item.word[currentLanguage] : item.word;
            return word;
        })
        .filter(word => word && word.toLowerCase() !== correctAnswer.toLowerCase());
    
    // Shuffle and pick 3 random wrong answers
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    const wrongAnswers = shuffled.slice(0, 3);
    
    // Combine correct answer with wrong answers and shuffle
    const choices = [correctAnswer, ...wrongAnswers];
    return choices.sort(() => Math.random() - 0.5);
}

// Load words from JSON file
async function loadWordsDatabase() {
    try {
        const response = await fetch('words.json');
        if (!response.ok) {
            throw new Error('Failed to load words.json');
        }
        pictureDatabase = await response.json();
        
        // 이모지가 없거나 "?"인 경우 자동으로 이모지 할당
        pictureDatabase = pictureDatabase.map(wordData => assignEmojiIfMissing(wordData));
        
        return pictureDatabase;
    } catch (error) {
        console.error('Error loading words database:', error);
        showMessage(t('loadError'), 'error');
        return [];
    }
}

/**
 * Get words by type (noun, verb, adjective)
 * @param {string} type - 'noun', 'verb', or 'adjective'
 * @returns {Array} Array of word objects with the specified type
 * 
 * @example
 * // Get all nouns
 * const nouns = getWordsByType('noun');
 * 
 * // Get all verbs
 * const verbs = getWordsByType('verb');
 * 
 * // Get all adjectives
 * const adjectives = getWordsByType('adjective');
 */
function getWordsByType(type) {
    if (!pictureDatabase || pictureDatabase.length === 0) {
        return [];
    }
    return pictureDatabase.filter(wordData => {
        return wordData.type === type;
    });
}

/**
 * Get nouns only
 * @returns {Array} Array of noun word objects
 * 
 * @example
 * const nouns = getNouns();
 * console.log(`Total nouns: ${nouns.length}`);
 */
function getNouns() {
    return getWordsByType('noun');
}

/**
 * Get verbs only
 * @returns {Array} Array of verb word objects
 * 
 * @example
 * const verbs = getVerbs();
 * console.log(`Total verbs: ${verbs.length}`);
 */
function getVerbs() {
    return getWordsByType('verb');
}

/**
 * Get adjectives only
 * @returns {Array} Array of adjective word objects
 * 
 * @example
 * const adjectives = getAdjectives();
 * console.log(`Total adjectives: ${adjectives.length}`);
 */
function getAdjectives() {
    return getWordsByType('adjective');
}

/**
 * Get words by multiple types
 * @param {string|Array} types - Single type string or array of types ['noun', 'verb', 'adjective']
 * @returns {Array} Array of word objects matching any of the specified types
 * 
 * @example
 * // Get both nouns and verbs
 * const nounsAndVerbs = getWordsByTypes(['noun', 'verb']);
 * 
 * // Get single type (same as getWordsByType)
 * const nouns = getWordsByTypes('noun');
 */
function getWordsByTypes(types) {
    if (!pictureDatabase || pictureDatabase.length === 0) {
        return [];
    }
    if (!Array.isArray(types)) {
        types = [types];
    }
    return pictureDatabase.filter(wordData => {
        return types.includes(wordData.type);
    });
}

// Load stages from JSON file
async function loadStagesDatabase() {
    try {
        const response = await fetch('stages.json');
        if (!response.ok) {
            throw new Error('Failed to load stages.json');
        }
        stagesDatabase = await response.json();
        return stagesDatabase;
    } catch (error) {
        console.error('Error loading stages database:', error);
        showMessage(t('loadError'), 'error');
        return {};
    }
}

// Initialize game
async function initGame() {
    // Load words database if not loaded
    if (pictureDatabase.length === 0) {
        await loadWordsDatabase();
    }
    
    // Load stages database if not loaded
    if (Object.keys(stagesDatabase).length === 0) {
        await loadStagesDatabase();
    }
    
    if (pictureDatabase.length === 0) {
        showMessage(t('noData'), 'error');
        return;
    }
    
    // Hide start screen and stage clear screen if visible
    const startScreen = document.getElementById('startScreen');
    const stageClearScreen = document.getElementById('stageClearScreen');
    const gameArea = document.getElementById('gameArea');
    if (startScreen) {
        startScreen.style.display = 'none';
    }
    if (stageClearScreen) {
        stageClearScreen.style.display = 'none';
    }
    if (gameArea) {
        gameArea.style.display = 'block';
    }
    
    // Get current stage data
    const currentStage = stagesDatabase[gameState.stageNumber.toString()];
    
    if (!currentStage) {
        showMessage(currentLanguage === 'ko' ? '스테이지 데이터를 찾을 수 없습니다.' : 'Stage data not found.', 'error');
        return;
    }
    
    // Get words for current stage
    const stageWords = currentStage.words || [];
    
    // Filter pictureDatabase to only include words from current stage
    const stageQuestions = pictureDatabase.filter(wordData => {
        const wordEn = typeof wordData.word === 'object' ? wordData.word.en : wordData.word;
        return stageWords.includes(wordEn.toLowerCase());
    });
    
    if (stageQuestions.length === 0) {
        showMessage(currentLanguage === 'ko' ? '스테이지 단어를 찾을 수 없습니다.' : 'Stage words not found.', 'error');
        return;
    }
    
    // Shuffle and select all questions for the stage
    const shuffled = [...stageQuestions].sort(() => Math.random() - 0.5);
    gameState.questions = shuffled;
    gameState.currentQuestion = 0;
    // Don't reset score and stage number - keep them for next stage
    // gameState.score = 0; // Keep score across stages
    gameState.correctCount = 0; // Reset correct count for new stage
    
    // Store current stage goal
    gameState.stageGoal = currentStage.goal || stageQuestions.length;
    
    loadQuestion();
    updateDisplay();
}

// Stop timer
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (autoNextTimeout) {
        clearTimeout(autoNextTimeout);
        autoNextTimeout = null;
    }
}

// Start timer
function startTimer() {
    stopTimer(); // Clear any existing timer
    timeLeft = 10;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            stopTimer();
            handleTimeUp();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        const oldTime = parseInt(timerElement.textContent) || 10;
        timerElement.textContent = timeLeft;
        
        // Trigger shake animation only when timer is 3 seconds or less
        if (timeLeft <= 3 && timeLeft < oldTime && timeLeft > 0) {
            triggerIconAnimation('timer-icon', 'timer-shake');
        }
        
        // Update visual warning states and icon animation
        const timerItem = timerElement.closest('.score-item-timer');
        const timerIcon = document.querySelector('.timer-icon');
        if (timerItem) {
            timerItem.classList.remove('warning', 'danger');
            if (timerIcon) {
                timerIcon.classList.remove('timer-shake');
            }
            if (timeLeft <= 3) {
                timerItem.classList.add('danger');
                // Keep shaking animation for 3 seconds or less
                if (timerIcon) {
                    timerIcon.classList.add('timer-shake');
                }
            } else if (timeLeft <= 5) {
                timerItem.classList.add('warning');
            }
        }
    }
}

// Handle time up
function handleTimeUp() {
    showMessage(t('timeUp'), 'error');
    playSound('incorrect');
    
    // Auto-select wrong answer
    if (gameMode === 'multiple') {
        // Find a wrong choice button and click it
        const choiceButtons = document.querySelectorAll('.choice-btn');
        const wrongButtons = Array.from(choiceButtons).filter(btn => 
            btn.textContent.trim() !== gameState.currentAnswer
        );
        if (wrongButtons.length > 0) {
            const randomWrongButton = wrongButtons[Math.floor(Math.random() * wrongButtons.length)];
            // Simulate click on wrong answer
            selectChoice(randomWrongButton.textContent.trim(), false);
        }
    } else {
        // Typing mode - mark as wrong
        const feedback = document.getElementById('feedback');
        feedback.textContent = t('wrongMsg', { word: gameState.currentAnswer });
        feedback.className = 'feedback incorrect';
        showMessage(t('wrongMsg2'), 'error');
        
        // Disable input
        const wordInput = document.getElementById('wordInput');
        const submitBtn = document.getElementById('submitBtn');
        if (wordInput) wordInput.disabled = true;
        if (submitBtn) submitBtn.disabled = true;
    }
    
    // Auto-advance to next question after 3 seconds (only if not already handled)
    if (!autoNextTimeout) {
        autoNextTimeout = setTimeout(() => {
            autoNextQuestion();
        }, 3000);
    }
}

// Auto-advance to next question
function autoNextQuestion() {
    // Check if stage goal is reached
    const stageGoal = gameState.stageGoal || gameState.questions.length;
    if (gameState.correctCount >= stageGoal) {
        // Stage clear - end game
        endGame();
        return;
    }
    
    gameState.currentQuestion++;
    if (gameState.currentQuestion >= gameState.questions.length) {
        endGame();
    } else {
        // Trigger question icon animation before updating display
        triggerIconAnimation('question-icon', 'question-flip');
        loadQuestion();
        updateDisplay();
    }
}

// Load current question
function loadQuestion() {
    if (gameState.currentQuestion >= gameState.questions.length) {
        endGame();
        return;
    }
    
    // Stop any existing timer
    stopTimer();
    
    const question = gameState.questions[gameState.currentQuestion];
    
    // 이모지가 없거나 "?"인 경우 자동으로 생성
    if (!question.emoji || question.emoji === '?' || question.emoji === '' || question.emoji === '❓') {
        const wordEn = typeof question.word === 'object' ? question.word.en : question.word;
        const wordKo = typeof question.word === 'object' ? question.word.ko : question.word;
        const hintEn = typeof question.hint === 'object' ? question.hint.en : question.hint;
        const hintKo = typeof question.hint === 'object' ? question.hint.ko : question.hint;
        
        question.emoji = generateEmoji(wordEn, hintEn);
        if (question.emoji === '❓') {
            question.emoji = generateEmoji(wordKo, hintKo);
        }
    }
    
    // Get word and hint for current language
    const word = typeof question.word === 'object' ? question.word[currentLanguage] : question.word;
    gameState.currentAnswer = word;
    gameState.hintShown = false;
    
    // Display picture
    const imageDisplay = document.getElementById('imageDisplay');
    if (question.image) {
        // Use image file if available (from images folder)
        const imagePath = question.image.startsWith('assets/images/') ? question.image : (question.image.startsWith('images/') ? `assets/${question.image}` : `assets/images/${question.image}`);
        imageDisplay.innerHTML = `<img src="${imagePath}" alt="${word}" class="game-image" onerror="this.parentElement.innerHTML='<div class=\\'emoji\\'>${question.emoji || generateEmoji(word)}</div>'">`;
    } else {
        // Use emoji as fallback (자동 생성된 이모지 사용)
        const emojiToDisplay = question.emoji || generateEmoji(word);
        imageDisplay.innerHTML = `<div class="emoji">${emojiToDisplay}</div>`;
    }
    
    // Clear feedback
    const feedback = document.getElementById('feedback');
    feedback.textContent = '';
    feedback.className = 'feedback empty';
    
    // Show hint automatically
    const hint = typeof question.hint === 'object' ? question.hint[currentLanguage] : question.hint;
    const hintArea = document.getElementById('hintArea');
    const hintText = document.getElementById('hintText');
    hintText.textContent = `${currentLanguage === 'ko' ? '💡 힌트' : '💡 Hint'}: ${hint}`;
    hintArea.style.display = 'block';
    gameState.hintShown = true; // Mark as shown (no score penalty)
    
    // Adjust font size to fit one line
    adjustHintFontSize();
    
    // Hide next button
    document.getElementById('nextBtn').style.display = 'none';
    
    // Start timer
    startTimer();
    
    // Load based on game mode
    if (gameMode === 'typing') {
        // Typing mode
        const wordInput = document.getElementById('wordInput');
        wordInput.value = '';
        wordInput.disabled = false;
        wordInput.focus();
        document.getElementById('submitBtn').disabled = false;
    } else {
        // Multiple choice mode
        const choices = generateMultipleChoice(word);
        const choiceButtons = document.getElementById('choiceButtons');
        choiceButtons.innerHTML = '';
        
        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice;
            btn.dataset.choice = choice;
            btn.addEventListener('click', () => selectChoice(choice));
            choiceButtons.appendChild(btn);
        });
    }
}

// Fireworks celebration effect
function celebrate() {
    if (typeof confetti !== 'undefined') {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            // Launch confetti from left
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            
            // Launch confetti from right
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    }
}

// Select choice (multiple choice mode)
function selectChoice(selectedWord, isUserAction = true) {
    // Stop timer if user manually selected
    if (isUserAction) {
        stopTimer();
    }
    
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextBtn');
    
    // Disable all choice buttons
    choiceButtons.forEach(btn => {
        btn.disabled = true;
    });
    
    // Check if answer is correct
    const isCorrect = selectedWord.toLowerCase() === gameState.currentAnswer.toLowerCase();
    
    // Mark buttons
    choiceButtons.forEach(btn => {
        if (btn.dataset.choice.toLowerCase() === gameState.currentAnswer.toLowerCase()) {
            btn.classList.add('correct');
        } else if (btn.dataset.choice === selectedWord && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Hide hint when showing feedback
    const hintArea = document.getElementById('hintArea');
    hintArea.style.display = 'none';
    
    if (isCorrect) {
        feedback.textContent = t('correctMsg');
        feedback.className = 'feedback correct';
        const oldScore = gameState.score;
        gameState.score += 10;
        gameState.correctCount++;
        // Trigger score icon animation only when score increases
        if (gameState.score > oldScore) {
            triggerIconAnimation('coin-icon', 'score-shake');
        }
        showMessage(t('pointsMsg', { points: 10 }), 'success');
        celebrate(); // Fireworks effect
        playSound('correct'); // Success sound
        // TTS: Speak the correct word
        speak(gameState.currentAnswer);
    } else {
        feedback.textContent = t('wrongMsg', { word: gameState.currentAnswer });
        feedback.className = 'feedback incorrect';
        showMessage(t('wrongMsg2'), 'error');
        playSound('incorrect'); // Failure sound
    }
    
    updateDisplay();
    
    // Adjust feedback font size to fit one line
    setTimeout(() => {
        adjustFeedbackFontSize();
    }, 0);
    
    // Auto-advance to next question after 3 seconds (both correct and incorrect)
    autoNextTimeout = setTimeout(() => {
        autoNextQuestion();
    }, 3000);
}

// Check answer (typing mode)
function checkAnswer() {
    // Stop timer
    stopTimer();
    
    const wordInput = document.getElementById('wordInput');
    const userAnswer = wordInput.value.trim();
    const feedback = document.getElementById('feedback');
    const submitBtn = document.getElementById('submitBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!userAnswer) {
        showMessage(t('enterWord'), 'error');
        return;
    }
    
    // Disable input and submit button
    wordInput.disabled = true;
    submitBtn.disabled = true;
    
    // Check if answer is correct (case-insensitive)
    const isCorrect = userAnswer.toLowerCase() === gameState.currentAnswer.toLowerCase();
    
    // Hide hint when showing feedback
    const hintArea = document.getElementById('hintArea');
    hintArea.style.display = 'none';
    
    if (isCorrect) {
        feedback.textContent = t('correctMsg');
        feedback.className = 'feedback correct';
        const oldScore = gameState.score;
        gameState.score += 10;
        gameState.correctCount++;
        // Trigger score icon animation only when score increases
        if (gameState.score > oldScore) {
            triggerIconAnimation('coin-icon', 'score-shake');
        }
        showMessage(t('pointsMsg', { points: 10 }), 'success');
        celebrate(); // Fireworks effect
        playSound('correct'); // Success sound
        // TTS: Speak the correct word
        speak(gameState.currentAnswer);
    } else {
        feedback.textContent = t('wrongMsg', { word: gameState.currentAnswer });
        feedback.className = 'feedback incorrect';
        showMessage(t('wrongMsg2'), 'error');
        playSound('incorrect'); // Failure sound
    }
    
    updateDisplay();
    
    // Adjust feedback font size to fit one line
    setTimeout(() => {
        adjustFeedbackFontSize();
    }, 0);
    
    // Auto-advance to next question after 3 seconds (both correct and incorrect)
    autoNextTimeout = setTimeout(() => {
        autoNextQuestion();
    }, 3000);
}

// Adjust text font size to fit one line (for both hint and feedback)
function adjustTextFontSize(element, container) {
    if (!element || !container) return;
    
    // Reset font size to initial (20px)
    element.style.fontSize = '';
    
    // Get initial font size in pixels (should be same for both hint and feedback: 20px)
    const initialFontSize = parseFloat(window.getComputedStyle(element).fontSize);
    
    // Maximum font size (same for both hint and feedback: 20px)
    const maxFontSize = 20;
    
    // Minimum font size (same for both hint and feedback: 15px)
    const minFontSize = 15;
    
    // Get container width (accounting for padding)
    const padding = 30; // 15px padding on each side
    const containerWidth = container.offsetWidth - padding;
    const textWidth = element.scrollWidth;
    
    // If text overflows, reduce font size proportionally
    if (textWidth > containerWidth) {
        const ratio = containerWidth / textWidth;
        const newFontSize = Math.max(
            Math.min(
                initialFontSize * ratio * 0.95, // 95% to add some margin
                maxFontSize // Maximum font size limit (20px)
            ),
            minFontSize // Minimum font size limit (15px)
        );
        element.style.fontSize = `${newFontSize}px`;
    } else {
        // If text fits, use maximum font size (20px)
        const newFontSize = Math.min(initialFontSize, maxFontSize);
        element.style.fontSize = `${newFontSize}px`;
    }
}

// Adjust hint font size to fit one line
function adjustHintFontSize() {
    const hintText = document.getElementById('hintText');
    const hintArea = document.getElementById('hintArea');
    adjustTextFontSize(hintText, hintArea);
}

// Adjust feedback font size to fit one line (same as hint)
function adjustFeedbackFontSize() {
    const feedback = document.getElementById('feedback');
    const feedbackContainer = feedback; // feedback element itself is the container
    
    // Correct message is short, so always use 20px
    if (feedback.classList.contains('correct')) {
        feedback.style.fontSize = '20px';
    } else {
        // Incorrect message might be long, so adjust if needed
        adjustTextFontSize(feedback, feedbackContainer);
    }
}

// Show hint (manual - now hints are shown automatically, but keep function for compatibility)
function showHint() {
    // Hint is now shown automatically, so this function just shows a message
    showMessage(currentLanguage === 'ko' ? '힌트는 자동으로 표시됩니다!' : 'Hint is shown automatically!', 'success');
}

// Next question
function nextQuestion() {
    // Stop any existing timers
    stopTimer();
    gameState.currentQuestion++;
    // Trigger question icon animation before updating display
    triggerIconAnimation('question-icon', 'question-flip');
    loadQuestion();
    updateDisplay();
}

// Trigger icon animation
function triggerIconAnimation(iconClass, animationClass) {
    const icon = document.querySelector(`.${iconClass}`);
    if (icon) {
        icon.classList.remove(animationClass);
        // Force reflow to restart animation
        void icon.offsetWidth;
        icon.classList.add(animationClass);
        // Remove animation class after animation completes
        setTimeout(() => {
            icon.classList.remove(animationClass);
        }, 600);
    }
}

// Update display
function updateDisplay() {
    const oldCorrectCount = parseInt(document.getElementById('correctCount').textContent) || 0;
    
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('stageNumber').textContent = gameState.stageNumber;
    
    // Display correct count with goal
    const stageGoal = gameState.stageGoal || gameState.questions.length;
    const correctCountElement = document.getElementById('correctCount');
    if (correctCountElement) {
        correctCountElement.textContent = `${gameState.correctCount} / ${stageGoal}`;
    }
    
    document.getElementById('questionNumber').textContent = `${gameState.currentQuestion + 1} / ${gameState.questions.length}`;
    
    // Trigger animations when values change
    // Score animation is triggered directly when score increases in selectChoice() and checkAnswer()
    if (gameState.correctCount > oldCorrectCount) {
        triggerIconAnimation('correct-icon', 'correct-jump');
    }
    // Question animation is triggered in nextQuestion() and autoNextQuestion()
    
    // Timer is updated separately via updateTimerDisplay()
}

// End game
function endGame() {
    // Stop timer
    stopTimer();
    const imageDisplay = document.getElementById('imageDisplay');
    const wordInput = document.getElementById('wordInput');
    const submitBtn = document.getElementById('submitBtn');
    const nextBtn = document.getElementById('nextBtn');
    const feedback = document.getElementById('feedback');
    const gameArea = document.getElementById('gameArea');
    const stageClearScreen = document.getElementById('stageClearScreen');
    
    // Disable game controls
    if (gameMode === 'typing') {
        wordInput.disabled = true;
        submitBtn.disabled = true;
    } else {
        // Disable all choice buttons
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.disabled = true;
        });
    }
    
    nextBtn.style.display = 'none';
    
    // Calculate accuracy
    const accuracy = gameState.questions.length > 0 
        ? Math.round((gameState.correctCount / gameState.questions.length) * 100) 
        : 0;
    
    // Check if stage goal is reached (goal 개수만큼 맞추면 클리어)
    const stageGoal = gameState.stageGoal || gameState.questions.length;
    const isStageClear = gameState.correctCount >= stageGoal;
    
    // Increment stage number if stage clear
    if (isStageClear) {
        gameState.stageNumber++;
    }
    
    // Show Stage Clear screen
    gameArea.style.display = 'none';
    stageClearScreen.style.display = 'flex';
    
    // Update Stage Clear screen content based on score
    if (isStageClear) {
        // Goal reached - Stage Clear!
        document.getElementById('stageClearTitle').textContent = t('stageClear');
    } else {
        // Goal not reached - Stage Again!
        document.getElementById('stageClearTitle').textContent = t('stageAgain');
    }
    
    // Update stage info
    const currentStageNum = isStageClear ? gameState.stageNumber - 1 : gameState.stageNumber;
    const stageInfoElement = document.getElementById('stageClearStageInfo');
    if (stageInfoElement) {
        stageInfoElement.textContent = `${t('stage')} ${currentStageNum}`;
    }
    
    // Update stats
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('finalCorrect').textContent = `${gameState.correctCount} / ${gameState.questions.length}`;
    document.getElementById('finalGoal').textContent = `${stageGoal}`;
    document.getElementById('finalAccuracy').textContent = `${accuracy}%`;
    
    // Update button text based on score
    const nextStageBtn = document.getElementById('stageClearNextStageBtn');
    if (nextStageBtn) {
        if (isStageClear) {
            nextStageBtn.textContent = t('nextStage');
        } else {
            nextStageBtn.textContent = t('tryAgain');
        }
    }
    
    // Celebrate with confetti only if stage clear
    if (isStageClear) {
        celebrate();
        playSound('correct');
    } else {
        playSound('incorrect');
    }
}

// Show message
function showMessage(text, type) {
    // Remove existing message
    const existing = document.querySelector('.message');
    if (existing) {
        existing.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Show start screen
function showStartScreen() {
    const startScreen = document.getElementById('startScreen');
    const gameArea = document.getElementById('gameArea');
    const stageClearScreen = document.getElementById('stageClearScreen');
    
    if (startScreen) {
        startScreen.style.display = 'flex';
    }
    if (gameArea) {
        gameArea.style.display = 'none';
    }
    if (stageClearScreen) {
        stageClearScreen.style.display = 'none';
    }
    
    // Stop any running timers
    stopTimer();
}

// Show game area (back to game)
function showGameArea() {
    const startScreen = document.getElementById('startScreen');
    const gameArea = document.getElementById('gameArea');
    const stageClearScreen = document.getElementById('stageClearScreen');
    const optionsModal = document.getElementById('optionsModal');
    
    if (startScreen) {
        startScreen.style.display = 'none';
    }
    if (gameArea) {
        gameArea.style.display = 'block';
    }
    if (stageClearScreen) {
        stageClearScreen.style.display = 'none';
    }
    if (optionsModal) {
        optionsModal.style.display = 'none';
    }
}

// Exit game
function exitGame() {
    if (confirm(currentLanguage === 'ko' ? '게임을 종료하시겠습니까?' : 'Are you sure you want to exit the game?')) {
        playSound('click');
        // Try to close the window
        window.close();
        
        // Check if window.close() worked after a short delay
        // (Most browsers block window.close() unless the window was opened by JavaScript)
        setTimeout(() => {
            // If window is still open, show message
            if (!document.hidden) {
                alert(currentLanguage === 'ko' ? '게임을 종료하려면 브라우저 탭을 닫아주세요.' : 'Please close the browser tab to exit the game.');
            }
        }, 100);
    }
}

// Event listeners
document.getElementById('submitBtn').addEventListener('click', checkAnswer);
document.getElementById('nextBtn').addEventListener('click', nextQuestion);

// Start screen event listeners
document.getElementById('startGameBtn').addEventListener('click', () => {
    // Reset stage number and score for new game
    gameState.stageNumber = 1;
    gameState.score = 0;
    initGame();
    playSound('click');
});

// Show options modal
function showOptionsModal() {
    const optionsModal = document.getElementById('optionsModal');
    const gameArea = document.getElementById('gameArea');
    
    if (optionsModal) {
        // Pause game if game area is visible (game is in progress)
        if (gameArea && gameArea.style.display !== 'none' && gameArea.style.display !== '') {
            stopTimer(); // Pause the timer
        }
        
        optionsModal.style.display = 'flex';
        // Update active states in modal
        updateModalActiveStates();
    }
}

// Hide options modal
function hideOptionsModal() {
    const optionsModal = document.getElementById('optionsModal');
    const gameArea = document.getElementById('gameArea');
    
    if (optionsModal) {
        optionsModal.style.display = 'none';
        
        // Resume game if game area is visible (game is in progress)
        if (gameArea && gameArea.style.display !== 'none' && gameArea.style.display !== '') {
            // Check if there's a current question and timer should be running
            if (gameState.questions.length > 0 && gameState.currentQuestion < gameState.questions.length) {
                const feedback = document.getElementById('feedback');
                const nextBtn = document.getElementById('nextBtn');
                // Only restart timer if question is active (not showing feedback)
                if (feedback && !feedback.textContent && nextBtn && nextBtn.style.display === 'none') {
                    startTimer(); // Resume the timer
                }
            }
        }
    }
}

// Close menu panel
function closeMenuPanel() {
    const menuPanel = document.getElementById('menuPanel');
    const settingsBtn = document.getElementById('settingsBtn');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    
    if (menuPanel) {
        menuPanel.classList.remove('active');
    }
    if (settingsBtn) {
        settingsBtn.classList.remove('active');
    }
    if (hamburgerBtn) {
        hamburgerBtn.classList.remove('active');
    }
}

// Update active states in modal
function updateModalActiveStates() {
    // Update game mode active state
    document.querySelectorAll('#optionsModal .menu-option[data-mode]').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.mode === gameMode) {
            opt.classList.add('active');
        }
    });
    
    // Update language active state
    document.querySelectorAll('#optionsModal .menu-option[data-lang]').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.lang === currentLanguage) {
            opt.classList.add('active');
        }
    });
    
    // Update sound button (use updateSoundButtonIcon for consistency)
    updateSoundButtonIcon();
}

document.getElementById('startScreenOptionsBtn').addEventListener('click', () => {
    showOptionsModal();
    playSound('click');
});

// Close options modal
document.getElementById('optionsModalClose').addEventListener('click', () => {
    hideOptionsModal();
    playSound('click');
});

// Back to game button
document.getElementById('modalBackToGameBtn').addEventListener('click', () => {
    hideOptionsModal();
    showGameArea();
    playSound('click');
});

// Back to start screen button
document.getElementById('modalBackToStartBtn').addEventListener('click', () => {
    hideOptionsModal();
    showStartScreen();
    playSound('click');
});

// Close modal when clicking outside
document.getElementById('optionsModal').addEventListener('click', (e) => {
    if (e.target.id === 'optionsModal') {
        hideOptionsModal();
    }
});

document.getElementById('exitGameBtn').addEventListener('click', () => {
    exitGame();
    playSound('click');
});
document.getElementById('stageClearNextStageBtn').addEventListener('click', () => {
    document.getElementById('stageClearScreen').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    // Stage number is already incremented in endGame() if perfect score
    // For "Try Again", stage number stays the same
    initGame();
});

// Settings menu toggle (Desktop)
const settingsBtn = document.getElementById('settingsBtn');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const menuPanel = document.getElementById('menuPanel');
const menuPanelClose = document.getElementById('menuPanelClose');

// Menu panel close button
if (menuPanelClose) {
    menuPanelClose.addEventListener('click', () => {
        closeMenuPanel();
        playSound('click');
    });
}

// Desktop settings button - open options modal
if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
        // Close menu panel if open
        closeMenuPanel();
        // Open options modal
        showOptionsModal();
        playSound('click');
    });
}

// Hamburger menu toggle (Mobile) - open options modal
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        // Close menu panel if open
        closeMenuPanel();
        // Open options modal
        showOptionsModal();
        playSound('click');
    });
}

// Close menu when clicking outside
if (menuPanel) {
    document.addEventListener('click', (e) => {
        if (menuPanel.classList.contains('active')) {
            const isClickInsideMenu = menuPanel.contains(e.target);
            const isClickOnSettingsBtn = settingsBtn && settingsBtn.contains(e.target);
            const isClickOnHamburgerBtn = hamburgerBtn && hamburgerBtn.contains(e.target);
            const isClickOnStartScreenOptionsBtn = document.getElementById('startScreenOptionsBtn') && document.getElementById('startScreenOptionsBtn').contains(e.target);
            
            if (!isClickInsideMenu && !isClickOnSettingsBtn && !isClickOnHamburgerBtn && !isClickOnStartScreenOptionsBtn) {
                closeMenuPanel();
            }
        }
    });
}

// Menu panel options (in-game menu)
document.querySelectorAll('#menuPanel .menu-option[data-mode]').forEach(option => {
    option.addEventListener('click', (e) => {
        const mode = e.target.dataset.mode;
        changeGameMode(mode);
        // Close menu
        closeMenuPanel();
        playSound('click');
    });
});

document.querySelectorAll('#menuPanel .menu-option[data-lang]').forEach(option => {
    option.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        changeLanguage(lang);
        // Close menu
        closeMenuPanel();
        playSound('click');
    });
});

// Options modal options (start screen)
document.querySelectorAll('#optionsModal .menu-option[data-mode]').forEach(option => {
    option.addEventListener('click', (e) => {
        const mode = e.target.dataset.mode;
        changeGameMode(mode);
        updateModalActiveStates();
        playSound('click');
    });
});

document.querySelectorAll('#optionsModal .menu-option[data-lang]').forEach(option => {
    option.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        changeLanguage(lang);
        updateModalActiveStates();
        playSound('click');
    });
});

// Modal sound button
const modalSoundBtn = document.getElementById('modalSoundBtn');
if (modalSoundBtn) {
    modalSoundBtn.addEventListener('click', () => {
        toggleSound();
        updateModalActiveStates();
        playSound('click');
    });
}

// Desktop dropdowns removed - using menu panel now


// Sound toggle button (menu)
const menuSoundBtn = document.getElementById('menuSoundBtn');
if (menuSoundBtn) {
    menuSoundBtn.addEventListener('click', () => {
        toggleSound();
        // Update menu button icon
        updateSoundButtonIcon();
        playSound('click');
    });
}

// Enter key support
document.getElementById('wordInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const submitBtn = document.getElementById('submitBtn');
        if (!submitBtn.disabled) {
            checkAnswer();
        } else {
            const nextBtn = document.getElementById('nextBtn');
            if (nextBtn.style.display !== 'none') {
                nextQuestion();
            }
        }
    }
});

// Initialize on load
Promise.all([loadWordsDatabase(), loadStagesDatabase()]).then(() => {
    // Initialize game mode UI (default: multiple choice)
    changeGameMode('multiple');
    updateUILanguage();
    changeLanguage(currentLanguage); // Initialize active states in menu
    // Show start screen instead of starting game immediately
    showStartScreen();
    // Initialize modal active states
    updateModalActiveStates();
}).catch(error => {
    console.error('Failed to initialize game:', error);
    showMessage(t('loadError'), 'error');
});

