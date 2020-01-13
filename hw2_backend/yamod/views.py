from django.contrib.auth.decorators import permission_required
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from yamod.models import University, Course, Professor
from yamod.serializers import UniversityOptionSerializer, CourseListSerializer, CourseFormSerializer, \
    ProfessorOptionSerializer, UniversityFormSerializer, UniversityListSerializer


@swagger_auto_schema(method='GET', responses={200: UniversityOptionSerializer(many=True)})
@api_view(['GET'])
def university_option_list(request):
    universities = University.objects.all()
    serializer = UniversityOptionSerializer(universities, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=UniversityFormSerializer, responses={200: UniversityFormSerializer()})
@api_view(['POST'])
@permission_required('yamod.add_university', raise_exception=True)
def university_form_create(request):
    data = JSONParser().parse(request)
    serializer = UniversityFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=UniversityFormSerializer, responses={200: UniversityFormSerializer()})
@api_view(['PUT'])
@permission_required('yamod.change_university', raise_exception=True)
def university_form_update(request, pk):
    try:
        university = University.objects.get(pk=pk)
    except University.DoesNotExist:
        return Response({'error': 'University does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = UniversityFormSerializer(university, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: UniversityFormSerializer()})
@api_view(['GET'])
@permission_required('yamod.view_university', raise_exception=True)
def university_form_get(request, pk):
    try:
        university = University.objects.get(pk=pk)
    except University.DoesNotExist:
        return Response({'error': 'University does not exist.'}, status=404)

    serializer = UniversityFormSerializer(university)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('yamod.delete_university', raise_exception=True)
def university_delete(request, pk):
    try:
        university = University.objects.get(pk=pk)
    except University.DoesNotExist:
        return Response({'error': 'University does not exist.'}, status=404)
    university.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200: UniversityListSerializer(many=True)})
@api_view(['GET'])
@permission_required('yamod.view_university', raise_exception=True)
def university_list(request):
    university = University.objects.all()
    serializer = UniversityListSerializer(university, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: CourseListSerializer(many=True)})
@api_view(['GET'])
@permission_required('yamod.view_course', raise_exception=True)
def course_list(request):
    course = Course.objects.all()
    serializer = CourseListSerializer(course, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=CourseFormSerializer, responses={200: CourseFormSerializer()})
@api_view(['POST'])
@permission_required('yamod.add_course', raise_exception=True)
def course_form_create(request):
    data = JSONParser().parse(request)
    serializer = CourseFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=CourseFormSerializer, responses={200: CourseFormSerializer()})
@api_view(['PUT'])
@permission_required('yamod.change_course', raise_exception=True)
def course_form_update(request, pk):
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response({'error': 'Course does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = CourseFormSerializer(course, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: CourseFormSerializer()})
@api_view(['GET'])
@permission_required('yamod.view_course', raise_exception=True)
def course_form_get(request, pk):
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return Response({'error': 'Course does not exist.'}, status=404)

    serializer = CourseFormSerializer(course)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('yamod.delete_course', raise_exception=True)
def course_delete(request, pk):
    try:
        course = Course.objects.get(pk=pk)
    except University.DoesNotExist:
        return Response({'error': 'Course does not exist.'}, status=404)
    course.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200: ProfessorOptionSerializer(many=True)})
@api_view(['GET'])
def professor_option_list(request):
    professor = Professor.objects.all()
    serializer = ProfessorOptionSerializer(professor, many=True)
    return Response(serializer.data)
