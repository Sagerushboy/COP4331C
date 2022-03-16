import { useState } from "react";

/*

TODO: Add routing
TODO: Add protected routes
TODO: Add loading screen for getting jwt
TODO: Install MUI and add to project
TODO: Add Axios for requests
TODO: Add interceptor or auth library to auto regenerate jwt

*/

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>The app has been created!</h1>
      <div>
        <h3>{count}</h3>
        <h3>Click the button to increase the count</h3>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    </div>
  );
}

export default App;
