from sanic  import Sanic
from sanic.log import logger
from sanic.response import text


app = Sanic("loggin_example")

@app.route("/")
async def test(request):
	logger.info("Here is your log")
	return text("Hello World!")



if __name__ == "__main__":
	app.run(debug=True, access_log=True)