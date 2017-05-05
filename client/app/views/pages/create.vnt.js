const broker = require('../../modules/broker')
const tasks = require('../../modules/tasks')
const {getFormValues, parseFormValues} =
    require('../../modules/auxiliaries')
const setSchema = require('../../schemas/set')
const unitSchema = require('../../schemas/unit')
const {closest} = require('../../modules/utilities')

module.exports = broker.add({
    'click .create__route'(e, el) {
        if(e) e.preventDefault()
        const [,, kind, step] = el.pathname.split('/')
        tasks.resetCreate()
        tasks.updateCreateRoute({kind, step})
    },

    'submit .create--set-create form'(e, el) {
        if(e) e.preventDefault()
        let values = getFormValues(el)
        values = parseFormValues(values)
        const errors = tasks.validateForm(values, setSchema,
            ['name', 'language', 'body', 'members'])
        if(errors && errors.length) { return }
        const data = {
            topic: {
                name: `Create a Set: ${values.name}`,
                entity: {
                    id: '1rk0jS5EGEavSG4NBxRvPkZf',
                    kind: 'unit',
                }
            },
            post: {
                kind: 'proposal',
                body: `Create a Set: ${values.name}`,
            },
            sets: [{
                name: values.name,
                body: values.body,
                members: values.members,
            }],
        }
        tasks.createSetProposal(data)
    },

    'submit .create--unit-create form'(e, el) {
        if(e) e.preventDefault()
        let values = getFormValues(el)
        values = parseFormValues(values)
        values.require_ids = values.require_ids &&
            values.require_ids.map(rmap => rmap.id) ||
            []
        const errors = tasks.validateForm(values, unitSchema,
            ['name', 'language', 'body', 'require_ids'])
        if(errors && errors.length) { return }
        tasks.addMemberToAddUnits(values)
        tasks.route('/create/unit/list')
    },

    'submit .create--set-add__form'(e, el) {
        if(e) e.preventDefault()
        const q = el.querySelector('input').value
        tasks.search({ q, kind: 'unit,set' })
    },

    'submit .create--unit-add__form'(e, el) {
        if(e) e.preventDefault()
        const q = el.querySelector('input').value
        tasks.search({ q, kind: 'unit' })
    },

    'click .create--set-add__add'(e, el) {
        if(e) e.preventDefault()
        const {kind, id, name, body} = el.dataset
        tasks.addMemberToCreateSet({kind, id, name, body})
    },

    'click .create--unit-add__add'(e, el) {
        if(e) e.preventDefault()
        const {id, name, body} = el.dataset
        tasks.addMemberToAddUnits({id, name, body})
    },

    'click .create--set-create .form-field--entities__a'(e, el) {
        if(e) e.preventDefault()
        const form = closest(el, 'form')
        const values = getFormValues(form)
        tasks.createSetData(values)
    },

    'click .create--unit-create .form-field--entities__a'(e, el) {
        if(e) e.preventDefault()
        const form = closest(el, 'form')
        let values = getFormValues(form)
        values = parseFormValues(values)
        tasks.stowProposedUnit(values)
        tasks.route('/create/unit/create/add')
    },

    'click .create--set-create .form-field--entities__remove'(e, el) {
        if(e) e.preventDefault()
        const id = el.id
        tasks.removeMemberFromCreateSet({id})
    },

    'click .create--unit-find__choose'(e, el) {
        if(e) e.preventDefault()
        const {id, name} = el.dataset
        tasks.createChooseSetForUnits({id, name})
    },

    'submit .create--unit-find__form'(e, el) {
        if(e) e.preventDefault()
        const q = el.querySelector('input').value
        tasks.search({ q, kind: 'set' })
    },

    'submit .create--unit-create-add__form'(e, el) {
        if(e) e.preventDefault()
        const q = el.querySelector('input').value
        tasks.search({ q, kind: 'unit' })
    },

    'click .create--unit-create-add__add'(e, el) {
        if(e) e.preventDefault()
        const {id, name, body} = el.dataset
        tasks.addRequireToProposedUnit({id, name, body, kind: 'unit'})
    }

    /* 'click .create--unit-list__remove'(e, el) {
        if(e) e.preventDefault()
        // TODO
    },

    'click .create--unit-list__submit'(e, el) {
        if(e) e.preventDefault()
        // TODO
    }, */
})
