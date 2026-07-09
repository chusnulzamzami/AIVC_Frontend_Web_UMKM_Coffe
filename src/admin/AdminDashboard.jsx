import { useState, useEffect } from 'react'
import { menuApi, categoryApi, orderApi, dashboardApi } from './api.js'

function formatPrice(p) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p)
}

function DashboardHome() {
  const [orders, setOrders] = useState([])
  const [summary, setSummary] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      orderApi.getAll(),
      dashboardApi.summary(),
      orderApi.stats(),
    ]).then(([ordersData, summaryData, statsData]) => {
      setOrders(ordersData)
      setSummary(summaryData)
      setStats(statsData)
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
      </div>
    )
  }

  const totalOrders = orders.length
  const allTimeRevenue = orders.reduce((s, o) => s + o.total, 0)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-h2 text-h2">Dashboard Overview</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Ringkasan data menu, kategori, dan penjualan</p>
      </div>

      {summary && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {summary.category_counts.map(cat => (
              <div key={cat.name} className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-6 space-y-2">
                <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {/coffee|kopi|minuman|drink|noncoffee/i.test(cat.name) ? 'local_cafe' : /food|makanan/i.test(cat.name) ? 'restaurant' : 'category'}
                </span>
                <p className="font-h1 text-h2">{cat.count}</p>
                <p className="font-label-sm text-sm text-on-surface-variant">Menu {cat.name}</p>
              </div>
            ))}
            <div className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-6 space-y-2">
              <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>category</span>
              <p className="font-h1 text-h2">{summary.category_count}</p>
              <p className="font-label-sm text-sm text-on-surface-variant">Kategori</p>
            </div>
            <div className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-6 space-y-2">
              <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              <p className="font-h1 text-h2">{formatPrice(summary.total_menu_price)}</p>
              <p className="font-label-sm text-sm text-on-surface-variant">Total Harga Menu</p>
            </div>
          </div>

          {summary.highest_priced_item && (
            <div className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-6">
              <h3 className="font-headline-lg text-xl font-bold mb-2">Menu Termahal</h3>
              <p className="font-body-md text-body-md">{summary.highest_priced_item.name} - {formatPrice(summary.highest_priced_item.price)}</p>
            </div>
          )}
        </>
      )}

      {stats && (
        <div>
          <h3 className="font-headline-lg text-2xl font-bold mb-4">Statistik Penjualan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-6 space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>today</span>
                <span className="font-label-sm text-sm font-bold">Harian</span>
              </div>
              <p className="font-h1 text-h2">{formatPrice(stats.daily.total)}</p>
              <p className="font-label-sm text-sm text-on-surface-variant">{stats.daily.count} transaksi hari ini</p>
            </div>
            <div className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-6 space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_view_week</span>
                <span className="font-label-sm text-sm font-bold">Mingguan</span>
              </div>
              <p className="font-h1 text-h2">{formatPrice(stats.weekly.total)}</p>
              <p className="font-label-sm text-sm text-on-surface-variant">{stats.weekly.count} transaksi minggu ini</p>
            </div>
            <div className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-6 space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
                <span className="font-label-sm text-sm font-bold">Bulanan</span>
              </div>
              <p className="font-h1 text-h2">{formatPrice(stats.monthly.total)}</p>
              <p className="font-label-sm text-sm text-on-surface-variant">{stats.monthly.count} transaksi bulan ini</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-6">
        <h3 className="font-headline-lg text-xl font-bold mb-2">Total Penjualan</h3>
        <p className="font-body-md text-body-md">{totalOrders} transaksi | {formatPrice(allTimeRevenue)}</p>
      </div>
    </div>
  )
}

