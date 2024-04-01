from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()

urlpatterns = [
    # path('', include(router.urls)),
    path('space/', views.CreateSpaceProposalAPIView.as_view(), name='create-proposal'),
    path('space/<int:pk>/', views.SpaceReadOnlyViewSet.as_view({'get': 'list'}), name='space-proposal-list'),
    path('<int:pk>/', views.SpaceReadOnlyViewSet.as_view({'get': 'retrieve'}), name='space-proposal-retrieve'),
    path('vote/', views.CreateProposalVoteAPIView.as_view())
]
