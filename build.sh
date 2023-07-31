# 현재 브랜치 이름을 변수에 할당
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# 현재 브랜치의 최종 커밋의 해시값
HASH=$(git rev-parse HEAD)

# 원격에 업로드된 현재 브랜치의 커밋 해시
REMOTE_HASH=$(git rev-parse --verify origin/$BRANCH)

if [ "$BRANCH" != 'main' ]; then
  echo 'main 브랜치에서만 배포 가능합니다.'; # 메시지 출력
  exit; # 스트립트 종료
fi

if [ -n "$(git status --porcelain)" ]; then
  echo '배포 전 모든 변경 사항을 커밋해야 합니다.';
  exit;
fi

if [ $HASH != $REMOTE_HASH ]; then
  echo '배포 전 모든 커밋을 원격에 푸시해야 합니다.'
  exit;
fi


echo 'Add: build start!!'

git branch -D build

# git branch build
git checkout --orphan build # orphan 옵션은 부모없는 브랜치를 만든다.

git rm --cached -r . # staged 파일들을 unstage

mkdir -p buildApp
cp -R webapp/dist/* buildApp

git add buildApp
git commit -m 'Add: build'
git push origin build --force # 빌드 파일이라 강제 push!

rm -R buildApp

git add .

git checkout main
echo 'Add: build end!!'




