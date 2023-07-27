import {Route,Routes, useNavigate, Navigate} from 'react-router-dom';

import MobileNavbar from './components/Navbar/MobileNavbar';
import Navbar from './components/Navbar/Navbar';
import AdminLoginPage from './pages/AdminLoginPage';
import AutocompletePage from './pages/AutocompletePage';
import CollapsibleContentPage from './pages/CollapsibleContentPage';
import CreateEmployeePage from './pages/CreateEmployeePage';
import CSSPropertiesPage from './pages/CSSPropertiesPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import IFramesPage from './pages/IFramesPage';
import ImagesPage from './pages/ImagesPage';
import LinksPage from './pages/LinksPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import MultipleTabsPage from './pages/MultipleTabsPage';
import PopupPage from './pages/PopupPage';
import SearchEmployeePage from './pages/SearchEmployeePage';
import SliderPage from './pages/SliderPage';
import TooltipPage from './pages/TooltipPage';
import Context from './context/context';
import { useContext, useEffect } from 'react';

function App() {
  const {user}=useContext(Context);
  

  return (
    <div>
      {user && <Navbar />}
      {user && <MobileNavbar />}
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/Home/Index" element={user?<HomePage/>:<Navigate to="/" replace />} />;
        <Route path="/Account/ForgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/Account/AdminLogin" element={<AdminLoginPage />} />
        <Route path="/Employee/Create" element={user?<CreateEmployeePage />:<Navigate to="/" replace />} />
        <Route path="/Employee/Search" element={user?<SearchEmployeePage />:<Navigate to="/" replace />} />
        <Route path="/Employee/edit/:empId" element={user?<CreateEmployeePage />:<Navigate to="/" replace />} />
        <Route path="/Home/Tabs" element={user?<MultipleTabsPage />:<Navigate to="/" replace />} />
        <Route path="/Home/Menu" element={user?<MenuPage />:<Navigate to="/" replace />} />
        <Route path="/Home/Autocomplete" element={user?<AutocompletePage />:<Navigate to="/" replace />} />
        <Route path="/Home/Collapse" element={user?<CollapsibleContentPage />:<Navigate to="/" replace />} />
        <Route path="/Home/UpLoadImage" element={<ImagesPage />} />
        <Route path="/Home/Slider" element={user?<SliderPage />:<Navigate to="/" replace />} />
        <Route path="/Home/Tooltip" element={user?<TooltipPage />:<Navigate to="/" replace />} />
        <Route path="/Home/Popup" element={user?<PopupPage />:<Navigate to="/" replace />} />
        <Route path="/Home/Links" element={user?<LinksPage />:<Navigate to="/" replace />} />
        <Route path="/Home/CSSProperty" element={user?<CSSPropertiesPage />:<Navigate to="/" replace />} />
        <Route path="/Home/Iframe" element={user?<IFramesPage />:<Navigate to="/" replace />} />
      </Routes>
      
    </div>
  );
}

export default App;
