from django.db import models

# Create your models here.

class POST(models.Model):
	id = models.AutoField(primary_key=True),
	title = models.CharField(max_length=100)
	content = models.CharField(max_length=1000)
	author = models.CharField(max_length=30)
	view_cnt = models.IntegerField(default=0)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(null=True)

class MENU(models.Model):
	code = models.CharField(max_length=20, primary_key=True)
	name = models.CharField(max_length=30)
	link = models.CharField(max_length=50)
	order = models.IntegerField()

class METADATA(models.Model):
	code = models.CharField(max_length=20, primary_key=True)
	name = models.CharField(max_length=30)
	int_val = models.IntegerField(null=True)
	char_val = models.CharField(max_length=100, null=True)