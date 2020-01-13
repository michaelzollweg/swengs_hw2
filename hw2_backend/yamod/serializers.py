from rest_framework import serializers
from .models import University, Course, Professor


class UniversityFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'


class UniversityOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['id', 'name']


class UniversityListSerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['id', 'name']


class CourseListSerializer(serializers.ModelSerializer):
    university_name = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'name', 'type', 'university_name']

    def get_university_name(self, obj):
        return obj.university.name if obj.university else ''


class CourseFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class ProfessorOptionSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Professor
        fields = ['id', 'name']

    def get_name(self, obj):
        return ' '.join(filter(None, (obj.first_name, obj.last_name)))
