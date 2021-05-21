import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from './Home'

test('loads and displays greeting', () => {
  render(<Home />)

  const h2 = screen.getByRole('heading', {level: 2})
  expect(h2).toBeInTheDocument()
  expect(h2).toHaveTextContent('Happy Home Page Here')
})
