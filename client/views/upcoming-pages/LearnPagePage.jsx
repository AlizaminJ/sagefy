import React from 'react'
import Icon from '../components/Icon'

export default function LearnPagePage() {
  return (
    <div className="LearnPagePage">
      <section>
        <progress value={0.7} />
      </section>

      <section>
        <div>
          <p>
            Sound synthesis is the process of combining sounds to create new
            sounds. A synthesizer combines sound creating and modifying modules
            to create new sounds. Synthesizers come in a large range of styles
            and purposes. Some synthesizers have a specific purpose, like
            creating pad sounds or percussive instruments. Some synthesizers are
            more general purpose.
          </p>
          <p>
            <img
              src="https://raw.githubusercontent.com/heiskr/sagefy-electronic-music/master/images/25-basic-synthesizer/25.002.jpeg"
              title="image"
              alt="markdown"
            />
          </p>
          <p>
            For this video, we will discuss a basic two-oscillator synthesizer.
            There are many other types of synthesizers. Most have a similar base
            pattern. Recall the five basic properties of sound:
            <strong>amplitude, frequency, phase, duration, and spectrum</strong>
            . Our synthesizer will combine all of these properties.
          </p>
          <p>
            You can imagine the input as a MIDI keyboard. Which note I press is
            the frequency. The effort I press the key with is amplitude. How
            long I press the key is duration. So we start with frequency,
            amplitude, and duration.
          </p>
          <p>
            <img
              src="https://raw.githubusercontent.com/heiskr/sagefy-electronic-music/master/images/25-basic-synthesizer/25.004.jpeg"
              title="image"
              alt="markdown"
            />
          </p>
          <p>
            Frequency informs our two oscillators. Detuning one of our
            oscillators slightly can add an interesting effect. Duration and
            amplitude will feed into our ADSR envelope. Those two things will
            combine to create shaped notes at the correct pitch. Then, a second
            set of gain nodes allows us to balance the sound between the two
            oscillators. A filter can change the color of sound by reducing
            unpleasant frequency content. Then, we can set the sound in space
            with panning. Finally, we end at a gain node, so we can mix this
            synthesizer with other instruments. Its easy to expand on this very
            basic synthesizer. Adding effects such as delay, reverb, distortion,
            and compression can add interest. Using low-frequency oscillators
            can add continuous change to our sound, adding depth.
          </p>
          <p>
            <img
              src="https://raw.githubusercontent.com/heiskr/sagefy-electronic-music/master/images/25-basic-synthesizer/25.005.jpeg"
              title="image"
              alt="markdown"
            />
          </p>
        </div>
      </section>

      <section>
        <form action="/learn-unscored-embed/1">
          <button type="submit">
            <Icon i="card" /> Next Card
          </button>
        </form>
      </section>
    </div>
  )
}
