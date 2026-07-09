import { useState } from 'react'
import { formatPrice } from '../utils/format'

export default function MenuSection({ cart, setCart, menuItems, categories }) {
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
