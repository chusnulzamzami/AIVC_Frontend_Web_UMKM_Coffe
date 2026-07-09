from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from typing import Optional
from pydantic import BaseModel
import json
from pathlib import Path

app = FastAPI(title="Lunar Coffee API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = Path(__file__).parent / "data"
DATA_DIR.mkdir(exist_ok=True)


def read_json(filename: str) -> list | dict:
    filepath = DATA_DIR / filename
    if filepath.exists():
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


def write_json(filename: str, data: list | dict):
    filepath = DATA_DIR / filename
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


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
    items = read_json("menu.json")
    if cat:
        return [m for m in items if m["cat"] == cat]
    return items


@app.get("/api/menu/{item_id}")
def get_menu_item(item_id: int):
    items = read_json("menu.json")
    for m in items:
        if m["id"] == item_id:
            return m
    raise HTTPException(404, "Menu item not found")


@app.post("/api/menu")
def create_menu_item(data: MenuItemIn):
    items = read_json("menu.json")
    new_id = max(m["id"] for m in items) + 1 if items else 1
    item = {"id": new_id, "name": data.name, "desc": data.desc,
            "price": data.price, "img": data.img or "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
            "cat": data.cat}
    items.append(item)
    write_json("menu.json", items)
    return item


@app.put("/api/menu/{item_id}")
def update_menu_item(item_id: int, data: MenuItemIn):
    items = read_json("menu.json")
    for i, m in enumerate(items):
        if m["id"] == item_id:
            items[i] = {"id": item_id, "name": data.name, "desc": data.desc,
                         "price": data.price, "img": data.img or m["img"],
                         "cat": data.cat}
            write_json("menu.json", items)
            return items[i]
    raise HTTPException(404, "Menu item not found")


@app.delete("/api/menu/{item_id}")
def delete_menu_item(item_id: int):
    items = read_json("menu.json")
    for i, m in enumerate(items):
        if m["id"] == item_id:
            deleted = items.pop(i)
            write_json("menu.json", items)
            return deleted
    raise HTTPException(404, "Menu item not found")


# ─── Categories ───

@app.get("/api/categories")
def get_categories():
    return read_json("categories.json")


@app.post("/api/categories")
def create_category(data: CategoryIn):
    name = data.name.strip()
    if not name:
        raise HTTPException(400, "Category name cannot be empty")
    categories = read_json("categories.json")
    if name in categories:
        raise HTTPException(400, "Category already exists")
    categories.append(name)
    write_json("categories.json", categories)
    return {"name": name}


@app.put("/api/categories/{old_name}")
def rename_category(old_name: str, data: CategoryIn):
    new_name = data.name.strip()
    if not new_name:
        raise HTTPException(400, "Category name cannot be empty")
    categories = read_json("categories.json")
    if old_name not in categories:
        raise HTTPException(404, "Category not found")
    if new_name != old_name and new_name in categories:
        raise HTTPException(400, "Category name already exists")
    idx = categories.index(old_name)
    categories[idx] = new_name
    write_json("categories.json", categories)

    items = read_json("menu.json")
    for m in items:
        if m["cat"] == old_name:
            m["cat"] = new_name
    write_json("menu.json", items)
    return {"name": new_name}


@app.delete("/api/categories/{name}")
def delete_category(name: str):
    categories = read_json("categories.json")
    if name not in categories:
        raise HTTPException(404, "Category not found")
    categories.remove(name)
    write_json("categories.json", categories)
    return {"message": f"Category '{name}' deleted"}


# ─── Orders ───

@app.get("/api/orders")
def get_orders():
    return read_json("orders.json")


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
    orders = read_json("orders.json")
    orders.append(order)
    write_json("orders.json", orders)
    return order


@app.get("/api/orders/stats")
def order_stats():
    orders = read_json("orders.json")
    now = datetime.now()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=today_start.weekday())
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    def calc(from_date):
        filtered = [o for o in orders if datetime.fromisoformat(o["date"]) >= from_date]
        return {"count": len(filtered), "total": sum(o["total"] for o in filtered)}

    return {
        "daily": calc(today_start),
        "weekly": calc(week_start),
        "monthly": calc(month_start),
        "all_time": {"count": len(orders), "total": sum(o["total"] for o in orders)},
    }


# ─── E-Wallet ───

@app.get("/api/ewallet")
def get_ewallet():
    return read_json("ewallet.json")


# ─── Locations ───

@app.get("/api/locations")
def get_locations():
    return read_json("locations.json")


# ─── News ───

@app.get("/api/news")
def get_news():
    return read_json("news.json")


# ─── Dashboard Summary ───

@app.get("/api/dashboard")
def dashboard_summary():
    items = read_json("menu.json")
    categories = read_json("categories.json")
    category_counts = [
        {"name": cat, "count": len([m for m in items if m["cat"] == cat])}
        for cat in categories
    ]
    total_revenue = sum(m["price"] for m in items)
    highest = max(items, key=lambda m: m["price"]) if items else None
    return {
        "category_counts": category_counts,
        "total_menu_price": total_revenue,
        "menu_count": len(items),
        "category_count": len(categories),
        "highest_priced_item": {"name": highest["name"], "price": highest["price"]} if highest else None,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
