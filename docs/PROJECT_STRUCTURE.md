# 프로젝트 구조 (Project Structure)

## 📁 파일 구조

### 핵심 파일 (Core Files)
- `index.html` - 메인 HTML 파일
- `script.js` - 게임 로직 및 기능
- `style.css` - 스타일시트
- `words.json` - 단어 데이터베이스 (267개 단어)
- `favicon.svg` - 파비콘

### 문서 파일 (Documentation)
- `README.md` - 프로젝트 소개 및 사용법
- `DEVELOPMENT_LOG.md` - 개발 로그 (일일 작업 기록)
- `GAME_SUMMARY.md` - 게임 전체 요약 및 기능 설명
- `EMOJI_MATCHING_TABLE.md` - 이모지 매칭 테이블 및 통계
- `WORD_CATEGORY_ANALYSIS.md` - 단어 카테고리 분석 (명사/동사/형용사)
- `FUTURE_FEATURES.md` - 향후 개발 계획
- `MVP_RELEASE_CHECKLIST.md` - MVP 출시 체크리스트
- `FONT_SIZES.md` - 폰트 크기 참고 자료
- `test-mobile.md` - 모바일 테스트 가이드

### 이미지 파일 (Images)
- `images/` - 게임에서 사용하는 이미지 파일들
  - `open.png`, `close.png`, `jam.png`, `garden.png` 등

---

## 📋 파일 설명

### 핵심 파일
- **index.html**: 게임의 HTML 구조 (시작 화면, 게임 화면, 옵션 모달 등)
- **script.js**: 게임 로직, 타이머, 점수 계산, 언어 전환 등 모든 기능
- **style.css**: 모든 스타일 및 반응형 디자인
- **words.json**: 단어, 힌트, 이모지, 이미지 경로 데이터

### 문서 파일
- **README.md**: 프로젝트 소개, 설치 방법, 사용법
- **DEVELOPMENT_LOG.md**: 날짜별 개발 작업 기록
- **GAME_SUMMARY.md**: 게임의 전체적인 기능과 구조 설명
- **EMOJI_MATCHING_TABLE.md**: 이모지 매칭 상태 및 통계
- **WORD_CATEGORY_ANALYSIS.md**: 단어 분류 통계
- **FUTURE_FEATURES.md**: 향후 추가할 기능 목록
- **MVP_RELEASE_CHECKLIST.md**: MVP 출시 전 체크리스트
- **FONT_SIZES.md**: 폰트 크기 참고 자료 (개발용)
- **test-mobile.md**: 모바일 테스트 방법 가이드

---

## 🗂️ 폴더 정리 권장사항

### 유지할 파일
✅ 모든 핵심 파일 (index.html, script.js, style.css, words.json)
✅ README.md, DEVELOPMENT_LOG.md, GAME_SUMMARY.md
✅ FUTURE_FEATURES.md, MVP_RELEASE_CHECKLIST.md
✅ EMOJI_MATCHING_TABLE.md, WORD_CATEGORY_ANALYSIS.md

### 선택적 파일
- `FONT_SIZES.md` - 개발 참고용 (필요시 유지)
- `test-mobile.md` - 테스트 가이드 (유용하지만 선택적)

### 삭제된 파일 (정리 완료)
- ❌ FEEDBACK_AREA_CHECK.md - 임시 분석 문서 (삭제됨)
- ❌ FONT_SIZE_ADJUSTMENT_LOCATIONS.md - 임시 분석 문서 (삭제됨)
- ❌ NEW_GAME_BUTTON_SPACING.md - 임시 분석 문서 (삭제됨)
- ❌ SPACING_ANALYSIS.md - 임시 분석 문서 (삭제됨)

---

## 📝 파일 관리 가이드

### 개발 중 생성되는 임시 파일
- 개발 중 분석이나 테스트를 위해 생성한 임시 문서는 작업 완료 후 삭제 권장
- 중요한 정보는 `DEVELOPMENT_LOG.md`나 `GAME_SUMMARY.md`에 통합

### 문서 업데이트
- `DEVELOPMENT_LOG.md`: 매일 작업 내용 기록
- `GAME_SUMMARY.md`: 주요 기능 변경 시 업데이트
- `README.md`: 프로젝트 구조나 사용법 변경 시 업데이트

