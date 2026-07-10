import { useState, useEffect } from 'react'
import AdminLogin from './admin/AdminLogin.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import { menuApi, categoryApi, orderApi } from './admin/api.js'

const defaultMenuItems = [
  { id: 1, name: 'Espresso', img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop', desc: 'Klasik dan pekat, jiwa dari setiap kopi', price: 25000, cat: 'Coffee' },
  { id: 2, name: 'Americano', img: 'https://images.unsplash.com/photo-1559496417-e6f2cb7a162b?w=400&h=400&fit=crop', desc: 'Espresso dengan air panas, ringan dan lembut', price: 30000, cat: 'Coffee' },
  { id: 3, name: 'Cappuccino', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop', desc: 'Espresso, susu panas, dan busa susu yang lembut', price: 35000, cat: 'Coffee' },
  { id: 4, name: 'Caffe Latte', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop', desc: 'Espresso dengan susu steamed yang creamy', price: 35000, cat: 'Coffee' },
  { id: 5, name: 'Mocha', img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc39?w=400&h=400&fit=crop', desc: 'Perpaduan cokelat dan espresso yang memanjakan', price: 40000, cat: 'Coffee' },
  { id: 6, name: 'Cold Brew', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop', desc: 'Seduhan dingin 24 jam, segar dan rendah asam', price: 38000, cat: 'Coffee' },
  { id: 7, name: 'Affogato', img: 'https://images.unsplash.com/photo-1579954115564-e9f21b53c5e0?w=400&h=400&fit=crop', desc: 'Espresso panas di atas es krim vanila', price: 42000, cat: 'Coffee' },
  { id: 8, name: 'Macchiato', img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop', desc: 'Espresso dengan sedikit busa susu', price: 32000, cat: 'Coffee' },
  { id: 9, name: 'Flat White', img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=400&fit=crop', desc: 'Espresso dengan microfoam susu yang halus', price: 36000, cat: 'Coffee' },
  { id: 10, name: 'Irish Coffee', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop', desc: 'Kopi dengan sentuhan whiskey Irlandia', price: 50000, cat: 'Coffee' },
  { id: 11, name: 'Croissant', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop', desc: 'Croissant pastry renyah berlapis mentega', price: 18000, cat: 'Food' },
  { id: 12, name: 'Cheese Cake', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=400&fit=crop', desc: 'Cheesecake creamy dengan topping berry segar', price: 28000, cat: 'Food' },
  { id: 13, name: 'Banana Cake', img: 'https://images.unsplash.com/photo-1604881988758-80e2e0e5e5c9?w=400&h=400&fit=crop', desc: 'Banana cake lembut dengan kacang kenari', price: 22000, cat: 'Food' },
  { id: 14, name: 'Chocolate Cookies', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop', desc: 'Cookies cokelat chips homemade', price: 15000, cat: 'Food' },
  { id: 15, name: 'Brownies', img: 'https://images.unsplash.com/photo-1607936854279-55e8a5c8d7d7?w=400&h=400&fit=crop', desc: 'Brownies fudge cokelat premium', price: 25000, cat: 'Food' },
  { id: 16, name: 'Sandwich', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop', desc: 'Sandwich lapis dengan smoked beef dan keju', price: 30000, cat: 'Food' },
  { id: 17, name: 'French Fries', img: 'https://images.unsplash.com/photo-1573080543235-0e5e9c6a6e1d?w=400&h=400&fit=crop', desc: 'Kentang goreng renyah dengan saus pilihan', price: 20000, cat: 'Food' },
  { id: 18, name: 'Muffin Blueberry', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop', desc: 'Muffin blueberry lembut dengan taburan streusel', price: 18000, cat: 'Food' },
  { id: 19, name: 'Bagel Salmon', img: 'https://images.unsplash.com/photo-1624683941001-f0e70e1ef44a?w=400&h=400&fit=crop', desc: 'Bagel panggang dengan smoked salmon dan cream cheese', price: 32000, cat: 'Food' },
  { id: 20, name: 'Tiramisu', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop', desc: 'Tiramisu klasik Italia dengan mascarpone', price: 30000, cat: 'Food' },
]
const defaultCategories = ['Coffee', 'Food']

const newsItems = [
  {
    tag: 'Blog', label: 'Craft',
    title: 'The Art of the Moon-Latté',
    date: 'October 20',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7Y3XdF2UbfiZvpaFFRAiyTSrV0KPWDQXbao3z4NVrucWGbjk3cb9XeJRulRvleNEQQYIfLsvTaQiiGydIJiNUZJ6TvSCgxvcLya_MOxH_iI0fP-NtuVTnJVFoDF11j_sV989lhUcBp9kWmAJFq7_JHTN34TmOd9fcKsTQ7dy_ZawXVIT_fsyJsllR1tF-RAIlFzK7BqBy_GKcuZwvw07DSh1mawP57nHL_JDKl817XaClnrgi0QWSqg',
  },
  { tag: 'Bean Journey', label: 'Origin', title: 'High Grounds: Sourcing Beans from the High Grounds', date: 'October 15' },
  { tag: 'News', label: 'Event', title: 'Lunar Coffee Grand Opening Celebration', date: 'October 10' },
]

function formatPrice(p) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p)
}
function Navbar({ page, setPage, cartCount, setShowAdmin }) {
  const links = [
    { key: 'home', label: 'Home' },
    { key: 'menu', label: 'Menu' },
    { key: 'story', label: 'Our Story' },
    { key: 'locations', label: 'Locations' },
    { key: 'shop', label: 'Shop' },
  ]
  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4">
      <nav className="bg-white rounded-full border-2 border-black shadow-[4px_4px_0px_#000000] flex justify-between items-center px-8 py-3 max-w-7xl mx-auto">
        <button onClick={() => setPage('home')} className="flex items-center gap-x-2 cursor-pointer">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>dark_mode</span>
          <span className="text-2xl font-bold font-headline-lg text-text-main">Lunar Coffee</span>
          <span className="text-xs align-top font-bold">&trade;</span>
        </button>
        <div className="hidden md:flex gap-x-8">
          {links.map(l => (
            <button
              key={l.key}
              onClick={() => setPage(l.key)}
              className={`nav-link font-label-sm uppercase tracking-wider transition-colors cursor-pointer ${
                page === l.key
                  ? 'text-primary font-bold border-b-2 border-black'
                  : 'text-on-surface-variant font-medium hover:text-primary'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAdmin(true)}
            className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-black bg-surface shadow-[3px_3px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            title="Admin Panel"
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
          </button>
          <button
            onClick={() => setPage('shop')}
            className="hidden md:inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full font-label-sm uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-2 border-black cursor-pointer"
          >
            Order Now
            {cartCount > 0 && (
              <span className="bg-primary-pastel text-black text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
            )}
          </button>
          <button className="md:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 cursor-pointer" type="button">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
function Hero({ setPage }) {
  return (
    <section className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="relative w-full aspect-square rounded-3xl bg-surface p-8 border-2 border-black shadow-[8px_8px_0px_#000000] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-fixed-dim/20 to-transparent opacity-50"></div>
        <div className="w-full h-full relative z-10 rounded-2xl border-2 border-black overflow-hidden">
          <img src="/image/coffeshop.jpg" alt="Lunar Coffee Shop" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-8 left-8 bg-white border-2 border-black rounded-full p-4 shadow-[4px_4px_0px_#000000] flex flex-col items-center justify-center w-24 h-24 z-20 hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all animate-float" style={{ animationDelay: '0.5s' }}>
          <span className="material-symbols-outlined text-primary-pastel text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_cafe</span>
          <span className="text-[10px] mt-1 font-bold text-center font-label-sm">Premium</span>
        </div>
      </div>
      <div className="space-y-8">
        <h1 className="font-h1 text-h1 text-text-main leading-tight">Brewed for the Stars</h1>
        <div className="flex gap-4 flex-wrap">
          <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label-sm text-sm border-2 border-black shadow-[2px_2px_0px_#000000] cursor-default">Ethical Beans</span>
          <span className="bg-primary-pastel text-black px-4 py-1 rounded-full font-label-sm text-sm border-2 border-black shadow-[2px_2px_0px_#000000] cursor-default">Celestial Atmosphere</span>
          <span className="bg-tertiary-container text-on-tertiary-container px-4 py-1 rounded-full font-label-sm text-sm border-2 border-black shadow-[2px_2px_0px_#000000] cursor-default">Artisan Roasts</span>
        </div>
        <h2 className="font-h2 text-h2 text-text-main mt-8 mb-4">The Lunar Experience</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Experience the finest aesthetic coffee blends crafted with celestial precision. Our beans are sourced ethically and roasted to perfection, delivering a taste that's truly out of this world.
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Whether you're starting your morning orbit or winding down under the stars, Lunar Coffee is your perfect companion.
        </p>
        <button onClick={() => setPage('menu')} className="bg-black text-white px-8 py-3 rounded-full font-label-sm uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-2 border-black mt-4 cursor-pointer">
          Explore Menu
        </button>
      </div>
    </section>
  )
}
function MenuSection({ cart, setCart, menuItems, categories }) {
  const [filter, setFilter] = useState('All')
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }
  return (
    <section className="reveal text-center space-y-12">
      <div className="space-y-4 max-w-2xl mx-auto">
        <h2 className="font-h2 text-h2">Our Menu</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Discover our signature blends and homemade treats, crafted to elevate your daily routine.
        </p>
      </div>
      <div className="flex gap-3 justify-center flex-wrap">
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-label-sm font-bold uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
              filter === cat ? 'bg-primary-pastel text-black' : 'bg-white text-black hover:shadow-[5px_5px_0px_#000000]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {menuItems.filter(i => filter === 'All' || i.cat === filter).map((item) => {
          const inCart = cart.find(c => c.id === item.id)
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0px_#000000] overflow-hidden flex flex-col hover:scale-[1.02] hover:shadow-[12px_12px_0px_#000000] transition-all"
            >
              <div className="h-44 overflow-hidden border-b-2 border-black relative">
                <img className="w-full h-full object-cover" src={item.img} alt={item.name} loading="lazy" />
                <span className="absolute top-3 right-3 bg-primary-pastel border-2 border-black rounded-full px-3 py-0.5 text-xs font-bold shadow-[2px_2px_0px_#000000]">
                  {item.cat}
                </span>
              </div>
              <div className="p-5 flex flex-col items-start justify-between space-y-3 flex-1">
                <div>
                  <h3 className="text-xl font-bold font-headline-lg">{item.name}</h3>
                  <p className="text-sm font-body-md mt-1 text-on-surface-variant text-left">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between w-full gap-2">
                  <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-bold shadow-[2px_2px_0px_#000000]">
                    {formatPrice(item.price)}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-white text-black px-4 py-2 rounded-full font-label-sm text-sm font-bold border-2 border-black shadow-[3px_3px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer whitespace-nowrap"
                  >
                    {inCart ? `+${inCart.qty}` : '+ Cart'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
function AboutSection() {
  return (
    <section className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <h2 className="font-h1 text-h1 text-text-main">Our Story</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Berawal dari kecintaan terhadap kopi dan hasrat untuk menyajikan yang terbaik, Lunar Coffee hadir sebagai ruang ketiga bagi para pencinta kopi di Indonesia.
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Kami percaya bahwa secangkir kopi yang baik bisa mengubah suasana hati, memicu percakapan, dan menciptakan kenangan. Setiap biji kopi kami pilih secara langsung dari petani lokal, dipanggang dengan sempurna, dan diseduh dengan penuh dedikasi.
        </p>
        <div className="flex gap-4">
          <div className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000000] p-6 text-center flex-1">
            <span className="font-h1 text-h1 text-primary">20+</span>
            <p className="font-label-sm text-sm mt-2">Varian Kopi</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000000] p-6 text-center flex-1">
            <span className="font-h1 text-h1 text-primary">5K+</span>
            <p className="font-label-sm text-sm mt-2">Pelanggan</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000000] p-6 text-center flex-1">
            <span className="font-h1 text-h1 text-primary">3</span>
            <p className="font-label-sm text-sm mt-2">Cabang</p>
          </div>
        </div>
      </div>
      <div className="relative w-full aspect-square rounded-3xl bg-surface p-8 border-2 border-black shadow-[8px_8px_0px_#000000] overflow-hidden">
        <div className="w-full h-full rounded-2xl border-2 border-black overflow-hidden">
          <img src="/image/fotoowner.jpeg" alt="Pemilik Lunar Coffee" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  )
}
function LocationsSection() {
  const locations = [
    { name: 'Lunar Coffee - Pusat Banda Aceh', address: 'Jl. Tgk. H. Mohd. Daud Beureueh No.12, Banda Aceh', phone: '0812-3456-7890', hours: '08:00 - 22:00' },
    { name: 'Lunar Coffee - Simpang Lima', address: 'Jl. Sultan Iskandar Muda No.45, Simpang Lima, Banda Aceh', phone: '0812-3456-7891', hours: '09:00 - 23:00' },
    { name: 'Lunar Coffee - Ulee Lheue', address: 'Jl. Pelabuhan Ulee Lheue No.7, Banda Aceh', phone: '0812-3456-7892', hours: '08:00 - 21:00' },
  ]
  return (
    <section className="reveal space-y-12">
      <div className="space-y-4">
        <h2 className="font-h1 text-h1">Our Locations</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Temukan Lunar Coffee terdekat di Banda Aceh.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {locations.map((loc, i) => (
            <div key={i} className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                <h3 className="font-headline-lg text-xl font-bold">{loc.name}</h3>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant">{loc.address}</p>
              <div className="flex gap-4 text-sm font-label-sm">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">call</span>{loc.phone}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">schedule</span>{loc.hours}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border-2 border-black shadow-[8px_8px_0px_#000000] overflow-hidden h-[400px] lg:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.39489008097!2d95.20195852167969!3d5.549999999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304774e07c5b99f5%3A0x5d1ceef1650e7b1!2sBanda%20Aceh%2C%20Kota%20Banda%20Aceh%2C%20Aceh!5e0!3m2!1sid!2sid!4v1"
            className="w-full h-full min-h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Banda Aceh Map"
          />
        </div>
      </div>
    </section>
  )
}
const ewalletOptions = [
  { key: 'gopay', label: 'GoPay', icon: 'account_balance_wallet', color: '#00AAFF', account: '0812-3456-7890', instructions: 'Buka GoPay > Bayar > Scan QR atau masukkan nomor tujuan' },
  { key: 'ovo', label: 'OVO', icon: 'account_balance_wallet', color: '#4B2B9C', account: '0812-3456-7891', instructions: 'Buka OVO > Transfer > ke nomor OVO tujuan' },
  { key: 'dana', label: 'Dana', icon: 'account_balance_wallet', color: '#0086D4', account: '0812-3456-7892', instructions: 'Buka Dana > Kirim > ke nomor Dana tujuan' },
  { key: 'shopeepay', label: 'ShopeePay', icon: 'account_balance_wallet', color: '#EE4D2D', account: '0812-3456-7893', instructions: 'Buka Shopee > ShopeePay > Kirim ke nomor tujuan' },
  { key: 'linkaja', label: 'LinkAja', icon: 'account_balance_wallet', color: '#ED1C24', account: '0812-3456-7894', instructions: 'Buka LinkAja > Transfer > ke nomor LinkAja tujuan' },
]
function ShopSection({ cart, setCart, onOrderComplete }) {
  const [step, setStep] = useState('cart')
  const [payment, setPayment] = useState('')
  const [ewallet, setEwallet] = useState('')
  const [animClass, setAnimClass] = useState('')
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0)
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0))
  }
  const transitionTo = (next) => {
    setAnimClass('opacity-0 translate-y-4')
    setTimeout(() => {
      setStep(next)
      requestAnimationFrame(() => setAnimClass('opacity-100 translate-y-0'))
    }, 200)
  }
  const handlePay = () => {
    if (!payment) return
    if (payment === 'qris') {
      transitionTo('qris')
      return
    }
    if (payment === 'ewallet' && !ewallet) return
    if (payment === 'ewallet') {
      transitionTo('ewallet_paid')
      return
    }
    if (payment === 'cash') {
      onOrderComplete?.()
      transitionTo('paid')
    }
  }
  const stepClass = `transition-all duration-300 ease-out ${animClass || 'opacity-100 translate-y-0'}`
  return (
    <section className="space-y-8 max-w-4xl mx-auto w-full">
      <h2 className="font-h1 text-h1 text-center">Checkout</h2>
      <div className={stepClass}>
        {step === 'qris' && (
          <div className="bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0px_#000000] p-8 space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full font-label-sm text-sm font-bold">
                <span className="material-symbols-outlined text-base">qr_code_scanner</span>
                QRIS
              </div>
              <h2 className="font-h2 text-h2 mt-4">Pembayaran QRIS</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">Scan kode QR untuk melakukan pembayaran</p>
            </div>
            <div className="flex justify-center">
              <div className="border-2 border-black rounded-2xl p-4 bg-white inline-block shadow-[4px_4px_0px_#000000]">
                <img src="/image/monyet.png" alt="QRIS" width="220" height="220" className="block" />
              </div>
            </div>
            <div className="max-w-s mx-auto bg-surface rounded-2xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_#000000]">
              <div className="px-6 py-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-2xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>store</span>
                  <p className="font-headline-lg text-lg font-bold">Lunar Coffee</p>
                </div>
                <div className="w-full h-px bg-black"></div>
                <div className="flex items-center justify-between">
                  <p className="font-label-sm text-sm text-on-surface-variant">Total Pembayaran</p>
                  <p className="font-h2 text-h2 text-primary font-bold">{formatPrice(total)}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { onOrderComplete?.(); transitionTo('paid') }} className="bg-primary-pastel text-black px-8 py-3 rounded-full font-label-sm uppercase tracking-wider font-bold border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
                Konfirmasi
              </button>
              <button onClick={() => { setPayment(''); transitionTo('cart') }} className="bg-white text-black px-6 py-3 rounded-full font-label-sm uppercase tracking-wider font-bold border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
                Kembali
              </button>
            </div>
          </div>
        )}
        {step === 'ewallet_paid' && (
          <div className="bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0px_#000000] p-8 space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full font-label-sm text-sm font-bold">
                <span className="material-symbols-outlined text-sm">wallet</span>
                {ewalletOptions.find(e => e.key === ewallet)?.label}
              </div>
              <h2 className="font-h2 text-h2 mt-4">Instruksi Pembayaran</h2>
            </div>
            <div className="bg-surface rounded-2xl border-2 border-black p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1", color: ewalletOptions.find(e => e.key === ewallet)?.color }}>account_balance_wallet</span>
                  <div>
                    <p className="font-headline-lg text-lg font-bold">{ewalletOptions.find(e => e.key === ewallet)?.label}</p>
                    <p className="font-body-md text-sm text-on-surface-variant">Nomor tujuan transfer</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border-2 border-black p-4 text-center">
                <p className="font-label-sm text-xs text-on-surface-variant mb-1">Nomor Akun</p>
                <p className="font-h1 text-h2 tracking-widest text-primary select-all">{ewalletOptions.find(e => e.key === ewallet)?.account}</p>
              </div>
              <div className="bg-primary-pastel/20 rounded-xl border-2 border-primary-pastel p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg">info</span>
                <div>
                  <p className="font-label-sm text-sm font-bold">Instruksi:</p>
                  <p className="font-body-md text-sm text-on-surface-variant mt-1">{ewalletOptions.find(e => e.key === ewallet)?.instructions}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border-2 border-black p-4 flex justify-between items-center">
                <span className="font-label-sm text-sm font-bold">Total Pembayaran</span>
                <span className="font-h2 text-h2 text-primary">{formatPrice(total)}</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => { onOrderComplete?.(); transitionTo('paid') }} className="bg-primary-pastel text-black px-8 py-3 rounded-full font-label-sm uppercase tracking-wider font-bold border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
                Konfirmasi Pembayaran
              </button>
              <button onClick={() => { setPayment(''); transitionTo('cart') }} className="bg-white text-black px-6 py-3 rounded-full font-label-sm uppercase tracking-wider font-bold border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
                Kembali
              </button>
            </div>
          </div>
        )}
        {step === 'paid' && (
          <div className="bg-primary-pastel rounded-3xl border-2 border-black shadow-[8px_8px_0px_#000000] p-12 space-y-4 text-center">
            <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <h2 className="font-h2 text-h2">Payment Successful!</h2>
            <p className="font-body-md text-body-md">Terima kasih! Pesananmu sedang kami proses.</p>
            <button onClick={() => { setCart([]); setStep('cart'); setPayment(''); setEwallet('') }} className="bg-black text-white px-8 py-3 rounded-full font-label-sm uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-2 border-black cursor-pointer">
              Kembali ke Menu
            </button>
          </div>
        )}
        {step === 'cart' && (
          <>
            {cart.length === 0 ? (
              <div className="bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0px_#000000] p-12 text-center space-y-4">
                <span className="material-symbols-outlined text-6xl text-outline-variant" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
                <p className="font-body-md text-body-md text-on-surface-variant">Keranjang belanja masih kosong.</p>
                <p className="font-label-sm text-sm text-on-surface-variant">Pilih menu favoritmu terlebih dahulu!</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-2 flex items-center gap-3">
                      <img className="w-14 h-14 rounded-xl border-2 border-black object-cover" src={item.img} alt={item.name} />
                      <div className="flex-1">
                        <h3 className="font-headline-lg text-lg font-bold">{item.name}</h3>
                        <p className="font-label-sm text-sm text-on-surface-variant">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full border-2 border-black bg-surface shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center font-bold cursor-pointer">-</button>
                        <span className="font-label-sm font-bold text-lg w-6 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full border-2 border-black bg-surface shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center font-bold cursor-pointer">+</button>
                      </div>
                      <p className="font-headline-lg text-lg font-bold w-24 text-right">{formatPrice(item.price * item.qty)}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0px_#000000] p-8 space-y-6">
                  <h3 className="font-headline-lg text-2xl font-bold">Metode Pembayaran</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { key: 'cash', label: 'Cash', icon: 'payments', desc: 'Bayar tunai di kasir' },
                      { key: 'qris', label: 'QRIS', icon: 'qr_code_scanner', desc: 'Scan QR code pembayaran' },
                      { key: 'ewallet', label: 'E-Wallet', icon: 'wallet', desc: 'GoPay / OVO / Dana / dll' },
                    ].map(p => (
                      <button
                        key={p.key}
                        onClick={() => { setPayment(p.key); setEwallet('') }}
                        className={`rounded-2xl border-2 p-6 text-center space-y-2 transition-all cursor-pointer ${
                          payment === p.key
                            ? 'border-primary bg-primary-pastel shadow-[4px_4px_0px_#000000] scale-[1.02]'
                            : 'border-black bg-surface shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{p.icon}</span>
                        <p className="font-headline-lg text-lg font-bold">{p.label}</p>
                        <p className="font-label-sm text-xs text-on-surface-variant">{p.desc}</p>
                      </button>
                    ))}
                  </div>
                  {payment === 'ewallet' && (
                    <div className="border-t-2 border-black pt-6 space-y-4">
                      <p className="font-headline-lg text-lg font-bold">Pilih E-Wallet</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {ewalletOptions.map(e => (
                          <button
                            key={e.key}
                            onClick={() => setEwallet(e.key)}
                            className={`rounded-2xl border-2 p-4 text-center space-y-2 transition-all cursor-pointer ${
                              ewallet === e.key
                                ? 'border-primary bg-primary-pastel shadow-[4px_4px_0px_#000000] scale-[1.05]'
                                : 'border-black bg-surface shadow-[3px_3px_0px_#000000] hover:shadow-[5px_5px_0px_#000000]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1", color: e.color }}>{e.icon}</span>
                            <p className="font-label-sm text-sm font-bold">{e.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 border-t-2 border-black">
                    <div>
                      <p className="font-label-sm text-sm text-on-surface-variant">Total Pesanan</p>
                      <p className="font-h2 text-h2 text-primary">{formatPrice(total)}</p>
                    </div>
                    <button
                      onClick={handlePay}
                      disabled={!payment || (payment === 'ewallet' && !ewallet)}
                      className="bg-black text-white px-10 py-4 rounded-full font-label-sm uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Bayar Sekarang
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}
function NewsSection() {
  return (
    <section className="reveal space-y-12">
      <div className="flex justify-between items-end">
        <h2 className="font-h1 text-h1">Lunar Chronicles</h2>
        <button className="hidden md:block bg-black text-white px-8 py-3 rounded-full font-label-sm uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-2 border-black cursor-pointer">
          Read More
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item, i) => (
          <article key={i} className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] overflow-hidden flex flex-col group cursor-pointer hover:scale-[1.02] hover:shadow-[10px_10px_0px_#000000] transition-all">
            <div className={`h-48 relative border-b-2 border-black ${item.img ? 'bg-topography p-0' : 'bg-surface-container-low flex items-center justify-center'}`}>
              {item.img ? (
                <img className="w-full h-full object-cover" src={item.img} alt={item.title} />
              ) : (
                <span className="material-symbols-outlined text-6xl text-outline-variant">article</span>
              )}
              <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-primary-pastel border-2 border-black rounded-full px-3 py-1 text-sm font-bold shadow-[2px_2px_0px_#000000]">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_cafe</span>
                {item.tag}
              </span>
              {!item.img && (
                <h3 className="absolute bottom-6 left-6 text-3xl font-black max-w-[80%] leading-tight italic font-headline-lg">{item.title.split(':')[0]}</h3>
              )}
            </div>
            <div className="p-6 bg-surface flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs font-bold text-on-surface-variant mb-2">{item.date}</p>
                <p className="font-body-md font-bold text-lg">{item.title}</p>
              </div>
              <span className="self-start bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold border border-black shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all">
                {item.label}
              </span>
            </div>
          </article>
        ))}
      </div>
      <button className="md:hidden w-full bg-black text-white px-8 py-3 rounded-full font-label-sm uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-2 border-black mt-8 cursor-pointer">
        Read More
      </button>
    </section>
  )
}
function Footer({ setPage, setShowAdmin }) {
  return (
    <footer className="bg-surface-container-highest border-t-2 border-black mt-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-lg py-md w-full gap-4">
        <div className="flex items-center gap-x-2">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>dark_mode</span>
          <span className="text-2xl font-bold font-headline-lg text-text-main">Lunar Coffee</span>
        </div>
        <div className="flex gap-6 flex-wrap justify-center">
          {[
            { key: 'home', label: 'Home' },
            { key: 'story', label: 'Our Story' },
            { key: 'locations', label: 'Locations' },
            { key: 'shop', label: 'Shop' },
          ].map(l => (
            <button key={l.key} onClick={() => setPage(l.key)} className="nav-link font-label-sm text-label-sm text-on-surface-variant hover:text-text-main transition-colors cursor-pointer">
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <p className="font-label-sm text-label-sm text-on-surface-variant">&copy; 2024 Lunar Coffee. All rights reserved.</p>
          <button onClick={() => setShowAdmin(true)} className="text-xs text-on-surface-variant hover:text-text-main underline underline-offset-2 transition-colors cursor-pointer">
            Admin
          </button>
        </div>
      </div>
    </footer>
  )
}
function App() {
  const [page, setPage] = useState('home')
  const [cart, setCart] = useState([])
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [menuItems, setMenuItems] = useState(defaultMenuItems)
  const [categories, setCategories] = useState(defaultCategories)

  const fetchPublicData = () => {
    menuApi.getAll().then(setMenuItems).catch(() => {
      const saved = localStorage.getItem('lunar_menuItems')
      if (saved) setMenuItems(JSON.parse(saved))
    })
    categoryApi.getAll().then(setCategories).catch(() => {
      const saved = localStorage.getItem('lunar_categories')
      if (saved) setCategories(JSON.parse(saved))
    })
  }

  useEffect(() => { fetchPublicData() }, [])

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
    const orders = JSON.parse(localStorage.getItem('lunar_orders') || '[]')
    orders.push({
      id: Date.now(),
      items: [...cart],
      total: cart.reduce((s, c) => s + c.price * c.qty, 0),
      date: new Date().toISOString(),
    })
    localStorage.setItem('lunar_orders', JSON.stringify(orders))
  }
  useEffect(() => {
    if (adminLoggedIn) {
      setShowAdmin(true)
    }
  }, [adminLoggedIn])
  useEffect(() => {
    if (!showAdmin) {
      fetchPublicData()
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
            <NewsSection />
          </>
        )}
        {page === 'menu' && <MenuSection cart={cart} setCart={setCart} menuItems={menuItems} categories={categories} />}
        {page === 'story' && <AboutSection />}
        {page === 'locations' && <LocationsSection />}
        {page === 'shop' && <ShopSection cart={cart} setCart={setCart} onOrderComplete={handleOrderComplete} />}
      </main>
      <Footer setPage={setPage} setShowAdmin={setShowAdmin} />
    </>
  )
}
export default App
