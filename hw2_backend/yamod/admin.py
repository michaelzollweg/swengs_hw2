from django.contrib import admin
from .models import *


class CourseAdmin(admin.ModelAdmin):
    list_filter = ('university__name',)


class ProfessorAdmin(admin.ModelAdmin): pass


class UniversityAdmin(admin.ModelAdmin): pass


admin.site.register(Course, CourseAdmin)
admin.site.register(Professor, ProfessorAdmin)
admin.site.register(University, UniversityAdmin)
