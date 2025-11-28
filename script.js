// Game state
let gameState = {
    currentQuestion: 0,
    score: 0,
    correctCount: 0,
    questions: [],
    currentAnswer: '',
    hintShown: false
};

// Current language (default: Korean)
let currentLanguage = 'ko';

// Game mode (default: typing)
let gameMode = 'typing'; // 'typing' or 'multiple'

// Picture-words database (loaded from JSON)
let pictureDatabase = [];

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
        multipleMode: '객관식'
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
        multipleMode: 'Multiple Choice'
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
    
    // Update score labels
    document.querySelectorAll('.score-item .label').forEach((el, index) => {
        const keys = ['score', 'correct', 'question'];
        if (keys[index]) {
            el.textContent = t(keys[index]);
        }
    });
}

// Change language
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update UI
    updateUILanguage();
    
    // Reload current question with new language
    if (gameState.questions.length > 0) {
        loadQuestion();
    }
}

// Change game mode
function changeGameMode(mode) {
    gameMode = mode;
    
    // Update mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
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
        // Use image file if available
        imageDisplay.innerHTML = `<img src="${question.image}" alt="${word}" class="game-image">`;
    } else {
        // Use emoji as fallback
        imageDisplay.innerHTML = `<div class="emoji">${question.emoji}</div>`;
    }
    
    // Clear feedback
    const feedback = document.getElementById('feedback');
    feedback.textContent = '';
    feedback.className = 'feedback empty';
    
    // Hide hint
    document.getElementById('hintArea').style.display = 'none';
    
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
    } else {
        feedback.textContent = t('wrongMsg', { word: gameState.currentAnswer });
        feedback.className = 'feedback incorrect';
        showMessage(t('wrongMsg2'), 'error');
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
    } else {
        feedback.textContent = t('wrongMsg', { word: gameState.currentAnswer });
        feedback.className = 'feedback incorrect';
        showMessage(t('wrongMsg2'), 'error');
    }
    
    updateDisplay();
    nextBtn.style.display = 'block';
}

// Show hint
function showHint() {
    if (gameState.hintShown) {
        showMessage(t('hintAlreadyShown'), 'error');
        return;
    }
    
    const question = gameState.questions[gameState.currentQuestion];
    const hintArea = document.getElementById('hintArea');
    const hintText = document.getElementById('hintText');
    
    // Get hint for current language
    const hint = typeof question.hint === 'object' ? question.hint[currentLanguage] : question.hint;
    hintText.textContent = `💡 ${currentLanguage === 'ko' ? '힌트' : 'Hint'}: ${hint}`;
    hintArea.style.display = 'block';
    gameState.hintShown = true;
    
    // Reduce score for using hint
    if (gameState.score > 0) {
        gameState.score = Math.max(0, gameState.score - 2);
        updateDisplay();
    }
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
    const hintBtn = document.getElementById('hintBtn');
    const feedback = document.getElementById('feedback');
    
    imageDisplay.innerHTML = '<div class="emoji">🎊</div>';
    
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
    hintBtn.disabled = true;
    
    feedback.textContent = t('gameOver', { 
        score: gameState.score, 
        correct: gameState.correctCount, 
        total: gameState.questions.length 
    });
    feedback.className = 'feedback correct';
    
    showMessage(t('gameComplete', { score: gameState.score }), 'success');
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
document.getElementById('hintBtn').addEventListener('click', showHint);
document.getElementById('newGameBtn').addEventListener('click', initGame);

// Language selector
document.getElementById('langKo').addEventListener('click', () => changeLanguage('ko'));
document.getElementById('langEn').addEventListener('click', () => changeLanguage('en'));

// Game mode selector
document.getElementById('modeTyping').addEventListener('click', () => changeGameMode('typing'));
document.getElementById('modeMultiple').addEventListener('click', () => changeGameMode('multiple'));

// Game mode selector
document.getElementById('modeTyping').addEventListener('click', () => changeGameMode('typing'));
document.getElementById('modeMultiple').addEventListener('click', () => changeGameMode('multiple'));

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
    updateUILanguage();
    // Initialize game mode UI
    changeGameMode('typing');
    initGame();
}).catch(error => {
    console.error('Failed to initialize game:', error);
    showMessage(t('loadError'), 'error');
});
