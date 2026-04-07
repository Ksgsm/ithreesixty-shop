import { useMemo, useState, type ChangeEvent, type ComponentType } from "react";
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
  Tag,
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
import priceData from "./data/prices.json";

type Phone = {
  id: string;
  model: string;
  price: number;
  originalPrice: number;
  saleActive: boolean;
  storage: string;
  series: string;
  frontImage: string;
  backImage?: string;
  badge: string;
  featured?: boolean;
};

type IconType = ComponentType<{ className?: string }>;
type PriceMap = Record<string, { originalPrice: number; salePrice: number; saleActive: boolean }>;

type EditablePriceState = Record<string, { originalPrice: string; salePrice: string; saleActive: boolean }>;

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
type PriceFileEntry = {
  model: string;
  originalPrice: number;
  salePrice: number;
  saleActive: boolean;
};

const priceEntriesByModel = new Map(
  (priceData as PriceFileEntry[]).map((entry) => [entry.model, entry])
);

const basePhones: Phone[] = [
  { id: "iphone-xr-64gb", model: "iPhone XR 64GB", price: 3990, originalPrice: 3990, saleActive: false, storage: "64GB", series: "XR", frontImage: iphoneXR64Front, backImage: iphoneXR64Back, badge: "Front + Back", featured: true },
  { id: "iphone-xr-128gb", model: "iPhone XR 128GB", price: 4490, originalPrice: 4490, saleActive: false, storage: "128GB", series: "XR", frontImage: iphoneXR128Front, backImage: iphoneXR128Back, badge: "Front + Back" },
  { id: "iphone-11-64gb", model: "iPhone 11 64GB", price: 4990, originalPrice: 4990, saleActive: false, storage: "64GB", series: "11", frontImage: iphone1164Front, backImage: iphone1164Back, badge: "Front + Back", featured: true },
  { id: "iphone-11-128gb", model: "iPhone 11 128GB", price: 5490, originalPrice: 5490, saleActive: false, storage: "128GB", series: "11", frontImage: iphone11128Front, backImage: iphone11128Back, badge: "Front + Back", featured: true },
  { id: "iphone-11-pro-64gb", model: "iPhone 11 Pro 64GB", price: 5200, originalPrice: 5200, saleActive: false, storage: "64GB", series: "11 Pro", frontImage: iphone11Pro64Front, backImage: iphone11Pro64Back, badge: "Real Photo" },
  { id: "iphone-11-pro-max-64gb", model: "iPhone 11 Pro Max 64GB", price: 5990, originalPrice: 5990, saleActive: false, storage: "64GB", series: "11 Pro Max", frontImage: iphone11ProMax64Front, badge: "Featured", featured: true },
  { id: "iphone-12-pro-128gb", model: "iPhone 12 Pro 128GB", price: 6290, originalPrice: 6290, saleActive: false, storage: "128GB", series: "12 Pro", frontImage: iphone12Pro128Front, backImage: iphone12Pro128Back, badge: "Front + Back" },
  { id: "iphone-12-pro-max-128gb", model: "iPhone 12 Pro Max 128GB", price: 7790, originalPrice: 7790, saleActive: false, storage: "128GB", series: "12 Pro Max", frontImage: iphone12ProMax128Front, backImage: iphone12ProMax128Back, badge: "Top Pick" },
  { id: "iphone-13-128gb", model: "iPhone 13 128GB", price: 6799, originalPrice: 6799, saleActive: false, storage: "128GB", series: "13", frontImage: iphone13_128Front, backImage: iphone13_128Back, badge: "Front + Back" },
  { id: "iphone-13-pro-128gb", model: "iPhone 13 Pro 128GB", price: 8790, originalPrice: 8790, saleActive: false, storage: "128GB", series: "13 Pro", frontImage: iphone13Pro128Front, backImage: iphone13Pro128Back, badge: "Pro Camera" },
  { id: "iphone-14-128gb", model: "iPhone 14 128GB", price: 7890, originalPrice: 7890, saleActive: false, storage: "128GB", series: "14", frontImage: iphone14_128Front, backImage: iphone14_128Back, badge: "Front + Back" },
  { id: "iphone-14-pro-128gb", model: "iPhone 14 Pro 128GB", price: 10490, originalPrice: 10490, saleActive: false, storage: "128GB", series: "14 Pro", frontImage: iphone14Pro128Front, badge: "Dynamic Island" },
  { id: "iphone-14-pro-256gb", model: "iPhone 14 Pro 256GB", price: 11290, originalPrice: 11290, saleActive: false, storage: "256GB", series: "14 Pro", frontImage: iphone14Pro256Front, badge: "Extra Storage" },
  { id: "iphone-14-pro-max-256gb", model: "iPhone 14 Pro Max 256GB", price: 12890, originalPrice: 12890, saleActive: false, storage: "256GB", series: "14 Pro Max", frontImage: iphone14ProMax256Front, badge: "Premium Max" },
  { id: "iphone-15-128gb", model: "iPhone 15 128GB", price: 10299, originalPrice: 10299, saleActive: false, storage: "128GB", series: "15", frontImage: iphone15_128Front, badge: "USB-C" },
  { id: "iphone-15-pro-256gb", model: "iPhone 15 Pro 256GB", price: 14900, originalPrice: 14900, saleActive: false, storage: "256GB", series: "15 Pro", frontImage: iphone15Pro256Back, badge: "Titanium" },
  { id: "iphone-15-pro-max-128gb", model: "iPhone 15 Pro Max 128GB", price: 16700, originalPrice: 16700, saleActive: false, storage: "128GB", series: "15 Pro Max", frontImage: iphone15ProMax128Front, badge: "Zoom Power" },
  { id: "iphone-16-256gb", model: "iPhone 16 256GB", price: 14890, originalPrice: 14890, saleActive: false, storage: "256GB", series: "16", frontImage: iphone16_256Front, badge: "New Arrival" },
  { id: "iphone-16-pro-256gb", model: "iPhone 16 Pro 256GB", price: 17880, originalPrice: 17880, saleActive: false, storage: "256GB", series: "16 Pro", frontImage: iphone16Pro256Front, backImage: iphone16Pro256Back, badge: "Front + Back" },
  { id: "iphone-16-pro-max-256gb", model: "iPhone 16 Pro Max 256GB", price: 20990, originalPrice: 20990, saleActive: false, storage: "256GB", series: "16 Pro Max", frontImage: iphone16ProMax256Front, backImage: iphone16ProMax256Back, badge: "Ultimate" },
  { id: "iphone-17-pro-max-256gb", model: "iPhone 17 Pro Max 256GB", price: 22990, originalPrice: 22990, saleActive: false, storage: "256GB", series: "17 Pro Max", frontImage: iphone17ProMax256Front, backImage: iphone17ProMax256Back, badge: "Latest Stock", featured: true },
];

