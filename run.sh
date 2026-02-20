#!/bin/bash
# pet-community 로컬 실행 스크립트
cd "$(dirname "$0")"
PORT=3300

echo "1. 포트 $PORT 프로세스 종료..."
lsof -ti:$PORT 2>/dev/null | xargs kill -9 2>/dev/null
sleep 2

echo "2. 기존 빌드/캐시 삭제..."
rm -rf .next node_modules/.cache

echo "3. 빌드..."
npm run build || exit 1

echo ""
echo "=========================================="
echo "4. 서버 시작"
echo "   브라우저에서 http://localhost:$PORT 접속"
echo "   테스트: http://localhost:$PORT/ok"
echo "=========================================="
echo ""
PORT=$PORT npm run start
