import os

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import reverse

from .models import POST, MENU, METADATA

# Create your views here.

def post(request):
	# return HttpResponse("Hello world")
	# posts = POST.objects.order_by('-created_at')
	posts = POST.objects.raw("""
		SELECT * FROM crud_post ORDER BY created_at DESC
	""")
	menus = MENU.objects.order_by('order')
	return render(request, 'crud/post.html', {
		'posts' : posts,
		'menus' : menus,
	})

def detail(request, p_id):
	return render(request, 'crud/detail.html', {
		'post_id' : p_id
	})

def editor(request):
	key = request.GET.get('key')
	p_id = request.GET.get('p_id', 0)
	
	admin_key = os.environ.get('LOL_ADMIN_KEY')

	if key != admin_key:
		return redirect(reverse('crud:post'))

	menus = MENU.objects.order_by('order')
	if p_id > 0:
		pass

	return render(request, 'crud/editor.html', {
		'p_id' : p_id,
		'menus' : menus,
	})

def register(request, p_id=0):
	if p_id > 0:
		pass

	title = request.POST.get("title")
	content = request.POST.get("content")

	print(title)
	print(content)

	POST.objects.create(
		title=title,
		content=content,
		author = 'Lia',
	)
	
	return redirect(reverse('crud:post'))

def delete(request, p_id):
	pass



def pictures(request, pic_id=0):
	menus = MENU.objects.order_by('order')
	if pic_id > 0:

		pass

	return render(request, 'crud/pictures.html', {
		'menus' : menus,
		'pic_id' : pic_id,
	})



def aboutme(request):
	menus = MENU.objects.order_by('order')
	return render(request, 'crud/whoami.html', {
		'menus' : menus,
	})
