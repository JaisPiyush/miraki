# Generated by Django 5.0.3 on 2024-03-24 19:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('space', '0005_space_uid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='space',
            old_name='member_counts',
            new_name='members_counts',
        ),
        migrations.RenameField(
            model_name='space',
            old_name='proposal_counts',
            new_name='proposals_counts',
        ),
    ]
