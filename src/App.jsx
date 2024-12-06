import React from 'react'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <div className='bg-background min-h-screen'>
      <Home/>
    </div>
    </Provider>
  )
}

export default App
