from assessment.services.assessment_report_services import get_assessment_subject_report
from assessment.services.assessments_compare_services import get_subject_progres
from assessment.services.compare.models.assessment_report_model import AssessmentReportModel
from assessment.services.compare.models.common_model import AssessmentProgres, SubjectProgres
from assessment.services.compare.models.compare_model import Assessment, MaturityLevel, Progress, SubjectAssessment, \
    Attribute, AttributeAssessment, AssessmentCompareModel, Subject
from assessment.services.compare.models.subject_report_model import SubjectReportModel, StrengthModel, WeaknessModel
from assessmentplatform.settings import ASSESSMENT_URL

from assessment.services import maturity_level_services
from assessment.services import assessment_report_services, confidence_levels_services


def __get_assessment_progress(request, assessment_id):
    return AssessmentProgres.parse_obj(
        assessment_report_services.get_assessment_progress(request, assessment_id)["body"])


def __get_assessment_report(request, assessment_id):
    return AssessmentReportModel.parse_obj(
        assessment_report_services.get_assessment_report(request, assessment_id)["body"])


def __get_assessment_subject_report(request, assessment_id, subject_id):
    return SubjectReportModel.parse_obj(get_assessment_subject_report(request, assessment_id, subject_id)["body"])


def __get_assessment_subject_progress(request, assessment_id, subject_id):
    return SubjectProgres.parse_obj(
        get_subject_progres(request, assessment_id, subject_id)["body"])


def __get_confidence_levels_calculate_in_assessment_core(request, assessment_id):
    return AssessmentReportModel.parse_obj(
        confidence_levels_services.get_confidence_levels_calculate_in_assessment_core(request, assessment_id)["body"])


def __get_calculate_maturity_level(request, assessment_id):
    return AssessmentReportModel.parse_obj(
        confidence_levels_services.get_confidence_levels_calculate_in_assessment_core(request, assessment_id)["body"])


def get_assessment_object(assessment, assessment_progress):
    maturity_level = MaturityLevel.parse_obj(assessment.maturityLevel.dict())
    maturity_level.maturityLevelCount = assessment.assessmentKit.maturityLevelCount
    progress = Progress.parse_obj(get_progres_data(assessment_progress))
    return Assessment(id=assessment.id,
                      confidenceValue=assessment.confidenceValue,
                      title=assessment.title,
                      maturityLevel=maturity_level,
                      assessmentKit=assessment.assessmentKit.title,
                      progress=progress)


def check_subject_exists(subject_list, subject_id):
    if "id" in subject_list:
        if subject_list.id == subject_id:
            return True
    return False


def get_subject_object_exists(subject_list, subject):
    for subject_item in subject_list:
        if subject.id == subject.id:
            return subject


def check_attribute_exists(attribute_list, attributes):
    for attribute_item in attribute_list:
        if attributes.id == attribute_item.id:
            return True
    return False


def get_attribute_object_exists(attribute_list, attributes):
    for attribute_item in attribute_list:
        if attributes.attribute_id == attribute_item.id:
            return attributes


def top_title(top_list):
    list_title = list()
    for item in top_list:
        list_title.append(item.title)
    return list_title


def get_progres_data(progress):
    try:
        return {"answersCount": progress.answersCount,
                "questionsCount": progress.questionsCount, }
    except:
        return {"answersCount": progress.answerCount,
                "questionsCount": progress.questionCount, }


def get_assessment_subject_object(subject_report, subject_progress, assessment_id):
    maturity_level = MaturityLevel.parse_obj(subject_report.subject.maturityLevel.dict())
    maturity_level.maturityLevelCount = subject_report.maturityLevelsCount
    progress = Progress.parse_obj(get_progres_data(subject_progress))
    assessment = SubjectAssessment(assessmentId=assessment_id, maturityLevel=maturity_level,
                                   confidenceValue=subject_report.subject.confidenceValue,
                                   topStrengths=top_title(subject_report.topStrengths),
                                   topWeaknesses=top_title(subject_report.topWeaknesses),
                                   progress=progress
                                   )
    return assessment


def get_assessment_attribute_object(assessment_id, subject_report):
    maturity_level = MaturityLevel.parse_obj(subject_report.subject.maturityLevel.dict())
    maturity_level.maturityLevelCount = subject_report.maturityLevelsCount
    return AttributeAssessment(assessmentId=assessment_id, maturityLevel=maturity_level)


def get_attribute_object(subject_data, subject_report, attribute, assessment_id):
    if check_attribute_exists(subject_data.attributes, attribute):
        attribute_data = get_attribute_object_exists(subject_data.attributes, attribute)
    else:
        attribute_data = Attribute(id=attribute.id, title=attribute.title, index=attribute.index)
        subject_data.attributes.append(attribute_data)
    attribute_data.assessment.append(get_assessment_attribute_object(assessment_id, subject_report))
    return subject_data


def get_attribute_detail(subject_data, subject_report, assessment_id):
    for attribute in subject_report.attributes:
        subject_data = get_attribute_object(subject_data, subject_report, attribute, assessment_id)
    return subject_data


def get_subject_object(subject, subject_report, subject_progress, subjects, assessment_id):
    if check_subject_exists(subjects, subject.id):
        subject_data = get_subject_object_exists(subjects, subject)
        subject_data.assessments.append(get_assessment_subject_object(subject_report, subject_progress, assessment_id))
    else:
        subject_data = Subject(id=subject.id, title=subject.title)
        subject_data.assessments.append(get_assessment_subject_object(subject_report, subject_progress, assessment_id))
        subject_data = get_attribute_detail(subject_data, subject_report, assessment_id)
    return subject_data


def assessments_details(request, assessment_id, subjects):
    assessment_report = __get_assessment_report(request, assessment_id)
    assessment_progress = __get_assessment_progress(request, assessment_id)
    for subject in assessment_report.subjects:
        subject_progress = __get_assessment_subject_progress(request, assessment_id, subject.id)
        subject_report = __get_assessment_subject_report(request, assessment_id, subject.id)
        subjects = get_subject_object(subject, subject_report, subject_progress, subjects, assessment_id)

    return get_assessment_object(assessment_report.assessment, assessment_progress), subjects


def compare_services(request, assessment_ids):
    compare_model = AssessmentCompareModel()
    for assessment_id in assessment_ids:
        assessments = assessments_details(request, assessment_id, compare_model.subjects)
        compare_model.assessments.append(assessments[0])
        compare_model.subjects.append(assessments[1])
    return compare_model.dict()


def assessments_compare_service(request):
    assessment_ids = request.query_params.getlist("assessment_id")
    result = compare_services(request, assessment_ids)
    return {"Success": True, "body": result, "status_code": 200}
