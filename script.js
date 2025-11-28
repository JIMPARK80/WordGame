// Game state
let gameState = {
    currentQuestion: 0,
    score: 0,
    correctCount: 0,
    questions: [],
    currentAnswer: '',
    hintShown: false
};

// Current language (default: English)
let currentLanguage = 'en';

// Game mode (default: multiple choice)
let gameMode = 'multiple'; // 'typing' or 'multiple'

// Picture-words database (loaded from JSON)
let pictureDatabase = [];

// Sound effects
let soundEnabled = true;

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
    const soundBtn = document.getElementById('soundBtn');
    const menuSoundBtn = document.getElementById('menuSoundBtn');
    const icon = soundEnabled ? '🔊' : '🔇';
    const title = soundEnabled 
        ? (currentLanguage === 'ko' ? '사운드 끄기' : 'Turn Sound Off') 
        : (currentLanguage === 'ko' ? '사운드 켜기' : 'Turn Sound On');
    
    if (soundBtn) {
        soundBtn.textContent = icon;
        soundBtn.title = title;
    }
    
    if (menuSoundBtn) {
        const iconElement = menuSoundBtn.querySelector('.menu-option-icon');
        if (iconElement) {
            iconElement.textContent = icon;
        }
        menuSoundBtn.classList.toggle('active', !soundEnabled);
    }
}

