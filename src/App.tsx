import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from './contexts/AuthContext'
 
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";
import { NewAdminRoom } from "./pages/NewAdminRoom";


function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/rooms/new" Component={NewRoom} />
          <Route path="/rooms/:id" Component={Room} />
          <Route path="/admin/rooms/:id" Component={AdminRoom} />
          <Route path="/admin/rooms/new/:id" Component={NewAdminRoom} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App;
