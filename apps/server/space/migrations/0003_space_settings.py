# Generated by Django 5.0.3 on 2024-03-24 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('space', '0002_alter_space_about_alter_space_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='space',
            name='settings',
            field=models.JSONField(default=dict),
        ),
    ]
