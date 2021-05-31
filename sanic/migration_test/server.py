import os

from sanic import Sanic
from sanic.request import request
from sanic.response import json, HTTPResponse



app = Sanic("sanic_worker")
app.run(host='localhost', port=9999, access_log=True)


async def index(request):
	return HTTPResponse('200')

if __name__ == '__main__':
	app.run()