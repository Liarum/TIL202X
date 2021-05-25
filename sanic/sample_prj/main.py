import sys
from sanic import Sanic, response
from sanic.response import text, json

app = Sanic('main')

@app.route("/")
async def test(request):
	return json({"hello" : "world"})

def main(argv):
	app.run(host='127.0.0.1', port=9999)

if __name__ == '__main__':
	main(sys.argv)