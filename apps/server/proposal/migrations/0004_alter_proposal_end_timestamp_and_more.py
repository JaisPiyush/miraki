# Generated by Django 5.0.3 on 2024-03-24 21:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proposal', '0003_rename_votes_counts_proposal_votes_count'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proposal',
            name='end_timestamp',
            field=models.DateTimeField(default=datetime.datetime(2024, 3, 25, 21, 10, 43, 182619)),
        ),
        migrations.AlterField(
            model_name='proposal',
            name='start_timestamp',
            field=models.DateTimeField(default=datetime.datetime(2024, 3, 24, 21, 10, 43, 182598)),
        ),
    ]