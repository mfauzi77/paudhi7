import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ChatPage from "./pages/ChatPage";
import DataChart from "./pages/DataCharts";
import NewSlider from "./components/NewSlider";
import AboutPAUD from "./components/AboutPAUD";
import Footer from "./components/Footer";
import KLPage from "./pages/KLPage";
import PAUDStats from "./components/PAUDStats";
import Bidang from "./components/Bidang";
import AboutPAUD2 from "./components/AboutPAUD2";


function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            {/* Halaman Beranda (Menampilkan Slider & Deskripsi PAUD) */}
            <Route
              path="/"
              element={
                <div className="bg-white">
                <AboutPAUD />
                <AboutPAUD2 />
                <Bidang />
                <PAUDStats />
                <NewSlider />

                </div>
              }
            />

            {/* Halaman Chat */}
            <Route path="/chat" element={<ChatPage />} />

            {/* Halaman Data */}
            <Route path="/data" element={<DataChart />} />

            {/* Halaman K/L */}
            <Route path="/kl" element={<KLPage />} />

          </Routes>
        </div>
        <Footer /> {/* Footer akan muncul di semua halaman */}
      </div>
    </Router>
  );
}

export default App;
