import './App.css'
import Footer from './components/Footer'
import GenerateForm from './components/GenerateForm'
import Header from './components/Header'
// import UnderConstruction from './components/UnderConstruction'

function App() {
  return (
    <div className=" bg-zinc-800 min-h-screen flex flex-col h-screen justify-between">
      <Header />
      {/* <UnderConstruction/> */}
      <GenerateForm />
      <Footer />
    </div>
  )
}

export default App