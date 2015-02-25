from models.cards.page_card import PageCard


def test_page_body(app, cards_table):
    """
    Expect a page card to require a body.
    """

    card, errors = PageCard.insert({
        'unit_id': 'RUF531',
        'name': 'What is?',
    })
    assert len(errors) == 1
    card, errors = card.update({'body': 'Testing 1234'})
    assert len(errors) == 0
