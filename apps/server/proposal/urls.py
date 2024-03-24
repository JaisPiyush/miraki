from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('space/', views.CreateSpaceAPIView.as_view(), name='create-proposal'),
    path('<int:space_pk>/space/', views.SpaceReadOnlyViewSet.as_view({'get': 'list'}), name='space-proposal-list'),
    path('<int:space_pk>/space/<int:pk>/', views.SpaceReadOnlyViewSet.as_view({'get': 'retrieve'}), name='space-proposal-retrieve')
]