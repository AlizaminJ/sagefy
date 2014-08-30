from odm.model import Model, Field
from odm.validations import is_required, is_language, is_string


class Proposal(Model):
    """A discussion topic."""
    tablename = 'proposals'

    language = Field(
        validations=(is_required, is_language,),
        default='en'
    )
    user_id = Field(
        validations=(is_required, is_string,)
    )
    object_kind = Field(
        validations=(is_required, is_string,)
    )
    object_id = Field(
        validations=(is_required, is_string,)
    )
    object_version_id = Field(
        validations=(is_required, is_string,)
    )
    name = Field(
        validations=(is_required, is_string,)
    )
    action = Field(
        validations=(is_required, (is_one_of, 'create', 'update', 'delete')),
    )
    status = Field(
        validations=(is_required, (
            is_one_of, 'pending', 'blocked', 'accepted', 'declined'
        ))
    )