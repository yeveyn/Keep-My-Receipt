import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GroupIndex from './domain/Group/Index/index';
import GroupCreate from './domain/Group/Create/index';
import GroupSearch from './domain/Group/Search/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 밑에 Route들 추가하시면 됩니다! */}
        <Route path="/group/index" element={<GroupIndex />} />
        <Route path="/group/create" element={<GroupCreate />} />
        <Route path="/group/search" element={<GroupSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
