from sanic import Blueprint
from .content import content
from .info import info

api = Blueprint(content, info, url_prefix="/api")
