import { useState, useRef } from 'react'
import accessoryData from './accessory.json'
import DataTable from './DataTable.jsx'
import { useLocalStorage } from 'react-use'

function App() {
  // For a component, it must return a single JSX element.
  // So if you have multiple elements, you need to wrap them in a single element.
  // You can use <>...</> to wrap multiple elements (only in JSX).
  const quantityRef = useRef()
  const productRef = useRef()
  const [selectedItems, setSelectedItems] = useLocalStorage('selectedItems', [
    { id: 1, name: "Mouse", price: 10, quantity: 2 },
    { id: 2, name: "Keyboard", price: 20, quantity: 1 },
  ])

  const handleDelete = (id) => {
    setSelectedItems(selectedItems.filter(item => Number(item.id) !== Number(id)))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const productId = parseInt(productRef.current.value)
    const product = accessoryData.find(accessory => accessory.id === productId)
    const order = {
      ...product,
      quantity: Number(quantityRef.current.value)
    }
    setSelectedItems([...selectedItems, order])
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        Product: <select ref={productRef}>
          {accessoryData.map((accessory, index) => (
            <option key={index} value={accessory.id}>{accessory.name}</option>
          ))}
        </select><br />
        Quantity: <input type="number" ref={quantityRef} /><br />
        <button type="submit">Submit</button>
      </form>
      <DataTable data={selectedItems} onDelete={handleDelete} />
    </>
  )
}

export default App
