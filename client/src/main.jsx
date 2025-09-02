import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import StreamVideoProvider from './provider/StreamVideoProvider.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StreamVideoProvider>
      <App />
    </StreamVideoProvider>
  </BrowserRouter>
)
