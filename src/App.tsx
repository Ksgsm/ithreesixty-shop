import { useMemo, useState } from "react";
import {
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Star,
  Truck,
} from "lucide-react";
import iphone11Pro64Front from "./assets/products/iphone11Pro64Front.jpeg";
import iphone11ProMax64Front from "./assets/products/iphone11ProMax64Front.jpeg";
import iphone12Pro128Front from "./assets/products/iphone12Pro128Front.jpeg";
import iphone12ProMax128Front from "./assets/products/iphone12ProMax128Front.jpeg";
import iphone13_128Front from "./assets/products/iphone13_128Front.jpeg";
import iphone13Pro128Front from "./assets/products/iphone13Pro128Front.jpeg";
import iphone14_128Front from "./assets/products/iphone14_128Front.jpeg";
import iphone14Pro128 from "./assets/products/iphone14Pro128.jpeg";
import iphone14ProMax256Front from "./assets/products/iphone14ProMax256Front.jpeg";
import iphone15_128 from "./assets/products/iphone15_128.jpeg";
import iphone15Pro256Back from "./assets/products/iphone15Pro256Back.jpeg";
import iphone15ProMax128Front from "./assets/products/iphone15ProMax128Front.jpeg";
import iphone16_256Front from "./assets/products/iphone16_256Front.jpeg";
import iphone16Pro256Front from "./assets/products/iphone16Pro256Front.jpeg";
import iphone16ProMax256Front from "./assets/products/iphone16ProMax256Front.jpeg";
import iphone17ProMax256 from "./assets/products/iphone17ProMax256.jpeg";

type Phone = {
  model: string;
  price: number;
  storage: string;
  series: string;
  image: string;
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

const BRAND_LOGO = iphone14Pro128;

const phones: Phone[] = [
  {
    model: "iPhone 11 Pro 64GB",
    price: 5200,
    storage: "64GB",
    series: "11 Pro",
    image: iphone11Pro64Front,
    badge: "Real Photo",
    featured: true,
  },
  {
    model: "iPhone 11 Pro Max 64GB",
    price: 5990,
    storage: "64GB",
    series: "11 Pro Max",
    image: iphone11ProMax64Front,
    badge: "Featured",
    featured: true,
  },
  {
    model: "iPhone 12 Pro 128GB",
    price: 6290,
    storage: "128GB",
    series: "12 Pro",
    image: iphone12Pro128Front,
    badge: "Premium",
  },
  {
    model: "iPhone 12 Pro Max 128GB",
    price: 7790,
    storage: "128GB",
    series: "12 Pro Max",
    image: iphone12ProMax128Front,
    badge: "Top Pick",
  },
  {
    model: "iPhone 13 128GB",
    price: 6799,
    storage: "128GB",
    series: "13",
    image: iphone13_128Front,
    badge: "Clean Stock",
  },
  {
    model: "iPhone 13 Pro 128GB",
    price: 8790,
    storage: "128GB",
    series: "13 Pro",
    image: iphone13Pro128Front,
    badge: "Pro Camera",
  },
  {
    model: "iPhone 14 128GB",
    price: 7890,
    storage: "128GB",
    series: "14",
    image: iphone14_128Front,
    badge: "Modern Pick",
  },
  {
    model: "iPhone 14 Pro 128GB",
    price: 10490,
    storage: "128GB",
    series: "14 Pro",
    image: iphone14Pro128,
    badge: "Dynamic Island",
  },
  {
    model: "iPhone 14 Pro Max 256GB",
    price: 12890,
    storage: "256GB",
    series: "14 Pro Max",
    image: iphone14ProMax256Front,
    badge: "Premium Max",
  },
  {
    model: "iPhone 15 128GB",
    price: 10299,
    storage: "128GB",
    series: "15",
    image: iphone15_128,
    badge: "USB-C",
  },
  {
    model: "iPhone 15 Pro 256GB",
    price: 14900,
    storage: "256GB",
    series: "15 Pro",
    image: iphone15Pro256Back,
    badge: "Titanium",
  },
  {
    model: "iPhone 15 Pro Max 128GB",
    price: 16700,
    storage: "128GB",
    series: "15 Pro Max",
    image: iphone15ProMax128Front,
    badge: "Zoom Power",
  },
  {
    model: "iPhone 16 256GB",
    price: 14890,
    storage: "256GB",
    series: "16",
    image: iphone16_256Front,
    badge: "New Arrival",
  },
  {
    model: "iPhone 16 Pro 256GB",
    price: 17880,
    storage: "256GB",
    series: "16 Pro",
    image: iphone16Pro256Front,
    badge: "Pro Power",
  },
  {
    model: "iPhone 16 Pro Max 256GB",
    price: 20990,
    storage: "256GB",
    series: "16 Pro Max",
    image: iphone16ProMax256Front,
    badge: "Ultimate",
  },
  {
    model: "iPhone 17 Pro Max 256GB",
    price: 22990,
    storage: "256GB",
    series: "17 Pro Max",
    image: iphone17ProMax256,
    badge: "Latest Stock",
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
    title: "Trusted devices",
    text: "Clean, quality iPhones with clear pricing.",
  },
  {
    icon: Truck,
    title: "Fast response",
    text: "WhatsApp-first support for quick orders and questions.",
  },
  {
    icon: MessageCircle,
    title: "Easy ordering",
    text: "Customers can enquire and place orders directly online.",
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
                Your real iPhone photos are now live
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Shop real iPhones
                <br />
                with your
                <br />
                actual product photos.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                ITHREESIXTY CELLPHONES lets customers browse your real stock, filter models, add items to cart, and place orders through WhatsApp.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#shop" className="rounded-full bg-slate-950 px-7 py-4 text-center text-sm font-medium text-white shadow-lg transition hover:scale-[1.02]">
                  Shop Now
                </a>
                <a href={buildWhatsAppLink("Hello, I want to enquire about your iPhones.")} className="rounded-full border border-cyan-200 bg-cyan-50 px-7 py-4 text-center text-sm font-medium text-slate-950 shadow-sm transition hover:border-cyan-400">
                  Ask on WhatsApp
                </a>
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
                <img
                  src={iphone14ProMax256Front}
                  alt="ITHREESIXTY iPhone in hand"
                  className="h-[34rem] w-full rounded-[1.75rem] object-cover"
                />
                <div className="absolute bottom-10 left-10 right-10 rounded-[1.5rem] border border-white/30 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Online Store Experience</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">Browse, add to cart, order fast</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Customers can shop online and send their order straight to WhatsApp.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 sm:px-10 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPhones.map((phone) => (
            <div key={phone.model} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <img src={phone.image} alt={phone.model} className="h-64 w-full object-cover" />
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
              <div className="relative">
                <img src={phone.image} alt={phone.model} className="h-72 w-full object-cover" />
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