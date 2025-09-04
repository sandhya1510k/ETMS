from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (TrainerViewSet, TraineeViewSet, LoginView , TraineeCountView, TrainerCountView)
# from .views import get_summary_counts
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = DefaultRouter()
router.register('trainers', TrainerViewSet)
router.register('trainees', TraineeViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    # path("summary-counts/", get_summary_counts, name="summary-counts"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('trainee-count/', TraineeCountView.as_view(), name='trainee-count'),
    path('trainer-count/', TrainerCountView.as_view(), name='trainer-count'),
    path('', include(router.urls)),
]



# router = DefaultRouter()
# router.register('trainers', TrainerViewSet)
# router.register('trainees', TraineeViewSet)

# urlpatterns = [
#     path('login/', LoginView.as_view(), name='login'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     path('trainee-count/', TraineeCountView.as_view(), name='trainee-count'),
#     path('trainer-count/', TrainerCountView.as_view(), name='trainer-count'),
#     path('', include(router.urls)),
# ]


