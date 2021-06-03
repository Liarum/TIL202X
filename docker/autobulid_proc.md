# Docker Auto Build Proccess & Docker-compose

### 도커 이미지 생성

* 기본 환경이미지를 pull

  ```sh
  # pull image
  docker pull amazonlinux:2018.03
  
  # local에 저장된 image 리스팅
  docker images
  ```

* 이미지로 컨테이너를 띄우고 공통 환경을 구성

  * 서버, 언어, 프레임워크 설치 등등...

  ```sh
  # run image
  docker run --name {NAME} -v {LOCAL_PATH}:{CONTAINER_PATH} -p {LOCAL_PORT}:{CONTAINER_PORT} -itd {IMAGE NAME/ID} {COMMAND}
  ```

  * -i : `--interactive` , Keep STDIN open even if not attached / 표준입력과 표준출력을 키보드와 화면을 통해 가능하도록 하는 옵션
  * -t : `--tty` , Allocate a pseudo-TTY / 텍스트 기반의 터미널(TTY)을 애뮬레이션해주는 옵션
  * -d : `--detach`, Run container in background and print container ID

* 컨테이너를 이미지로 commit (후 원격 리포에 push해서 관리 가능)

  ```sh
  #commit
  docker commit {CONTAINER NAME/ID} {SAVED_NAME}
  
  # login to repo
  docker login {REPO_ADDRESS}
  
  # tagging
  docker tag {IMAGER_NAME/ID} {TAG}
  
  # push
  docker push {IMAGER_NAME/ID}
  ```

### 도커 컴포즈

* 필수 파일

  * docker-compose.yml
  * Dockerfile

* docker-compose.yml 작성

  * 예시

  ```yaml
  version: "3.9"
  services:
    proxy:
      build: ./proxy
      networks:
  
     - frontend
       app:
           build: ./app
           networks:
          - frontend
            backend
              db:
                image: postgres
                networks:
               - backend
  
  networks:
    frontend:
      # Use a custom driver
      driver: custom-driver-1
    backend:
      # Use a custom driver which takes special options
      driver: custom-driver-2
      driver_opts:
      foo: "1"
      bar: "2"
  
  
  ```
  
    * networks
      * mode : bridge(default), host, null
  
* Dockerfile

  * 예시

  ```
  FROM microsoft/nanoserver
  COPY testfile.txt c:\
  RUN dir c:\
  ```
### 도커 컨테이너 빌드

* docker-compose.yml 있는 경로로 이동 -> 명령어 실행

  ```sh
  docker-compose up -d --build
  ```



---

참고 자료

* 도커 커맨드 공식문서: https://docs.docker.com/engine/reference/commandline/docker/
* 도커컴포즈 공식 문서: https://docs.docker.com/compose/
* 도커컴포즈 spec github: https://github.com/compose-spec/compose-spec/blob/master/spec.md
* 도커파일 : https://docs.docker.com/engine/reference/builder/

