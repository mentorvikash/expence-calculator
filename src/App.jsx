import './App.css'

function App() {
  return (
    <>
      <router>
        <switch>
          <Route path='/' Component={Home} />
        </switch>
      </router>
    </>
  )
}

export default App
