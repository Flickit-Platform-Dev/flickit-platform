import pytest
import json

from rest_framework import status
from rest_framework.test import APIRequestFactory
from baseinfo.views import assessmentkitviews, commonviews
from baseinfo.models.questionmodels import Question, AnswerTemplate


@pytest.mark.django_db
class TestLoadOptionValuesWithAnswerTamplate:
    def test_load_option_values_when_answer_tamplate_exist(self, init_data):
        # init data
        base_info = init_data()

        # create request and send request
        answer_tamplate_id = base_info['answer_template'][0].id
        api = APIRequestFactory()
        request = api.get(f'/api/internal/answer-template/{answer_tamplate_id}/option-values/', {}, format='json')
        view = commonviews.LoadOptionValueInternalApi.as_view()
        resp = view(request, answer_tamplate_id)

        # responses testing
        option_value = base_info['option_value'][0]
        data = resp.data['items']

        assert resp.status_code == status.HTTP_200_OK
        assert data[0]['id'] == option_value.id
        assert data[0]['option_id'] == answer_tamplate_id
        assert data[0]['value'] == option_value.value
        assert data[0]['question_impact_id'] == option_value.question_impact.id

    def test_load_option_values_when_answer_tamplate_not_exist(self):
        # init data

        # create request and send request
        answer_tamplate_id = 1000
        api = APIRequestFactory()
        request = api.get(f'/api/internal/answer-template/{answer_tamplate_id}/option-values/', {}, format='json')
        view = commonviews.LoadOptionValueInternalApi.as_view()
        resp = view(request, answer_tamplate_id)

        # responses testing
        assert resp.status_code == status.HTTP_404_NOT_FOUND
        assert resp.data["message"] == "Object does not exists"


@pytest.mark.django_db
class TestLoadLevelCompetencesWithMaturityLevel:
    def test_load_level_competences_when_maturity_level_exist(self, init_data):
        # init data
        base_info = init_data()

        # create request and send request
        maturity_level_id = base_info['maturity_levels'][0].id
        api = APIRequestFactory()
        request = api.get(f'/api/internal/maturity-level/{maturity_level_id}/level-competences/', {}, format='json')
        view = assessmentkitviews.LoadLevelCompetenceInternalApi.as_view()
        resp = view(request, maturity_level_id)

        assert resp.status_code == status.HTTP_200_OK
        level_competences = base_info['level_competences']
        data = resp.data["items"]
        assert data[0]["id"] == level_competences[0].id

    def test_load_level_competences_when_maturity_level_not_exist(self):
        # init data

        # create request and send request
        maturity_level_id = 1000
        api = APIRequestFactory()
        request = api.get(f'/api/internal/maturity-level/{maturity_level_id}/level-competences/', {}, format='json')
        view = assessmentkitviews.LoadLevelCompetenceInternalApi.as_view()
        resp = view(request, maturity_level_id)

        assert resp.status_code == status.HTTP_404_NOT_FOUND
        assert resp.data["message"] == "Object does not exists"


@pytest.mark.django_db
class TestLoadQuestionsWithQualityAttribute:
    def test_load_questions_when_quality_attribute_exist(self, init_data):
        # init data
        base_info = init_data()

        # create request and send request
        quality_attribute_id = base_info['attributes'][0].id
        api = APIRequestFactory()
        request = api.get(f'/api/internal/quality-attribute/{quality_attribute_id}/question/', {}, format='json')
        view = commonviews.LoadQuestionInternalApi.as_view()
        resp = view(request, quality_attribute_id)

        assert resp.status_code == status.HTTP_200_OK
        questions = base_info['questions']
        data = resp.data["items"]
        assert data[0]["id"] == questions[0].id

    def test_load_questions_when_quality_attribute_not_exist(self):
        # init data

        # create request and send request
        quality_attribute_id = 1000
        api = APIRequestFactory()
        request = api.get(f'/api/internal/quality-attribute/{quality_attribute_id}/question/', {}, format='json')
        view = commonviews.LoadQuestionInternalApi.as_view()
        resp = view(request, quality_attribute_id)

        assert resp.status_code == status.HTTP_404_NOT_FOUND
        assert resp.data["message"] == "Object does not exists"


