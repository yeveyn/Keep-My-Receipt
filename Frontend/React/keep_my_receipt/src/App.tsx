import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookIndex from './domain/Book/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 밑에 Route들 추가하시면 됩니다! */}
        <Route path="/book/index" element={<BookIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
