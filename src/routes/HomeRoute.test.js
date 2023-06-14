import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter } from 'react-router'
import HomeRoute from './HomeRoute'

const handlers = [
  rest.get('/api/repositories', (req, res, ctx) => {
    const query = req.url.searchParams.get('q')

    console.log(query)

    return res(ctx.json({
      items: [
        { id: 1, full_name: 'full name' },
        { id: 2, full_name: 'another name' }
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

  // loop over each language and 
  // for each language make sure we see 2 links
  // assert that the links have the appropriate full_name
})