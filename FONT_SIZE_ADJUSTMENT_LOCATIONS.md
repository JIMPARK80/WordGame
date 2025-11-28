# 폰트 크기 조절 위치 / Font Size Adjustment Locations

## 1. CSS 초기 폰트 크기 설정 / CSS Initial Font Size

### 힌트 영역 (Hint Area)
**파일:** `style.css`
**위치:** Line 771
```css
.hint-text {
    font-size: 1.5em;  /* 초기 폰트 크기 */
    ...
}
```

### 피드백 영역 (Feedback Area)
**파일:** `style.css`
**위치:** Line 724
```css
.feedback {
    font-size: 1.5em;  /* 초기 폰트 크기 */
    ...
}
```

### 모바일 (Mobile - max-width: 600px)
**파일:** `style.css`
**위치:** 
- 힌트: Line 1287 - `font-size: 1.5em`
- 피드백: Line 1354 - `font-size: 1.5em`

---

## 2. JavaScript 자동 조정 함수 / JavaScript Auto-Adjustment Functions

### 공통 함수 (Common Function)
**파일:** `script.js`
**위치:** Line 936-956
```javascript
function adjustTextFontSize(element, container) {
    // 초기 폰트 크기 리셋 (1.5em)
    element.style.fontSize = '';
    
    // 초기 폰트 크기 가져오기 (픽셀 단위)
    const initialFontSize = parseFloat(window.getComputedStyle(element).fontSize);
    
    // 컨테이너 너비 계산 (패딩 제외)
    const padding = 30; // 15px padding on each side
    const containerWidth = container.offsetWidth - padding;
    const textWidth = element.scrollWidth;
    
    // 텍스트가 넘치면 폰트 크기 비례 축소
    if (textWidth > containerWidth) {
        const ratio = containerWidth / textWidth;
        const newFontSize = initialFontSize * ratio * 0.95; // 95% 마진
        element.style.fontSize = `${newFontSize}px`;  // ← 여기서 폰트 크기 조절!
    }
}
```

### 힌트 폰트 크기 조절
**파일:** `script.js`
**위치:** Line 959-963
```javascript
function adjustHintFontSize() {
    const hintText = document.getElementById('hintText');
    const hintArea = document.getElementById('hintArea');
    adjustTextFontSize(hintText, hintArea);  // ← 공통 함수 호출
}
```

### 피드백 폰트 크기 조절
**파일:** `script.js`
**위치:** Line 966-970
```javascript
function adjustFeedbackFontSize() {
    const feedback = document.getElementById('feedback');
    const feedbackContainer = feedback;
    adjustTextFontSize(feedback, feedbackContainer);  // ← 공통 함수 호출
}
```

---

## 3. 호출 위치 / Call Locations

### 힌트 자동 조절
**파일:** `script.js`
**위치:** Line 750 (loadQuestion 함수 내)
```javascript
hintArea.style.display = 'block';
adjustHintFontSize();  // ← 힌트 표시 시 자동 조절
```

### 피드백 자동 조절
**파일:** `script.js`
**위치:**
1. **객관식 모드** - Line 871 (selectChoice 함수 내)
   ```javascript
   setTimeout(() => {
       adjustFeedbackFontSize();  // ← 피드백 표시 시 자동 조절
   }, 0);
   ```

2. **타이핑 모드** - Line 926 (checkAnswer 함수 내)
   ```javascript
   setTimeout(() => {
       adjustFeedbackFontSize();  // ← 피드백 표시 시 자동 조절
   }, 0);
   ```

---

## 4. 폰트 크기 조절 로직 / Font Size Adjustment Logic

### 계산 방식
1. **초기 크기:** CSS에서 설정한 `1.5em` (약 24px, 부모 폰트 크기에 따라 다름)
2. **컨테이너 너비:** 요소 너비 - 패딩(30px)
3. **텍스트 너비:** 실제 텍스트가 차지하는 너비
4. **비율 계산:** `containerWidth / textWidth`
5. **새 폰트 크기:** `initialFontSize * ratio * 0.95` (95% 마진 적용)

### 예시
- 초기 폰트: 24px
- 컨테이너 너비: 300px
- 텍스트 너비: 400px
- 비율: 300 / 400 = 0.75
- 새 폰트: 24 * 0.75 * 0.95 = **17.1px**

---

## 5. 수정 방법 / How to Modify

### 초기 폰트 크기 변경
**파일:** `style.css`
- `.hint-text { font-size: 1.5em; }` → 원하는 크기로 변경
- `.feedback { font-size: 1.5em; }` → 원하는 크기로 변경

### 자동 조절 비율 변경
**파일:** `script.js`
- Line 953: `const newFontSize = initialFontSize * ratio * 0.95;`
- `0.95` 값을 변경 (예: `0.9` = 더 작게, `0.98` = 거의 원래 크기)

### 패딩 값 변경
**파일:** `script.js`
- Line 946: `const padding = 30;` → 패딩 값 변경 시 여기도 수정

---

**마지막 업데이트:** 2025년 11월 28일