const defaultPhones: Phone[] = basePhones.map((phone) => {
  const match = priceEntriesByModel.get(phone.model);
  if (!match) return phone;

  const originalPrice = sanitizePrice(String(match.originalPrice)) || phone.originalPrice;
  const salePrice = sanitizePrice(String(match.salePrice)) || phone.price;
  const saleActive = Boolean(match.saleActive && originalPrice > salePrice);

  return {
    ...phone,
    originalPrice,
    price: saleActive ? salePrice : originalPrice,
    saleActive,
  };
});

const services: Service[] = [
  { icon: Smartphone, title: "iPhone Sales", description: "Shop quality iPhones across multiple generations and storage sizes." },
  { icon: Star, title: "Upgrade Support", description: "Move into a newer model with help choosing the right device for your budget." },
  { icon: ShieldCheck, title: "Trade-In Options", description: "Trade in your current phone and reduce the cost of your next iPhone." },
];

const benefits: Benefit[] = [
  { icon: ShieldCheck, title: "23+ iPhone Models", text: "Affordable to premium options across multiple generations." },
  { icon: Truck, title: "Fast response", text: "WhatsApp-first support for quick orders and questions." },
  { icon: MessageCircle, title: "Easy ordering", text: "Customers can enquire and place orders directly online." },
];

