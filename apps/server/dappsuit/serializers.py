from rest_framework import serializers
from . import models
from django.contrib.postgres.search import SearchVector

class SolanaProgramIDLSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.SolanaProgramIDL
        exclude = ['docs_search_text', 'program_search_text']
    
    def get_search_string_from_object_array(self, objects: list[dict], key: str) -> list[str]:
        search_str: list[str] = []
        for obj in objects:
            if (value := obj.get(key, None)) is not None:
                if not isinstance(value, list):
                    search_str.append(str(value))
                else:
                    search_str.append(" ".join(value))
        return search_str
                

    
    def generate_docs_search_text(self, validated_data: dict) -> str | None:
        docs = []
        if "docs" in validated_data:
            docs.append(" ".join(validated_data['docs']))
        docs += self.get_search_string_from_object_array(validated_data.get('instructions', []), 'docs')
        docs += self.get_search_string_from_object_array(validated_data.get('accounts', []), 'docs')
        docs += self.get_search_string_from_object_array(validated_data.get('types', []), 'docs')
        if len(docs) > 0:
            return " ".join(docs)
    
    def generate_program_search_text(self, validated_data: dict) -> str:
        search_text_strs: list[str] = [validated_data['name']]
        search_text_strs += self.get_search_string_from_object_array(validated_data.get('instructions', []), 'name')
        search_text_strs += self.get_search_string_from_object_array(validated_data.get('accounts', []), 'name')
        search_text_strs += self.get_search_string_from_object_array(validated_data.get('types', []), 'name')
        search_text_strs += self.get_search_string_from_object_array(validated_data.get('events', []), 'name')
        search_text_strs += self.get_search_string_from_object_array(validated_data.get('errors', []), 'name')
        search_text_strs += self.get_search_string_from_object_array(validated_data.get('errors', []), 'code')
        search_text_strs += self.get_search_string_from_object_array(validated_data.get('errors', []), 'msg')
        search_text_strs += self.get_search_string_from_object_array(validated_data.get('constants', []), 'name')
        return " ".join(search_text_strs)
    
    def create(self, validated_data: dict):
        validated_data['docs_search_text'] = self.generate_docs_search_text(validated_data)
        validated_data['program_search_text'] = self.generate_program_search_text(validated_data)
        return super().create(validated_data)
    
    def update(self, instance: models.SolanaProgramIDL, validated_data: dict):
        data = validated_data.copy()
        data['name'] = validated_data.get('name', instance.name)
        data['instructions'] = validated_data.get('instructions', instance.instructions)
        data['accounts'] = validated_data.get('accounts', instance.accounts)
        data['types'] = validated_data.get('types', instance.types)
        data['events'] = validated_data.get('events', instance.events)
        data['errors'] = validated_data.get('errors', instance.errors)
        data['constants'] = validated_data.get('constants', instance.constants)
        validated_data['docs_search_text'] = self.generate_docs_search_text(validated_data)
        validated_data['program_search_text'] = self.generate_program_search_text(validated_data)
        return super().update(instance, validated_data)