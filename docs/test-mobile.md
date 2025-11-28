# 모바일 테스트 가이드 / Mobile Testing Guide

## 방법 1: 브라우저 개발자 도구 (가장 빠름) / Browser DevTools (Fastest)

### Chrome/Edge
1. `F12` 또는 `Ctrl+Shift+I` - 개발자 도구 열기
2. `Ctrl+Shift+M` - 디바이스 모드 토글
3. 상단에서 기기 선택:
   - iPhone 12 Pro
   - Samsung Galaxy S20
   - iPad
   - 또는 커스텀 크기 설정

### Firefox
1. `F12` - 개발자 도구 열기
2. `Ctrl+Shift+M` - 반응형 디자인 모드
3. 기기 선택 또는 크기 직접 입력

### Safari (Mac만)
1. 환경설정 → 고급 → "메뉴 막대에서 개발자용 메뉴 보기" 체크
2. 개발자 → 반응형 디자인 모드

---

## 방법 2: 실제 모바일 기기에서 테스트 / Test on Real Device

### Python 서버 (가장 간단)
```bash
# Python 3.x
python -m http.server 8000

# 또는 Python 2.x
python -m SimpleHTTPServer 8000
```

### Node.js 서버
```bash
# http-server 설치 (한 번만)
npm install -g http-server

# 서버 실행
http-server -p 8000
```

### VS Code Live Server
- VS Code 확장 프로그램 "Live Server" 설치
- `index.html` 우클릭 → "Open with Live Server"

### 접속 방법
1. 컴퓨터와 폰이 **같은 Wi-Fi**에 연결되어 있어야 함
2. 컴퓨터의 로컬 IP 주소 확인:
   - Windows: `ipconfig` → IPv4 주소 확인
   - Mac/Linux: `ifconfig` 또는 `ip addr`
3. 폰 브라우저에서 접속:
   ```
   http://[컴퓨터IP]:8000
   예: http://192.168.0.100:8000
   ```

---

## 방법 3: 에뮬레이터/시뮬레이터 / Emulator/Simulator

### Android Studio Emulator
- Android Studio 설치 필요
- AVD (Android Virtual Device) 생성
- 실제 Android 기기와 유사한 테스트 가능

### iOS Simulator (Mac만)
- Xcode 설치 필요
- Xcode → Open Developer Tool → Simulator
- iPhone/iPad 시뮬레이터 실행

### Chrome DevTools + 실제 기기 연결
- Chrome에서 `chrome://inspect` 접속
- USB로 폰 연결 후 원격 디버깅 가능

---

## 추천 순서 / Recommended Order

1. **브라우저 DevTools** (빠른 UI 확인)
2. **실제 기기** (터치, 성능, 실제 UX 확인)
3. **에뮬레이터** (다양한 기기 크기 테스트)

---

## 빠른 테스트 명령어 / Quick Test Commands

### Windows PowerShell
```powershell
# Python 서버 실행
python -m http.server 8000

# IP 주소 확인
ipconfig | findstr IPv4
```

### Mac/Linux Terminal
```bash
# Python 서버 실행
python3 -m http.server 8000

# IP 주소 확인
ifconfig | grep "inet " | grep -v 127.0.0.1
```

---

## 주의사항 / Notes

- **CORS 문제**: 일부 브라우저는 `file://` 프로토콜에서 리소스 로드를 차단할 수 있음
- **HTTPS 필요**: PWA 기능이나 일부 API는 HTTPS가 필요할 수 있음
- **방화벽**: 로컬 서버 접속이 안 되면 방화벽 설정 확인

---

## 현재 프로젝트 테스트 / Current Project Test

이 프로젝트는 정적 파일만 사용하므로:
- ✅ 로컬 서버로 충분
- ✅ 서버 없이도 `file://`로 열 수 있음 (일부 제한 있음)
- ✅ GitHub Pages에 배포하면 바로 모바일에서 테스트 가능

