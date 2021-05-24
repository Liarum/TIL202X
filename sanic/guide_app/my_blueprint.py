from sanic.response import json, text
from sanic import Blueprint


from .app import app

bp = Blueprint("my_blueprint")

@bp.route("/")
async def bp_root(request):
	return json({"my" : "blueprint"})


### middelware
@bp.middleware
async def print_on_request(request):
	print("I am a spy")

@bp.middleware("request")
async def halt_request(request):
	return text("I halted the request")

@bp.middleware("response")
async def halt_response(request, response):
	return text("I halted the response")


### middleware of blueprint group
bp1 = Blueprint("bp1", url_prefix="/bp1")
bp2 = Blueprint("bp2", url_prefix="/bp2")
@bp1.middleware("request")
async def bp1_only_middleware(request):
	print("applied on Blueprint : bp1 Only")

@bp1.route("/")
async def bp1_route(request):
	return text("bp1")

@bp2.route("/<param>")
async def bp2_route(request, param):
	return text(param)


group = Blueprint.group(bp1, bp2)
@group.middelware("request")
async def group_middleware(request):
	print("common middleware applied for both bp1 and bp2")

# Register Blueprint group under the app
app.blueprint(group)

@bp.exception(NotFound)
def ignore_404s(request, exception):
	return text("Yep, I totally found the page : {}".format(request.url))

### Static Handler
bp.Blueprint("bp", url_prefix="bp")
bp.static("/web/path", "/folder/to/serve")
bp.static("/web/path", "/folder/to/serve", name="uploads")
print(app.url_for("static", name="bp.uploads", filename="file.txt"))	# '/bp/web/path/file.txt'

### Listener
@bp.listener("before_server_start")
async def before_server_start(app, loop):
	pass

@bp.listener("afeter_server_start")
async def after_server_start(app, loop):
	pass

### Version Managing
auth1 = Blueprint("auth", url_prefix="/auth", version=1)
auth2 = Blueprint("auth", url_prefix="/auth", version=2)

app.blueprint(auth1)
app.blueprint(auth2)


### BlueprintGroup
auth = Blueprint("auth", url_prefix="/auth")
metrics = Blueprint("metrics", url_prefix="/metrics")

group = Blueprint.group([auth, metrics], version="v1")