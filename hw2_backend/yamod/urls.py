from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token

from . import views

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('professor/options', views.professor_option_list),
    path('university/list', views.university_list),
    path('university/options', views.university_option_list),
    path('university/create', views.university_form_create),
    path('university/<int:pk>/get', views.university_form_get),
    path('university/<int:pk>/update', views.university_form_update),
    path('university/<int:pk>/delete', views.university_delete),
    path('course/list', views.course_list),
    path('course/create', views.course_form_create),
    path('course/<int:pk>/get', views.course_form_get),
    path('course/<int:pk>/update', views.course_form_update),
    path('course/<int:pk>/delete', views.course_delete),


    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^api-token-auth/', obtain_jwt_token),
]
