import os

from sanic import Sanic
from sanic.response import HTTPResponse, text, json
from sanic.request import Request

from sanic import Blueprint
from my_blueprint import bp
from .api import api

app = Sanic(__name__)

### register blueprint to app instance
app.blueprint(bp)
app.blueprint(api)


### DB Setting
db_settings = {
	'DB_HOST' :  os.environ.get('LOL_HOST'),
	'DB_PORT' :  os.environ.get('LOL_PORT'),
	'DB_NAME' :  os.environ.get('LOL_DB_NAME'),
	'DB_USER' : os.environ.get('LOL_USER'),
	'DB_PASSWORD' : os.environ.get('LOL_PW'),
}
app.config.update(db_settings)



###############################################################################

@app.get("/")
async def index(request: Request) -> HTTPResponse:
	return text("Done")


@app.get('/new')
async def create_new(request):
	# new_thing = await do_create(request)
	return json({"created":True, "id":1}, status=201)




if __name__ == 'main':
	app()