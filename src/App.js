import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Main from "./components/Main/Main";
import Layout from "./components/Layout";
import Search from "./components/Search";
import VideoPage from "./components/VideoPage/VideoPage";
import NoLayout from "./components/NoLayout"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="search">
            <Route path=":query" element={<Search />} />
          </Route>
        </Route>

        <Route path="/video" element={<NoLayout />}>
          <Route path=":id" element={<VideoPage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
