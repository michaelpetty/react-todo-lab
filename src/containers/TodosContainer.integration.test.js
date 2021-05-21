import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { within } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import TodosContainer from './TodosContainer'

jest.mock('axios')
const getResults = {data: {
  todos: [
    {
      _id: 87634,
      body: 'Make pizza'
    },
    {
      _id: 7478,
      body: 'Finish homework'
    },
    {
      _id: 929,
      body: 'Mow the lawn'
    },
  ]
}}
const postResults = {
  data: {
    _id: 9239,
    body: 'do this next'
  }
}
const deleteResults = {
  data: {
    _id: 7478,
    body: 'Finish homework'
  }
}

describe('TodosContainer', () => {
  test('initial state', () => {
    axios.get.mockResolvedValue(getResults);
    render(<TodosContainer />)

    expect(screen.getByPlaceholderText('Honey, Do this')).toHaveValue('')
    expect(screen.getByRole('button', {name: /now/i}))
    expect(screen.getByTestId('todos-ul')).toBeEmptyDOMElement()
  })

  test('fetch and display todos',  async () => {
    axios.get.mockResolvedValue(getResults);
    render(<TodosContainer />)

    expect(await screen.findByTestId('todos-ul')).not.toBeEmptyDOMElement()
    expect(screen.getByText('Make pizza')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  test('create todo', async () => {
    axios.get.mockResolvedValue(getResults)
    axios.post.mockResolvedValue(postResults)
    render(<TodosContainer />)

    expect(await screen.findAllByRole('listitem')).toHaveLength(3)
    const createInp = screen.getByPlaceholderText(/honey, do this/i)
    expect(createInp).toHaveValue('')
    userEvent.type(createInp, postResults.data.body)
    userEvent.click(screen.getByText(/now!/i))
    expect(await screen.findByText(postResults.data.body)).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })

  test('update todo', async () => {
    axios.get.mockResolvedValue(getResults)
    axios.put.mockResolvedValue({})
    render(<TodosContainer />)

    const todo = within((await screen.findAllByRole('listitem'))[0])
    expect(todo.getByTestId('todo-form')).not.toBeVisible()
    userEvent.click(todo.getByText('Edit'))
    expect(todo.getByTestId('todo-form')).toBeVisible()

    const body = todo.getByPlaceholderText(/Write a todo here/i)
    body.setSelectionRange(5,5)
    userEvent.type(body, 'pepperoni ')
    userEvent.click(todo.getByRole('button'))
    expect(await todo.findByText(/^Make pepperoni pizza$/)).toBeInTheDocument()
  })

  // test('delete todo', async () => {
  //   axios.get.mockResolvedValue(getResults)
  //   axios.delete.mockResolvedValue(deleteResults)
  //   render(<TodosContainer />)
  //
  //   const todo = within((await screen.findAllByRole('listitem'))[1])
  //   expect(todo.getByText(/Finish homework/)).toBeInTheDocument()
  //   userEvent.click(todo.getByText(/remove/i))
  //   expect(await todo.findByText(/Finish homework/)).not.toBeInTheDocument()
  //   expect(screen.getAllByRole('listitem')).toHaveLength(3)
  // })
})
