# 피드백 영역 확인 / Feedback Area Check

## 현재 상태 / Current Status

### HTML 구조
```html
<div class="feedback" id="feedback"></div>
```
- 위치: `.game-area` 내부, 힌트 영역 아래
- ID: `feedback`

### CSS 스타일 (데스크톱)

#### 기본 스타일 (`.feedback`)
- `text-align: center` - 중앙 정렬
- `padding: 15px` - 내부 여백
- `border-radius: 12px` - 둥근 모서리
- `font-size: 1.5em` - 폰트 크기 (힌트와 동일)
- `font-weight: 600` - 폰트 굵기
- `margin-bottom: 0` - 하단 여백 없음
- `margin-top: 10px` - 상단 여백
- `min-height: 50px` - 최소 높이
- `display: flex` - 플렉스 레이아웃
- `align-items: center` - 수직 중앙 정렬
- `justify-content: center` - 수평 중앙 정렬
- `white-space: nowrap` - 줄바꿈 방지
- `overflow: hidden` - 넘치는 텍스트 숨김
- `text-overflow: ellipsis` - 말줄임표 표시

#### 정답 상태 (`.feedback.correct`)
- `background: #d4edda` - 연한 초록색 배경
- `color: #155724` - 진한 초록색 텍스트
- `border: 2px solid #c3e6cb` - 초록색 테두리

#### 오답 상태 (`.feedback.incorrect`)
- `background: #f8d7da` - 연한 빨간색 배경
- `color: #721c24` - 진한 빨간색 텍스트
- `border: 2px solid #f5c6cb` - 빨간색 테두리

#### 빈 상태 (`.feedback.empty`)
- `background: transparent` - 투명 배경
- `border: none` - 테두리 없음

### CSS 스타일 (모바일 - max-width: 600px)
- `padding: 12px` - 내부 여백 축소
- `font-size: 1.5em` - 폰트 크기 유지 (힌트와 동일)
- `margin-bottom: 0` - 하단 여백 없음
- `border-radius: 12px` - 둥근 모서리
- `min-height: 45px` - 최소 높이 축소
- `white-space: nowrap` - 줄바꿈 방지
- `overflow: hidden` - 넘치는 텍스트 숨김
- `text-overflow: ellipsis` - 말줄임표 표시

### JavaScript 동작

#### 피드백 표시 위치
1. **객관식 모드** (`selectChoice()`)
   - 정답 선택 시: `feedback.className = 'feedback correct'`
   - 오답 선택 시: `feedback.className = 'feedback incorrect'`
   - 힌트 숨김: `hintArea.style.display = 'none'`
   - 폰트 크기 자동 조정: `adjustFeedbackFontSize()`

2. **타이핑 모드** (`checkAnswer()`)
   - 정답 입력 시: `feedback.className = 'feedback correct'`
   - 오답 입력 시: `feedback.className = 'feedback incorrect'`
   - 힌트 숨김: `hintArea.style.display = 'none'`
   - 폰트 크기 자동 조정: `adjustFeedbackFontSize()`

3. **문제 로드 시** (`loadQuestion()`)
   - 피드백 초기화: `feedback.textContent = ''`
   - 빈 상태로 설정: `feedback.className = 'feedback empty'`

#### 폰트 크기 자동 조정
- `adjustFeedbackFontSize()` 함수
- 힌트와 동일한 로직 사용 (`adjustTextFontSize()`)
- 초기 폰트 크기: 1.5em
- 컨테이너 너비에 맞춰 자동 축소

### 메시지 내용

#### 정답 메시지
- 한국어: "정답! 🎉"
- 영어: "Correct! 🎉"

#### 오답 메시지
- 한국어: "틀렸습니다. 정답은 "{word}"입니다."
- 영어: "Wrong. The answer is "{word}"."

---

## 힌트 영역과의 비교 / Comparison with Hint Area

| 항목 | 힌트 영역 | 피드백 영역 |
|------|----------|------------|
| 폰트 크기 | 1.5em | 1.5em ✅ |
| 패딩 | 15px (데스크톱) / 12px (모바일) | 15px (데스크톱) / 12px (모바일) ✅ |
| 최소 높이 | 50px (데스크톱) / 45px (모바일) | 50px (데스크톱) / 45px (모바일) ✅ |
| 한 줄 표시 | ✅ | ✅ |
| 폰트 자동 조정 | ✅ | ✅ |
| 배경색 | 노란색 (#fff3cd) | 초록색/빨간색 (상태별) |
| 테두리 | 노란색 (#ffc107) | 초록색/빨간색 (상태별) |

---

## 확인 사항 / Check Points

✅ **완료된 항목:**
- 힌트와 동일한 폰트 크기 (1.5em)
- 한 줄 표시 (white-space: nowrap)
- 폰트 크기 자동 조정 기능
- 힌트 표시 시 피드백 숨김
- 피드백 표시 시 힌트 숨김
- 동일한 패딩과 최소 높이

⚠️ **확인 필요:**
- 피드백 메시지가 너무 길 경우 자동 축소가 제대로 작동하는지
- 모바일에서 가독성 확인

---

**마지막 업데이트:** 2025년 11월 28일

