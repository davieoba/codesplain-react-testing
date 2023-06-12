import { screen, render } from "@testing-library/react"
import RepositoriesSummary from "./RepositoriesSummary"


test('it displays the primary language of the repository', () => {
  const repository = {
    stargazers_count: 1,
    forks: 200,
    open_issues: 10,
    language: 'Javascript'
  }

  render(<RepositoriesSummary repository={repository} />)

  const language = screen.getByText('Javascript')

  expect(language).toBeInTheDocument()
})

test('displays information about the repository', () => {
  const repository = {
    stargazers_count: 11,
    forks: 200,
    open_issues: 10,
    language: 'Javascript'
  }

  render(<RepositoriesSummary repository={repository} />)

  for (let key in repository) {
    const value = repository[key]
    const element = screen.getByText(new RegExp(value))
    expect(element).toBeInTheDocument()
  }
})
