import { useState } from 'react'
import { formatPrice } from '../utils/format'

const paymentMethods = [
  { key: 'cash', label: 'Cash', icon: 'payments', desc: 'Bayar tunai di kasir' },
  { key: 'qris', label: 'QRIS', icon: 'qr_code_scanner', desc: 'Scan QR code pembayaran' },
  { key: 'ewallet', label: 'E-Wallet', icon: 'wallet', desc: 'GoPay / OVO / Dana / dll' },
]

export default function ShopSection({ cart, setCart, onOrderComplete, ewalletOptions }) {
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
                    {paymentMethods.map(p => (
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