function formatPrice(price: number): string {
  return `R${Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00`;
}

function buildWhatsAppLink(message: string): string {
  return `https://wa.me/27678800719?text=${encodeURIComponent(message)}`;
}

function getDefaultPriceMap(): PriceMap {
  return defaultPhones.reduce<PriceMap>((acc, phone) => {
    acc[phone.id] = {
      originalPrice: phone.originalPrice,
      salePrice: phone.price,
      saleActive: phone.saleActive,
    };
    return acc;
  }, {});
}

function sanitizePrice(input: string): number {
  const parsed = Number(String(input).replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : 0;
}

function getDiscountPercent(originalPrice: number, salePrice: number): number {
  if (originalPrice <= salePrice || originalPrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("All");
  const [cart, setCart] = useState<Phone[]>([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");
  const [showBackMap, setShowBackMap] = useState<Record<string, boolean>>({});
  const [priceInputs, setPriceInputs] = useState<EditablePriceState>(() => {
    const defaults = getDefaultPriceMap();
    return Object.fromEntries(
      defaultPhones.map((phone) => [
        phone.id,
        {
          originalPrice: String(defaults[phone.id].originalPrice),
          salePrice: String(defaults[phone.id].salePrice),
          saleActive: defaults[phone.id].saleActive,
        },
      ])
    );
  });

  const phones = useMemo(
    () =>
      defaultPhones.map((phone) => {
        const inputs = priceInputs[phone.id];
        const originalPrice = sanitizePrice(inputs?.originalPrice ?? String(phone.originalPrice)) || phone.originalPrice;
        const salePrice = sanitizePrice(inputs?.salePrice ?? String(phone.price)) || phone.price;
        const saleActive = Boolean(inputs?.saleActive && originalPrice > salePrice);
        return {
          ...phone,
          originalPrice,
          price: saleActive ? salePrice : originalPrice,
          saleActive,
        };
      }),
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

  const handlePriceInputChange = (id: string, field: "originalPrice" | "salePrice", value: string) => {
    setPriceInputs((current) => ({ ...current, [id]: { ...current[id], [field]: value } }));
    setAdminMessage("");
  };

  const toggleSale = (id: string) => {
    setPriceInputs((current) => ({ ...current, [id]: { ...current[id], saleActive: !current[id].saleActive } }));
    setAdminMessage("");
  };

  const savePrices = () => {
    if (typeof window === "undefined") return;
    const cleaned = defaultPhones.reduce<PriceMap>((acc, phone) => {
      const originalPrice = sanitizePrice(priceInputs[phone.id]?.originalPrice ?? String(phone.originalPrice)) || phone.originalPrice;
      const salePrice = sanitizePrice(priceInputs[phone.id]?.salePrice ?? String(phone.price)) || phone.price;
      acc[phone.id] = {
        originalPrice,
        salePrice,
        saleActive: Boolean(priceInputs[phone.id]?.saleActive && originalPrice > salePrice),
      };
      return acc;
    }, {});
    setPriceInputs(
      Object.fromEntries(
        defaultPhones.map((phone) => [
          phone.id,
          {
            originalPrice: String(cleaned[phone.id].originalPrice),
            salePrice: String(cleaned[phone.id].salePrice),
            saleActive: cleaned[phone.id].saleActive,
          },
        ])
      )
    );
    setAdminMessage("Prices updated in the editor for preview. For the live website, keep src/data/prices.json updated and redeploy.");
  };

  const resetPrices = () => {
    const defaults = getDefaultPriceMap();
    setPriceInputs(
      Object.fromEntries(
        defaultPhones.map((phone) => [
          phone.id,
          {
            originalPrice: String(defaults[phone.id].originalPrice),
            salePrice: String(defaults[phone.id].salePrice),
            saleActive: defaults[phone.id].saleActive,
          },
        ])
      )
    );
    setAdminMessage("Prices reset to default.");
  };

  const downloadPriceList = () => {
    if (typeof window === "undefined") return;
    const exportData = defaultPhones.map((phone) => {
      const inputs = priceInputs[phone.id];
      const originalPrice = sanitizePrice(inputs?.originalPrice ?? String(phone.originalPrice)) || phone.originalPrice;
      const salePrice = sanitizePrice(inputs?.salePrice ?? String(phone.price)) || phone.price;
      const saleActive = Boolean(inputs?.saleActive && originalPrice > salePrice);
      return { model: phone.model, originalPrice, salePrice, saleActive };
    });
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
        const parsed = JSON.parse(String(reader.result)) as Array<{ model?: string; price?: number | string; originalPrice?: number | string; salePrice?: number | string; saleActive?: boolean }>;
        const nextInputs = { ...priceInputs };
        defaultPhones.forEach((phone) => {
          const match = parsed.find((item) => item.model === phone.model);
          if (!match) return;
          const originalPrice = sanitizePrice(String(match.originalPrice ?? match.price ?? phone.originalPrice)) || phone.originalPrice;
          const salePrice = sanitizePrice(String(match.salePrice ?? match.price ?? phone.price)) || phone.price;
          nextInputs[phone.id] = {
            originalPrice: String(originalPrice),
            salePrice: String(salePrice),
            saleActive: Boolean(match.saleActive && originalPrice > salePrice),
          };
        });
        setPriceInputs(nextInputs);
        setAdminMessage("Imported prices into the editor preview. To make them live online, replace src/data/prices.json and redeploy.");
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
                <a href="#shop" className="rounded-full bg-slate-900 px-7 py-4 text-center text-sm font-medium text-white shadow-lg transition hover:scale-[1.02]">Explore iPhones</a>
                <a href={buildWhatsAppLink("Hello, I want to order on WhatsApp.")} className="rounded-full border border-slate-200 bg-white px-7 py-4 text-center text-sm font-medium text-slate-900 shadow-sm transition hover:border-blue-300">Order on WhatsApp</a>
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
                  <p className="text-sm font-medium text-white/85">{phones[3].model}</p>
                  <p className="mt-3 text-4xl font-semibold">{formatPrice(phones[3].price)}</p>
                  <div className="mt-4 space-y-2 text-xs text-white/80">
                    <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Secure & Verified</div>
                    <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-cyan-300" /> WhatsApp Support</div>
                  </div>
                </div>

                <div className="relative rounded-[2.5rem] border border-white/70 bg-white/55 px-8 pb-8 pt-10 shadow-2xl backdrop-blur-xl">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                  <img src={phones[3].backImage ?? phones[3].frontImage} alt={`${phones[3].model} back`} className="absolute -left-12 bottom-8 z-0 h-[20rem] w-[10rem] rounded-[2rem] object-cover opacity-95 shadow-xl" />
                  <img src={phones[3].frontImage} alt={`${phones[3].model} front`} className="relative z-10 h-[26rem] w-[13rem] rounded-[2.25rem] object-cover shadow-2xl" />
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
                  <div className="text-right">
                    {phone.saleActive && phone.originalPrice > phone.price ? (
                      <>
                        <p className="text-sm text-slate-400 line-through">{formatPrice(phone.originalPrice)}</p>
                        <p className="text-lg font-semibold text-rose-600">{formatPrice(phone.price)}</p>
                      </>
                    ) : (
                      <p className="text-lg font-semibold text-slate-950">{formatPrice(phone.price)}</p>
                    )}
                  </div>
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
            const discountPercent = getDiscountPercent(phone.originalPrice, phone.price);
            return (
              <div key={phone.id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative">
                  <img src={activeImage} alt={`${phone.model} ${showingBack ? "back" : "front"}`} className="h-72 w-full object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white shadow">{phone.badge}</span>
                  {phone.saleActive && discountPercent > 0 && (
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white shadow">
                      <Tag className="h-3.5 w-3.5" />
                      Sale -{discountPercent}%
                    </span>
                  )}
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
                    <div className="text-right">
                      {phone.saleActive && phone.originalPrice > phone.price ? (
                        <>
                          <p className="text-sm text-slate-400 line-through">{formatPrice(phone.originalPrice)}</p>
                          <p className="text-lg font-semibold text-rose-600">{formatPrice(phone.price)}</p>
                        </>
                      ) : (
                        <p className="text-lg font-semibold text-cyan-600">{formatPrice(phone.price)}</p>
                      )}
                    </div>
                  </div>
                  {phone.saleActive && phone.originalPrice > phone.price && (
                    <p className="mt-3 text-sm font-medium text-rose-600">Save {formatPrice(phone.originalPrice - phone.price)} today.</p>
                  )}
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
                <p className="text-sm font-semibold">Admin Price & Sale Editor</p>
                <p className="text-xs text-white/70">Open this section to set normal prices and sale prices fast.</p>
              </div>
            </div>
            <span className="text-sm">{adminOpen ? "Hide" : "Open"}</span>
          </button>

          {adminOpen && (
            <div className="mt-6 space-y-6">
              <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50 p-4 text-sm leading-6 text-slate-700">
                Set the <span className="font-semibold">Old Price</span>, set the <span className="font-semibold">Sale Price</span>, then switch on <span className="font-semibold">Sale Active</span>. Clients will see the old price crossed out and the sale price highlighted. Save to keep the changes on this browser.
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {phones.map((phone) => {
                  const discountPercent = getDiscountPercent(phone.originalPrice, sanitizePrice(priceInputs[phone.id]?.salePrice ?? String(phone.price)) || phone.price);
                  return (
                    <div key={phone.id} className="rounded-[1.5rem] border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-950">{phone.model}</p>
                          <p className="mt-1 text-xs text-slate-500">Use old price for normal price and sale price for discount campaigns.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleSale(phone.id)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${priceInputs[phone.id]?.saleActive ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"}`}
                        >
                          {priceInputs[phone.id]?.saleActive ? "Sale Active" : "Sale Off"}
                        </button>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <label className="rounded-2xl border border-slate-200 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Old Price</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-500">R</span>
                            <input
                              value={priceInputs[phone.id]?.originalPrice ?? String(phone.originalPrice)}
                              onChange={(event) => handlePriceInputChange(phone.id, "originalPrice", event.target.value)}
                              inputMode="numeric"
                              className="w-full bg-transparent text-sm outline-none"
                            />
                          </div>
                        </label>
                        <label className="rounded-2xl border border-slate-200 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sale Price</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-500">R</span>
                            <input
                              value={priceInputs[phone.id]?.salePrice ?? String(phone.price)}
                              onChange={(event) => handlePriceInputChange(phone.id, "salePrice", event.target.value)}
                              inputMode="numeric"
                              className="w-full bg-transparent text-sm outline-none"
                            />
                          </div>
                        </label>
                      </div>

                      <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                        {priceInputs[phone.id]?.saleActive && phone.originalPrice > phone.price ? (
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-slate-400 line-through">{formatPrice(phone.originalPrice)}</span>
                            <span className="font-semibold text-rose-600">{formatPrice(phone.price)}</span>
                            <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700">-{discountPercent}%</span>
                          </div>
                        ) : (
                          <span>Client view: <span className="font-semibold text-slate-950">{formatPrice(phone.originalPrice)}</span></span>
                        )}
                      </div>
                    </div>
                  );
                })}
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
