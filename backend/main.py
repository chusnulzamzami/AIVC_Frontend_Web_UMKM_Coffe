from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, date, timedelta
from typing import Optional
from pydantic import BaseModel

app = FastAPI(title="Lunar Coffee API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

menu_items = [
    {"id": 1, "name": "Espresso", "img": "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop", "desc": "Klasik dan pekat, jiwa dari setiap kopi", "price": 25000, "cat": "Coffee"},
    {"id": 2, "name": "Americano", "img": "https://images.unsplash.com/photo-1559496417-e6f2cb7a162b?w=400&h=400&fit=crop", "desc": "Espresso dengan air panas, ringan dan lembut", "price": 30000, "cat": "Coffee"},
    {"id": 3, "name": "Cappuccino", "img": "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop", "desc": "Espresso, susu panas, dan busa susu yang lembut", "price": 35000, "cat": "Coffee"},
    {"id": 4, "name": "Caffe Latte", "img": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop", "desc": "Espresso dengan susu steamed yang creamy", "price": 35000, "cat": "Coffee"},
    {"id": 5, "name": "Mocha", "img": "https://images.unsplash.com/photo-1578314675249-a6910f80cc39?w=400&h=400&fit=crop", "desc": "Perpaduan cokelat dan espresso yang memanjakan", "price": 40000, "cat": "Coffee"},
    {"id": 6, "name": "Cold Brew", "img": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop", "desc": "Seduhan dingin 24 jam, segar dan rendah asam", "price": 38000, "cat": "Coffee"},
    {"id": 7, "name": "Affogato", "img": "https://images.unsplash.com/photo-1579954115564-e9f21b53c5e0?w=400&h=400&fit=crop", "desc": "Espresso panas di atas es krim vanila", "price": 42000, "cat": "Coffee"},
    {"id": 8, "name": "Macchiato", "img": "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop", "desc": "Espresso dengan sedikit busa susu", "price": 32000, "cat": "Coffee"},
    {"id": 9, "name": "Flat White", "img": "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=400&fit=crop", "desc": "Espresso dengan microfoam susu yang halus", "price": 36000, "cat": "Coffee"},
    {"id": 10, "name": "Irish Coffee", "img": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop", "desc": "Kopi dengan sentuhan whiskey Irlandia", "price": 50000, "cat": "Coffee"},
    {"id": 11, "name": "Croissant", "img": "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop", "desc": "Croissant pastry renyah berlapis mentega", "price": 18000, "cat": "Food"},
    {"id": 12, "name": "Cheese Cake", "img": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=400&fit=crop", "desc": "Cheesecake creamy dengan topping berry segar", "price": 28000, "cat": "Food"},
    {"id": 13, "name": "Banana Cake", "img": "https://images.unsplash.com/photo-1604881988758-80e2e0e5e5c9?w=400&h=400&fit=crop", "desc": "Banana cake lembut dengan kacang kenari", "price": 22000, "cat": "Food"},
    {"id": 14, "name": "Chocolate Cookies", "img": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop", "desc": "Cookies cokelat chips homemade", "price": 15000, "cat": "Food"},
    {"id": 15, "name": "Brownies", "img": "https://images.unsplash.com/photo-1607936854279-55e8a5c8d7d7?w=400&h=400&fit=crop", "desc": "Brownies fudge cokelat premium", "price": 25000, "cat": "Food"},
    {"id": 16, "name": "Sandwich", "img": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop", "desc": "Sandwich lapis dengan smoked beef dan keju", "price": 30000, "cat": "Food"},
    {"id": 17, "name": "French Fries", "img": "https://images.unsplash.com/photo-1573080543235-0e5e9c6a6e1d?w=400&h=400&fit=crop", "desc": "Kentang goreng renyah dengan saus pilihan", "price": 20000, "cat": "Food"},
    {"id": 18, "name": "Muffin Blueberry", "img": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop", "desc": "Muffin blueberry lembut dengan taburan streusel", "price": 18000, "cat": "Food"},
    {"id": 19, "name": "Bagel Salmon", "img": "https://images.unsplash.com/photo-1624683941001-f0e70e1ef44a?w=400&h=400&fit=crop", "desc": "Bagel panggang dengan smoked salmon dan cream cheese", "price": 32000, "cat": "Food"},
    {"id": 20, "name": "Tiramisu", "img": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop", "desc": "Tiramisu klasik Italia dengan mascarpone", "price": 30000, "cat": "Food"},
]

categories = ["Coffee", "Food"]

orders = []

ewallet_options = [
    {"key": "gopay", "label": "GoPay", "icon": "account_balance_wallet", "color": "#00AAFF", "account": "0812-3456-7890", "instructions": "Buka GoPay > Bayar > Scan QR atau masukkan nomor tujuan"},
    {"key": "ovo", "label": "OVO", "icon": "account_balance_wallet", "color": "#4B2B9C", "account": "0812-3456-7891", "instructions": "Buka OVO > Transfer > ke nomor OVO tujuan"},
    {"key": "dana", "label": "Dana", "icon": "account_balance_wallet", "color": "#0086D4", "account": "0812-3456-7892", "instructions": "Buka Dana > Kirim > ke nomor Dana tujuan"},
    {"key": "shopeepay", "label": "ShopeePay", "icon": "account_balance_wallet", "color": "#EE4D2D", "account": "0812-3456-7893", "instructions": "Buka Shopee > ShopeePay > Kirim ke nomor tujuan"},
    {"key": "linkaja", "label": "LinkAja", "icon": "account_balance_wallet", "color": "#ED1C24", "account": "0812-3456-7894", "instructions": "Buka LinkAja > Transfer > ke nomor LinkAja tujuan"},
]

locations = [
    {"name": "Lunar Coffee - Pusat Banda Aceh", "address": "Jl. Tgk. H. Mohd. Daud Beureueh No.12, Banda Aceh", "phone": "0812-3456-7890", "hours": "08:00 - 22:00"},
    {"name": "Lunar Coffee - Simpang Lima", "address": "Jl. Sultan Iskandar Muda No.45, Simpang Lima, Banda Aceh", "phone": "0812-3456-7891", "hours": "09:00 - 23:00"},
    {"name": "Lunar Coffee - Ulee Lheue", "address": "Jl. Pelabuhan Ulee Lheue No.7, Banda Aceh", "phone": "0812-3456-7892", "hours": "08:00 - 21:00"},
]

news_items = [
    {"tag": "Blog", "label": "Craft", "title": "The Art of the Moon-Latté", "date": "October 20", "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuA7Y3XdF2UbfiZvpaFFRAiyTSrV0KPWDQXbao3z4NVrucWGbjk3cb9XeJRulRvleNEQQYIfLsvTaQiiGydIJiNUZJ6TvSCgxvcLya_MOxH_iI0fP-NtuVTnJVFoDF11j_sV989lhUcBp9kWmAJFq7_JHTN34TmOd9fcKsTQ7dy_ZawXVIT_fsyJsllR1tF-RAIlFzK7BqBy_GKcuZwvw07DSh1mawP57nHL_JDKl817XaClnrgi0QWSqg"},
    {"tag": "Bean Journey", "label": "Origin", "title": "High Grounds: Sourcing Beans from the High Grounds", "date": "October 15"},
    {"tag": "News", "label": "Event", "title": "Lunar Coffee Grand Opening Celebration", "date": "October 10"},
]


class MenuItemIn(BaseModel):
    name: str
    desc: str
    price: float
    img: str = ""
    cat: str


class CategoryIn(BaseModel):
    name: str


class OrderItem(BaseModel):
    id: int
    name: str
    price: float
    qty: int


class OrderIn(BaseModel):
    items: list[OrderItem]


# ─── Menu Items ───

@app.get("/api/menu")
def get_menu(cat: Optional[str] = None):
    if cat:
        return [m for m in menu_items if m["cat"] == cat]
    return menu_items


@app.get("/api/menu/{item_id}")
def get_menu_item(item_id: int):
    for m in menu_items:
        if m["id"] == item_id:
            return m
    raise HTTPException(404, "Menu item not found")


@app.post("/api/menu")
def create_menu_item(data: MenuItemIn):
    new_id = max(m["id"] for m in menu_items) + 1 if menu_items else 1
    item = {"id": new_id, "name": data.name, "desc": data.desc,
            "price": data.price, "img": data.img or "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
            "cat": data.cat}
    menu_items.append(item)
    return item


@app.put("/api/menu/{item_id}")
def update_menu_item(item_id: int, data: MenuItemIn):
    for i, m in enumerate(menu_items):
        if m["id"] == item_id:
            menu_items[i] = {"id": item_id, "name": data.name, "desc": data.desc,
                             "price": data.price, "img": data.img or m["img"],
                             "cat": data.cat}
            return menu_items[i]
    raise HTTPException(404, "Menu item not found")


@app.delete("/api/menu/{item_id}")
def delete_menu_item(item_id: int):
    for i, m in enumerate(menu_items):
        if m["id"] == item_id:
            return menu_items.pop(i)
    raise HTTPException(404, "Menu item not found")


# ─── Categories ───

@app.get("/api/categories")
def get_categories():
    return categories


@app.post("/api/categories")
def create_category(data: CategoryIn):
    name = data.name.strip()
    if not name:
        raise HTTPException(400, "Category name cannot be empty")
    if name in categories:
        raise HTTPException(400, "Category already exists")
    categories.append(name)
    return {"name": name}


@app.put("/api/categories/{old_name}")
def rename_category(old_name: str, data: CategoryIn):
    new_name = data.name.strip()
    if not new_name:
        raise HTTPException(400, "Category name cannot be empty")
    if old_name not in categories:
        raise HTTPException(404, "Category not found")
    if new_name != old_name and new_name in categories:
        raise HTTPException(400, "Category name already exists")
    idx = categories.index(old_name)
    categories[idx] = new_name
    for m in menu_items:
        if m["cat"] == old_name:
            m["cat"] = new_name
    return {"name": new_name}


@app.delete("/api/categories/{name}")
def delete_category(name: str):
    if name not in categories:
        raise HTTPException(404, "Category not found")
    categories.remove(name)
    return {"message": f"Category '{name}' deleted"}


# ─── Orders ───

@app.get("/api/orders")
def get_orders():
    return orders


@app.post("/api/orders")
def create_order(data: OrderIn):
    if not data.items:
        raise HTTPException(400, "Order must have at least one item")
    total = sum(i.price * i.qty for i in data.items)
    order = {
        "id": int(datetime.now().timestamp() * 1000),
        "items": [i.model_dump() for i in data.items],
        "total": total,
        "date": datetime.now().isoformat(),
    }
    orders.append(order)
    return order


@app.get("/api/orders/stats")
def order_stats():
    now = datetime.now()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=today_start.weekday())
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    def calc(from_date):
        filtered = [o for o in orders if datetime.fromisoformat(o["date"]) >= from_date]
        return {"count": len(filtered), "total": sum(o["total"] for o in filtered)}

    daily = calc(today_start)
    weekly = calc(week_start)
    monthly = calc(month_start)

    return {
        "daily": daily,
        "weekly": weekly,
        "monthly": monthly,
        "all_time": {"count": len(orders), "total": sum(o["total"] for o in orders)},
    }


# ─── E-Wallet ───

@app.get("/api/ewallet")
def get_ewallet():
    return ewallet_options


# ─── Locations ───

@app.get("/api/locations")
def get_locations():
    return locations


# ─── News ───

@app.get("/api/news")
def get_news():
    return news_items


# ─── Dashboard Summary ───

@app.get("/api/dashboard")
def dashboard_summary():
    category_counts = [
        {"name": cat, "count": len([m for m in menu_items if m["cat"] == cat])}
        for cat in categories
    ]
    total_revenue = sum(m["price"] for m in menu_items)
    highest = max(menu_items, key=lambda m: m["price"]) if menu_items else None
    return {
        "category_counts": category_counts,
        "total_menu_price": total_revenue,
        "menu_count": len(menu_items),
        "category_count": len(categories),
        "highest_priced_item": {"name": highest["name"], "price": highest["price"]} if highest else None,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
