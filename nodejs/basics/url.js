/*
    WHATWG 방식으로 url을 처리 (node version >= 7)
 */
const url = require('url');

const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('-----------------------');


const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl));


// searchParams
const searchURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:', searchURL.searchParams);
console.log('searchParams.getAll():', searchURL.searchParams.getAll('category'));
console.log('searchParams.get():', searchURL.searchParams.get('limit'));
console.log('searchParams.has():', searchURL.searchParams.has('page'));

console.log('searchParams.keys():', searchURL.searchParams.has('page'));
console.log('searchParams.keys():', searchURL.searchParams.keys());
console.log('searchParams.values():', searchURL.searchParams.values());

searchURL.searchParams.append('filter', 'es3');
searchURL.searchParams.append('filter', 'es5');
console.log(searchURL.searchParams.getAll('filter'));

searchURL.searchParams.append('filter', 'es6');
console.log(searchURL.searchParams.getAll('filter'));

searchURL.searchParams.delete('filter');
console.log(searchURL.searchParams.getAll('filter'));

console.log('searchParams.toString():', searchURL.searchParams.toString());
searchURL.search = searchURL.searchParams.toString();

