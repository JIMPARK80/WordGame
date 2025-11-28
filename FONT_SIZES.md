# 폰트 크기 정리 (Font Sizes)

## 데스크톱 버전 (Desktop)

### 헤더 (Header)
- **게임 제목 (h1)**: `2.5em` (약 40px) - [수정 위치: `style.css:328`](style.css#L328)
- **언어 선택 버튼**: `0.9em` (약 14.4px) - [수정 위치: `style.css:171`](style.css#L171)
- **게임 모드 버튼**: `0.9em` (약 14.4px) - [수정 위치: `style.css:260`](style.css#L260)
- **드롭다운 옵션**: `0.9em` (약 14.4px) - [수정 위치: `style.css:223` (언어), `style.css:301` (게임 모드)](style.css#L223)

### 스코어보드 (Score Board)
- **스코어 아이템 전체**: 기본 크기 - [수정 위치: `style.css:341`](style.css#L341)
- **라벨 (Score, Correct, Question)**: `0.85em` (약 13.6px) - [수정 위치: `style.css:353`](style.css#L353)
- **값 (숫자)**: `1.8em` (약 28.8px) - [수정 위치: `style.css:360`](style.css#L360)

### 이미지 영역 (Image Display)
- **이모지**: `12em` (약 192px) - 매우 큼! - [수정 위치: `style.css:390`](style.css#L390)

### 입력 영역 (Input Area)
- **입력 필드 (word-input)**: `1.2em` (약 19.2px) - [수정 위치: `style.css:486`](style.css#L486)
- **선택지 버튼 (choice-btn)**: `1.2em` (약 19.2px) - [수정 위치: `style.css:445`](style.css#L445)
- **제출 버튼**: `1.2em` (약 19.2px) - [수정 위치: `style.css:505` (일반 버튼)](style.css#L505)

### 피드백 (Feedback)
- **피드백 메시지**: `1.3em` (약 20.8px) - [수정 위치: `style.css:559`](style.css#L559)
- **힌트 텍스트**: `1.1em` (약 17.6px) - [수정 위치: `style.css:598`](style.css#L598)

### 버튼 (Buttons)
- **일반 버튼**: `1.2em` (약 19.2px) - [수정 위치: `style.css:505`](style.css#L505)
- **리셋 버튼**: `1.1em` (약 17.6px) - [수정 위치: `style.css:505`](style.css#L505)
- **사운드 버튼**: `1.2em` (약 19.2px) - [수정 위치: `style.css:551`](style.css#L551)

### 메뉴 패널 (Menu Panel)
- **메뉴 제목**: `1.1em` (약 17.6px) - [수정 위치: `style.css:103`](style.css#L103)
- **메뉴 옵션**: `0.95em` (약 15.2px) - [수정 위치: `style.css:126`](style.css#L126)
- **메뉴 옵션 아이콘**: `1.2em` (약 19.2px) - [수정 위치: `style.css:148`](style.css#L148)

### Stage Clear 화면
- **아이콘**: `8em` (약 128px) - [수정 위치: `style.css:649`](style.css#L649)
- **제목**: `3em` (약 48px) - [수정 위치: `style.css:656`](style.css#L656)
- **통계 라벨**: `1em` (약 16px) - [수정 위치: `style.css:679`](style.css#L679)
- **통계 값**: `2em` (약 32px) - [수정 위치: `style.css:686`](style.css#L686)

### 메시지 (Message)
- **토스트 메시지**: `1em` (약 16px) - [수정 위치: `style.css:691`](style.css#L691)

---

## 모바일 버전 (Mobile - max-width: 600px)

> 모든 모바일 스타일은 `@media (max-width: 600px)` 블록 안에 있습니다. - [수정 위치: `style.css:724`](style.css#L724)

### 헤더 (Header)
- **게임 제목 (h1)**: `1.5em` (약 24px) ⬇️ 작아짐 - [수정 위치: `style.css:743`](style.css#L743)

### 스코어보드 (Score Board)
- **스코어 아이템 전체**: `0.9em` (약 14.4px) - [수정 위치: `style.css:756`](style.css#L756)
- **라벨**: `0.85em` (약 13.6px) - [수정 위치: `style.css:762`](style.css#L762)
- **값**: `1.5em` (약 24px) ⬇️ 작아짐 - [수정 위치: `style.css:767`](style.css#L767)

### 이미지 영역 (Image Display)
- **이모지**: `9em` (약 144px) ⬇️ 작아짐 - [수정 위치: `style.css:776`](style.css#L776)

### 입력 영역 (Input Area)
- **입력 필드**: `1em` (약 16px) ⬇️ 작아짐 - [수정 위치: `style.css:810`](style.css#L810)
- **선택지 버튼**: 기본 크기 유지

### Stage Clear 화면
- **제목**: `2em` (약 32px) ⬇️ 작아짐 - [수정 위치: `style.css:789`](style.css#L789)
- **아이콘**: `5em` (약 80px) ⬇️ 작아짐 - [수정 위치: `style.css:793`](style.css#L793)
- **통계 값**: `1.5em` (약 24px) ⬇️ 작아짐 - [수정 위치: `style.css:802`](style.css#L802)

---

## 폰트 패밀리 (Font Family)
- **기본 폰트**: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`

---

## 참고사항
- `em` 단위는 부모 요소의 폰트 크기를 기준으로 상대적 크기를 지정합니다.
- 기본 브라우저 폰트 크기는 보통 `16px`입니다.
- 따라서 `1em = 16px`, `2em = 32px` 등으로 계산됩니다.

