from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt
import json

def get_users(request):
    users = User.objects.all().order_by('id')

    paginator = Paginator(users, 10) 
    page = request.GET.get('page')

    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)

    serializer = UserSerializer(users, many=True)

    total_users = User.objects.count() 
    return JsonResponse({'users': serializer.data, 'total_pages': (total_users // 10)+1}, safe=False)


def get_user(user_id):
    user = get_object_or_404(User, pk=user_id)
    serializer = UserSerializer(user)
    return JsonResponse(serializer.data)



@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return JsonResponse({'message': 'User created successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)


@csrf_exempt
def update_user(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

        serializer = UserSerializer(user, data=data)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    else:
        return JsonResponse({'error': 'Only PUT requests are allowed'}, status=405)


@csrf_exempt
def delete_user(request, user_id):
    try:
        user = get_object_or_404(User, pk=user_id)
    except:
        return JsonResponse({'error': 'User not found'}, status=404)

    user.delete()
    return JsonResponse({'message': 'User deleted successfully'}, status=204)