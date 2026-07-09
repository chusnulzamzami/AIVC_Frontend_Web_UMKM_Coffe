export const defaultMenuItems = [
  { id: 1, name: 'Espresso', img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop', desc: 'Klasik dan pekat, jiwa dari setiap kopi', price: 25000, cat: 'Coffee' },
  { id: 2, name: 'Americano', img: 'https://images.unsplash.com/photo-1559496417-e6f2cb7a162b?w=400&h=400&fit=crop', desc: 'Espresso dengan air panas, ringan dan lembut', price: 30000, cat: 'Coffee' },
  { id: 3, name: 'Cappuccino', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop', desc: 'Espresso, susu panas, dan busa susu yang lembut', price: 35000, cat: 'Coffee' },
  { id: 4, name: 'Caffe Latte', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop', desc: 'Espresso dengan susu steamed yang creamy', price: 35000, cat: 'Coffee' },
  { id: 5, name: 'Mocha', img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc39?w=400&h=400&fit=crop', desc: 'Perpaduan cokelat dan espresso yang memanjakan', price: 40000, cat: 'Coffee' },
  { id: 6, name: 'Cold Brew', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop', desc: 'Seduhan dingin 24 jam, segar dan rendah asam', price: 38000, cat: 'Coffee' },
  { id: 7, name: 'Affogato', img: 'https://images.unsplash.com/photo-1579954115564-e9f21b53c5e0?w=400&h=400&fit=crop', desc: 'Espresso panas di atas es krim vanila', price: 42000, cat: 'Coffee' },
  { id: 8, name: 'Macchiato', img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop', desc: 'Espresso dengan sedikit busa susu', price: 32000, cat: 'Coffee' },
  { id: 9, name: 'Flat White', img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=400&fit=crop', desc: 'Espresso dengan microfoam susu yang halus', price: 36000, cat: 'Coffee' },
  { id: 10, name: 'Irish Coffee', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop', desc: 'Kopi dengan sentuhan whiskey Irlandia', price: 50000, cat: 'Coffee' },
  { id: 11, name: 'Croissant', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop', desc: 'Croissant pastry renyah berlapis mentega', price: 18000, cat: 'Food' },
  { id: 12, name: 'Cheese Cake', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=400&fit=crop', desc: 'Cheesecake creamy dengan topping berry segar', price: 28000, cat: 'Food' },
  { id: 13, name: 'Banana Cake', img: 'https://images.unsplash.com/photo-1604881988758-80e2e0e5e5c9?w=400&h=400&fit=crop', desc: 'Banana cake lembut dengan kacang kenari', price: 22000, cat: 'Food' },
  { id: 14, name: 'Chocolate Cookies', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop', desc: 'Cookies cokelat chips homemade', price: 15000, cat: 'Food' },
  { id: 15, name: 'Brownies', img: 'https://images.unsplash.com/photo-1607936854279-55e8a5c8d7d7?w=400&h=400&fit=crop', desc: 'Brownies fudge cokelat premium', price: 25000, cat: 'Food' },
  { id: 16, name: 'Sandwich', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop', desc: 'Sandwich lapis dengan smoked beef dan keju', price: 30000, cat: 'Food' },
  { id: 17, name: 'French Fries', img: 'https://images.unsplash.com/photo-1573080543235-0e5e9c6a6e1d?w=400&h=400&fit=crop', desc: 'Kentang goreng renyah dengan saus pilihan', price: 20000, cat: 'Food' },
  { id: 18, name: 'Muffin Blueberry', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop', desc: 'Muffin blueberry lembut dengan taburan streusel', price: 18000, cat: 'Food' },
  { id: 19, name: 'Bagel Salmon', img: 'https://images.unsplash.com/photo-1624683941001-f0e70e1ef44a?w=400&h=400&fit=crop', desc: 'Bagel panggang dengan smoked salmon dan cream cheese', price: 32000, cat: 'Food' },
  { id: 20, name: 'Tiramisu', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop', desc: 'Tiramisu klasik Italia dengan mascarpone', price: 30000, cat: 'Food' },
]

export const defaultCategories = ['Coffee', 'Food']

export const ewalletOptions = [
  { key: 'gopay', label: 'GoPay', icon: 'account_balance_wallet', color: '#00AAFF', account: '0812-3456-7890', instructions: 'Buka GoPay > Bayar > Scan QR atau masukkan nomor tujuan' },
  { key: 'ovo', label: 'OVO', icon: 'account_balance_wallet', color: '#4B2B9C', account: '0812-3456-7891', instructions: 'Buka OVO > Transfer > ke nomor OVO tujuan' },
  { key: 'dana', label: 'Dana', icon: 'account_balance_wallet', color: '#0086D4', account: '0812-3456-7892', instructions: 'Buka Dana > Kirim > ke nomor Dana tujuan' },
  { key: 'shopeepay', label: 'ShopeePay', icon: 'account_balance_wallet', color: '#EE4D2D', account: '0812-3456-7893', instructions: 'Buka Shopee > ShopeePay > Kirim ke nomor tujuan' },
  { key: 'linkaja', label: 'LinkAja', icon: 'account_balance_wallet', color: '#ED1C24', account: '0812-3456-7894', instructions: 'Buka LinkAja > Transfer > ke nomor LinkAja tujuan' },
]

export const paymentMethods = [
  { key: 'cash', label: 'Cash', icon: 'payments', desc: 'Bayar tunai di kasir' },
  { key: 'qris', label: 'QRIS', icon: 'qr_code_scanner', desc: 'Scan QR code pembayaran' },
  { key: 'ewallet', label: 'E-Wallet', icon: 'wallet', desc: 'GoPay / OVO / Dana / dll' },
]

export const locations = [
  { name: 'Lunar Coffee - Pusat Banda Aceh', address: 'Jl. Tgk. H. Mohd. Daud Beureueh No.12, Banda Aceh', phone: '0812-3456-7890', hours: '08:00 - 22:00' },
  { name: 'Lunar Coffee - Simpang Lima', address: 'Jl. Sultan Iskandar Muda No.45, Simpang Lima, Banda Aceh', phone: '0812-3456-7891', hours: '09:00 - 23:00' },
  { name: 'Lunar Coffee - Ulee Lheue', address: 'Jl. Pelabuhan Ulee Lheue No.7, Banda Aceh', phone: '0812-3456-7892', hours: '08:00 - 21:00' },
]
