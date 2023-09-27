import { useState } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const add = () => {
        setCount(2)
    }
    return (
        <>
            <div>
                <p>这是main分支</p>
                {count}
                <button onClick={add}>add</button>
            </div>
        </>
    )
}

export default App
