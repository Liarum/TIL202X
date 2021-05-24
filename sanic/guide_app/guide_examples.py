from sanic import Sanic, Blueprint
from sanic.response import text, json, redirect
from sanic.views import HTTPMethodView, CompositionView, stream

import asyncio

### get app
app = Sanic.get_app(__name__)

### Sanic 인스턴스가 하나인 경우 인수없이 호출하면 해당 인스턴스 반환
onlyone_app = Sanic.get_app()

### __name__ 앱이 없을 경우 에러를 뱉지 않고 새로 생성함
force_create_app = Sanic.get_app(
    __name__,
    force_create=True,
)

### Request - Context Request
@app.on_request
async def run_before_handler(request):
	request.ctx.user = await fetch_user_by_token(request.token)


@app.route('/hi')
async def hi_my_name_is(request):
	return text("Hi, my name is {}".format(request.ctx.user.name))

### Request - Connection Context
@app.on_request
async def increment_foo(request):
	if not hasattr(request.conn_info.ctx, "foo"):
		request.con_info.ctx.foo = 0
	request.conn_info.ctx.foo += 1


@app.get("/")
async def count_foo(request):
	return text(f"request.conn_info.ctx.foo={request.conn_info.ctx.foo}")

### Request - Parameters
@app.router("/tag/<tag>")
async def tag_handler(request, tag):
	return text("Tag - {}".format(tag))


### Request - Arguments
async def get_args(request):
	args = request.args
	args2 = request.query_args
	return text("Args : {}, Query_args".format(args, args2))



### Response
@app.post("/")
async def create_new(request):
	new_thing = await do_create(request)
	return json({"created":True, "id":new_thing.thing_id}, status=201)


### Decorator
@app.route('/text', methods=["POST", "PUT"])
async def handler(request):
	return text("OK")
"""
@app.get, @app.post, @app.put, @app.petch, @app.delete, @app.head, @app.options 사용 가능
"""

### Path Parameters
@app.get("/tag/<tag>")
async def tag_handler(request, tag):
	return text("Tag - {}".format(tag))

app.get("/foo/<foo_id:uuid>")
async def uuid_handler(request, foo_id: UUID):
	return text("UUID - {}".format(foo_id))


### Generateing URL
@app.route("/")
async def index(request):
	url = app.url_for("post_handler", post_id=5)
	return redirect(url)

@app.route("/posts/<post_id>")
async def post_handler(request, post_id):
	pass


### Customizing route name
@app.get("/get", name="get_handler")
def handler(request):
	return text("OK")


### Websockets routes
async def handler(request, ws):
	message = "Start"
	while True:
		await ws.send(message)
		message = ws.recv()
app.add_websocket_route(handler, "/test")

@app.websocket("/test")
async def handler(request, ws):
	message = "Start"
	while True:
		await ws.send(message)
		message = ws.recv()

### Strict Slashes
"""
precedence levels : Route > Blueprint > BlueprintGroup > Application
"""

app = Sanic(__file__, strict_slashes=True)
@app.get("/get", strict_slashes=False)
def handler(request):
	return text("OK")

bp = Blueprint(__file__, strict_slashes=True)
@bp.get("/bp/get", strict_slashes=False)
def handler(request):
	return text("OK")


bp1 = Blueprint(name="bp1", url_prefix="/bp1")
bp2 = Blueprint(
	name="bp2",
	url_prefix="/bp2",
	strict_slashes=False,
)
group = Blueprint.group([bp1, bp2], strict_slashes=True)



### Static files
app.static("/", "/path/to/index.html") # individual file

app.static(
	"/user/uploads",
	"/path/to/uploads",
	name="uploads",
) # endpoint

app.url_for(
	"static",
	name="static",
	filename="file.txt"
) # '/static/file.txt'


### Listener

"""
main_process_start : main startup
before_server_start : worker startup
after_server_start : worker startup
before_server_stop : worker shutdown
after_server_stop : worker shutdown
main_process_stop : main shutdown
"""
async def setup_db(app, loop):
	app.ctx.db = await db_setup()

app.register_listener(setup_db, "befor_server_start")

@app.listener("before_server_start")
async def setup_db(app, loop):
	app.ctx.db = await db_setup()

@app.before_server_start
async def setup_db(app, loop):
	app.ctx.db = await db_setup()


### Attaching middelware
async def extract_user(request):
	request.ctx.user = await extract_user_from_request(request)
app.register_middleware(extract_user, "request")