// Language translations
const translations = {
    ko: {
        gameTitle: '🎨 그림 맞추기 게임',
        score: '점수',
        correct: '정답',
        question: '문제',
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
        accuracy: '정확도',
        nextStage: '다음 스테이지',
        settings: '설정',
        sound: '사운드'
    },
    en: {
        gameTitle: '🎨 Picture Word Game',
        score: 'Score',
        correct: 'Correct',
        question: 'Question',
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
        accuracy: 'Accuracy',
        nextStage: 'Next Stage',
        settings: 'Settings',
        sound: 'Sound'
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
    
    // Update game mode button text (desktop)
    const gameModeBtn = document.getElementById('gameModeBtn');
    if (gameModeBtn) {
        const modeNames = {
            'multiple': { 'en': 'Multiple Choice', 'ko': '객관식' },
            'typing': { 'en': 'Typing', 'ko': '타이핑' }
        };
        const currentModeName = modeNames[gameMode][currentLanguage];
        gameModeBtn.textContent = currentLanguage === 'ko' ? `게임 모드: ${currentModeName}` : `Game Mode: ${currentModeName}`;
    }
    
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
    
    // Update score labels
    document.querySelectorAll('.score-item .label').forEach((el, index) => {
        const keys = ['score', 'correct', 'question'];
        if (keys[index]) {
            el.textContent = t(keys[index]);
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
    
    // Update language button text (desktop)
    const languageBtn = document.getElementById('languageBtn');
    if (languageBtn) {
        const langNames = {
            'en': 'English',
            'ko': '한국어'
        };
        languageBtn.textContent = `Language: ${langNames[lang]}`;
    }
    
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
    
    // Update mode button text (desktop)
    const gameModeBtn = document.getElementById('gameModeBtn');
    if (gameModeBtn) {
        const modeNames = {
            'multiple': 'Multiple Choice',
            'typing': 'Typing'
        };
        const modeNamesKo = {
            'multiple': '객관식',
            'typing': '타이핑'
        };
        const displayName = currentLanguage === 'ko' ? modeNamesKo[mode] : modeNames[mode];
        gameModeBtn.textContent = currentLanguage === 'ko' ? `게임 모드: ${displayName}` : `Game Mode: ${displayName}`;
    }
    
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
        return pictureDatabase;
    } catch (error) {
        console.error('Error loading words database:', error);
        showMessage(t('loadError'), 'error');
        return [];
    }
}

// Initialize game
async function initGame() {
    // Load words database if not loaded
    if (pictureDatabase.length === 0) {
        await loadWordsDatabase();
    }
    
    if (pictureDatabase.length === 0) {
        showMessage(t('noData'), 'error');
        return;
    }
    
    // Hide stage clear screen if visible
    const stageClearScreen = document.getElementById('stageClearScreen');
    const gameArea = document.getElementById('gameArea');
    if (stageClearScreen) {
        stageClearScreen.style.display = 'none';
    }
    if (gameArea) {
        gameArea.style.display = 'block';
    }
    
    // Shuffle and select 10 random questions
    const shuffled = [...pictureDatabase].sort(() => Math.random() - 0.5);
    gameState.questions = shuffled.slice(0, 10);
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.correctCount = 0;
    
    loadQuestion();
    updateDisplay();
}

// Load current question
function loadQuestion() {
    if (gameState.currentQuestion >= gameState.questions.length) {
        endGame();
        return;
    }
    
    const question = gameState.questions[gameState.currentQuestion];
    // Get word and hint for current language
    const word = typeof question.word === 'object' ? question.word[currentLanguage] : question.word;
    gameState.currentAnswer = word;
    gameState.hintShown = false;
    
    // Display picture
    const imageDisplay = document.getElementById('imageDisplay');
    if (question.image) {
        // Use image file if available (from images folder)
        const imagePath = question.image.startsWith('images/') ? question.image : `images/${question.image}`;
        imageDisplay.innerHTML = `<img src="${imagePath}" alt="${word}" class="game-image" onerror="this.parentElement.innerHTML='<div class=\\'emoji\\'>${question.emoji}</div>'">`;
    } else {
        // Use emoji as fallback
        imageDisplay.innerHTML = `<div class="emoji">${question.emoji}</div>`;
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
    
    // Hide next button
    document.getElementById('nextBtn').style.display = 'none';
    
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
function selectChoice(selectedWord) {
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
    
    if (isCorrect) {
        feedback.textContent = t('correctMsg');
        feedback.className = 'feedback correct';
        gameState.score += 10;
        gameState.correctCount++;
        showMessage(t('pointsMsg', { points: 10 }), 'success');
        celebrate(); // Fireworks effect
        playSound('correct'); // Success sound
    } else {
        feedback.textContent = t('wrongMsg', { word: gameState.currentAnswer });
        feedback.className = 'feedback incorrect';
        showMessage(t('wrongMsg2'), 'error');
        playSound('incorrect'); // Failure sound
    }
    
    updateDisplay();
    nextBtn.style.display = 'block';
}

// Check answer (typing mode)
function checkAnswer() {
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
    
    if (isCorrect) {
        feedback.textContent = t('correctMsg');
        feedback.className = 'feedback correct';
        gameState.score += 10;
        gameState.correctCount++;
        showMessage(t('pointsMsg', { points: 10 }), 'success');
        celebrate(); // Fireworks effect
        playSound('correct'); // Success sound
    } else {
        feedback.textContent = t('wrongMsg', { word: gameState.currentAnswer });
        feedback.className = 'feedback incorrect';
        showMessage(t('wrongMsg2'), 'error');
        playSound('incorrect'); // Failure sound
    }
    
    updateDisplay();
    nextBtn.style.display = 'block';
}

// Show hint (manual - now hints are shown automatically, but keep function for compatibility)
function showHint() {
    // Hint is now shown automatically, so this function just shows a message
    showMessage(currentLanguage === 'ko' ? '힌트는 자동으로 표시됩니다!' : 'Hint is shown automatically!', 'success');
}

// Next question
function nextQuestion() {
    gameState.currentQuestion++;
    loadQuestion();
    updateDisplay();
}

// Update display
function updateDisplay() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('correctCount').textContent = gameState.correctCount;
    document.getElementById('questionNumber').textContent = `${gameState.currentQuestion + 1} / ${gameState.questions.length}`;
}

// End game
function endGame() {
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
    
    // Show Stage Clear screen
    gameArea.style.display = 'none';
    stageClearScreen.style.display = 'flex';
    
    // Update Stage Clear screen content
    document.getElementById('stageClearTitle').textContent = t('stageClear');
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('finalCorrect').textContent = `${gameState.correctCount} / ${gameState.questions.length}`;
    document.getElementById('finalAccuracy').textContent = `${accuracy}%`;
    
    // Update accuracy label
    document.querySelector('.stat-item:last-child .stat-label').textContent = t('accuracy');
    
    // Update Next Stage button text
    const nextStageBtn = document.getElementById('stageClearNextStageBtn');
    if (nextStageBtn) {
        nextStageBtn.textContent = t('nextStage');
    }
    
    // Celebrate with confetti
    celebrate();
    
    // Play success sound
    playSound('correct');
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

// Event listeners
document.getElementById('submitBtn').addEventListener('click', checkAnswer);
document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('newGameBtn').addEventListener('click', initGame);
document.getElementById('stageClearNextStageBtn').addEventListener('click', () => {
    document.getElementById('stageClearScreen').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    initGame();
});

// Hamburger menu toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const menuPanel = document.getElementById('menuPanel');

if (hamburgerBtn && menuPanel) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        menuPanel.classList.toggle('active');
        playSound('click');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuPanel.classList.contains('active') && 
            !menuPanel.contains(e.target) && 
            !hamburgerBtn.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            menuPanel.classList.remove('active');
        }
    });
}

// Menu panel options
document.querySelectorAll('.menu-option[data-mode]').forEach(option => {
    option.addEventListener('click', (e) => {
        const mode = e.target.dataset.mode;
        changeGameMode(mode);
        // Close menu
        if (hamburgerBtn && menuPanel) {
            hamburgerBtn.classList.remove('active');
            menuPanel.classList.remove('active');
        }
        playSound('click');
    });
});

document.querySelectorAll('.menu-option[data-lang]').forEach(option => {
    option.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        changeLanguage(lang);
        // Close menu
        if (hamburgerBtn && menuPanel) {
            hamburgerBtn.classList.remove('active');
            menuPanel.classList.remove('active');
        }
        playSound('click');
    });
});

