# Generated by Django 5.0.3 on 2024-04-05 19:25

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dappsuit', '0006_alter_solanaprogramidl_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='solanaprogramidl',
            name='id',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=255, primary_key=True, serialize=False),
        ),
    ]