function CategoriesManager() {
  const [categories, setCategories] = useState([])
  const [newCat, setNewCat] = useState('')
  const [editCat, setEditCat] = useState(null)
  const [editVal, setEditVal] = useState('')
  const [loading, setLoading] = useState(true)

  const loadCategories = () => {
    setLoading(true)
    categoryApi.getAll().then(setCategories).catch(console.error).finally(() => setLoading(false))
  }

  useEffect(() => { loadCategories() }, [])

  const addCategory = async () => {
    const trimmed = newCat.trim()
    if (!trimmed) return
    try {
      await categoryApi.create(trimmed)
      setNewCat('')
      loadCategories()
    } catch (e) { alert(e.message) }
  }

  const deleteCategory = async (cat) => {
    try {
      await categoryApi.delete(cat)
      loadCategories()
    } catch (e) { alert(e.message) }
  }

  const startEdit = (cat) => {
    setEditCat(cat)
    setEditVal(cat)
  }

  const saveEdit = async () => {
    const trimmed = editVal.trim()
    if (!trimmed || trimmed === editCat) { setEditCat(null); return }
    try {
      await categoryApi.rename(editCat, trimmed)
      setEditCat(null)
      loadCategories()
    } catch (e) { alert(e.message) }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-h2 text-h2">Kategori</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Kelola kategori menu (Coffee, Food, dll)</p>
      </div>

      <div className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-6 space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Nama kategori baru..."
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000000] focus:outline-none focus:shadow-[5px_5px_0px_#000000] transition-all font-body-md"
            onKeyDown={(e) => e.key === 'Enter' && addCategory()}
          />
          <button onClick={addCategory}
            className="bg-black text-white px-6 py-3 rounded-full font-label-sm uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-2 border-black cursor-pointer whitespace-nowrap"
          >
            Tambah
          </button>
        </div>

        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center justify-between bg-surface rounded-2xl border-2 border-black p-4 shadow-[3px_3px_0px_#000000]">
              {editCat === cat ? (
                <div className="flex gap-2 flex-1 mr-3">
                  <input type="text" value={editVal}
                    onChange={(e) => setEditVal(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border-2 border-black font-body-md focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                    autoFocus
                  />
                  <button onClick={saveEdit} className="bg-primary-pastel px-4 py-2 rounded-full font-label-sm text-sm font-bold border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer">Simpan</button>
                  <button onClick={() => setEditCat(null)} className="px-4 py-2 rounded-full font-label-sm text-sm font-bold border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer">Batal</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
                    <span className="font-headline-lg text-lg font-bold">{cat}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(cat)}
                      className="bg-primary-pastel px-4 py-2 rounded-full font-label-sm text-sm font-bold border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                    >Edit</button>
                    <button onClick={() => deleteCategory(cat)}
                      className="bg-white text-red-600 px-4 py-2 rounded-full font-label-sm text-sm font-bold border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                    >Hapus</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MenuManager() {
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ name: '', desc: '', price: '', img: '', cat: '' })
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    setLoading(true)
    Promise.all([menuApi.getAll(), categoryApi.getAll()]).then(([items, cats]) => {
      setMenuItems(items)
      setCategories(cats)
    }).catch(console.error).finally(() => setLoading(false))
  }

  useEffect(() => { loadData() }, [])

  const resetForm = () => {
    setForm({ name: '', desc: '', price: '', img: '', cat: categories[0] || '' })
    setEditingId(null)
    setShowForm(false)
  }

  const openEdit = (item) => {
    setForm({ name: item.name, desc: item.desc, price: item.price, img: item.img, cat: item.cat })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.price || !form.cat) return
    const data = {
      name: form.name,
      desc: form.desc,
      price: Number(form.price),
      img: form.img || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
      cat: form.cat,
    }
    try {
      if (editingId) {
        await menuApi.update(editingId, data)
      } else {
        await menuApi.create(data)
      }
      resetForm()
      loadData()
    } catch (e) { alert(e.message) }
  }

  const deleteItem = async (id) => {
    try {
      await menuApi.delete(id)
      loadData()
    } catch (e) { alert(e.message) }
  }

  const filtered = filter === 'All' ? menuItems : menuItems.filter(m => m.cat === filter)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-h2 text-h2">Menu Items</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Kelola semua menu kopi dan makanan</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true) }}
          className="bg-black text-white px-6 py-3 rounded-full font-label-sm uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-2 border-black cursor-pointer flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Tambah Menu
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0px_#000000] p-6 space-y-5">
          <h3 className="font-headline-lg text-2xl font-bold">{editingId ? 'Edit Menu' : 'Tambah Menu Baru'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-label-sm text-sm font-bold block mb-1">Nama Menu</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000000] focus:outline-none focus:shadow-[5px_5px_0px_#000000] transition-all font-body-md" />
            </div>
            <div>
              <label className="font-label-sm text-sm font-bold block mb-1">Harga (Rp)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000000] focus:outline-none focus:shadow-[5px_5px_0px_#000000] transition-all font-body-md" />
            </div>
            <div>
              <label className="font-label-sm text-sm font-bold block mb-1">Kategori</label>
              <select value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000000] focus:outline-none focus:shadow-[5px_5px_0px_#000000] transition-all font-body-md bg-white"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="font-label-sm text-sm font-bold block mb-1">URL Gambar</label>
              <input type="text" value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000000] focus:outline-none focus:shadow-[5px_5px_0px_#000000] transition-all font-body-md" />
            </div>
            <div className="sm:col-span-2">
              <label className="font-label-sm text-sm font-bold block mb-1">Deskripsi</label>
              <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000000] focus:outline-none focus:shadow-[5px_5px_0px_#000000] transition-all font-body-md resize-none" rows={2} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave}
              className="bg-black text-white px-8 py-3 rounded-full font-label-sm uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-2 border-black cursor-pointer"
            >
              {editingId ? 'Simpan Perubahan' : 'Tambah Menu'}
            </button>
            <button onClick={resetForm}
              className="bg-white px-6 py-3 rounded-full font-label-sm uppercase tracking-wider font-bold border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        {['All', ...categories].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full font-label-sm font-bold border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer ${
              filter === cat ? 'bg-primary-pastel text-black' : 'bg-white text-black hover:shadow-[5px_5px_0px_#000000]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-4 flex items-center gap-4">
            <img className="w-16 h-16 rounded-xl border-2 border-black object-cover flex-shrink-0" src={item.img} alt={item.name} />
            <div className="flex-1 min-w-0">
              <h3 className="font-headline-lg text-lg font-bold truncate">{item.name}</h3>
              <p className="font-body-md text-sm text-on-surface-variant truncate">{item.desc}</p>
              <div className="flex gap-2 mt-1">
                <span className="bg-primary-pastel text-xs font-bold px-2 py-0.5 rounded-full border border-black">{item.cat}</span>
                <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">{formatPrice(item.price)}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(item)}
                className="bg-primary-pastel px-4 py-2 rounded-full font-label-sm text-sm font-bold border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >Edit</button>
              <button onClick={() => deleteItem(item.id)}
                className="bg-white text-red-600 px-4 py-2 rounded-full font-label-sm text-sm font-bold border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >Hapus</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000000] p-8 text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">Tidak ada menu untuk kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function AdminSidebar({ activeMenu, setActiveMenu, onLogout }) {
  const menus = [
    { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { key: 'categories', label: 'Kategori', icon: 'category' },
    { key: 'menu', label: 'Menu Items', icon: 'restaurant_menu' },
  ]

  return (
    <aside className="w-64 bg-white border-r-2 border-black min-h-screen flex flex-col shadow-[4px_0px_0px_#000000] flex-shrink-0">
      <div className="p-6 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>dark_mode</span>
          <span className="text-xl font-bold font-headline-lg">Lunar Admin</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menus.map(m => (
          <button key={m.key} onClick={() => setActiveMenu(m.key)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-label-sm font-bold transition-all cursor-pointer ${
              activeMenu === m.key
                ? 'bg-primary-pastel border-2 border-black shadow-[3px_3px_0px_#000000]'
                : 'hover:bg-surface border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0px_#000000]'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
            {m.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t-2 border-black">
        <button onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-label-sm font-bold text-red-600 hover:bg-red-50 border-2 border-transparent hover:border-red-300 hover:shadow-[3px_3px_0px_#fecaca] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </aside>
  )
}

export default function AdminDashboard({ onLogout }) {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return <DashboardHome />
      case 'categories': return <CategoriesManager />
      case 'menu': return <MenuManager />
      default: return null
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F9FAEF]">
      <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} onLogout={onLogout} />
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  )
}
