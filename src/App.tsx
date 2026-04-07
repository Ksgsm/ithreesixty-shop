import { useMemo, useState } from "react";
import {
  CheckCircle2,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Star,
  Truck,
} from "lucide-react";

import iphone1164Front from "./assets/products/iphone1164Front.jpeg";
import iphone1164Back from "./assets/products/iphone1164Back.jpeg";
import iphone11128Front from "./assets/products/iphone11128Front.jpeg";
import iphone11128Back from "./assets/products/iphone11128Back.jpeg";

type Phone = {
  model: string;
  price: number;
  storage: string;
  series: string;
  images: string[];
  badge: string;
  featured?: boolean;
};

type IconType = React.ComponentType<{ className?: string }>;

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

const BRAND_LOGO =
  "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=300&q=80";

const phones: Phone[] = [
  {
    model: "iPhone XR 64GB",
    price: 3500,
    storage: "64GB",
    series: "XR",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Best Budget",
  },
  {
    model: "iPhone XR 128GB",
    price: 3900,
    storage: "128GB",
    series: "XR",
    images: [
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Popular",
  },
  {
    model: "iPhone 11 64GB",
    price: 4500,
    storage: "64GB",
    series: "11",
    images: [
      iphone1164Front,
      iphone1164Back,
    ],
    badge: "Great Value",
    featured: true,
  },
  {
    model: "iPhone 11 128GB",
    price: 4900,
    storage: "128GB",
    series: "11",
    images: [
      iphone11128Front,
      iphone11128Back,
    ],
    badge: "Trending",
    featured: true,
  },
  {
    model: "iPhone 11 Pro",
    price: 5200,
    storage: "Pro",
    series: "11 Pro",
    images: [
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1603898037225-1c09b0d0c3a0?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Pro Choice",
  },
  {
    model: "iPhone 11 Pro Max 64GB",
    price: 5990,
    storage: "64GB",
    series: "11 Pro Max",
    images: [
      "https://images.unsplash.com/photo-1603898037225-1c09b0d0c3a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Large Display",
  },
  {
    model: "iPhone 12 64GB",
    price: 4990,
    storage: "64GB",
    series: "12",
    images: [
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1632633173522-47456b52e0a4?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Hot Deal",
  },
  {
    model: "iPhone 12 128GB",
    price: 5290,
    storage: "128GB",
    series: "12",
    images: [
      "https://images.unsplash.com/photo-1632633173522-47456b52e0a4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Top Seller",
  },
  {
    model: "iPhone 12 Pro 128GB",
    price: 6290,
    storage: "128GB",
    series: "12 Pro",
    images: [
      "https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Premium",
  },
  {
    model: "iPhone 12 Pro Max 128GB",
    price: 7790,
    storage: "128GB",
    series: "12 Pro Max",
    images: [
      "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Flagship",
  },
  {
    model: "iPhone 13 128GB",
    price: 6799,
    storage: "128GB",
    series: "13",
    images: [
      "https://images.unsplash.com/photo-1631730486572-226ef61d1a4d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631730486782-d8bdf5d1534f?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Clean Design",
  },
  {
    model: "iPhone 13 256GB",
    price: 6990,
    storage: "256GB",
    series: "13",
    images: [
      "https://images.unsplash.com/photo-1631730486782-d8bdf5d1534f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631730486572-226ef61d1a4d?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "More Storage",
  },
  {
    model: "iPhone 13 Pro 128GB",
    price: 8790,
    storage: "128GB",
    series: "13 Pro",
    images: [
      "https://images.unsplash.com/photo-1631730486783-e1d5d4d4bb16?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631730486785-8b2fbcac28cf?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Pro Camera",
  },
  {
    model: "iPhone 13 Pro Max 128GB",
    price: 10499,
    storage: "128GB",
    series: "13 Pro Max",
    images: [
      "https://images.unsplash.com/photo-1631730486785-8b2fbcac28cf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631730486783-e1d5d4d4bb16?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Best Seller",
  },
  {
    model: "iPhone 14 128GB",
    price: 7890,
    storage: "128GB",
    series: "14",
    images: [
      "https://images.unsplash.com/photo-1664478546384-d57ffe74a87f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1663499482523-8b1707e39e74?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Modern Pick",
  },
  {
    model: "iPhone 14 Pro 128GB",
    price: 10490,
    storage: "128GB",
    series: "14 Pro",
    images: [
      "https://images.unsplash.com/photo-1663499482523-8b1707e39e74?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1663761879871-f4f44ed68d46?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Dynamic Island",
  },
  {
    model: "iPhone 14 Pro Max 128GB",
    price: 12890,
    storage: "128GB",
    series: "14 Pro Max",
    images: [
      "https://images.unsplash.com/photo-1663761879871-f4f44ed68d46?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1663499482523-8b1707e39e74?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Premium Max",
  },
  {
    model: "iPhone 15 128GB",
    price: 10299,
    storage: "128GB",
    series: "15",
    images: [
      "https://images.unsplash.com/photo-1695634426611-16f31ac5d9ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1696446702056-c5a5f3386b4f?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "USB-C",
  },
  {
    model: "iPhone 15 Pro 256GB",
    price: 14900,
    storage: "256GB",
    series: "15 Pro",
    images: [
      "https://images.unsplash.com/photo-1696446702056-c5a5f3386b4f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1697294578841-a4f6ebb9ba4e?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Titanium",
  },
  {
    model: "iPhone 15 Pro Max 256GB",
    price: 16700,
    storage: "256GB",
    series: "15 Pro Max",
    images: [
      "https://images.unsplash.com/photo-1697294578841-a4f6ebb9ba4e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1696446702056-c5a5f3386b4f?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Zoom Power",
  },
  {
    model: "iPhone 16 256GB",
    price: 14890,
    storage: "256GB",
    series: "16",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "New Arrival",
  },
  {
    model: "iPhone 16 Pro 256GB",
    price: 17880,
    storage: "256GB",
    series: "16 Pro",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Pro Power",
  },
  {
    model: "iPhone 16 Pro Max 256GB",
    price: 20990,
    storage: "256GB",
    series: "16 Pro Max",
    images: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Ultimate",
  },
];

const services: Service[] = [
  {
    icon: Smartphone,
    title: "iPhone Sales",
    description: "Shop quality iPhones across multiple generations and storage sizes.",
  },
  {
    icon: Star,
    title: "Upgrade Support",
    description: "Move into a newer model with help choosing the right device for your budget.",
  },
  {
    icon: ShieldCheck,
    title: "Trade-In Options",
    description: "Trade in your current phone and reduce the cost of your next iPhone.",
  },
];

const benefits: Benefit[] = [
  {
    icon: ShieldCheck,
    title: "23+ iPhone Models",
    text: "Affordable to premium options across multiple generations.",
  },
  {
    icon: CheckCircle2,
    title: "Secure & Verified",
    text: "Clear pricing, trusted support, and a premium buying experience.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    text: "Fast replies for product questions, upgrades, and orders.",
  },
  {
    icon: Truck,
    title: "Trusted Devices",
    text: "Clean devices and simple ordering with front and back product views.",
  },
];

function formatPrice(price: number): string {
  const rounded = Math.round(price);
  const formatted = String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `R${formatted}`;
}

function buildWhatsAppLink(message: string): string {
  return `https://wa.me/27678800719?text=${encodeURIComponent(message)}`;
}

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [selectedSeries, setSelectedSeries] = useState<string>("All");
  const [cart, setCart] = useState<Phone[]>([]);

  const seriesOptions = useMemo(
    () => ["All", ...Array.from(new Set(phones.map((phone) => phone.series)))],
    []
  );

  const filteredPhones = useMemo(() => {
    const loweredQuery = query.trim().toLowerCase();

    return phones.filter((phone) => {
      const matchesQuery =
        loweredQuery.length === 0 ||
        phone.model.toLowerCase().includes(loweredQuery) ||
        phone.series.toLowerCase().includes(loweredQuery) ||
        phone.storage.toLowerCase().includes(loweredQuery);

      const matchesSeries = selectedSeries === "All" || phone.series === selectedSeries;
      return matchesQuery && matchesSeries;
    });
  }, [query, selectedSeries]);

  const featuredPhones = useMemo(() => phones.filter((phone) => phone.featured), []);
  const heroPhone = featuredPhones[0] ?? phones[2];
  const cartCount = cart.length;
  const cartTotal = useMemo(() => cart.reduce((sum, phone) => sum + phone.price, 0), [cart]);

  const cartMessage = useMemo(() => {
    if (cart.length === 0) {
      return "Hello, I want to enquire about iPhones from ITHREESIXTY CELLPHONES.";
    }

    const itemLines = cart
      .map((item, index) => `${index + 1}. ${item.model} - ${formatPrice(item.price)}`)
      .join("\n");

    return `Hello, I want to order these iPhones from ITHREESIXTY CELLPHONES:\n${itemLines}\nTotal: ${formatPrice(cartTotal)}`;
  }, [cart, cartTotal]);

  const addToCart = (phone: Phone) => setCart((current) => [...current, phone]);
  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <a
        href={buildWhatsAppLink(cartMessage)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-2xl transition hover:scale-[1.03]"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp Order {cartCount > 0 ? `(${cartCount})` : ""}
      </a>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.28),transparent_22%),linear-gradient(135deg,#f8fbff_0%,#eef6ff_38%,#d9ebff_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.75)_40%,transparent_65%)]" />
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-12">
          <header className="flex items-center justify-between rounded-full border border-slate-200/80 bg-white/90 px-5 py-3 shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <img src={BRAND_LOGO} alt="ITHREESIXTY logo" className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100" />
              <div>
                <p className="text-lg font-semibold tracking-[0.18em]">ITHREESIXTY</p>
                <p className="text-xs tracking-[0.28em] text-slate-500">CELLPHONES</p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
              <a href="#home" className="transition hover:text-slate-950">Home</a>
              <a href="#shop" className="transition hover:text-slate-950">iPhones</a>
              <a href="#about" className="transition hover:text-slate-950">Support</a>
              <a href="#contact" className="transition hover:text-slate-950">Pricing</a>
            </nav>
          </header>

          <div id="home" className="grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-sm text-slate-700 shadow-sm">
                Premium iPhones made accessible with clear pricing and responsive service.
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Your Trusted iPhone Source
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Premium iPhone sales, upgrades, and trade-ins with a cleaner Apple-inspired experience and quick WhatsApp ordering.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#shop"
                  className="rounded-full bg-slate-900 px-7 py-4 text-center text-sm font-medium text-white shadow-lg transition hover:scale-[1.02]"
                >
                  Explore iPhones
                </a>
                <a
                  href={buildWhatsAppLink("Hello, I want to order on WhatsApp.")}
                  className="rounded-full border border-slate-200 bg-white px-7 py-4 text-center text-sm font-medium text-slate-900 shadow-sm transition hover:border-blue-300"
                >
                  Order on WhatsApp
                </a>
              </div>

              <div className="mt-10 grid gap-4 rounded-[2rem] border border-slate-200 bg-white/85 p-5 shadow-sm md:grid-cols-2">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.title} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-4">
                      <div className="rounded-xl bg-cyan-50 p-2.5">
                        <Icon className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{benefit.title}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{benefit.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-blue-500/15 via-cyan-300/10 to-transparent blur-3xl" />
              <div className="relative flex items-end justify-center">
                <div className="absolute right-0 top-8 z-20 w-56 rounded-[1.5rem] border border-slate-700/20 bg-slate-900/90 p-5 text-white shadow-2xl backdrop-blur">
                  <p className="text-sm font-medium text-white/85">{heroPhone.model}</p>
                  <p className="mt-3 text-4xl font-semibold">{formatPrice(heroPhone.price)}</p>
                  <div className="mt-4 space-y-2 text-xs text-white/80">
                    <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Secure & Verified</div>
                    <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-cyan-300" /> WhatsApp Support</div>
                  </div>
                </div>

                <div className="relative rounded-[2.5rem] border border-white/70 bg-white/55 px-8 pb-8 pt-10 shadow-2xl backdrop-blur-xl">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                  <img
                    src={heroPhone.images[1] ?? heroPhone.images[0]}
                    alt={`${heroPhone.model} back`}
                    className="absolute -left-12 bottom-8 z-0 h-[20rem] w-[10rem] rounded-[2rem] object-cover opacity-95 shadow-xl"
                  />
                  <img
                    src={heroPhone.images[0]}
                    alt={`${heroPhone.model} front`}
                    className="relative z-10 h-[26rem] w-[13rem] rounded-[2.25rem] object-cover shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPhones.map((phone) => (
            <div key={phone.model} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="grid grid-cols-2 gap-2 p-2">
                <img src={phone.images[0]} alt={`${phone.model} front`} className="h-64 w-full rounded-[1.25rem] object-cover" />
                <img src={phone.images[1] ?? phone.images[0]} alt={`${phone.model} back`} className="h-64 w-full rounded-[1.25rem] object-cover" />
              </div>
              <div className="p-6 pt-2">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Front + back view</p>
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
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">Search models, filter by series, and add items to cart to create an order enquiry.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search iPhone model"
                className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-cyan-400"
              />
            </div>
            <select
              value={selectedSeries}
              onChange={(event) => setSelectedSeries(event.target.value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
            >
              {seriesOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
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
          {filteredPhones.map((phone) => (
            <div key={phone.model} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative p-2">
                <div className="grid grid-cols-2 gap-2">
                  <img src={phone.images[0]} alt={`${phone.model} front`} className="h-72 w-full rounded-[1.25rem] object-cover" />
                  <img src={phone.images[1] ?? phone.images[0]} alt={`${phone.model} back`} className="h-72 w-full rounded-[1.25rem] object-cover" />
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white shadow">{phone.badge}</span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950">{phone.model}</h3>
                    <p className="mt-1 text-sm text-slate-500">Series {phone.series}</p>
                  </div>
                  <p className="text-lg font-semibold text-cyan-600">{formatPrice(phone.price)}</p>
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => addToCart(phone)} className="flex-1 rounded-full bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:scale-[1.02]">
                    Add to Cart
                  </button>
                  <a
                    href={buildWhatsAppLink(`Hello, I want to buy ${phone.model} for ${formatPrice(phone.price)}.`)}
                    className="flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhones.length === 0 && (
          <div className="mt-10 rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">No phones matched your search.</div>
        )}
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

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-12">
        <div className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-2xl sm:px-12 sm:py-14">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">Contact</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">Ready to order?</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-white/60">WhatsApp</p>
              <a href="https://wa.me/27678800719" className="mt-2 block text-lg font-medium hover:underline">+27 67 880 0719</a>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-white/60">Email</p>
              <a href="mailto:azania333@icloud.com" className="mt-2 block break-all text-lg font-medium hover:underline">azania333@icloud.com</a>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-white/60">TikTok</p>
              <a href="https://www.tiktok.com/@ithreesixtymobilephone" className="mt-2 block text-lg font-medium hover:underline">@ithreesixtymobilephone</a>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-white/60">Address</p>
              <p className="mt-2 text-lg font-medium">115 Paul Kruger Street</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
