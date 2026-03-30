import { useEffect, useMemo, useState, type ChangeEvent, type ComponentType } from "react";
import {
  Download,
  MessageCircle,
  RotateCcw,
  Save,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Star,
  Truck,
  Upload,
} from "lucide-react";
import iphoneXR64Front from "./assets/products/iphoneXR64Front.jpeg";
import iphoneXR64Back from "./assets/products/iphoneXR64Back.jpeg";
import iphoneXR128Front from "./assets/products/iphoneXR128Front.jpeg";
import iphoneXR128Back from "./assets/products/iphoneXR128Back.jpeg";
import iphone1164Front from "./assets/products/iphone1164Front.jpeg";
import iphone1164Back from "./assets/products/iphone1164Back.jpeg";
import iphone11128Front from "./assets/products/iphone11128Front.jpeg";
import iphone11128Back from "./assets/products/iphone11128Back.jpeg";
import iphone11Pro64Front from "./assets/products/iphone11Pro64Front.jpeg";
import iphone11Pro64Back from "./assets/products/iphone11Pro64Back.jpeg";
import iphone11ProMax64Front from "./assets/products/iphone11ProMax64Front.jpeg";
import iphone12Pro128Front from "./assets/products/iphone12Pro128Front.jpeg";
import iphone12Pro128Back from "./assets/products/iphone12Pro128Back.jpeg";
import iphone12ProMax128Front from "./assets/products/iphone12ProMax128Front.jpeg";
import iphone12ProMax128Back from "./assets/products/iphone12ProMax128Back.jpeg";
import iphone13_128Front from "./assets/products/iphone13_128Front.jpeg";
import iphone13_128Back from "./assets/products/iphone13_128Back.jpeg";
import iphone13Pro128Front from "./assets/products/iphone13Pro128Front.jpeg";
import iphone13Pro128Back from "./assets/products/iphone13Pro128Back.jpeg";
import iphone14_128Front from "./assets/products/iphone14_128Front.jpeg";
import iphone14_128Back from "./assets/products/iphone14_128Back.jpeg";
import iphone14Pro128Front from "./assets/products/iphone14Pro128Front.jpeg";
import iphone14Pro256Front from "./assets/products/iphone14Pro256Front.jpeg";
import iphone14ProMax256Front from "./assets/products/iphone14ProMax256Front.jpeg";
import iphone15_128Front from "./assets/products/iphone15_128Front.jpeg";
import iphone15Pro256Back from "./assets/products/iphone15Pro256Back.jpeg";
import iphone15ProMax128Front from "./assets/products/iphone15ProMax128Front.jpeg";
import iphone16_256Front from "./assets/products/iphone16_256Front.jpeg";
import iphone16Pro256Front from "./assets/products/iphone16Pro256Front.jpeg";
import iphone16Pro256Back from "./assets/products/iphone16Pro256Back.jpeg";
import iphone16ProMax256Front from "./assets/products/iphone16ProMax256Front.jpeg";
import iphone16ProMax256Back from "./assets/products/iphone16ProMax256Back.jpeg";
import iphone17ProMax256Front from "./assets/products/iphone17ProMax256Front.jpeg";
import iphone17ProMax256Back from "./assets/products/iphone17ProMax256Back.jpeg";

type Phone = {
  id: string;
  model: string;
  price: number;
  storage: string;
  series: string;
  frontImage: string;
  backImage?: string;
  badge: string;
  featured?: boolean;
};

type IconType = ComponentType<{ className?: string }>;
type PriceMap = Record<string, number>;

type Service = {
  title: string;
  description: string;
  icon: IconType;
};

type Benefit = {
  title: string;
  text: string;
  icon: IconType;
};

const BRAND_LOGO = iphone14ProMax256Front;
const PRICE_STORAGE_KEY = "ithreesixty-admin-prices-v1";

