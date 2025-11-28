# 공간 간격 분석 / Spacing Analysis

## 현재 간격 현황 / Current Spacing Status

### 데스크톱 (Desktop)

#### Header 영역
- `.header-top`: `gap: 15px`
- `header`: `margin-bottom: 30px`, `padding-top: 20px`

#### Score Board
- `.score-board`: `gap: 10px`, `margin-top: 25px`, `margin-bottom: 10px`
- `.score-row`: `gap: 15px`
- `.score-item`: `padding: 15px 20px`

#### Game Area
- `.game-area`: `margin-bottom: 30px`
- `.image-container`: `margin-bottom: 25px`
- `.image-display`: `padding: 43px 40px`, `min-height: 216px`

#### Input/Choice 영역
- `.input-area`: `gap: 10px`, `margin-bottom: 20px`, `margin-top: 10px`
- `.multiple-choice-area`: `margin-bottom: 20px`, `margin-top: 10px`
- `.choice-buttons`: `gap: 15px`, `margin-bottom: 20px`
- `.choice-btn`: `padding: 20px`

#### Hint/Feedback 영역
- `.hint-area`: `padding: 15px`, `margin-bottom: 15px`, `margin-top: 10px`
- `.feedback`: `padding: 15px`, `margin-bottom: 15px`, `margin-top: 10px`, `min-height: 50px`

#### Controls
- `.controls`: `gap: 10px`, `margin-top: 20px`, `padding-top: 15px`

---

### 모바일 (Mobile - max-width: 600px)

#### Header 영역
- `.header-top`: `gap: 10px`, `margin-bottom: 8px`
- `header`: `padding-top: 10px`, `margin-bottom: 15px`

#### Score Board
- `.score-board`: `gap: 8px`, `margin-top: 8px`, `margin-bottom: 12px`
- `.score-row`: `gap: 8px`
- `.score-item`: `padding: 12px 6px`

#### Game Area
- `.image-container`: `margin-bottom: 15px`
- `.image-display`: `padding: 20px 12px`, `min-height: 180px`

#### Input/Choice 영역
- `.input-area`: `gap: 12px`, `margin-bottom: 15px`
- `.multiple-choice-area`: `margin-bottom: 15px`, `margin-top: 8px`
- `.choice-buttons`: `gap: 12px`, `margin-bottom: 15px`
- `.choice-btn`: `padding: 18px 12px`, `min-height: 60px`

#### Hint/Feedback 영역
- `.hint-area`: `padding: 12px`, `margin-bottom: 12px`, `margin-top: 8px`, `min-height: 45px`
- `.feedback`: `padding: 12px`, `margin-bottom: 12px`, `min-height: 45px`

#### Controls
- `.controls`: `gap: 12px`, `margin-top: 15px`, `padding-top: 12px`

---

## 간격 일관성 체크 / Spacing Consistency Check

### ✅ 일관된 부분
- 모바일에서 대부분의 `gap`이 8px, 12px로 통일됨
- `margin-bottom`이 대부분 12px, 15px로 일관됨

### ⚠️ 개선 가능한 부분
1. **데스크톱과 모바일 간격 차이**
   - 데스크톱: 10px, 15px, 20px, 25px, 30px (다양함)
   - 모바일: 8px, 12px, 15px (더 일관적)

2. **영역 간 간격**
   - `.image-container` → `.multiple-choice-area`: 25px (데스크톱) / 15px (모바일)
   - `.choice-buttons` → `.hint-area`: 20px (데스크톱) / 15px (모바일)
   - `.hint-area` → `.feedback`: 15px (데스크톱) / 12px (모바일)

3. **패딩 일관성**
   - `.hint-area`와 `.feedback`의 패딩이 동일함 (좋음)
   - `.choice-btn` 패딩이 데스크톱/모바일에서 다름

---

## 권장 사항 / Recommendations

### 옵션 1: 현재 상태 유지 (권장)
- 모바일에서 이미 잘 최적화되어 있음
- 데스크톱은 더 넓은 화면을 활용

### 옵션 2: 더 일관된 간격 적용
- 모든 영역 간격을 8px 단위로 통일
- 예: 8px, 16px, 24px

### 옵션 3: 특정 영역만 조정
- 사용자가 원하는 특정 영역의 간격만 조정

---

**마지막 업데이트:** 2025년 11월 28일

