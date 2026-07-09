import { navLinks } from '../data/news'

export default function Footer({ setPage, setShowAdmin }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface-container-highest border-t-2 border-black mt-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-lg py-md w-full gap-4">
        <div className="flex items-center gap-x-2">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>dark_mode</span>
          <span className="text-2xl font-bold font-headline-lg text-text-main">Lunar Coffee</span>
        </div>
        <div className="flex gap-6 flex-wrap justify-center">
          {navLinks.map(l => (
            <button key={l.key} onClick={() => setPage(l.key)} className="nav-link font-label-sm text-label-sm text-on-surface-variant hover:text-text-main transition-colors cursor-pointer">
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <p className="font-label-sm text-label-sm text-on-surface-variant">&copy; {currentYear} Lunar Coffee. All rights reserved.</p>
          <button onClick={() => setShowAdmin(true)} className="text-xs text-on-surface-variant hover:text-text-main underline underline-offset-2 transition-colors cursor-pointer">
            Admin
          </button>
        </div>
      </div>
    </footer>
  )
}
