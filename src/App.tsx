import './App.css'
import './index.css';
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';         
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
import PrivateRoute from './PrivateRoute';


function App() {
 
//    const [isAuthenticated, setIsAuthenticated ] = useState(false)
    // const isAuthenticated = 
    // useState(()=>{
    //     const token = localStorage.getItem('authToken');
    //     if (token!==null) {
    //         setIsAuthenticated(true)
    //     } else {
    //         setIsAuthenticated(false)
    //     }

    // },[]);
  // const token = localStorage.getItem('authToken');
  const token = localStorage.getItem('authToken');
  const isAuthenticated = token?true: false
 
   
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/main" element={<PrivateRoute element={<Main />} isAuthenticated={isAuthenticated} />}>
                    <Route path="board" element={<PrivateRoute element={<DashboardManager />} isAuthenticated={isAuthenticated} />} />
                    <Route path="authors" element={<PrivateRoute element={<AuthorManager />} isAuthenticated={isAuthenticated} />} />
                    <Route path="books" element={<PrivateRoute element={<BookManager />} isAuthenticated={isAuthenticated} />} />
                    <Route path="orders" element={<PrivateRoute element={<OrderManager />} isAuthenticated={isAuthenticated} />} />
                    <Route path="agendas" element={<PrivateRoute element={<AgendaManager />} isAuthenticated={isAuthenticated} />} />
                    <Route path="readers" element={<PrivateRoute element={<ReaderManager />} isAuthenticated={isAuthenticated} />} />
                    <Route path="content" element={<PrivateRoute element={<ContentManager />} isAuthenticated={isAuthenticated} />} />
                    <Route path="analytics" element={<PrivateRoute element={<Analytics />} isAuthenticated={isAuthenticated} />} />
                    <Route path="settings" element={<PrivateRoute element={<Settings />} isAuthenticated={isAuthenticated} />} />
                </Route>
                {/* Autres routes */}
            </Routes>
        </Router>
    );
}

export default App
