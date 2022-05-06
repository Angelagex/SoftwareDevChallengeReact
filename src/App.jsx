import './App.css'
import Header from './components/Header'
import StoreProvider from './components/StoreProvider'
import ToDoModule from './components/ToDoModule'

function App() {

  return (
    <StoreProvider>
        <Header />
        <ToDoModule />
    </StoreProvider>
  )
}

export default App
