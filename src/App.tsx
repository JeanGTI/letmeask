import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from './contexts/AuthContext'
 
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/rooms/new" Component={NewRoom} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App;
