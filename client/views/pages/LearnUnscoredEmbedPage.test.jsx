import LearnUnscoredEmbedPage from './LearnUnscoredEmbedPage'

describe('LearnUnscoredEmbedPage', () => {
  it('should render LearnUnscoredEmbedPage', () => {
    expect(LearnUnscoredEmbedPage({ card: { data: {} } })).toMatchSnapshot()
  })
})
