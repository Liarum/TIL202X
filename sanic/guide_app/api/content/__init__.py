from sanic import Blueprint
from .static import static
from .authors import authors


content = Blueprint(static, authors, url_prefix="/content")