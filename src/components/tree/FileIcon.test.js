import { render, screen } from "@testing-library/react"
import FileIcon from "./FileIcon"

test('the file icon component renders the correct icon', async () => {
  const props = {
    name: 'Javascript',
    className: 'shrink w-6 pt-1'
  }


  // screen.debug()

  render(<FileIcon name={props.name} className={props.className} />)



  await screen.findByRole('img', {
    name: 'Javascript'
  })

  const element = screen.getByRole('img')

  expect(element).toBeInTheDocument()
})

