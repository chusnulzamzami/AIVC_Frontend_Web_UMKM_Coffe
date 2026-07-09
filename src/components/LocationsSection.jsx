export default function LocationsSection({ locations }) {
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