@app.middelware("request")
async def extract_user(request):
	request.ctx.user = await extract_user_from_request(request)

@app.middelware("response")
async def prevent_xss(request, response):
	response.headers["x-xss-protection"] = "1; mode=block"


### Middleware Modification
"""
Request middleware : add_key
Route handler : index
Response middelware : prevent_xss
Response middelware : custom_banner
"""
@app.middleware("request")
async def add_key(request):
	request.ctx.foo = "bar"

@app.middelware("response")
async def custom_banner(request, response):
	response.headers["Server"] = "Fake-Server"

@app.middelware("response")
async def prevent_xss(request, response):
	response.headers["x-xss-protection"] = "1; mode=block"

@app.get("/")
async def index(request):
	return text(request.ctx.foo)


### Header
@app.route("/")
async def handler(request):
	return text(request.token)

@app.route("/")
async def handler(request):
	return json(
		{
			"foo_weakref" : request.headers["foo"],
			"foo_get" : request.headers.get["Foo"],
			"foo_getone" : request.headers.getone["FOO"],
			"foo_getall" : request.headers.getall["f0o"],
			"all" : list(request.headers.items()),
		}
	)

### Response
@app.route("/")
async def handler(request):
	return text("Done.", headers={"content-language":"en-US"})

@app.middleware("response")
async def add_csp(request, response):
    response.headers["content-security-policy"] = "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self';base-uri 'self';form-action 'self'"


### Cookie
# read Cookie
@app.route("/cookie")
async def test(request):
	test_cookie = request.cookies.get("test")
	return text("Test cookie : {}".format(test_cookie))

# set Coookie
@app.route("/cookie")
async def test(request):
	response = text("There's a cooklie up in this response")
	response.cookies["test"] = "it worked!"
	response.cookies["test"]["domain"] = ".yummy-yummy-cookie.com"
	response.cookies["test"]["httponly"] = True
	return response

# delete Cookie
@app.route("/cookie")
async def test(request):
	response = text("Time to eat some cookies ...")
	del response.cookies["kill_me"]

	response.cookies["short_life"] = "Glad to be here"
	response.cookies["short_life"]["max-age"] = 5
	del response.cookies["favorite_color"]


	response.cookies["favorite_color"] = "blue"
	response.cookies["favorite_color"] = "pink"
	del response.cookies["favorite_color"]

	return response


### Background Jobs
async def notify_server_started_after_five_seconds():
	await asyncio.sleep(5)
	print("Server successfully started!!")

app.add_task(notify_server_started_after_five_seconds())

# auto inject
async def auto_inject(app):
	await asyncio.sleep(5)
	print(app.name)
app.add_task(auto_inject)

# explicit inject
async def explicit_inject(app):
	await asyncio.sleep(5)
	print(app.name)
app.add_task(explicit_inject)



### Class Based View

### Class Based View - HTTPMethodView
class FooBar(HTTPMethodView):
	async def get(self, request):
		pass

	async def post(self, request):
		pass

	async def put(self, request):
		pass

app.add_route(FooBar.as_view(), "/foobar") # one endpoint has multiple method

class NameView(HTTPMethodView):
	def get(self, request, name):
		return text("Hello {}".format(name))

app.add_route(NameView.as_view(), "/<name>")

class ViewWithDecorator(HTTPMethodView):
	decorators = ['some_decorator_here']
	def get(self, request, name):
		return text("Hello I have a decorator")

	def post(self, request, name):
		return text("Hello I also have a decorator")
	
app.add_route(ViewWithDecorator.as_view(), "/url")

class ViewWithSomeDecorator(HTTPMethodView):
	@staticmethod
	@some_decorator_here
	def get(request, name):
		return text("Hello I have decorator")
	
	def post(self, request, name):
		return text("Hello I don't have any decorators")

	@some_decorator_here
	def patch(self, request, name):
		return text("Hello I have a decorator")



### Class Based View - CompositionView
def get_handler(request):
	return text("I am a get method")

view = CompositionView()
view.add(["GET"], get_handler)
view.adD(["POST", "PUT"], lambda request: text("I am a post/put method"))

app.add_route(view, "/")




### Streaming
class SimpleView(HTTPMethodView):
	@stream
	async def post(self, request):
		result = ""
		while True:
			body = await request.stream.read()
			if body is None:
				break
			result += body.decode("utf-8")
		return text(result)


	
@app.post("/stream", stream=True)
async def handler(request):
	body = await request.stream.read()
	pass