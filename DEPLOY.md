# GitHub 업로드 & Vercel 배포 가이드

## 1. GitHub 업로드

### 1-1. GitHub에서 새 저장소 생성

1. https://github.com/new 접속
2. **Repository name**: `pet-community` (또는 원하는 이름)
3. **Public** 선택
4. **Create repository** (README, .gitignore 추가 안 함)

### 1-2. 터미널에서 업로드

```bash
cd /Users/loe/Desktop/z.Loe/cursor/project/claude-subagent/pet-community

# Git 초기화 (이 폴더만 별도 저장소로)
git init

# 파일 추가
git add .
git status   # 확인

# 커밋
git commit -m "Initial commit: 멍냥멍냥 반려동물 커뮤니티"

# GitHub 저장소 연결 (본인 계정/저장소명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/pet-community.git

# 푸시
git branch -M main
git push -u origin main
```

---

## 2. Vercel 배포

### 2-1. Vercel 연결

1. https://vercel.com 접속 후 로그인 (GitHub 계정 권장)
2. **Add New** → **Project**
3. **Import Git Repository**에서 `pet-community` 선택
4. **Root Directory**: `./` (pet-community 폴더가 루트면 그대로)
5. **Framework Preset**: Next.js (자동 감지됨)
6. **Deploy** 클릭

### 2-2. 자동 배포

- `main` 브랜치에 push할 때마다 자동 배포
- 배포 URL: `https://pet-community-xxx.vercel.app` (프로젝트명에 따라 변경 가능)

### 2-3. 커스텀 도메인 (선택)

Vercel 대시보드 → Project → Settings → Domains에서 추가 가능.
