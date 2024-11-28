import { Outlet } from "react-router-dom"
import AppSidebar from "../../components/sidebar/AppSidebar"
import './main.css';
import AppNavbar from "../../components/navbar/AppNavbar";

function Main() {
  return (
    <div className='app-container'>
    <AppSidebar />
    <main className='app-main'>
        <AppNavbar />
        <section className="section">
            <Outlet /> {/* C'est ici que le contenu des sous-routes sera rendu */}
        </section>
    </main>
</div>
  )
}

export default Main