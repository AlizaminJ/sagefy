import React from 'react'
import { Link } from 'react-router-dom'
import { string, shape, arrayOf, number } from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { convertUuidToUuid58 as to58 } from 'uuid58'
import Layout from '../components/Layout'
import Icon from '../components/Icon'
import Footer from '../components/Footer'
import ListOfSubjects from '../components/ListOfSubjects'
import ListOfCards from '../components/ListOfCards'

const subjectsType = arrayOf(
  shape({
    entityId: string.isRequired,
    name: string.isRequired,
    body: string.isRequired,
  })
)
const cardsType = arrayOf(
  shape({
    kind: string.isRequired,
    name: string.isRequired,
  })
)

export default function SubjectPage({
  hash,
  role,
  subject: {
    entityId: subjectEntityId,
    name: subjectName,
    body: subjectBody,
    details: subjectDetails,
    childSubjects,
    beforeSubjects,
    afterSubjects,
    parentSubjects,
    cardCount,
    cards,
  },
}) {
  return (
    <Layout
      hash={hash}
      page="SubjectPage"
      title={subjectName}
      description={subjectBody}
    >
      <header>
        <div className="m-yc">
          <p>
            Subject <Icon i="subject" />
          </p>
          <h1>{subjectName}</h1>
        </div>
        <ReactMarkdown source={subjectBody} disallowedTypes={['heading']} />
        <form method="GET" action="/next">
          <input type="hidden" name="goal" value={to58(subjectEntityId)} />
          <button type="submit">
            <Icon i="select" /> Let&apos;s learn now
          </button>
        </form>
        {/* TODO <small>
          <ul class="ls-i ta-r">
            <li><a href="/mocks/follows">👂🏿 Follow</a></li>
            <li><a href="/mocks/talk">💬 Talk</a></li>
            <li><a href="/mocks/history">🎢 History</a></li>
            <li><a href="/mocks/update-subject">🌳 Edit</a></li>
          </ul>
        </small> */}
        {/* TODO stats section */}
      </header>
      <ListOfSubjects
        subjects={childSubjects.nodes}
        title="What's inside?"
        icon="child"
      />
      {subjectDetails && (
        <section>
          <h2>
            More about &quot;{subjectName}&quot; <Icon s="h2" i="cheer" />
          </h2>
          <ReactMarkdown source={subjectDetails} />
        </section>
      )}
      <ListOfSubjects
        subjects={parentSubjects.nodes}
        title="Want learn more? Try one of these&hellip;"
        icon="parent"
      />
      <ListOfSubjects
        subjects={beforeSubjects.nodes}
        title="Before this we recommend&hellip;"
        icon="before"
      />
      <ListOfSubjects
        subjects={afterSubjects.nodes}
        title="Learning this gets you ready for&hellip;"
        icon="after"
      />
      {cardCount > 0 && (
        <section>
          <h2>
            {cardCount} cards <Icon i="card" s="h2" /> in &quot;{subjectName}
            &quot;
          </h2>
          <ul>
            <ListOfCards cards={cards.nodes} kind="VIDEO" />
            <ListOfCards cards={cards.nodes} kind="PAGE" />
            <ListOfCards cards={cards.nodes} kind="CHOICE" />
            <ListOfCards cards={cards.nodes} kind="UNSCORED_EMBED" />
          </ul>
          <p>
            <Link to={`/create-card?subjectId=${to58(subjectEntityId)}`}>
              <Icon i="card" /> Help us make some cards
            </Link>
          </p>
        </section>
      )}

      <Footer role={role} />
    </Layout>
  )
}

SubjectPage.propTypes = {
  hash: string.isRequired,
  role: string,
  subject: shape({
    entityId: string.isRequired,
    name: string.isRequired,
    body: string.isRequired,
    details: string,
    childSubjects: subjectsType,
    beforeSubjects: subjectsType,
    afterSubjects: subjectsType,
    parentSubjects: subjectsType,
    cardCount: number.isRequired,
    cards: cardsType,
  }).isRequired,
}

SubjectPage.defaultProps = {
  role: 'sg_anonymous',
}