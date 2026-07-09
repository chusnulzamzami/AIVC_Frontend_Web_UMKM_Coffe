import { useState } from 'react'

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Harap isi username dan password!')
      return
    }
    if (username === 'admin' && password === 'admin123') {
      onLogin()
    } else {
      setError('Username atau password salah!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAEF] px-6 py-12">
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-5 rounded-3xl border-2 border-black shadow-[12px_12px_0px_#000000] overflow-hidden bg-white">
        {/* left panel - branding */}
        <div className="hidden md:flex md:col-span-2 bg-primary-pastel p-8 flex-col items-center justify-center text-center border-r-2 border-black gap-4">
          <span className="material-symbols-outlined text-7xl text-black" style={{ fontVariationSettings: "'FILL' 1" }}>dark_mode</span>
          <h2 className="text-2xl font-black font-headline-lg leading-tight">Lunar<br />Coffee</h2>
          <p className="text-sm font-bold font-label-sm text-black/70">Brewed for the Stars</p>
          <div className="mt-4 w-12 h-1 bg-black rounded-full" />
          <p className="text-xs font-body-md text-black/60">Dashboard Admin Panel</p>
        </div>

        {/* right panel - form */}
        <div className="col-span-1 md:col-span-3 p-8 sm:p-10 lg:p-12">
          <div className="text-center md:text-left mb-8">
            <div className="mx-auto md:mx-0 w-14 h-14 rounded-full bg-primary-pastel border-2 border-black flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-2xl text-black" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            </div>
            <h1 className="text-3xl font-bold font-headline-lg">Selamat Datang</h1>
            <p className="text-base text-on-surface-variant font-body-md mt-1">Silakan masuk ke dashboard admin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-bold font-label-sm block mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError('') }}
                className="w-full px-5 py-4 rounded-2xl border-2 border-black bg-white text-base font-body-md outline-none focus:ring-2 focus:ring-primary-pastel focus:-translate-y-0.5 transition-all"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="text-sm font-bold font-label-sm block mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                className="w-full px-5 py-4 rounded-2xl border-2 border-black bg-white text-base font-body-md outline-none focus:ring-2 focus:ring-primary-pastel focus:-translate-y-0.5 transition-all"
                placeholder="******"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-300 rounded-xl px-4 py-3.5">
                <span className="material-symbols-outlined text-red-500">error</span>
                <span className="text-red-600 text-sm font-bold font-label-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-full font-label-sm font-bold uppercase tracking-wider text-base border-2 border-black shadow-[5px_5px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer mt-2"
            >
              Masuk ke Dashboard
            </button>
          </form>

          <p className="text-center text-xs text-on-surface-variant font-body-md mt-8">
            Lunar Coffee &mdash; Brewed for the Stars
          </p>
        </div>
      </div>
    </div>
  )
}