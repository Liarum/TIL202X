import sys
import requests
from bs4 import BeautifulSoup

from sanic import Sanic
from sanic.response import HTTPResponse, json, text
from sanic.request import Request

app = Sanic('crawler')

def _get_main():
	url = 'https://finance.naver.com/'
	html = requests.get(url, verify=False)

	return html


@app.get('/')
async def index(request):
	html = _get_main()

	return text(html.text)


@app.get('/getData')
async def get_data(request):
	html = _get_main()

	soup = BeautifulSoup(html.text, 'html.parser')
	metas = soup.head.find_all('meta')
	res = {"meta": {}, "data": {}}

	for i in range(1, len(metas) + 1):
		res["meta"][i] = metas[i].get('content')
	
	return json(res)

@app.get('/getExchange')
async def get_exchange(request):
	h_id = 'h_exchange'
	html = _get_main()
	
	soup = BeautifulSoup(html.text, 'html.parser')
	ex_data = soup.body.find_all(h_id)
	select = soup.body.select('.h_exchange')

	for s in select:
		print(s)

	return text('200')




def main(argv):
	app.run(host='127.0.0.1', port=9999)

if __name__ == '__main__':
	main(sys.argv)