const defaultPhones: Phone[] = [
  { id: "iphone-xr-64gb", model: "iPhone XR 64GB", price: 3990, storage: "64GB", series: "XR", frontImage: iphoneXR64Front, backImage: iphoneXR64Back, badge: "Front + Back", featured: true },
  { id: "iphone-xr-128gb", model: "iPhone XR 128GB", price: 4490, storage: "128GB", series: "XR", frontImage: iphoneXR128Front, backImage: iphoneXR128Back, badge: "Front + Back" },
  { id: "iphone-11-64gb", model: "iPhone 11 64GB", price: 4990, storage: "64GB", series: "11", frontImage: iphone1164Front, backImage: iphone1164Back, badge: "Front + Back", featured: true },
  { id: "iphone-11-128gb", model: "iPhone 11 128GB", price: 5490, storage: "128GB", series: "11", frontImage: iphone11128Front, backImage: iphone11128Back, badge: "Front + Back", featured: true },
  { id: "iphone-11-pro-64gb", model: "iPhone 11 Pro 64GB", price: 5200, storage: "64GB", series: "11 Pro", frontImage: iphone11Pro64Front, backImage: iphone11Pro64Back, badge: "Real Photo" },
  { id: "iphone-11-pro-max-64gb", model: "iPhone 11 Pro Max 64GB", price: 5990, storage: "64GB", series: "11 Pro Max", frontImage: iphone11ProMax64Front, badge: "Featured", featured: true },
  { id: "iphone-12-pro-128gb", model: "iPhone 12 Pro 128GB", price: 6290, storage: "128GB", series: "12 Pro", frontImage: iphone12Pro128Front, backImage: iphone12Pro128Back, badge: "Front + Back" },
  { id: "iphone-12-pro-max-128gb", model: "iPhone 12 Pro Max 128GB", price: 7790, storage: "128GB", series: "12 Pro Max", frontImage: iphone12ProMax128Front, backImage: iphone12ProMax128Back, badge: "Top Pick" },
  { id: "iphone-13-128gb", model: "iPhone 13 128GB", price: 6799, storage: "128GB", series: "13", frontImage: iphone13_128Front, backImage: iphone13_128Back, badge: "Front + Back" },
  { id: "iphone-13-pro-128gb", model: "iPhone 13 Pro 128GB", price: 8790, storage: "128GB", series: "13 Pro", frontImage: iphone13Pro128Front, backImage: iphone13Pro128Back, badge: "Pro Camera" },
  { id: "iphone-14-128gb", model: "iPhone 14 128GB", price: 7890, storage: "128GB", series: "14", frontImage: iphone14_128Front, backImage: iphone14_128Back, badge: "Front + Back" },
  { id: "iphone-14-pro-128gb", model: "iPhone 14 Pro 128GB", price: 10490, storage: "128GB", series: "14 Pro", frontImage: iphone14Pro128Front, badge: "Dynamic Island" },
  { id: "iphone-14-pro-256gb", model: "iPhone 14 Pro 256GB", price: 11290, storage: "256GB", series: "14 Pro", frontImage: iphone14Pro256Front, badge: "Extra Storage" },
  { id: "iphone-14-pro-max-256gb", model: "iPhone 14 Pro Max 256GB", price: 12890, storage: "256GB", series: "14 Pro Max", frontImage: iphone14ProMax256Front, badge: "Premium Max" },
  { id: "iphone-15-128gb", model: "iPhone 15 128GB", price: 10299, storage: "128GB", series: "15", frontImage: iphone15_128Front, badge: "USB-C" },
  { id: "iphone-15-pro-256gb", model: "iPhone 15 Pro 256GB", price: 14900, storage: "256GB", series: "15 Pro", frontImage: iphone15Pro256Back, badge: "Titanium" },
  { id: "iphone-15-pro-max-128gb", model: "iPhone 15 Pro Max 128GB", price: 16700, storage: "128GB", series: "15 Pro Max", frontImage: iphone15ProMax128Front, badge: "Zoom Power" },
  { id: "iphone-16-256gb", model: "iPhone 16 256GB", price: 14890, storage: "256GB", series: "16", frontImage: iphone16_256Front, badge: "New Arrival" },
  { id: "iphone-16-pro-256gb", model: "iPhone 16 Pro 256GB", price: 17880, storage: "256GB", series: "16 Pro", frontImage: iphone16Pro256Front, backImage: iphone16Pro256Back, badge: "Front + Back" },
  { id: "iphone-16-pro-max-256gb", model: "iPhone 16 Pro Max 256GB", price: 20990, storage: "256GB", series: "16 Pro Max", frontImage: iphone16ProMax256Front, backImage: iphone16ProMax256Back, badge: "Ultimate" },
  { id: "iphone-17-pro-max-256gb", model: "iPhone 17 Pro Max 256GB", price: 22990, storage: "256GB", series: "17 Pro Max", frontImage: iphone17ProMax256Front, backImage: iphone17ProMax256Back, badge: "Latest Stock", featured: true },
];

