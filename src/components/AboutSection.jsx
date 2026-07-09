export default function AboutSection() {
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
            <span className="font-h1 text-h1 text-primary">50+</span>
            <p className="font-label-sm text-sm mt-2">Varian Kopi</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000000] p-6 text-center flex-1">
            <span className="font-h1 text-h1 text-primary">10K+</span>
            <p className="font-label-sm text-sm mt-2">Pelanggan</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000000] p-6 text-center flex-1">
            <span className="font-h1 text-h1 text-primary">5</span>
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
