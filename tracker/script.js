
// 페이지가 로드되면 현재 주소를 검사
// var loc = 'https://blog.naver.com/PostList.nhn?blogId=lar404&widgetTypeCall=true&topReferer=https%3A%2F%2Fsearch.naver.com%2Fsearch.naver%3Fwhere%3Dnexearch%26sm%3Dtop_hty%26fbm%3D1%26ie%3Dutf8%26query%3Dn%25EB%25B2%2588%25EC%25A7%25B8%2B%25EC%259A%25B0%25EC%25A3%25BC%25EB%25A8%25BC%25EC%25A7%2580&directAccess=true';

var loc = window.location.href;

if (loc == 'https://blog.naver.com/lar404')
{
	console.log(document.querySelector('body'));
	var gnb_name = document.querySelector('#gnb_name1').textContent;
}
else
{
	loc = loc.split('?')
	var params = loc[1].split('&');
	var blog_id = '';

	for (i in params)
	{
		var k_v = params[i].split('=');
		console.log(k_v[0]);
		if (k_v[0]=='blogId')
		{
			blog_id = k_v[1];
		}

		if (k_v[0]=='topReferer')
		{
			var s_url = decodeURI(decodeURI(k_v[1]));
			s_url = s_url.split("%26");
			
			for (i in s_url)
			{
				var tmp = s_url[i].split('%3D');
				if (tmp[0] == 'query')
				{
					console.log(tmp[1]);
					if (tmp[1].indexOf('n번째') > 0)
					{
						console.log(blod_id);
					}

				}
			}
		}
	}
}