from django.urls import path

from . import views

app_name = 'crud'

urlpatterns = [
	path('', views.post, name='post'),
	path('editor', views.editor, name='editor'),
	path('pics', views.pictures, name='pics'),
	path('whoami', views.aboutme, name='whoami'),
	path('register', views.register, name='register'),
]