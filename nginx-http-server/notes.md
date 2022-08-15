# Reading Notes: NGINX HTTP SERVER (written by Clement Nedelcu))


### How to Update Nginx Server Without Stopping

1. 기존 엔진엑스 실행파일을 새것으로 교체 (기본 위치: `/usr/local/nginx/sbin/nginx`)
2. 엔진엑스 주 프로세스의 PID 확인 `ps x | grep nginx | grep master`
3. USR2(12) 신호를 주 프로세스에 보낸다. `kill -USR2 {PID}` 이를 통해 기존 .pid 파일명이 바뀌고 새 실행 파일이 실행됨으로써 업그레이드가 시작된다.
4. 기존 주 프로세스에 WIWNCH(28) 신호를 보낸다. `kill -WINCH {PID}` 이를 통해 기존 작업자  프로세스들이  작업이 끝난 순서대로 점차 종료된다.
5. 기존 작업자프로세스가 모두 종료되었는지 확인한 후, 기존 주 프로세스에 QUIT 신호를 보낸다. `kill -QUIT {PID}`



