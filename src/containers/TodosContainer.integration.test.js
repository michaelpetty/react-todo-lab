import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { within } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import TodosContainer from './TodosContainer'
// import { act } from 'react-dom/test-utils'

jest.mock('axios')
const getResultsEmpty = {data: {
  todos: []
}}
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
  test('initial state', async () => {
    axios.get.mockResolvedValue(getResultsEmpty);
    await act( async () => {
      render(<TodosContainer />)
    })

    expect(screen.getByPlaceholderText('Honey, Do this')).toHaveValue('')
    expect(screen.getByRole('button', {name: /now/i}))
    expect(screen.getByTestId('todos-ul')).toBeEmptyDOMElement()
  })

  test('fetch and display todos',  async () => {
    axios.get.mockResolvedValue(getResults);
    await act( async () => {
      render(<TodosContainer />)
    })

    expect(await screen.findByTestId('todos-ul')).not.toBeEmptyDOMElement()
    expect(screen.getByText('Make pizza')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  test('create todo', async () => {
    axios.get.mockResolvedValue(getResults)
    axios.post.mockResolvedValue(postResults)
    await act( async () => {
      render(<TodosContainer />)
    })

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
    await act( async () => {
      render(<TodosContainer />)
    })

    const user = userEvent.setup()

    const todo = within((await screen.findAllByRole('listitem'))[0])
    expect(todo.getByTestId('todo-form')).not.toBeVisible()
    await user.click(todo.getByText('Edit'))
    expect(todo.getByTestId('todo-form')).toBeVisible()

    const body = todo.getByPlaceholderText(/Write a todo here/i)
    await user.type(body, 'pepperoni ', {initialSelectionStart: 4, initialSelectionEnd: 5})
    await user.click(todo.getByRole('button'))
    expect(await todo.findByText(/^Make pneepxpteroni pizza$/)).toBeInTheDocument()
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
