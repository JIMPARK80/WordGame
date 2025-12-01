# 이미지 및 이모지 전략 / Image & Emoji Strategy

## 📋 개요

AI로 제작한 이미지를 직접 연결하고, 이미지가 없는 경우 상업 사용 가능한 이모지로 임시 대체하는 전략입니다.

---

## 🎯 현재 시스템

### 이미지 우선순위
1. **AI 제작 이미지** (있을 경우)
   - 경로: `assets/images/[filename].png`
   - `words.json`의 `image` 필드에 파일명 지정
   - 예: `"image": "cat.png"`

2. **이모지 대체** (이미지가 없거나 로드 실패 시)
   - `words.json`의 `emoji` 필드 사용
   - 없으면 `generateEmoji()` 함수로 자동 생성
   - 현재: 브라우저 기본 이모지 (플랫폼별 디자인)

### 코드 동작 방식
```javascript
// script.js의 loadQuestion() 함수
if (question.image) {
    // 이미지 파일 사용
    const imagePath = `assets/images/${question.image}`;
    // 로드 실패 시 onerror로 이모지 대체
} else {
    // 이모지 사용
    const emojiToDisplay = question.emoji || generateEmoji(word);
}
```

---

## ✅ 권장 개선: Twemoji 사용

### Twemoji란?
- Twitter(X)에서 제공하는 오픈 소스 이모지 세트
- **상업적 사용 명시적 허용** (Apache 2.0 라이선스)
- 모든 브라우저에서 동일한 디자인
- CDN으로 무료 사용 가능

### 적용 방법

#### 1. HTML에 Twemoji CDN 추가
```html
<!-- index.html의 <head>에 추가 -->
<script src="https://cdn.jsdelivr.net/npm/twemoji@latest/dist/twemoji.min.js" crossorigin="anonymous"></script>
```

#### 2. 이모지 렌더링 함수 추가
```javascript
// script.js에 추가
function renderTwemoji(emoji) {
    if (typeof twemoji !== 'undefined') {
        return twemoji.parse(emoji, {
            folder: 'svg',
            ext: '.svg',
            size: '72x72'
        });
    }
    // Twemoji가 로드되지 않으면 기본 이모지 사용
    return emoji;
}
```

#### 3. loadQuestion() 함수 수정
```javascript
// 이미지가 없을 때 Twemoji 사용
const emojiToDisplay = question.emoji || generateEmoji(word);
imageDisplay.innerHTML = `<div class="emoji">${renderTwemoji(emojiToDisplay)}</div>`;
```

---

## 📁 이미지 파일 구조

### 현재 구조
```
WordGame/
├── assets/
│   └── images/
│       ├── house.png
│       ├── school.png
│       ├── open.png
│       ├── close.png
│       └── ...
├── words.json
└── ...
```

### 권장 구조 (AI 이미지 추가 시)
```
WordGame/
├── assets/
│   └── images/
│       ├── nouns/          # 명사 이미지
│       │   ├── cat.png
│       │   ├── dog.png
│       │   └── ...
│       ├── verbs/          # 동사 이미지
│       │   ├── run.png
│       │   ├── jump.png
│       │   └── ...
│       └── adjectives/     # 형용사 이미지
│           ├── big.png
│           ├── small.png
│           └── ...
```

---

## 🔄 마이그레이션 계획

### Phase 1: 현재 상태 유지
- ✅ 이미지 있으면 이미지 사용
- ✅ 이미지 없으면 브라우저 기본 이모지 사용
- ✅ 이미지 로드 실패 시 이모지로 대체

### Phase 2: Twemoji 적용 (권장)
- Twemoji CDN 추가
- 이모지 렌더링 함수 추가
- 모든 이모지를 Twemoji로 통일

### Phase 3: AI 이미지 추가
- AI로 제작한 이미지를 `assets/images/`에 추가
- `words.json`의 `image` 필드 업데이트
- 이미지가 있는 단어는 이미지 사용
- 이미지가 없는 단어는 Twemoji 사용

---

## 📊 현재 이미지 연결 현황

### 이미지 연결 완료 (8개)
- open.png, close.png
- eat.png, hungry.png
- funny.png, jam.png
- garden.png, cold.png

### 이모지 사용 중 (263개)
- 나머지 모든 단어는 이모지 사용
- 브라우저 기본 이모지 렌더링

---

## ✅ 이미지 교체 필요 항목 (Need to Change Image)

이모지가 애매하거나 이해가 어려워 이미지로 교체해야 하는 항목입니다.

### 장소 (Places) - 3개
- floor (바닥)
- kitchen (부엌)
- garden (정원)

### 자연 (Nature) - 3개
- wind (바람)
- wave (파도)
- river (강)

### 동사 (Verbs) - 3개
- clean (청소하다)
- cry (울다)
- build (만들다)

### 형용사 (Adjectives) - 12개
- big (큰)
- small (작은)
- tall (키 큰)
- long (긴)
- cool (시원한)
- happy (행복한)
- sad (슬픈)
- tired (피곤한)
- cute (귀여운)
- bright (밝은)
- dark (어두운)

### 물건/도구 (Objects) - 4개
- broom (빗자루)
- lightbulb (전구)
- cup (컵)
- plate (접시)

### 직업 (Professions) - 4개
- chef (요리사)
- pilot (조종사)
- painter (화가)
- singer (가수)

### 기타 (Others) - 2개
- milk (우유)
- drink (음료수)

**총 이미지 교체 필요: 31개**

---

## ⚖️ 라이선스 정보

### Twemoji
- **라이선스**: Apache 2.0
- **상업적 사용**: ✅ 허용
- **수정**: ✅ 허용
- **재배포**: ✅ 허용
- **출처**: https://github.com/twitter/twemoji

### AI 제작 이미지
- 제작자가 소유권 보유
- 상업적 사용 가능
- 자유롭게 사용 가능

---

## 🎯 최종 목표

1. **AI 이미지**: 주요 단어에 AI 제작 이미지 연결
2. **Twemoji**: 이미지가 없는 단어는 Twemoji 사용
3. **일관성**: 모든 브라우저에서 동일한 디자인
4. **상업적 안전성**: 모든 리소스가 상업적 사용 가능

---

**마지막 업데이트**: 2025년 12월 1일

