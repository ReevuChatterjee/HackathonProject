# Generated by Django 5.2.2 on 2025-06-08 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_userdocument'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdocument',
            name='diagnosis',
            field=models.TextField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='userdocument',
            name='uploaded_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
