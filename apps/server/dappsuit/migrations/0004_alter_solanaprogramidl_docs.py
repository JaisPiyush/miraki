# Generated by Django 5.0.3 on 2024-04-05 07:32

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dappsuit', '0003_remove_solanaprogramidl_docs_search_vector_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='solanaprogramidl',
            name='docs',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TextField(blank=True), blank=True, default=list, null=True, size=None),
        ),
    ]