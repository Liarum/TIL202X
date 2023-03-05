# Today I Learn Node.js

## Core Features
1. Chrome V8 Javascript 엔진으로 빌드된 JavaScript Runtime
2. V8 + libuv
    * libuv 라이브러리는 이벤트 기반, 논 블로킹 I/O 모델을 구현
    * 이벤트 기반 구현을 위해서...
      * 이벤트 루프(Event Loop): 이벤트 발생 시 호출할 콜백 함수들을 관리하고, 호출된 콜백 함수의 실행 순서를 결정. 노드가 종료될 때까지 이벤트 처리 작업을 반복.
      * 태스크 큐(Task Queue): 이벤트 발생 후, 백그라운드에서 태스크 큐로 타이머나 이벤트 리스너의 콜백 함수를 보냄. 콜백 큐라고도 부름.
      * 백그라운드(Background): 이벤트 리스너들이 대기하는 곳. 여러 작업이 동시에 실행될 수 있음.
    * 논 블로킹 I/O 모델
      * 파일 시스템 접근이나 네트워크를 통한 요청 같은 I/O 작업을 백그라운드로 넘겨 동시에 처리.
      * 오래 걸리는 작업을 처리해야 하는 경우, 논 블로킹을 통해 실행 순서를 바꿔줌으로써 간단한 작업들이 대기하는 상황을 막을 수 있음
      * 논블로킹 =/= 동시
        * 동시성은 동시 처리가 가능한 작업을 논 블로킹 처리해야 얻을 수 있다.
3. 싱글스레드
    * CPU 연산을 많이 요구하는 작업일 경우 스레드 하나로 처리하기 어려움.

## Notes
* NodeJS 에서 동기와 비동기, 블로킹과 논블로킹
  * 동기와 비동기: 백그라운드 작업 완료 확인 여부
  * 블로킹과 논블로킹: 함수가 바로 return 되는지 여부
---
## Express
### Middleware
* 요청과 응답 중간에 위치하여 미들웨어라고 부른다.
* req, res, next를 매개변수로 가지는 함수이다.
  * 에러처리 미들웨어만 예외적으로 err, req, res, next를 가짐
* `app.use`, `app.get`, `app.post` 등으로 장착
  * 특정한 주소의 요청에만 미들웨어가 실행되게 하려면 첫 번째 인수로 주소를 넣으면 된다.
* 동시에 여러 개의 미들웨어를 장착할 수도 있음
  ```javascript
  app.use(
    morgan('dev'),
    express.start('/', path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(process.env.COOKIE_SECRET),
  )
  ```
* 다음 미들웨어로 넘어가려면 next 함수를 호출해야함.
  * 중간에 정적 파일을 제공하는 등의 응답을 보내면 다음 미들웨어는 실행되지 않는다.
  * next도 호출하지 않고 응답도 보내지 않으면 클라이언트는 응답을 받지 못해 계속해서 기다리게 됨.
* next 함수에 인수를 넣을 수도 있음
  * `next('route')` : 다음 라우터의 미들웨어로 바로 이동
    * 라우터에 연결된 나머지 미들웨어들을 건너뛰고 싶을 때 사용
    * 그 외의 인수를 넣는다면 바로 에러 처리 미들웨어로 이동
    ```javascript
    router.get('/', function(req, res, next) {
        next('route');
    }, function(req, res, next) {
        console.log('실행되지 않습니다.');
        next();
    }, function(req, res, next) {
        console.log('실행되지 않습니다.');
        next();
    });
    router.get('/', function(req, res) {
        console.log('실행됩니다.');
        res.send('Hello, Express!');
    });
    ```
* 미들웨어 간에 데이터를 전달하는 방법
  * 세션을 사용할 경우 req.session 객체에 데이터를 넣음
    * 세션이 유지되는 동안 데이터도 계속 유지됨
  * 요청이 끝날때까지만 데이터를 유지하고 싶은 경우 req객체에 데이터를 넣어두면 됨
    * 속성명을 정할 때 다른 미들웨어와 겹치지 않게 조심해야 함
  ```javascript
    app.use((req, res, next) => {
    req.data = {}; // 데이터 전달
    next();
  }, (req, res, next) => {
    console.log(req.data) // 데이터 받음
    next();
  });
  ```
  * `app.set`으로도 데이터를 저장할 수 있지만 `app.set`은 익스프레스에서 전역으로 사용되기 때문에 앱 전체의 설정을 공유할 때 사용하는 게 좋다.
* 미들웨어 사용 시 유용한 패턴
  * 미들웨어 안에 미들웨어를 넣는 방식: 기존 미들웨어의 기능을 확장할 수 있다.
  ```javascript
    app.use(morga('dev'));
    // 또는
    app.use((req, res, next) => {
        morgan('dev')(req, res, next);
    });
  
    // 조건문에 따라 다른 미들웨어를 적용하는 예시
    app.use((req, res, next) => {
        if (process.env.NODE_ENV === 'production') {
            morgan('combined')(req, res, next);
        } else {
            morgan('dev')(req, res, next);    
        } 
    });
  ```
* req, res 객체 살펴보기
  * 익스프레스의 req, res 객체는 http 모듈의 req, res 객체를 확장한 것.
    * 기존 http 모듈의 메서드도 사용할 수 있고, 익스프레스가 추가한 메서드나 속성을 사용할 수도 있다.
  * 자주 사용하는 메서드
    * req 객체
      * `req.app`: req객체를 통해 app객체에 접근. `req.app.get('port')` 와 같이 사용.
      * `req.body`: body-parser 미드루에어가 만드는 요청의 본문을 해석한 객체.
      * `req.cookies`: cookie-parse 미들웨어가 만드는 요청의 쿠키를 해석한 객체.
      * `req.ip`: 요청의 ip 주소가 담겨 있음.
      * `req.params`: 라우트 매개변수에 대한 정보가 담긴 객체.
      * `req.query`: 쿼리스트링에 대한 정보가 담긴 객체.
      * `req.signedCookies`: 서명된 쿠키들이 담겨있음.
      * `req.get(헤더이름)`: 헤더의 값을 가져오고 싶을 때 사용하는 메서드.
    * res 객체
      * `res.app`: req.app처럼 res객체를 통해 app객체에 접근.
      * `res.cookie(키, 값, 옵션)`: 쿠키를 설정하는 메서드.
      * `res.clearCookie(키, 값, 옵션)`: 쿠키를 제거하는 메서드.
      * `res.end()`: 데이터 없이 응답을 보냄.
      * `res.json(JSON)`: JSON 형식의 응답을 보냄.
      * `res.redirect(주소)`: 리다이렉트할 주소와 함께 응답을 보냄.
      * `res.render(뷰, 데이터)`: 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드.
      * `res.send(데이터)`: 데이터와 함께 응답을 보냄. 데이터는 문자열, HTML, 버퍼, 겍채, 배열 등 
      * `res.sendFile(경로)`: 경로에 위치한 파일을 응답.
      * `res.set(헤더, 값)`: 응답의 헤더를 설정.
      * `res.status(코드)`: 응답 시의 HTTP 상태 코드를 지정.
    * req, res 객체는 메서드 체이닝을 지원하는 경우가 많다.
      ```javascript
      // method chaining example
      res
      .status(201)
      .cookie('test', 'test')
      .redirect('/admin');
      ```
      
  


