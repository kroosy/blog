이전 계정은 개인 기록과 회사 기록이 함께 있어서 마음에 들지 않았다. 깃허브 계정을 이사하고, 앞으로는 회사 계정과 개인 계정을 분리하여 사용하기 위해 github 계정을 여러 개 사용하는 법을 찾아보게 되었다.

## 1. SSH 키 생성 및 공개키 등록

SSH 키는 중복 등록을 할 수 없기 때문에, 새로운 계정에서 사용할 SSH 키를 먼저 생성해야한다. ( [SSH 키 생성 및 등록에 관한 Github 문서)](https://docs.github.com/ko/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)

`~/.ssh` 경로로 이동하여, 아래의 명령어를 실행한다.

```jsx
ssh-keygen -t ed25519 -C "your_email@example.com" -f "[filename]"
```

기존 계정에 등록된 SSH 키가 있을 것이므로, -f 옵션으로 기존 키와 구분되는 파일명을 설정한다.

위 명령어를 실행하면 각각 공개키와 개인키에 해당하는 파일 두 개가 생성된다. `.pub` 확장자가 붙은 것이 공개키인데, 이것을 Github에 등록해주어야 한다.

```jsx
cat "[공개키 파일]"
```

위 명령어를 실행하여 출력된 공개키를 복사하여, Github 사이트에 접속하고 `설정 → SSH and GPG keys → New SSH key`를 눌러 등록해주면 된다.

## 2. SSH 키 분리

SSH 키는 `~/.ssh/config` 파일에서 관리할 수 있다. 없다면 생성한다.

```jsx
touch ~/.ssh/config
```

해당 파일에서는 SSH 키를 호스트 별로 관리할 수 있다.

```jsx
# Personal
Host github.com
 HostName github.com
 IdentityFile  ~/.ssh/personal.github.com
 User PersonalGit

# Work
Host work.github.com
 HostName github.com
 IdentityFile  ~/.ssh/work.github.com
 User WorkGit
```

위의 내용을 예시로 들어보면, `Host` 가 “work.github.com” 인 경우, 실제 Host는 `HostName` 에 해당하는 “github.com”을 사용하고, `IdentifyFile` 에 해당하는 SSH 키를 사용하라는 뜻이다.

주의 할 점은 `Host` 를 다르게 분리했기 때문에, SSH 주소로 clone 할 때 이전과 다르게 입력해야한다는 점이다.

```jsx
git@github.com:facebook/react.git (x)
git@work.github.com:facebook/react.git (o)
```

## 3. Git Config 파일 변경하기

일반적으로 커밋할 때 사용하는 이메일 계정은 `~/.gitconfig` 파일에서 전역으로 두고 사용한다. 새로운 계정을 추가했으므로 커밋 역시 다른 계정으로 등록되어야 하는데, 이를 위해 저장소 마다 local config를 등록하는 방법이 있다. 아래와 같은 명령어를 통해 등록 할 수 있다.

```jsx
$ git config --local user.name "[이름]"
$ git config --local user.email "[계정]"
```

매번 등록하는 행위가 귀찮다면, 폴더를 기준으로 다른 커밋 계정을 사용하고, 이를 `.gitconfig` 파일에 `includeIf` 로 관리한다면 좀 더 편하게 사용할 수 있다.

```jsx
[user]
  email = [default계정]
  name = [default이름]
[includeIf "gitdir:~/example/"] //git 디렉터리가 ~/example 디렉터리 아래에 있다면
  path = .gitconfig-example // ~/.gitconfig-example 파일을 불러오겠다
```

위의 `includeIf` 이하를 해설하자면, git 디렉터리가 `~/example/` 디렉터리 아래에 있다면 `~/.gitconfig-example` 파일을 불러오겠다는 뜻이다.

<aside>
💡 주의사항) 경로 끝에 `/` (슬래시)를 꼭 붙이자.. 슬래시를 붙이면 폴더로 추정, 붙이지 않으면 파일로 추정한다.

</aside>

`~/.gitconfig-example/` 에서는 아래와 같이 커밋에 사용할 계정을 적어주면 된다.

```jsx
[user];
email = [example계정];
name = [example이름];
```

위와 같이 파일을 작성하면, 일반적으로는 default 계정을 사용하다가, example 디렉터리 아래로는 example 계정을 사용하게 된다.

## 4. 기존에 연결된 원격 레포 주소 수정하기

내 경우에는, 기존에 사용하던 계정이 아닌 새로운 계정을 default로 사용하고자 하였다. 따라서 SSH 키 config 파일에서 기존 계정의 Host를 변경하였고, 기존 계정으로 이전에 사용하던 레포에 커밋을 올릴 때 Host가 달라(결국 SSH키가 달라져) commit이 push 되지 않는 문제가 있었다.

해결 방안은 간단하게, remote 레포를 삭제하고 새로운 Host로 다시 등록하면 된다.

```jsx
git remote -v // 연결된 원격 레포 확인

git remote remove origin // 원격 레포 제거

git remote add origin git@새로운Host.github.com:레포주소
```

## 참고자료

- https://blog.outsider.ne.kr/1448
- [https://mrchypark.github.io/post/여러개의-github-계정을-사용해보자/](https://mrchypark.github.io/post/%EC%97%AC%EB%9F%AC%EA%B0%9C%EC%9D%98-github-%EA%B3%84%EC%A0%95%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90/)
