import json
import rethinkdb as r


def prep(sets_table, users_sets_table, db_conn):
    sets_table.insert([{
        'entity_id': 'A1',
        'name': 'A',
        'body': 'Apple',
        'created': r.now(),
        'modified': r.now(),
        'canonical': True,
    }, {
        'entity_id': 'B2',
        'name': 'B',
        'body': 'Banana',
        'created': r.now(),
        'modified': r.now(),
        'canonical': True,
    }, {
        'entity_id': 'C3',
        'name': 'C',
        'body': 'Coconut',
        'created': r.now(),
        'modified': r.now(),
        'canonical': True,
    }, {
        'entity_id': 'D4',
        'name': 'D',
        'body': 'Date',
        'created': r.now(),
        'modified': r.now(),
        'canonical': True,
    }]).run(db_conn)
    users_sets_table.insert({
        'user_id': 'abcd1234',
        'set_ids': [
            'A1',
            'C3',
        ],
        'created': r.now(),
        'modified': r.now(),
    }).run(db_conn)


def test_get_user_sets(db_conn, c_user, sets_table, users_sets_table):
    """
    Expect to get a list of the user's sets.
    """

    prep(sets_table, users_sets_table, db_conn)
    response = c_user.get('/api/users/abcd1234/sets/')
    assert response.status_code == 200
    response = json.loads(response.data.decode())
    assert len(response['sets']) == 2
    assert response['sets'][0]['body'] in ('Apple', 'Coconut')


def test_get_user_sets_401(db_conn, app, users_sets_table):
    """
    Expect get user sets to 401 when not logged in.
    """

    response = app.test_client().get('/api/users/abcd1234/sets/')
    assert response.status_code == 401


def test_get_user_sets_403(db_conn, c_user, users_sets_table):
    """
    Expect to 403 if trying to get other user's sets.
    """

    response = c_user.get('/api/users/1234dcba/sets/')
    assert response.status_code == 403


def test_add_set(db_conn, c_user, sets_table, users_sets_table):
    """
    Expect to add a set to the user's list.
    """

    sets_table.insert({
        'entity_id': 'A1',
        'name': 'A',
        'body': 'Apple',
        'created': r.now(),
        'modified': r.now(),
        'canonical': True,
    }).run(db_conn)

    response = c_user.post('/api/users/abcd1234/sets/A1/')
    assert response.status_code == 200
    response = json.loads(response.data.decode())
    assert 'A1' in response['sets']


def test_add_set_401(db_conn, app, users_sets_table):
    """
    Expect to 401 when trying to add a set but not logged in.
    """

    response = app.test_client().post('/api/users/abcd1234/sets/2/')
    assert response.status_code == 401


def test_add_set_403(db_conn, c_user, users_sets_table):
    """
    Expect to 403 when attempt to add to another user's sets.
    """

    response = c_user.post('/api/users/1234dbca/sets/2/')
    assert response.status_code == 403


def test_add_set_404(db_conn, c_user, users_sets_table):
    """
    Expect to 404 if set not found.
    """

    response = c_user.post('/api/users/abcd1234/sets/Z9/')
    assert response.status_code == 404


def test_add_set_already_added(db_conn, c_user, sets_table, users_sets_table):
    """
    Expect to 400 if already added set.
    """

    sets_table.insert({
        'entity_id': 'A1',
        'name': 'A',
        'body': 'Apple',
        'created': r.now(),
        'modified': r.now(),
        'canonical': True,
    }).run(db_conn)

    response = c_user.post('/api/users/abcd1234/sets/A1/')
    assert response.status_code == 200
    response = c_user.post('/api/users/abcd1234/sets/A1/')
    assert response.status_code == 400


def test_remove_set(db_conn, c_user, sets_table, users_sets_table):
    """
    Expect to remove a set from the user's list.
    """

    sets_table.insert({
        'entity_id': 'A1',
        'name': 'A',
        'body': 'Apple',
        'created': r.now(),
        'modified': r.now(),
        'canonical': True,
    }).run(db_conn)

    users_sets_table.insert({
        'user_id': 'abcd1234',
        'set_ids': ['A1'],
    })

    response = c_user.delete('/api/users/abcd1234/sets/A1/')
    assert response.status_code == 404


def test_remove_set_401(db_conn, app, users_sets_table):
    """
    Expect to 401 when trying to remove a user set not logged in.
    """

    response = app.test_client().delete('/api/users/abcd1234/sets/2/')
    assert response.status_code == 401


def test_remove_set_403(db_conn, c_user, users_sets_table):
    """
    Expect forbidden when trying to remove another user's set.
    """

    response = c_user.delete('/api/users/1234dcba/sets/2/')
    assert response.status_code == 403


def test_remove_set_404(db_conn, c_user, users_sets_table):
    """
    Expect to not found when trying to delete an unadded set.
    """

    response = c_user.delete('/api/users/abcd1234/sets/A1/')
    assert response.status_code == 404