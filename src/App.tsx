import { useState } from "react"

const App = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="app">
            <button onClick={() => setCount(count => count - 1)}>-</button>
            <div className="count">
                {count}
            </div>
            <button onClick={() => setCount(count => count + 1)}>+</button>
        </div>
    )
}

export default App;