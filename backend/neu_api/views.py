from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Extract and process fields like data['first_name'], etc.
        return JsonResponse({'message': 'User registered successfully!'})
    return JsonResponse({'error': 'Invalid request'}, status=400)


from mongoengine import Document, StringField
from rest_framework.decorators import api_view
from rest_framework.response import Response

# MongoDB Document for User
class User(Document):
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    email = StringField(required=True)
    password = StringField(required=True)
    age = StringField()
    zip_code = StringField()

# API endpoint for user registration
@api_view(['POST'])
def register_user(request):
    try:
        data = request.data
        # Save to MongoDB
        User(**data).save()
        return Response({"status": "success", "message": "User registered successfully!"})
    except Exception as e:
        return Response({"error": str(e)}, status=400)
