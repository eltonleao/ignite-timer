import { createContext, useContext, useState } from 'react'

interface HomeContextData {
  teste: string
  setTeste: (teste: string) => void
}

const HomeContext = createContext({} as HomeContextData)

function ComponentA() {
  const { teste, setTeste } = useContext(HomeContext)
  return (
    <div>
      <h1>Component A: {teste}</h1>
      <button
        onClick={() => {
          setTeste('kajdshksajd')
        }}
      >
        click
      </button>
    </div>
  )
}

function ComponentB() {
  const { teste } = useContext(HomeContext)
  return (
    <div>
      <h1>Component B: {teste}</h1>
    </div>
  )
}

export function Home() {
  const [teste, setTeste] = useState('teste')
  return (
    <HomeContext.Provider value={{ teste, setTeste }}>
      <ComponentA />
      <ComponentB />
    </HomeContext.Provider>
  )
}
