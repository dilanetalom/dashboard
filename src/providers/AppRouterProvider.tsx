import { createBrowserRouter, RouterProvider } from "react-router-dom"
import DashboardManager from "../pages/dashboard/DashboardManager"
import AuthorManager from "../pages/authorManager/AuthorManager"
import BookManager from "../pages/bookManager/BookManager"
import OrderManager from "../pages/orderManager/OrderManager"
import AgendaManager from "../pages/agendaManager/AgendaManager"
import ReaderManager from "../pages/readerManager/ReaderManager"
import ContentManager from "../pages/contentManager/ContentManager"
import Analytics from "../pages/analytics/Analytics"
import Settings from "../pages/settings/Settings"
import Main from "../pages/main/Main"
import Login from "../pages/auth/Login"


function AppRouterProvider() {
    const router = createBrowserRouter([
      
        {
            path: "/",
            element: <Login />, // Affiche le composant Login sur la route "/"
        },
        {
            path: "/main", // Changement de la route principale pour le reste des composants
            element: <Main />, // Affiche le composant Main
            children: [
                {
                    path: "/board",
                    element : <DashboardManager/>
                },
                {
                    path: "authors",
                    element: <AuthorManager/>
                },
                {
                    path: "books",
                    element: <BookManager/>
                },
                {
                    path: "orders",
                    element: <OrderManager/>
                },
                {
                    path: "agendas",
                    element: <AgendaManager/>
                },
                {
                    path: "readers",
                    element: <ReaderManager/>
                },
                {
                    path: "content",
                    element: <ContentManager/>
                },
                {
                    path: "analytics",
                    element: <Analytics/>
                },
                {
                    path: "settings",
                    element: <Settings/>
                }
            ]
        }
       
    ])
  return (
    <RouterProvider router={router}/>
  )
}

export default AppRouterProvider