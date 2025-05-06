import { useState } from 'react'
import './App.css'
import CatViewer from './assets/components/CatViewer/CatViewer'
import Form from './assets/components/Form/Form'

function App() {

  const [url, setUrl] = useState(null)

  

  return (
    <div className="app">
      <Form setUrl={setUrl}/>
      <CatViewer url={url}/>
    </div>
  )
}

export default App
