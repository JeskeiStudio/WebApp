import { Routes, Route } from 'react-router-dom';
import { Web3Providers } from './lib/web3/providers';

import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Watch } from './pages/Watch';
import { Upload } from './pages/Upload';
import { Dashboard } from './pages/Dashboard';
import { Dao } from './pages/Dao';

export default function App() {
  return (
    <Web3Providers>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />

        <main className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:assetId" element={<Watch />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dao" element={<Dao />} />
          </Routes>
        </main>
      </div>
    </Web3Providers>
  );
}
