import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter } from 'react-router'
import HomeRoute from './HomeRoute'

const handlers = [
  rest.get('/api/repositories', (req, res, ctx) => {
    const query = req.url.searchParams.get('q').split('language:')[1]

    // the actual data in the real repo is about 10, I am just simulating 2
    return res(ctx.json({
      items: [
        { id: 1, full_name: `${query}_one` },
        { id: 2, full_name: `${query}_two` }
      ]
    }))
  })
]

const server = setupServer(...handlers)

// execute one time before all the test in this file
beforeAll(() => {
  server.listen()
})

// run the code after each test exection in this file
afterEach(() => {
  server.resetHandlers()
})

// run after all the test in this file has been executed
afterAll(() => {
  server.close()
})

/**
 * 1. create a test file
 * 2. understand the exact url, method, and return value of request that your component will make
 * 3. create a msw handler to intercept that request and return some fake data for your component to use
 * 4. setup beforeAll, afterEach, and afterAll hooks in your test file
 * 5. in a test, render the component. Wait for an element to be visible
 * 6. write assertions, to verify that the data from the request was used
 */

test('renders 2 links for each language', async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  )

  // await pause()
  // screen.debug()

  // loop over each language and
  const languages = [
    'python',
    'javascript',
    'java',
    'go',
    'typescript',
    'rust'
  ]

  // for each language make sure we see 2 links
  for (let language of languages) {
    const links = await screen.findAllByRole('link', {
      name: new RegExp(`${language}_`)
    })

    // assert that the links have the appropriate
    expect(links).toHaveLength(2)
    expect(links[0].textContent).toContain(`${language}_one`)
    expect(links[1].textContent).toContain(`${language}_two`)
    expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`)
    expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`)
  }

  /**
   * links can make use of the link text content to get the name
   * also note that paragraph does not have an implicit role, that explains why I cannot grab <p> using 'paragraph' role :: https://stackoverflow.com/a/65123080/9454082
   */
  const element = await screen.findByRole('link', {
    name: 'David'
  })

  expect(element).toBeInTheDocument()


})

// const pause = () => new Promise((resolve) => setTimeout(() => { resolve() }, 1000))

const pause = () => new Promise(resolve => {
  setTimeout(resolve, 100)
})