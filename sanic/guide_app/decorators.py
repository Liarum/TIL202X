from functools import wraps
from sanic.response import json

def authorized():
	def decorator(f):
		@wraps(f)
		async def decorated_function(request, *args, **kwargs):
			is_authorized = await check_request_for_authorization_status(request)

			if is_authorized:
				response = await f(request, *args, **kwargs)
				return response

			else:
				return json({"status" : "not_authorized"}, 403)
		return decorated_function
	return decorator

@app.route("/")
@authorized
async def test(request):
	return json({"status": "authorized"})
