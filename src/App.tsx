import './App.css'
import './index.css';
// import AppRouterProvider from './providers/AppRouterProvider'
import 'primereact/resources/themes/saga-blue/theme.css';  // Choisissez le thème que vous préférez
import 'primereact/resources/primereact.min.css';          // Styles de base de PrimeReact
import 'primeicons/primeicons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import DashboardManager from './pages/dashboard/DashboardManager';
import Login from './pages/auth/Login';
import Settings from './pages/settings/Settings';
import Analytics from './pages/analytics/Analytics';
import ContentManager from './pages/contentManager/ContentManager';
import ReaderManager from './pages/readerManager/ReaderManager';
import AgendaManager from './pages/agendaManager/AgendaManager';
import OrderManager from './pages/orderManager/OrderManager';
import BookManager from './pages/bookManager/BookManager';
import AuthorManager from './pages/authorManager/AuthorManager';

function App() {
 

  return (
   <>
    <Router>
            <Routes>
                <Route path="/main" element={<Main />}>
                    <Route path="board" element={<DashboardManager />} />
                    <Route path="authors" element={<AuthorManager/>} />
                    <Route path="books" element={<BookManager/>} />
                    <Route path="orders" element={<OrderManager/>} />
                    <Route path="agendas" element={<AgendaManager />} />
                    <Route path="readers" element={<ReaderManager/>} />
                    <Route path="content" element={<ContentManager />} />
                    <Route path="analytics" element={<Analytics/>} />
                    <Route path="settings" element={<Settings />} />
                </Route>
                {/* Other routes */}
                <Route path="/" element={<Login />} />

            </Routes>
        </Router>
   </>
  )
}

export default App
