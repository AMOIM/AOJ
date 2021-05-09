# 채점 환경
​
+ AWS EC2 (t2.micro)
+ Ubuntu 20.04

​&nbsp;

# 채점 방식
​
+ 입력 : Standard Input
+ 출력 : Standard Output
​
​
​
1. 제출한 코드로 실행 파일을 생성
2. 문제의 테스크 케이스 입력 파일로 출력 파일을 생성
3. 테스트 케이스의 정답 파일과 출력 파일을 비교
​
문제의 출력 형식이 달라도 안되며, 모든 테스트 케이스와 비교합니다.

​&nbsp;
​&nbsp;

# 채점 서버
​​&nbsp;

현재 1개의 채점 서버가 있으며, 이전 채점을 모두 완료한 뒤 다음 채점이 진행됩니다.
​
만약 제출량이 많을 경우 채점 서버를 늘릴 수 있습니다.
​

​​&nbsp;


# 채점 결과
​
+ `채점 중` : 채점이 진행되기 전 상태입니다.
+ `맞았습니다` : 제출한 프로그램이 모든 데이터를 통과한 경우입니다.
+ `틀렸습니다` : 출력 결과와 정답이 다릅니다.
+ `컴파일 에러` : 컴파일에 실패한 경우입니다.
+ `시간 초과` : 프로그램이 문제의 시간 제한 안에 끝나지 않은 경우입니다.
+ `메모리 초과` : 프로그램이 문제의 메모리 제한보다 많은 메모리를 사용한 경우입니다.
+ `런타임 에러` : 프로그램이 비정상적으로 종료된 경우입니다.
+ `출력 형식이 잘못되었습니다` : 문제의 출력 형식과 다른 경우입니다.
+ `서버 에러` : 서버 에러입니다. 개발자에게 문의바랍니다.
​

​​&nbsp;
​

# 언어 컴파일 및 실행 옵션
​
​
​
### c
​
+ 컴파일
​
```bash
/usr/bin/gcc -DONLINE_JUDGE -O2 -w -fmax-errors=3 -std=c99 ${dir}/Main.c -static -lm -o ${dir}/Main.o
```
​
+ 실행
​
```bash
${dir}/Main.o
```
​
​
​
### cpp
​
+ 컴파일
​
```bash
/usr/bin/g++ -DONLINE_JUDGE -O2 -w -fmax-errors=3 -std=c++17 ${dir}/Main.cc -static -lm -o ${dir}/Main.o
```
​
+ 실행
​
```bash
${dir}/Main.o
```
​
​
​
### java
​
+ 시간 제한: x 2 + 1초
+ 메모리 제한: x 2 + 16MB
+ 컴파일
​
```bash
/usr/bin/javac ${dir}/Main.java -d ${dir} -encoding UTF8
```
​
+ 실행
​
```bash
/usr/bin/java -cp ${dir} -XX:MaxRAM=1024m -Djava.security.manager -Dfile.encoding=UTF-8 -Djava.security.policy=${__dirname}/../etc/java_policy -Djava.awt.headless=true Main
```
​
+ java_policy
​
```bash
grant {
    permission java.io.FilePermission "/tmp", "read";
};
```
​
​
​
### python2
​
+ 시간 제한: x 3 + 2초
+ 메모리 제한: x 2 + 32MB
+ 컴파일
​
```bash
/usr/bin/python2.7 -m py_compile ${dir}/Main.py
```
​
+ 실행
​
```bash
/usr/bin/python2.7 ${dir}/Main.pyc
```
​
​
​
### python3
​
+ 시간 제한: x 3 + 2초
+ 메모리 제한: x 2 + 32MB
+ 컴파일
​
```bash
/usr/bin/python3 -m py_compile ${dir}/Main.py
```
​
+ 실행
​
```bash
/usr/bin/python3 ${dir}/__pycache__/Main.cpython-38.pyc
```
&nbsp;
# 스코어 보드 채점 기준
​&nbsp;

+ 문제 제출 횟수 / 페널티 점수
+ 페널티 점수(문제 맞춘 시각(분) - 대회 시작 시각(분)) + 15 * 문제 틀린 횟수
+ 등수 우선순위
    - 해결 문제 수 높은 순
    - 페널티 점수 낮은 순