# Generated by Django 3.2.2 on 2021-05-21 07:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crud', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='metadata',
            name='char_val',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='metadata',
            name='int_val',
            field=models.IntegerField(null=True),
        ),
    ]