from django.urls import path

from baseinfo.views import expert_group_views

urlpatterns = [
    path('', expert_group_views.ExpertGroupsApi.as_view()),
    path('<str:expert_group_id>/', expert_group_views.ExpertGroupApi.as_view()),
]
