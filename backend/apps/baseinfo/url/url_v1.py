from django.urls import path

from baseinfo.views import assessmentkitviews, commonviews, update_assessment_kit_views, user_access_views

urlpatterns = [
        path("<str:assessment_kit_id>/info/",assessmentkitviews.LoadAssessmentKitInfoEditableApi.as_view()),
        path("<str:assessment_kit_id>/stats/",assessmentkitviews.LoadAssessmentKitInfoStatisticalApi.as_view()),
        path("<str:assessment_kit_id>/",assessmentkitviews.EditAssessmentKitInfoApi.as_view()),
        path("<str:assessment_kit_id>/maturity-levels/",assessmentkitviews.LoadMaturityLevelApi.as_view()),
        path("<str:assessment_kit_id>/details/", assessmentkitviews.LoadAssessmentKitDetailsApi.as_view()),
        path("<str:assessment_kit_id>/details/subjects/<str:subject_id>/", commonviews.LoadAssessmentSubjectDetailsApi.as_view()),
        path("<str:assessment_kit_id>/details/attributes/<str:attribute_id>/", commonviews.LoadQualityAttributesDetailsApi.as_view()),
        path("<str:assessment_kit_id>/details/attributes/<str:attribute_id>/maturity-levels/<str:maturity_level_id>/", commonviews.LoadMaturityLevelsDetailsApi.as_view() ),
        path("<str:assessment_kit_id>/details/questionnaires/<str:questionnaire_id>/", commonviews.LoadQuestionnairesDetailsApi.as_view()),
        path("<str:assessment_kit_id>/details/questions/<str:question_id>/", commonviews.LoadQuestionDetailsApi.as_view()),
        path("<str:assessment_kit_id>/file/", assessmentkitviews.LoadAssessmentKitFileApi.as_view()),
        path("<str:assessment_kit_id>/update-by-dsl/", update_assessment_kit_views.AssessmentKitUpdateApi.as_view()),
        path("<str:assessment_kit_id>/users/", user_access_views.AssessmentKitUsersAccessApi.as_view()),
        path("<str:assessment_kit_id>/users/<uuid:user_id>/", user_access_views.DeleteUserAccessToAssessmentKitApi.as_view()),
            ]