// Language selector (desktop)
const languageBtn = document.getElementById('languageBtn');
if (languageBtn) {
    languageBtn.addEventListener('click', toggleLanguageDropdown);
}

// Language options
document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        changeLanguage(lang);
        playSound('click');
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    const languageSelector = document.querySelector('.language-selector');
    const languageDropdown = document.getElementById('languageDropdown');
    if (!languageSelector.contains(e.target) && languageDropdown.style.display !== 'none') {
        languageDropdown.style.display = 'none';
    }
    
    const gameModeSelector = document.querySelector('.game-mode-selector');
    const modeDropdown = document.getElementById('modeDropdown');
    if (!gameModeSelector.contains(e.target) && modeDropdown.style.display !== 'none') {
        modeDropdown.style.display = 'none';
    }
});

// Game mode selector
document.getElementById('gameModeBtn').addEventListener('click', toggleGameModeDropdown);

// Game mode options
document.querySelectorAll('.mode-option').forEach(option => {
    option.addEventListener('click', (e) => {
        const mode = e.target.dataset.mode;
        changeGameMode(mode);
        playSound('click');
    });
});


// Sound toggle button (desktop)
const soundBtn = document.getElementById('soundBtn');
if (soundBtn) {
    soundBtn.addEventListener('click', toggleSound);
}

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
loadWordsDatabase().then(() => {
    // Initialize game mode UI (default: multiple choice)
    changeGameMode('multiple');
    updateUILanguage();
    changeLanguage(currentLanguage); // Initialize active states in menu
    initGame();
}).catch(error => {
    console.error('Failed to initialize game:', error);
    showMessage(t('loadError'), 'error');
});
