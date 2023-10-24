import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContentPage } from "./pages/ContentPage";
import { HomePage } from "./pages/HomePage";
import { GenrePage } from "./pages/GenrePage";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/series" element={<GenrePage filter={'series'} />} />
            <Route path="/movies" element={<GenrePage filter={'movie'} />} />

            <Route path="/series/*" element={<ContentPage />} />
            <Route path="/movie/*" element={<ContentPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

  )
}