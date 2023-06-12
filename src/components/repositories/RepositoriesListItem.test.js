// eslint-disable-next-line no-unused-vars
import { screen, render, act, } from '@testing-library/react'
import RepositoriesListItem from './RepositoriesListItem'
import { MemoryRouter } from 'react-router-dom'


// the component that is giving issue is the FileIcon component because it makes use of an useEffect hook to change the state after the RepositoriesListItem component has been rendered. so using module mock we can change how the component should work, 

function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'Javascript',
    description: 'react library',
    owner: {
      login: 'facebook'
    },
    name: 'react',
    html_url: 'https://github.com/facebook/react'
  }

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  )

  return { repository }
}

test('it should display a link to the github repo', async () => {
  const { repository } = renderComponent()

  // this will solve the act warning - method 1
  await screen.findByRole('img', {
    name: 'Javascript'
  })

  const link = screen.getByRole('link', {
    name: /github repository/i
  })

  expect(link).toHaveAttribute('href', repository.html_url)

  const element = screen.getByTestId('repo-link')
  expect(element).toBeInTheDocument()
})

// Any component that comes from react-router-dom will only work correctly when it is a context of react-router-dom, so in my code here I am calling the <RepositoriesListItem /> component and inside that component, I have a <Link> </Link> element, this test so far does not have a React Router Dom context so it will produce an error. 
/**
 * another way to look at is that our test will look up to see a context in the parent but it will not find it because we did not create it - the explanation is given in 3. Adding Router Context
 */

/**
 * according to stephen the best methods when u want to solve the act problem are
 * 1. using findBy and findAllBy
 * 2. using module mock  
 * 3. using pause method
 */

// #####################################################################

// using module mock to change how this test should percieve the FileIcon component, so if anyone in this test file tries to import FileIcon.js this jest mock is what would be used. So we use this method when the act problem is not coming from the component we are testing but from another component that is rendered inside the component we are testing and we don't care about that component.

// method 2
/*
jest.mock('../tree/FileIcon.js', () => {
  // this will now be the content of FileIcon.js
  return () => {
    return 'File Icon Component'
  }
})
test('it should display a link to the github repo using the mock method', () => {
  renderComponent()
})
*/

// #######################################################################

/*
test('it should display a link to the github repo using pause method', async () => {
  renderComponent()

  // open up an act window that would last for 100 milliseconds
  await act(async () => {
    await pause()
  })
})

const pause = () => new Promise(resolve => setTimeout(resolve, 100))
*/

// ##############################################################
test('shows a file icon with the appropriate icon', async () => {
  renderComponent()

  const icon = await screen.findByRole('img', { name: 'Javascript' })

  expect(icon).toHaveClass('js-icon')
})

test('shows a link to the code editor page', async () => {
  const { repository } = renderComponent()

  // const link = await screen.findAllByRole('link')
  // console.log(link)

  // const element = link[1]

  const element = await screen.findByTestId('editor-link')

  expect(element).toHaveAttribute('href', `/repositories/${repository.full_name}`)
})