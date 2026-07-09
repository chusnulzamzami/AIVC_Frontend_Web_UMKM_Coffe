export default function Hero({ setPage }) {
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
          Experience the finest aesthetic coffee blends crafted with celestial precision. Our beans are sourced ethically and roasted to perfection, delivering a taste that&apos;s truly out of this world.
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Whether you&apos;re starting your morning orbit or winding down under the stars, Lunar Coffee is your perfect companion.
        </p>
        <button onClick={() => setPage('menu')} className="bg-black text-white px-8 py-3 rounded-full font-label-sm uppercase tracking-wider shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all border-2 border-black mt-4 cursor-pointer">
          Explore Menu
        </button>
      </div>
    </section>
  )
}
