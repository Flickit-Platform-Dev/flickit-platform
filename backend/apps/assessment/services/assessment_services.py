import requests
from assessmentplatform.settings import ASSESSMENT_URL


def get_questionnaires_with_assessment_kit(request, assessment_kit_id):
    response = requests.get(
        ASSESSMENT_URL + f'assessment-core/api/assessments/{assessment_kit_id}/questionnaires',
        headers={'Authorization': request.headers['Authorization']})
    return {"Success": True, "body": response.json(), "status_code": response.status_code}


def assessment_delete(request, assessment_id):
    response = requests.delete(
        ASSESSMENT_URL + f'assessment-core/api/assessments/{assessment_id}',
        headers={'Authorization': request.headers['Authorization']})
    if response.status_code == 204:
        return {"Success": False, "body": None, "status_code": response.status_code}
    return {"Success": True, "body": response.json(), "status_code": response.status_code}


def edit_assessment(request, assessment_id):
    response = requests.put(
        ASSESSMENT_URL + f'assessment-core/api/assessments/{assessment_id}',
        json=request.data,
        headers={'Authorization': request.headers['Authorization']})
    return {"Success": True, "body": response.json(), "status_code": response.status_code}

def create_assessment(request):
    response = requests.post(
        ASSESSMENT_URL + f'assessment-core/api/assessments',
        json=request.data,
        headers={'Authorization': request.headers['Authorization']})
    return {"Success": True, "body": response.json(), "status_code": response.status_code}


def load_assessment(request, assessment_id):
    response = requests.get(
        ASSESSMENT_URL + f'assessment-core/api/assessments/{assessment_id}',
        headers={'Authorization': request.headers['Authorization']})
    return {"Success": True, "body": response.json(), "status_code": response.status_code}
