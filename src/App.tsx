import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from './contexts/AuthContext'
 
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/rooms/new" Component={NewRoom} />
          <Route path="/rooms/:id" Component={Room} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App;
