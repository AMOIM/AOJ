# <strong><span style="color:#673AB7">API Document of AOJ</span></strong>  

|API|Method|input|output|function|
|-|-|:-:|:-:|-|
|'/check'|get|X|5(시간 만료)<br/>4(비로그인)<br/>   3(로그인)|로그인 토큰 상태 확인|
|'/user/:id'|get|:id (회원 아이디)|user (회원 정보)|존재하는 회원인지 확인|
|'/user/update'|put|           id (변경할 회원 아이디) <br/>password (현재 패스워드)<br/>changePW (변경할 패스워드)           |         1(수정한 회원 수)         | 비밀번호 변경 |
|'/user/login'|post| user (id, password)  <br/>(회원 아이디, 비밀번호) | token (로그인 토큰) | 로그인 |
|'/user/signup'|post| user (id, password, confirmPassword, name) 회원 아이디, 비밀번호, 비밀번호 확인, 닉네임 |1(가입 성공)<br> 2(존재하는 아이디) 3(존재하는 닉네임) | 회원가입 |
|'/user/delete'|delete| id (회원 아이디) | true or false | 회원 삭제 |
|'/user/delete/contest'|delete| id (대회 아이디) | true or false | 해당 대회 참가 회원 삭제 |
|'/user'|get| X | users (id, name, isApprove)<br/>(모든 회원 아이디, 닉네임, 승인여부) | 모든 회원 정보 가져오기 |
|'/user/approve'|patch| id (회원 아이디) | 1(승인한 회원 수) | 회원가입 승인 |
|'/problem/:id'|get| :id (문제 아이디) | problem (문제 정보) | 문제 정보 가져오기 |
|'/problem/public/:id'|get| :id (문제 아이디) | problem (문제 정보) | 공개된 문제 가져오기 |
|'/problem/list'|get| X | 모든 문제 | 모든 문제 리스트 가져오기 |
|'/problem/list/public'|get| X | 공개된 문제 목록 | 공개된 문제 리스트 가져오기 |
|'/problem/submit'|post| code, lang, userName, problemNum<br/>(소스코드, 사용언어, 회원 닉네임, 문제번호) | true or false | 문제 제출 |
|'/problem/create'|post| problem, testcase<br/> (문제 정보, 테스트케이스 정보) | 문제 번호 | 문제 생성 |
|'/problem/delete/:id'|delete| :id (문제 아이디) | true | 문제 삭제 |
|'/problem/update/:id'|patch| problem, :id<br/>(수정할 문제 정보, 문제 아이디) | 문제 번호 | 문제 수정 |
|'/problem/testcase/:id'|get| number,  inputFileString, outputFileString, :id(문제 아이디, 입력테스트케이스, 출력테스트케이스) | 모든 testcase | testcase 가져오기 |
|'/problem/testcase/example/:id'|get| id (문제 아이디) | testcase 2개 | 입출력 예시 testcase가져오기 |
|'/problem/testcase/:id'|put| number,  inputFileString, outputFileString, :id (문제 아이디, 입력테스트케이스, 출력테스트케이스) | true | testcase 업데이트 |
|'/problem/testcase/:id'|delete| :id (문제 아이디) | true | testcase 삭제 |
|'/contest/notice/:id/:competitionNum'|get| key (0 or 1)<br/>0은 QnA, 1은 공지사항<br/> :id, :competitionNum<br/>(공지사항 or QnA 아이디, 대회 아이디) | notice<br/>(공지사항 정보) | key(params) 값에 따라 해당 대회 공지사항이나 QnA 가져오기 |
|'/contest/notice/post'|post| competitionNum, isQnA, problemNum, content<br/>(대회 아이디, QnA인지아닌지, 문제번호, 내용) | true | 공지사항 혹은 QnA 작성 |
|'/contest/notice/reply'|post| competitionNum, _id, content<br/>(대회아이디, 댓글 아이디, 내용) | true | QnA 답변 작성 |
|'/contest/scoreboard/:id'|get| :id (대회 아이디) | 대회 스코어보드 | 대회 스코어보드 가져오기 |
|'/contest/status/:id/:user'|get| id, user (대회 아이디, 회원 닉네임) | 회원 대회채점결과 | 회원 대회채점결과 가져오기 |
|'/contest/create'|post| contest | true | 대회 생성 |
|'/contest/list'|get| X | 대회 리스트<br/>(대회 번호, 제목, 시작시각, 종료시각) | 대회 리스트 가져오기 |
|'/contest/get/:id'|get| :id (대회 아이디) | contest (대회 정보) | 해당 id의 대회 정보 가져오기 |
|'/contest/gettime/:id'|get| :id (대회 아이디) | contest<br/>(대회 시작시간, 종료시간) | 해당 id의 대회 시작시각 가져오기 |
|'/contest/userlist/:id'|get| :id (대회 아이디) | userList<br/>(대회 참가자 목록) | 해당 id의 대회 참가자 닉네임 가져오기 |
|'/contest/update'|put| contest (수정할 대회 정보) |                              X                               | contest 정보 갱신 |
|'/contest/delete/:id'|delete| :id (대회 아이디) | true | 해당 id의 contest  삭제 |
|'/contest/:competitionNum'|get| :competitionNum (대회 아이디) | problems<br/>(알파벳, 문제번호, 문제제목) | 해당 대회 문제 가져오기 |
|'/markdown/create'|post| markdownTitle, markdownText (제목, 내용) | true | 홈/채점환경 작성 |
|'/markdown/get'|get| X | markdown<br/>(마크다운 정보) | 홈/채점환경 읽어오기 |