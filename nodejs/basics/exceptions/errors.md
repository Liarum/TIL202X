* node: command not found
  * 노드 설치 후 환경 변수가 제대로 설치되지 않았을 때
* ReferenceError: 모듈 is not defined
  * 모듈을 제대로 require 했는지 확인
* Error: Cannot find module 모듈명
  * 해당 모듈을 require 했지만 설치하지 않음. > npm i
* Error: Can't set headers after they are send
  * 요청에 대한 응답을 보낼 때 두 번 이상 보낸 경우. 요청에 대한 응답은 한 번만 보내야 함
* FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
  * 코드를 실행할 때 메모리가 부족하여 스크립트가 정상 작동하지 않는 경우. 
  * 코드가 잘못되었을 확률이 높지만, 코드가 정상이고 노드가 활용할 수 있는 메모리가 부족한 경우라면 노드의 메모리를 늘릴 수 있다.
    * `node --max-old-space-size={4096|SIZE} 파일명`
  * UnhandledPromiseRejectionWarning: Unhandled promise rejection
    * 프로미스 사용 시 catch 메소드를 붙이지 않았을 경우 발생.
  * EADDRINUSE 포트번호
    * 해당 포트 번호에 이미 다른 프로세스가 연결되어 있는 경우.
      * `lsof -i tcp:{포트}`
      * `kill -9 {프로세스아이디}`
  * EACCES 또는 EPERM
    * 노드가 작업을 수행하는 데 권한이 충분하지 않은 경우.
  * EJSONPARSE
    * package.json 등의 JSON 파일에 문법 오류가 있을 때 발생. 
  * ECONNREFUSED
    * 요청을 보냈으나 연결이 성립하지 않을 때 발생.
  * ETARGET
    * package.json 에 기록한 패키지 버전이 존재하지 않을 때 발생.
  * ETIMEOUT
    * 요청을 보냈으나 응답이 일정 시간 내 오지 않을 때 발생
  * ENOENT: no such file or directory
    * 지정한 폴더나 파일이 존재하지 않는 경우.

