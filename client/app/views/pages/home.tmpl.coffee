# TODO move copy to content directory
{div, img, hgroup, h1, h3, p, a, i} = require('../../modules/tags')

module.exports = ->
    return (
        div(
            {id: 'home', className: 'col-8'}
            img(
                {src: '/astrolabe.svg', id: 'logo'}
            )
            hgroup(
                h1('Sagefy')
                h3(
                    {className: 'subheader'}
                    'Open-content adaptive learning platform.'
                )
            )
            p(
                a({href: '/log_in'}, i({className: 'fa fa-sign-in'}), ' Log In')
                ' or '
                a({href: '/sign_up'}, i({className: 'fa fa-user'}), ' Sign Up')
            )
            p(
                {className: 'legal'}
                '© Copyright 2015 Sagefy. '
                a({href: '/terms'}, 'Privacy & Terms')
                '.'
            )
        )
    )