const services: Service[] = [
  { icon: Smartphone, title: "iPhone Sales", description: "Shop quality iPhones across multiple generations and storage sizes." },
  { icon: Star, title: "Upgrade Support", description: "Move into a newer model with help choosing the right device for your budget." },
  { icon: ShieldCheck, title: "Trade-In Options", description: "Trade in your current phone and reduce the cost of your next iPhone." },
];

const benefits: Benefit[] = [
  { icon: ShieldCheck, title: "Real product photos", text: "Front and back photos are shown for matching models where available." },
  { icon: Truck, title: "Fast response", text: "WhatsApp-first support for quick orders and questions." },
  { icon: MessageCircle, title: "Easy ordering", text: "Customers can enquire and place orders directly online." },
];

function formatPrice(price: number): string {
  return `R${Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function buildWhatsAppLink(message: string): string {
  return `https://wa.me/27678800719?text=${encodeURIComponent(message)}`;
}

function getDefaultPriceMap(): PriceMap {
  return defaultPhones.reduce<PriceMap>((acc, phone) => {
    acc[phone.id] = phone.price;
    return acc;
  }, {});
}

function sanitizePrice(input: string): number {
  const parsed = Number(String(input).replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : 0;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("All");
  const [cart, setCart] = useState<Phone[]>([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");
  const [showBackMap, setShowBackMap] = useState<Record<string, boolean>>({});
  const [priceInputs, setPriceInputs] = useState<Record<string, string>>(() => {
    const defaults = getDefaultPriceMap();
    return Object.fromEntries(defaultPhones.map((phone) => [phone.id, String(defaults[phone.id])]));
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(PRICE_STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as PriceMap;
      setPriceInputs((current) => {
        const next = { ...current };
        defaultPhones.forEach((phone) => {
          if (typeof parsed[phone.id] === "number" && parsed[phone.id] > 0) {
            next[phone.id] = String(parsed[phone.id]);
          }
        });
        return next;
      });
      setAdminMessage("Saved prices loaded on this device.");
    } catch {
      setAdminMessage("Could not read saved prices.");
    }
  }, []);

  const phones = useMemo(
    () => defaultPhones.map((phone) => ({ ...phone, price: sanitizePrice(priceInputs[phone.id] ?? String(phone.price)) || phone.price })),
    [priceInputs]
  );

  const seriesOptions = useMemo(() => ["All", ...Array.from(new Set(phones.map((phone) => phone.series)))], [phones]);

  const filteredPhones = useMemo(() => {
    const loweredQuery = query.trim().toLowerCase();
    return phones.filter((phone) => {
      const matchesQuery = loweredQuery.length === 0 || [phone.model, phone.series, phone.storage].some((value) => value.toLowerCase().includes(loweredQuery));
      const matchesSeries = selectedSeries === "All" || phone.series === selectedSeries;
      return matchesQuery && matchesSeries;
    });
  }, [phones, query, selectedSeries]);

  const featuredPhones = useMemo(() => phones.filter((phone) => phone.featured), [phones]);
  const cartCount = cart.length;
  const cartTotal = useMemo(() => cart.reduce((sum, phone) => sum + phone.price, 0), [cart]);

  const cartMessage = useMemo(() => {
    if (cart.length === 0) return "Hello, I want to enquire about iPhones from ITHREESIXTY CELLPHONES.";
    const itemLines = cart.map((item, index) => `${index + 1}. ${item.model} - ${formatPrice(item.price)}`).join("\n");
    return `Hello, I want to order these iPhones from ITHREESIXTY CELLPHONES:\n${itemLines}\nTotal: ${formatPrice(cartTotal)}`;
  }, [cart, cartTotal]);

  const addToCart = (phone: Phone) => setCart((current) => [...current, phone]);
  const clearCart = () => setCart([]);

  const handlePriceInputChange = (id: string, value: string) => {
    setPriceInputs((current) => ({ ...current, [id]: value }));
    setAdminMessage("");
  };

  const savePrices = () => {
    if (typeof window === "undefined") return;
    const cleaned = defaultPhones.reduce<PriceMap>((acc, phone) => {
      const value = sanitizePrice(priceInputs[phone.id] ?? String(phone.price));
      acc[phone.id] = value || phone.price;
      return acc;
    }, {});
    window.localStorage.setItem(PRICE_STORAGE_KEY, JSON.stringify(cleaned));
    setPriceInputs(Object.fromEntries(defaultPhones.map((phone) => [phone.id, String(cleaned[phone.id])] )));
    setAdminMessage("Prices saved on this browser.");
  };

  const resetPrices = () => {
    const defaults = getDefaultPriceMap();
    setPriceInputs(Object.fromEntries(defaultPhones.map((phone) => [phone.id, String(defaults[phone.id])] )));
    if (typeof window !== "undefined") window.localStorage.removeItem(PRICE_STORAGE_KEY);
    setAdminMessage("Prices reset to default.");
  };

  const downloadPriceList = () => {
    if (typeof window === "undefined") return;
    const exportData = defaultPhones.map((phone) => ({ model: phone.model, price: sanitizePrice(priceInputs[phone.id] ?? String(phone.price)) || phone.price }));
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ithreesixty-prices.json";
    link.click();
    URL.revokeObjectURL(url);
    setAdminMessage("Price list downloaded.");
  };

  const importPriceList = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Array<{ model?: string; price?: number | string }>;
        const nextInputs = { ...priceInputs };
        defaultPhones.forEach((phone) => {
          const match = parsed.find((item) => item.model === phone.model);
          if (match?.price !== undefined) {
            const value = sanitizePrice(String(match.price));
            if (value > 0) nextInputs[phone.id] = String(value);
          }
        });
        setPriceInputs(nextInputs);
        setAdminMessage("Imported prices. Click save to keep them on this browser.");
      } catch {
        setAdminMessage("Import failed. Use the downloaded JSON format.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const toggleView = (phoneId: string) => {
    setShowBackMap((current) => ({ ...current, [phoneId]: !current[phoneId] }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <a href={buildWhatsAppLink(cartMessage)} className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-2xl transition hover:scale-[1.03]">
        <MessageCircle className="h-5 w-5" />
        WhatsApp Order {cartCount > 0 ? `(${cartCount})` : ""}
      </a>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 via-white to-slate-100" />
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-12">
          <header className="flex items-center justify-between rounded-full border border-slate-200 bg-white/90 px-5 py-3 shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <img src={BRAND_LOGO} alt="ITHREESIXTY logo" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="text-lg font-semibold tracking-[0.25em]">ITHREESIXTY</p>
                <p className="text-xs tracking-[0.35em] text-slate-500">CELLPHONES</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
              <a href="#home" className="transition hover:text-slate-950">Home</a>
              <a href="#shop" className="transition hover:text-slate-950">Shop</a>
              <a href="#about" className="transition hover:text-slate-950">About</a>
              <a href="#contact" className="transition hover:text-slate-950">Contact</a>
            </nav>
          </header>

          <div id="home" className="grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full border border-cyan-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                Real front and back photos have been added
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Shop real iPhones
                <br />
                with matching
                <br />
                model photos.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Customers can browse by model and storage, view front and back photos where available, and place orders directly on WhatsApp.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#shop" className="rounded-full bg-slate-950 px-7 py-4 text-center text-sm font-medium text-white shadow-lg transition hover:scale-[1.02]">Shop Now</a>
                <a href={buildWhatsAppLink("Hello, I want to enquire about your iPhones.")} className="rounded-full border border-cyan-200 bg-cyan-50 px-7 py-4 text-center text-sm font-medium text-slate-950 shadow-sm transition hover:border-cyan-400">Ask on WhatsApp</a>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.title} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                      <Icon className="h-5 w-5 text-cyan-500" />
                      <p className="mt-3 text-sm font-semibold text-slate-900">{benefit.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{benefit.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -translate-x-6 translate-y-6 rounded-[2rem] bg-gradient-to-br from-cyan-300/30 to-blue-500/30 blur-3xl" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl">
                <img src={iphone17ProMax256Front} alt="Featured iPhone" className="h-[34rem] w-full rounded-[1.75rem] object-cover" />
                <div className="absolute bottom-10 left-10 right-10 rounded-[1.5rem] border border-white/30 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Online Store Experience</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">Browse, switch front/back, order fast</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Every matching model stays on the website and new models were added without removing old stock.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 sm:px-10 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPhones.slice(0, 4).map((phone) => (
            <div key={phone.model} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <img src={phone.frontImage} alt={phone.model} className="h-64 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Real stock highlight</p>
                    <h3 className="mt-2 text-2xl font-semibold">{phone.model}</h3>
                  </div>
                  <p className="text-lg font-semibold text-slate-950">{formatPrice(phone.price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Shop Online</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">Choose your iPhone.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">Search models, filter by series, switch between front and back pictures, and add items to cart.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search iPhone model or GB" className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-cyan-400" />
            </div>
            <select value={selectedSeries} onChange={(event) => setSelectedSeries(event.target.value)} className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-400">
              {seriesOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>

        {cartCount > 0 && (
          <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-cyan-100 bg-cyan-50 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-700">Cart summary</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{cartCount} item{cartCount === 1 ? "" : "s"} selected</p>
              <p className="text-sm text-slate-600">Total: {formatPrice(cartTotal)}</p>
            </div>
            <div className="flex gap-3">
              <a href={buildWhatsAppLink(cartMessage)} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">Send Order</a>
              <button onClick={clearCart} className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700">Clear Cart</button>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPhones.map((phone) => {
            const showingBack = Boolean(showBackMap[phone.id] && phone.backImage);
            const activeImage = showingBack ? phone.backImage ?? phone.frontImage : phone.frontImage;
            return (
              <div key={phone.id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative">
                  <img src={activeImage} alt={`${phone.model} ${showingBack ? "back" : "front"}`} className="h-72 w-full object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white shadow">{phone.badge}</span>
                  {phone.backImage && (
                    <button onClick={() => toggleView(phone.id)} className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow">
                      {showingBack ? "Show Front" : "Show Back"}
                    </button>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">{phone.model}</h3>
                      <p className="mt-1 text-sm text-slate-500">Series {phone.series}</p>
                    </div>
                    <p className="text-lg font-semibold text-cyan-600">{formatPrice(phone.price)}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-slate-100 px-3 py-1">{phone.storage}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">{phone.backImage ? "Front & Back" : "Single View"}</span>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button onClick={() => addToCart(phone)} className="flex-1 rounded-full bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:scale-[1.02]">Add to Cart</button>
                    <a href={buildWhatsAppLink(`Hello, I want to buy ${phone.model} for ${formatPrice(phone.price)}.`)} className="flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600">
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPhones.length === 0 && <div className="mt-10 rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">No phones matched your search.</div>}
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50">
                    <Icon className="h-6 w-6 text-cyan-500" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">About</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">A modern iPhone shop built for fast online sales.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">ITHREESIXTY CELLPHONES combines clean design, premium branding, and direct WhatsApp ordering so customers can discover products quickly and shop with confidence.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-800 p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-6 w-6 text-cyan-300" />
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">Store Details</p>
            </div>
            <div className="mt-8 space-y-5 text-sm leading-7 text-white/80 sm:text-base">
              <p><span className="font-semibold text-white">Business:</span> ITHREESIXTY CELLPHONES</p>
              <p><span className="font-semibold text-white">Address:</span> 115 Paul Kruger Street</p>
              <p><span className="font-semibold text-white">Services:</span> iPhone sales, upgrades, and trade-in</p>
              <p><span className="font-semibold text-white">Order Method:</span> Online browsing with WhatsApp checkout</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 sm:px-10 lg:px-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <button onClick={() => setAdminOpen((current) => !current)} className="flex w-full items-center justify-between gap-4 rounded-[1.5rem] bg-slate-950 px-5 py-4 text-left text-white">
            <div className="flex items-center gap-3">
              <Settings2 className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">Admin Price Editor</p>
                <p className="text-xs text-white/70">Open this section to change prices fast.</p>
              </div>
            </div>
            <span className="text-sm">{adminOpen ? "Hide" : "Open"}</span>
          </button>

          {adminOpen && (
            <div className="mt-6 space-y-6">
              <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50 p-4 text-sm leading-6 text-slate-700">
                Change any price below, then click <span className="font-semibold">Save Prices</span>. These changes stay on the browser you used. To move the same prices to another computer, click <span className="font-semibold">Download JSON</span> and later use <span className="font-semibold">Import JSON</span>.
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {defaultPhones.map((phone) => (
                  <label key={phone.id} className="rounded-[1.5rem] border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-950">{phone.model}</p>
                    <p className="mt-1 text-xs text-slate-500">Enter amount without the R sign if you want.</p>
                    <div className="mt-3 flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3">
                      <span className="text-sm font-semibold text-slate-500">R</span>
                      <input value={priceInputs[phone.id] ?? String(phone.price)} onChange={(event) => handlePriceInputChange(phone.id, event.target.value)} inputMode="numeric" className="w-full bg-transparent text-sm outline-none" />
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={savePrices} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"><Save className="h-4 w-4" />Save Prices</button>
                <button onClick={resetPrices} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700"><RotateCcw className="h-4 w-4" />Reset Default</button>
                <button onClick={downloadPriceList} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700"><Download className="h-4 w-4" />Download JSON</button>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700"><Upload className="h-4 w-4" />Import JSON<input type="file" accept="application/json" className="hidden" onChange={importPriceList} /></label>
              </div>
              {adminMessage && <p className="text-sm text-cyan-700">{adminMessage}</p>}
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-12">
        <div className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-2xl sm:px-12 sm:py-14">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">Contact</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">Ready to order?</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-white/10 p-5"><p className="text-sm text-white/60">WhatsApp</p><a href="https://wa.me/27678800719" className="mt-2 block text-lg font-medium hover:underline">+27 67 880 0719</a></div>
            <div className="rounded-2xl bg-white/10 p-5"><p className="text-sm text-white/60">Email</p><a href="mailto:azania333@icloud.com" className="mt-2 block break-all text-lg font-medium hover:underline">azania333@icloud.com</a></div>
            <div className="rounded-2xl bg-white/10 p-5"><p className="text-sm text-white/60">TikTok</p><a href="https://www.tiktok.com/@ithreesixtymobilephone" className="mt-2 block text-lg font-medium hover:underline">@ithreesixtymobilephone</a></div>
            <div className="rounded-2xl bg-white/10 p-5"><p className="text-sm text-white/60">Address</p><p className="mt-2 text-lg font-medium">115 Paul Kruger Street</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
