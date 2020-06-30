import React, { useState } from 'react'

export function CounterWithName() {
  const [counter, setCounter] = useState(0)
  const [name, setName] = useState('Susan')

  return (
    <div className="p-4 border border-gray-400">
      <p className="py-2">
        Hi there {name}, the counter is {counter}
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCounter(counter + 1)}
      >
        Count!
      </button>
      <p>
        <input
          className="my-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </p>{' '}
    </div>
  )
}
