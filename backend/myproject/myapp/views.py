# from django.contrib.auth import authenticate
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status, viewsets, permissions
# from .models import Trainer, Trainee
# from .serializers import TrainerSerializer, TraineeSerializer
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.contrib.auth.models import User
# # from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAdminUser
# from django.http import JsonResponse

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAdminUser
# from .models import Trainee, Trainer

# class TraineeCountView(APIView):
#     permission_classes = [IsAdminUser]

#     def get(self, request):
#         count = Trainee.objects.count()
#         return Response({'count': count})


# class TrainerCountView(APIView):
#     permission_classes = [IsAdminUser]

#     def get(self, request):
#         count = Trainer.objects.count()
#         return Response({'count': count})


# class IsAdminUser(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user and request.user.is_superuser

# class TrainerViewSet(viewsets.ModelViewSet):
#     queryset = Trainer.objects.all()
#     serializer_class = TrainerSerializer
#     permission_classes = [IsAdminUser]

# class TraineeViewSet(viewsets.ModelViewSet):
#     queryset = Trainee.objects.all()
#     serializer_class = TraineeSerializer
#     permission_classes = [IsAdminUser]

# class LoginView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')

#         # Superuser authentication by email -> username
#         try:
#             user_obj = User.objects.get(email=email)
#             username = user_obj.username
#         except User.DoesNotExist:
#             username = None

#         user = authenticate(username=username, password=password)
#         if user and user.is_superuser:
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'role': 'admin',
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token)
#             })

#         # Trainer authentication
#         try:
#             trainer = Trainer.objects.get(email=email)
#             if trainer.check_password(password):
#                 # TODO: Generate real JWT token for trainer if needed
#                 return Response({'role': 'trainer', 'token': 'trainer_token_placeholder'})
#         except Trainer.DoesNotExist:
#             pass

#         # Trainee authentication
#         try:
#             trainee = Trainee.objects.get(email=email)
#             if trainee.check_password(password):
#                 # TODO: Generate real JWT token for trainee if needed
#                 return Response({'role': 'trainee', 'token': 'trainee_token_placeholder'})
#         except Trainee.DoesNotExist:
#             pass

#         return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# @api_view(["GET"])
# @permission_classes([IsAdminUser])
# def get_summary_counts(request):
#     trainee_count = Trainee.objects.count()
#     trainer_count = Trainer.objects.count()
#     return JsonResponse({
#         "trainees": trainee_count,
#         "trainers": trainer_count
#     })


from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from .models import Trainer, Trainee
from .serializers import TrainerSerializer, TraineeSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser

class TraineeCountView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        count = Trainee.objects.count()
        return Response({'count': count})


class TrainerCountView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        count = Trainer.objects.count()
        return Response({'count': count})


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser


class TrainerViewSet(viewsets.ModelViewSet):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer
    permission_classes = [IsAdminUser]


class TraineeViewSet(viewsets.ModelViewSet):
    queryset = Trainee.objects.all()
    serializer_class = TraineeSerializer
    permission_classes = [IsAdminUser]


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user_obj = User.objects.get(email=email)
            username = user_obj.username
        except User.DoesNotExist:
            username = None

        user = authenticate(username=username, password=password)
        if user and user.is_superuser:
            refresh = RefreshToken.for_user(user)
            return Response({
                'role': 'admin',
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            })

        try:
            trainer = Trainer.objects.get(email=email)
            if trainer.check_password(password):
                return Response({'role': 'trainer', 'token': 'trainer_token_placeholder'})
        except Trainer.DoesNotExist:
            pass

        try:
            trainee = Trainee.objects.get(email=email)
            if trainee.check_password(password):
                return Response({'role': 'trainee', 'token': 'trainee_token_placeholder'})
        except Trainee.DoesNotExist:
            pass

        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
