import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Footer from '../components/Footer'

export default function SearchSubjectsPage() {
  return (
    <div className="SearchSubjectsPage">
      <section className="text-align-center">
        <h1>
          What do you want to learn? <Icon i="learn" s="xxl" />
        </h1>
        <form action="/mocks/search-subjects">
          <p>
            <input
              type="search"
              size="40"
              value="Music"
              placeholder="example: Music"
              autoFocus
            />
          </p>
          <p>
            <button type="submit">
              <Icon i="search" /> Search
            </button>
          </p>
        </form>
      </section>

      {/* Search results, skip if there are none
      <section>
        <h2>Choose from one of these subjects 📚</h2>
        <ul class="list-style-none">
          <li class="collapse-margins">
            <h3>
              <a href="/mocks/choose-unit">🎧 An Introduction to Electronic Music</a>
            </h3>
            {/* This should immediately launch the learning experience!
            <p>
              A small taste of the basics of electronic music. Learn the concepts
              behind creating and modifying sounds in an electronic music system.
              Learn the ideas behind the tools and systems we use to create
              electronic music.
            </p>
          </li>
          <li class="collapse-margins">
            <h3><a href="/mocks/choose-unit">🎸 Let's Play Classical Guitar</a></h3>
            <p>
              An introduction to classical guitar. Let's learn some chords. And how
              to read guitar tabulature.
            </p>
          </li>
          <li class="collapse-margins">
            <h3><a href="/mocks/choose-unit">🎼 Welcome to Music Theory</a></h3>
            <p>
              We'll cover the basics of how to read sheet music. Chords,
              progressions, and sequences. Harmony.
            </p>
          </li>
        </ul>
      </section> */}

      <section>
        {/* <p><mark>🤷🏽‍♀️ Not seeing what you want? 🤷🏽‍♀️</mark></p> */}
        {/* We couldn't find anything (if couldn't find anything) */}

        <h2>
          You can suggest a new subject <Icon i="suggest" />
        </h2>
        <ul className="list-style-none">
          <li>
            <button type="button" disabled>
              <Icon i="confirmed" />
            </button>{' '}
            Violin Basics
          </li>
          <li>
            <button type="button">
              <Icon i="up" />
            </button>{' '}
            Drop a beat
          </li>
          <li>
            <button type="button">
              <Icon i="up" />
            </button>{' '}
            <input type="text" value="Music" />
          </li>
          {/*
            If the user isn't logged in, ask them to (optionally) sign up to get notified
          */}
        </ul>
        <p>
          <Link to="/suggest">
            <Icon i="suggest" /> View all suggestions!
          </Link>
        </p>
      </section>

      {/*
      <section>
        <h2>...or learn by creating your subject! 🏗</h2>
        <p>
          <a href="/mocks/create-subject"
            >🌱 <strong>Build your own "Music" subject</strong>.</a
          >
        </p>
        <p><em>We'll show you how!</em> 👩🏼‍🏫 And we'll love you forever. 💕</p>
      </section> */}

      <Footer />
    </div>
  )
}
