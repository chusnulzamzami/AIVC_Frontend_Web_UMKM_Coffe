export default function NewsSection({ newsItems }) {
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
