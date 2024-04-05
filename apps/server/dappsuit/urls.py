from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(
    'solana',
    views.SolanaProgramIDLViewSet
)

urlpatterns = [
    path('spaces/<int:space_id>/programs/solana/', views.SpaceSolanaProgramIDLListView.as_view()),
    path('programs/', include(router.urls))
]