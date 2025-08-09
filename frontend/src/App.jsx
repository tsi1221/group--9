import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h3>🧠💻 Welcome to INSA SUMMER CAMP 2025! 💻🧠
🌍 Group Project powered by Passion, Code & Collaboration 👨‍💻👩‍💻
</h3>
 <h3>🧠💻 Welcome to INSA SUMMER CAMP 2025! 💻🧠
🌍 Group Project powered by Passion, Code & Collaboration 👨‍💻👩‍💻
</h3>
   <button onClick={() => setCount((count) => count + 1)}>
          lets start to work as ateam sprerte{count}
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          lets push ourself out of comfort zone{count}
        </button>
      </div>
     
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
       
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
// Edited by Tsehay on August 4
