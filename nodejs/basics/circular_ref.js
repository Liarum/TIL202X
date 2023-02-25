const dep1 = require('./circular_dep1');
const dep2 = require('./circular_dep2');

dep1(); // 순환 참조되는 대상을 빈 객체로 만든다. 에러를 발생시키지 않기 때문에 순환참조를 주의해야 한다.
dep2();