@pytest.mark.django_db
class TestLoadQualityAttributesWithAssessmentSubject:
    def test_load_quality_attributes_when_assessment_subject_exist(self, init_data):
        # init data
        base_info = init_data()

        # create request and send request
        assessment_subject_id = base_info['subject1'].id
        api = APIRequestFactory()
        request = api.get(f'/api/internal/assessment-subject/{assessment_subject_id}/quality-attributes/', {},
                          format='json')
        view = commonviews.LoadQualityAttributeInternalApi.as_view()
        resp = view(request, assessment_subject_id)

        assert resp.status_code == status.HTTP_200_OK
        attributes = base_info['attributes']
        data = resp.data["items"]
        assert data[0]["id"] == attributes[0].id

    def test_load_quality_attributes_when_assessment_subject_not_exist(self, init_data):
        # init data

        # create request and send request
        assessment_subject_id = 1000
        api = APIRequestFactory()
        request = api.get(f'/api/internal/assessment-subject/{assessment_subject_id}/quality-attributes/', {},
                          format='json')
        view = commonviews.LoadQualityAttributeInternalApi.as_view()
        resp = view(request, assessment_subject_id)

        assert resp.status_code == status.HTTP_404_NOT_FOUND
        assert resp.data["message"] == "Object does not exists"


@pytest.mark.django_db
class TestLoadQuestionImpactWithQuestionImpactId:
    def test_load_question_impact_when_question_impact_id_exist(self, init_data):
        # init data
        base_info = init_data()

        # create request and send request
        question_impact_id = base_info['question_impacts'][0].id
        api = APIRequestFactory()
        request = api.get(f'/api/internal/questionimpact/{question_impact_id}/', {}, format='json')
        view = commonviews.LoadQuestionImpactInternalApi.as_view()
        resp = view(request, question_impact_id)

        assert resp.status_code == status.HTTP_200_OK
        question_impacts = base_info['question_impacts']
        data = resp.data["items"]
        assert data[0]["id"] == question_impacts[0].id

    def test_load_question_impact_when_question_impact_id_not_exist(self):
        # init data

        # create request and send request
        question_impact_id = -1
        api = APIRequestFactory()
        request = api.get(f'/api/internal/questionimpact/{question_impact_id}/', {}, format='json')
        view = commonviews.LoadQuestionImpactInternalApi.as_view()
        resp = view(request, question_impact_id)

        assert resp.status_code == status.HTTP_404_NOT_FOUND
        assert resp.data["message"] == "Object does not exists"


@pytest.mark.django_db
class TestLoadAnswerOptionWithlistIds:
    def test_load_answer_option_with_list_when_ids_exist(self, init_data):
        base_info = init_data()
        answer_template = base_info['answer_template']

        api = APIRequestFactory()
        query_parms = ""
        query_parms += str(answer_template[0].id) + ','
        query_parms += str(answer_template[1].id) + ','

        answer_template_list = query_parms.split(',')
        answer_template_list = [int(x) for x in answer_template_list if x.isdigit()]
        count = AnswerTemplate.objects.filter(id__in=answer_template_list).count()

        request = api.get(f'/api/internal/v1/answer-options/?ids={query_parms}', {}, format='json')
        view = commonviews.LoadAnswerOptionWithlistIdInternalApi.as_view()
        resp = view(request)
        assert resp.status_code == status.HTTP_200_OK
        assert "items" in resp.data
        assert answer_template[0].id == resp.data["items"][0]["id"]
        assert count == len(resp.data["items"])

    def test_load_answer_option_with_list_when_ids_not_exist(self, init_data):
        base_info = init_data()
        api = APIRequestFactory()
        request = api.get(f'/api/internal/v1/answer-options/?ids=1100,100,a,x,2,,,', {}, format='json')
        view = commonviews.LoadAnswerOptionWithlistIdInternalApi.as_view()
        resp = view(request)
        assert resp.status_code == status.HTTP_200_OK
        assert "items" in resp.data
        assert 0 == len(resp.data["items"])

    def test_load_answer_option_with_list_when_ids_not_query_parms(self, init_data):
        base_info = init_data()

        api = APIRequestFactory()

        request = api.get(f'/api/internal/v1/answer-options/', {}, format='json')
        view = commonviews.LoadAnswerOptionWithlistIdInternalApi.as_view()
        resp = view(request)
        assert resp.status_code == status.HTTP_200_OK
        assert "items" in resp.data
        assert 0 == len(resp.data["items"])
