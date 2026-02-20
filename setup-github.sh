#!/bin/bash
# GitHub 첫 업로드를 위한 초기화 스크립트
# 사용법: ./setup-github.sh
# 이후: git remote add origin https://github.com/YOUR_USERNAME/pet-community.git
#       git push -u origin main

cd "$(dirname "$0")"

if [ -d .git ]; then
  echo "이미 Git 저장소입니다."
  git status
  exit 0
fi

echo "1. Git 초기화..."
git init

echo "2. 파일 추가..."
git add .

echo "3. 커밋..."
git commit -m "Initial commit: 멍냥멍냥 반려동물 커뮤니티"
git branch -M main

echo ""
echo "완료! 다음 단계:"
echo "  1. GitHub에서 새 저장소 생성 (pet-community)"
echo "  2. git remote add origin https://github.com/YOUR_USERNAME/pet-community.git"
echo "  3. git push -u origin main"
echo ""
