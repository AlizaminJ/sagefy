import React from 'react'
// import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Footer from '../components/Footer'

export default function SearchSubjectsPage() {
  return (
    <div className="SearchSubjectsPage">
      <section className="text-align-center">
        <h1>
          What do you want to learn? <Icon i="search" s="xxl" />
        </h1>
        <form action="/search-subjects">
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

      {/*

      <!-- Search results, skip if there are none -->
      <section>
        <h2>Choose from one of these subjects 📚</h2>

        <table>
          <tr>
            <td class="text-align-center collapse-margins">
              <p><button type="submit">👍</button></p>
              <pre><small>12 fans</small></pre>
            </td>
            <td class="collapse-margins">
              <h3>
                <mark
                  ><a href="/mocks/choose-next"
                    >🎧 An Introduction to Electronic Music</a
                  ></mark
                >
              </h3>
              <!-- This should immediately launch the learning experience! -->
              <!-- If a subject doesn't have enough cards, suggest creating cards or just following instead. -->
              <p>
                A small taste of the basics of electronic music. Learn the concepts
                behind creating and modifying sounds in an electronic music system.
                Learn the ideas behind the tools and systems we use to create
                electronic music.
              </p>
            </td>
          </tr>
          <tr>
            <td class="text-align-center collapse-margins">
              <p><button>👍</button></p>
              <pre><small>12 fans</small></pre>
            </td>
            <td class="collapse-margins">
              <h3>
                <a href="/mocks/choose-next">🎸 Let's Play Classical Guitar</a>
              </h3>
              <p>
                An introduction to classical guitar. Let's learn some chords. And how
                to read guitar tabulature.
              </p>
            </td>
          </tr>
          <tr>
            <td class="text-align-center collapse-margins">
              <p><button>👍</button></p>
              <pre><small>12 fans</small></pre>
            </td>
            <td class="collapse-margins">
              <h3>
                <a href="/mocks/choose-next">🎼 Welcome to Music Theory</a>
              </h3>
              <p>
                We'll cover the basics of how to read sheet music. Chords,
                progressions, and sequences. Harmony.
              </p>
            </td>
          </tr>
        </table>
      </section>

      <section>
        <p><mark>🤷🏽‍♀️ Not seeing what you want? 🤷🏽‍♀️</mark></p>
        <!-- alternative: We couldn't find anything (if couldn't find anything) -->

        <details>
          <summary><h2 class="display-inline-block">You can make a new subject 💡</h2></summary>

          <form action="/mocks/create-subject">
            <p>
              <label for="name">What should we call this new subject?</label>
              <input type="text" value="Music" placeholder="example: Introduction to Classical Guitar" size="40" id="name" name="name" autofocus>
            </p>

            <p>
              <label for="body">What are the goals of this subject?</label>
              <textarea placeholder="example: An introduction to classical guitar. Let's learn some chords. And how to read guitar tablature." cols="40" rows="4" id="body" name="body"></textarea>
            </p>

            <!--
              If the user isn't logged in, ask them to (optionally) sign up to get notified
            -->
            <p>
              <em>Advice: We recommend <a href="/mocks/sign-up?return=/mocks/create-subject">joining</a></em> 👩🏾‍💻<em> before you create content,<br>
              so you can easily continue later!</em>
            </p>

            <p>
              <button type="submit">📚 Create Subject</button>
            </p>
          </form>

        </details>

      </section>

      */}
      <Footer />
    </div>
  )
}
