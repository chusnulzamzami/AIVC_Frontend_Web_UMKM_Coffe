import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import AboutSection from './components/AboutSection'
import LocationsSection from './components/LocationsSection'
import ShopSection from './components/ShopSection'
import NewsSection from './components/NewsSection'
import Footer from './components/Footer'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import { menuApi, categoryApi, orderApi, locationApi, newsApi, ewalletApi } from './admin/api'

function App() {
  const [page, setPage] = useState('home')
  const [cart, setCart] = useState([])
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)

  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [locations, setLocations] = useState([])
  const [newsItems, setNewsItems] = useState([])
  const [ewalletOptions, setEwalletOptions] = useState([])

  const fetchAllData = () => {
    menuApi.getAll().then(setMenuItems).catch(console.error)
    categoryApi.getAll().then(setCategories).catch(console.error)
    locationApi.getAll().then(setLocations).catch(console.error)
    newsApi.getAll().then(setNewsItems).catch(console.error)
    ewalletApi.getAll().then(setEwalletOptions).catch(console.error)
  }

  useEffect(() => { fetchAllData() }, [])

  useEffect(() => {
    function reveal() {
      const reveals = document.querySelectorAll('.reveal')
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight
        const elementTop = reveals[i].getBoundingClientRect().top
        const elementVisible = 150
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active')
        }
      }
    }
    window.addEventListener('scroll', reveal)
    reveal()
    return () => window.removeEventListener('scroll', reveal)
  }, [page])

  const cartCount = cart.reduce((s, c) => s + c.qty, 0)

  const handleOrderComplete = () => {
    const items = cart.map(c => ({ id: c.id, name: c.name, price: c.price, qty: c.qty }))
    orderApi.create(items).catch(console.error)
  }

  useEffect(() => {
    if (adminLoggedIn) {
      setShowAdmin(true)
    }
  }, [adminLoggedIn])

  useEffect(() => {
    if (!showAdmin) {
      fetchAllData()
    }
  }, [showAdmin])

  if (showAdmin) {
    if (!adminLoggedIn) {
      return <AdminLogin onLogin={() => setAdminLoggedIn(true)} />
    }
    return <AdminDashboard onLogout={() => { setAdminLoggedIn(false); setShowAdmin(false) }} />
  }

  return (
    <>
      <Navbar page={page} setPage={setPage} cartCount={cartCount} setShowAdmin={setShowAdmin} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32">
        {page === 'home' && (
          <>
            <Hero setPage={setPage} />
            <MenuSection cart={cart} setCart={setCart} menuItems={menuItems} categories={categories} />
            <AboutSection />
            <NewsSection newsItems={newsItems} />
          </>
        )}
        {page === 'menu' && <MenuSection cart={cart} setCart={setCart} menuItems={menuItems} categories={categories} />}
        {page === 'story' && <AboutSection />}
        {page === 'locations' && <LocationsSection locations={locations} />}
        {page === 'shop' && <ShopSection cart={cart} setCart={setCart} onOrderComplete={handleOrderComplete} ewalletOptions={ewalletOptions} />}
      </main>
      <Footer setPage={setPage} setShowAdmin={setShowAdmin} />
    </>
  )
}

export default App
