import React from 'react'
import { shape, string } from 'prop-types'
import { convertUuidToUuid58 as to58 } from 'uuid58'
import Layout from './components/Layout'
import Icon from './components/Icon'
import Menu from './components/Menu'

export default function UnscoredEmbedCardPage({
  hash,
  card: {
    entityId: cardEntityId,
    name: cardName,
    data: { url },
    subject: { name: subjectName, entityId: subjectEntityId },
  },
}) {
  return (
    <Layout
      hash={hash}
      page="UnscoredEmbedCardPage"
      title={`Card: ${cardName}`}
      description="-"
    >
      <header>
        <div className="my-c">
          <p>
            Embed Card <Icon i="card" />
            <Icon i="embed" />
          </p>
          <h1>{cardName}</h1>
        </div>
        <p>
          Belongs to subject{' '}
          <a href={`/subjects/${to58(subjectEntityId)}`}>{subjectName}</a>
          {/* TODO breadcrumbs? */}
        </p>
        <form method="GET" action="/next">
          <input type="hidden" name="goal" value={to58(subjectEntityId)} />
          <button type="submit">
            <Icon i="select" /> Let&apos;s learn now
          </button>
        </form>

        <Menu
          items={[
            {
              href: `/unscored-embed-cards/${to58(cardEntityId)}/talk`,
              icon: 'talk',
              name: 'Talk',
            },
            {
              href: `/unscored-embed-cards/${to58(cardEntityId)}/history`,
              icon: 'history',
              name: 'History',
            },
            {
              href: `/unscored-embed-cards/${to58(cardEntityId)}/edit`,
              icon: 'edit',
              name: 'Edit',
            },
          ]}
        />
        {/* TODO stats */}
      </header>

      <section>
        <iframe src={url} width="600" height="400" title={cardName} />
      </section>
    </Layout>
  )
}

UnscoredEmbedCardPage.propTypes = {
  hash: string.isRequired,
  card: shape({
    name: string.isRequired,
    subject: shape({
      name: string.isRequired,
      entityId: string.isRequired,
    }).isRequired,
  }).isRequired,
}
