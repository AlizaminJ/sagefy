from modules.model import Model
from models.mixins.entity import EntityMixin
from modules.validations import is_required, is_string, is_list, \
    has_min_length
from models.unit_parameters import UnitParameters


class Unit(EntityMixin, Model):
    """
    A unit is the medium size in the Sagefy data structure system.
    A unit represents a unit of learning activity.
    A unit is defined by a single goal (objective). See Bloom’s Taxonomy.
    A unit should represent a goal that is as small as possible
    without becoming systemically redundant.
    An example of a unit is a small learning lesson,
    which may contain about five to eight minutes of information and
    30-60 minutes of practice to gain proficiency.
    """
    tablename = 'units'

    parametersCls = UnitParameters

    schema = dict(EntityMixin.schema.copy(), **{
        'body': {
            'validate': (is_required, is_string, (has_min_length, 1),)
        },
        'require_ids': {
            'validate': (is_list,),  # TODO-0 is valid id?
            'default': []
        },
    })

    def validate(self):
        errors = super().validate()
        if not errors:
            errors += self.ensure_no_cycles()
        return errors

    def ensure_no_cycles(self):
        """
        TODO-0 Ensure no require cycles form.
        """
        return []
