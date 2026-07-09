import { navLinks } from '../data/news'

export default function Navbar({ page, setPage, cartCount, setShowAdmin }) {
  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4">
      <nav className="bg-white rounded-full border-2 border-black shadow-[4px_4px_0px_#000000] flex justify-between items-center px-8 py-3 max-w-7xl mx-auto">
        <button onClick={() => setPage('home')} className="flex items-center gap-x-2 cursor-pointer">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>dark_mode</span>
          <span className="text-2xl font-bold font-headline-lg text-text-main">Lunar Coffee</span>
          <span className="text-xs align-top font-bold">&trade;</span>
        </button>
        <div className="hidden md:flex gap-x-8">
          {navLinks.map(l => (
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
          <button
            onClick={() => setShowAdmin(true)}
            className="md:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
