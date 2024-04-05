from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(
    r'profile',
    views.ProfileSpaceViewSet,
    basename='profile-space'
)

router.register(
    r'node',
    views.SpaceAppTreeNodeDetailViews,
    basename='node'
)

router.register(
    r'',
    views.SpaceViewSet,
    basename='space'
)




urlpatterns = [
    path('<int:space_id>/app/<slug:app_id>/node/', 
         views.SpaceAppTreeNodeListView.as_view()),
    path('', include(router.urls)),
    # path('node/', views.SpaceAppTreeNodeDetailViews.as_view()),
    # path('node/<slug:pk>/',  views.SpaceAppTreeNodeDetailViews.as_view())
]