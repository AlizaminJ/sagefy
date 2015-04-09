from framework.routes import get, post, abort
from models.set import Set
from models.topic import Topic
from framework.session import get_current_user

# Nota Bene: We use `set_` because `set` is a type in Python


@get('/api/sets/{set_id}')
def get_set_route(request, set_id):
    """
    Get a specific set given an ID.
    """

    set_ = Set.get_latest_canonical(set_id)
    if not set_:
        return abort(404)

    topics = Topic.list_by_entity_id(entity_id=set_id)
    versions = Set.get_versions(entity_id=set_id)
    units = set_.list_units()

    return 200, {
        'set': set_.deliver(),
        'topics': [topic.deliver() for topic in topics],
        'versions': [version.deliver() for version in versions],
        'units': [unit.deliver() for unit in units],
    }

    # TODO@ sequencer: learners, quality, difficulty


@get('/api/sets/{set_id}/versions')
def get_set_versions_route(request, set_id):
    """
    Get versions set given an ID. Paginates.
    """

    # TODO@ add pagination
    versions = Set.get_versions(entity_id=set_id)
    return 200, {
        'versions': [version.deliver(access='view') for version in versions]
    }


@get('/api/sets/{set_id}/tree/')
def get_set_tree_route(request, set_id):
    """
    TODO@ Render the tree of units that exists within a set.
    """

    return 400, {}

    # Contexts:
    # - Search set, preview units in set
    # - Pre diagnosis
    # - Learner view progress in set
    # - Set complete

    # TODO@ For the menu, it must return the name and ID of the set


@get('/api/sets/{set_id}/units')
def get_set_units_route(request, set_id):
    """
    TODO@ Render the units that exist within the set.
    Specifically, present a small number of units the learner can choose
    from.
    """

    current_user = get_current_user(request)
    if not current_user:
        return abort(401)
    return 400, {}

    # TODO@ For the menu, it must return the name and ID of the set


@post('/api/sets/{set_id}/units/{unit_id}',)
def choose_unit_route(request, set_id, unit_id):
    """
    TODO@ Updates the learner's information based on the unit they have chosen.
    """

    current_user = get_current_user(request)
    if not current_user:
        return abort(401)
    return 400, {}
