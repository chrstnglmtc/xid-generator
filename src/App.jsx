import './App.css'
import Footer from './components/Footer'
import GenerateForm from './components/GenerateForm'
import Header from './components/Header'

function App() {
  return (
    <div className=" bg-zinc-800 min-h-screen flex flex-col">
      <Header />
      <GenerateForm />
      <Footer />
    </div>
  )
}

export default App