# pet-community 로컬 실행 방법

## 중요

1. **기존 서버 종료**: 다른 터미널에서 `npm run dev` 또는 `npm run start` 실행 중이면 Ctrl+C 로 전부 종료
2. **포트 3300 사용**: 기존 3000/3002 대신 3300 사용 (충돌 방지)

## 방법 1: 스크립트로 한 번에 실행 (권장)

```bash
cd /Users/loe/Desktop/z.Loe/cursor/project/claude-subagent/pet-community
./run.sh
```

→ 브라우저에서 **http://localhost:3300** 접속

## 방법 2: 수동 실행

```bash
cd /Users/loe/Desktop/z.Loe/cursor/project/claude-subagent/pet-community
rm -rf .next node_modules/.cache   # 이전 빌드 오류 시 필수
npm run build
PORT=3300 npm run start
```

→ 브라우저에서 **http://localhost:3300** 접속

## 확인용 주소

- http://localhost:3300/ok  ← 최소 테스트 페이지 (이게 보이면 성공)
- http://localhost:3300/    ← 메인 앱
