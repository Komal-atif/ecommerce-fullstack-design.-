/* ============================================================
   In-memory product store with sample data & CRUD helpers
   ============================================================ */

import type { Product } from "../types"

/** Sample product data seeded on server start */
const products: Product[] = [
  {
    id: "canon-camera-eos-2000",
    name: "Canon Camera EOS 2000D, 18-55mm Lens",
    price: 998.0,
    originalPrice: 1128.0,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
      "https://images.unsplash.com/photo-1606986628253-3e42b0f05629?w=600&q=80",
      "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=600&q=80",
    ],
    description:
      "The Canon EOS 2000D makes it easy to capture detailed DSLR quality photos and Full HD movies. Share instantly via the Canon Camera Connect app, Wi-Fi and NFC. Compact and lightweight body, paired with the versatile 18-55mm lens for sharp images.",
    category: "Electronics",
    stock: 32,
    rating: 4.5,
    reviews: 154,
    sold: 1250,
    brand: "Canon",
    features: ["24.1 MP APS-C sensor", "Wi-Fi & NFC", "Full HD video", "DIGIC 4+"],
    specs: {
      Type: "DSLR",
      Sensor: "APS-C CMOS 24.1MP",
      ISO: "100-6400",
      Display: '3.0" LCD',
      Video: "Full HD 1080p",
      Weight: "475 g",
    },
  },
  {
    id: "samsung-galaxy-s21",
    name: "Samsung Galaxy S21 Ultra 5G, 128GB",
    price: 899.0,
    originalPrice: 1199.0,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80",
    ],
    description:
      "Galaxy S21 Ultra 5G is epic in every way. A refined design with a striking new camera module. The fastest chip ever in a Galaxy device. The brightest, most intelligent display on a smartphone.",
    category: "Electronics",
    stock: 45,
    rating: 4.7,
    reviews: 320,
    sold: 2100,
    brand: "Samsung",
    features: ["108MP Camera", "5G enabled", "120Hz AMOLED", "5000mAh battery"],
    specs: {
      Display: '6.8" Dynamic AMOLED 2X',
      Processor: "Exynos 2100",
      RAM: "12 GB",
      Storage: "128 GB",
      Battery: "5000 mAh",
      OS: "Android 11",
    },
  },
  {
    id: "nike-air-max-270",
    name: "Nike Air Max 270 React, Running Shoes",
    price: 149.0,
    originalPrice: 199.0,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    ],
    description:
      "The Nike Air Max 270 React combines two of Nike's best technologies to create a unique shoe that offers both comfort and style. Soft, lightweight, and durable.",
    category: "Clothes",
    stock: 78,
    rating: 4.3,
    reviews: 89,
    sold: 890,
    brand: "Nike",
    features: ["React foam", "Max Air unit", "Lightweight mesh", "Rubber outsole"],
    specs: {
      Material: "Mesh upper",
      Sole: "Rubber",
      Closure: "Lace-up",
      Cushion: "Air Max 270",
      Weight: "310 g",
    },
  },
  {
    id: "apple-macbook-pro-m2",
    name: "Apple MacBook Pro 14-inch M2, 512GB",
    price: 1999.0,
    originalPrice: 2499.0,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    ],
    description:
      "The MacBook Pro 14-inch with M2 Pro delivers exceptional performance for demanding workflows. Up to 18 hours of battery life, a stunning Liquid Retina XDR display, and advanced connectivity.",
    category: "Electronics",
    stock: 20,
    rating: 4.9,
    reviews: 520,
    sold: 3500,
    brand: "Apple",
    features: ["M2 Pro chip", "Liquid Retina XDR", "18hr battery", "MagSafe 3"],
    specs: {
      Display: '14.2" Liquid Retina XDR',
      Processor: "Apple M2 Pro",
      RAM: "16 GB",
      Storage: "512 GB SSD",
      Battery: "Up to 18 hours",
      Weight: "1.6 kg",
    },
  },
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 348.0,
    originalPrice: 399.0,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
    ],
    description:
      "Industry-leading noise canceling with Auto NC Optimizer. Exceptional sound quality with 30mm carbon fiber composite driver units. Crystal clear hands-free calling with 4 beamforming microphones.",
    category: "Electronics",
    stock: 55,
    rating: 4.6,
    reviews: 230,
    sold: 1800,
    brand: "Sony",
    features: ["Active Noise Canceling", "30hr battery", "Multipoint", "Hi-Res Audio"],
    specs: {
      Type: "Over-ear",
      Driver: "30mm",
      Battery: "30 hours",
      Charging: "USB-C",
      Weight: "250 g",
      Bluetooth: "5.2",
    },
  },
  {
    id: "adidas-ultraboost-22",
    name: "Adidas Ultraboost 22, Men's Running",
    price: 129.0,
    originalPrice: 189.0,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    ],
    description:
      "Adidas Ultraboost 22 features a BOOST midsole for incredible energy return. The Primeknit+ upper adapts to the foot for a snug, supportive fit.",
    category: "Clothes",
    stock: 60,
    rating: 4.4,
    reviews: 112,
    sold: 950,
    brand: "Adidas",
    features: ["BOOST midsole", "Primeknit+ upper", "Continental rubber", "Torsion System"],
    specs: {
      Material: "Primeknit+",
      Sole: "Continental Rubber",
      Closure: "Lace-up",
      Weight: "310 g",
    },
  },
  {
    id: "gopro-hero-11",
    name: "GoPro HERO11 Black Action Camera",
    price: 399.0,
    originalPrice: 499.0,
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=600&q=80",
    ],
    description:
      "The most versatile GoPro ever. With a revolutionary new image sensor, HERO11 Black delivers the highest-resolution video and photos yet.",
    category: "Electronics",
    stock: 40,
    rating: 4.5,
    reviews: 178,
    sold: 1400,
    brand: "GoPro",
    features: ["5.3K60 video", "27MP photos", "HyperSmooth 5.0", "Waterproof 10m"],
    specs: {
      Video: "5.3K60 / 4K120",
      Photo: "27MP",
      Stabilization: "HyperSmooth 5.0",
      Waterproof: "10m",
      Battery: "1720 mAh",
      Weight: "154 g",
    },
  },
  {
    id: "apple-watch-series-8",
    name: "Apple Watch Series 8, GPS 45mm",
    price: 429.0,
    originalPrice: 499.0,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&q=80",
    ],
    description:
      "Apple Watch Series 8 features advanced health sensors, including temperature sensing, blood oxygen monitoring, and an ECG app.",
    category: "Electronics",
    stock: 35,
    rating: 4.7,
    reviews: 290,
    sold: 2200,
    brand: "Apple",
    features: ["Temperature sensing", "Blood oxygen", "ECG", "Always-On Retina"],
    specs: {
      Display: "Always-On Retina LTPO OLED",
      Chip: "S8 SiP",
      Connectivity: "GPS + Cellular",
      "Water Resistance": "50m",
      Battery: "18 hours",
    },
  },
  {
    id: "samsung-4k-smart-tv",
    name: "Samsung 55\" Crystal UHD 4K Smart TV",
    price: 547.0,
    originalPrice: 699.0,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80",
    ],
    description:
      "A crystal clear, effortlessly smart TV. Watch what you love in crystal-clear 4K UHD resolution. A smart TV packed with all the apps you love.",
    category: "Electronics",
    stock: 18,
    rating: 4.3,
    reviews: 145,
    sold: 780,
    brand: "Samsung",
    features: ["Crystal 4K UHD", "HDR", "Smart TV", "Alexa Built-in"],
    specs: {
      Display: '55" LED',
      Resolution: "3840 x 2160",
      HDR: "HDR10+",
      "Smart Platform": "Tizen",
      Ports: "3x HDMI, 2x USB",
    },
  },
  {
    id: "dyson-v15-detect",
    name: "Dyson V15 Detect Cordless Vacuum",
    price: 649.0,
    originalPrice: 749.0,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    ],
    description:
      "Dyson's most powerful, intelligent cordless vacuum. Reveals invisible dust with a laser, counts and sizes particles for scientific proof of a deep clean.",
    category: "Home and outdoor",
    stock: 22,
    rating: 4.8,
    reviews: 95,
    sold: 600,
    brand: "Dyson",
    features: ["Laser dust detection", "LCD screen", "60min runtime", "HEPA filtration"],
    specs: {
      Power: "240 AW",
      Runtime: "Up to 60 min",
      Weight: "3.1 kg",
      Bin: "0.76 L",
      Filtration: "Whole-machine HEPA",
    },
  },
  {
    id: "levi-501-jeans",
    name: "Levi's 501 Original Fit Jeans, Blue",
    price: 69.0,
    originalPrice: 89.0,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    ],
    description:
      "The original blue jean since 1873. Straight leg, button fly, non-stretch denim. Sits at the waist. Regular fit through thigh.",
    category: "Clothes",
    stock: 100,
    rating: 4.2,
    reviews: 340,
    sold: 4500,
    brand: "Levi's",
    features: ["100% cotton", "Button fly", "Straight leg", "Original fit"],
    specs: {
      Material: "100% Cotton",
      Fit: "Original",
      Rise: "Regular",
      Leg: "Straight",
      Closure: "Button fly",
    },
  },
  {
    id: "kitchenaid-stand-mixer",
    name: "KitchenAid Artisan Stand Mixer, 5 Qt",
    price: 379.0,
    originalPrice: 449.0,
    image: "https://images.unsplash.com/photo-1594385208974-2f8bb07b498b?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1594385208974-2f8bb07b498b?w=600&q=80",
    ],
    description:
      "The iconic stand mixer for home bakers. 5-quart stainless steel bowl, 10 speeds, and tilt-head design for easy access to bowl and attachments.",
    category: "Home and outdoor",
    stock: 15,
    rating: 4.8,
    reviews: 420,
    sold: 3200,
    brand: "KitchenAid",
    features: ["5 Qt bowl", "10 speeds", "Tilt-head", "Planetary mixing"],
    specs: {
      Capacity: "5 Quart",
      Power: "325 Watts",
      Speeds: "10",
      Weight: "11.6 kg",
      Warranty: "Limited",
    },
  },
  {
    id: "ipad-air-m1",
    name: "Apple iPad Air (5th Gen) M1, 64GB",
    price: 599.0,
    originalPrice: 649.0,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    ],
    description:
      "iPad Air with M1 chip delivers next-level performance. A 10.9-inch Liquid Retina display, 12MP front camera with Center Stage, USB-C, and 5G capability.",
    category: "Electronics",
    stock: 28,
    rating: 4.6,
    reviews: 198,
    sold: 1600,
    brand: "Apple",
    features: ["M1 chip", "10.9\" Liquid Retina", "Touch ID", "USB-C"],
    specs: {
      Display: '10.9" Liquid Retina',
      Chip: "Apple M1",
      Storage: "64 GB",
      Camera: "12MP Wide",
      Battery: "Up to 10 hours",
      Weight: "461 g",
    },
  },
  {
    id: "north-face-jacket",
    name: "The North Face Thermoball Eco Jacket",
    price: 199.0,
    originalPrice: 249.0,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    ],
    description:
      "Lightweight, packable insulated jacket made from recycled materials. ThermoBall Eco insulation traps heat in cold, wet conditions.",
    category: "Clothes",
    stock: 42,
    rating: 4.5,
    reviews: 67,
    sold: 520,
    brand: "The North Face",
    features: ["ThermoBall Eco", "Recycled materials", "Packable", "Water repellent"],
    specs: {
      Material: "Recycled polyester",
      Insulation: "ThermoBall Eco",
      Fit: "Standard",
      Weight: "380 g",
      Closure: "Full zip",
    },
  },
  {
    id: "coffee-maker-breville",
    name: "Breville Barista Express Espresso Machine",
    price: 699.0,
    originalPrice: 849.0,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    ],
    description:
      "Create third wave specialty coffee at home. Built-in conical burr grinder, optimal water pressure, and precise temperature control.",
    category: "Home and outdoor",
    stock: 12,
    rating: 4.7,
    reviews: 310,
    sold: 2400,
    brand: "Breville",
    features: ["Built-in grinder", "15 bar pump", "PID temperature", "Steam wand"],
    specs: {
      Power: "1600 W",
      Pressure: "15 bar",
      "Water Tank": "2 L",
      Grinder: "Conical burr",
      Weight: "12.6 kg",
    },
  },
  {
    id: "jbl-charge-5",
    name: "JBL Charge 5 Portable Bluetooth Speaker",
    price: 179.0,
    originalPrice: 199.0,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    ],
    description:
      "Bold JBL Original Pro Sound with a racetrack-shaped driver. IP67 waterproof and dustproof. Up to 20 hours of playtime. Built-in power bank.",
    category: "Electronics",
    stock: 65,
    rating: 4.4,
    reviews: 156,
    sold: 1200,
    brand: "JBL",
    features: ["IP67 waterproof", "20hr battery", "Power bank", "PartyBoost"],
    specs: {
      Driver: "Racetrack 52x90mm + tweeter",
      Battery: "20 hours",
      Waterproof: "IP67",
      Bluetooth: "5.1",
      Weight: "960 g",
    },
  },
  {
    id: "samsung-galaxy-buds-pro",
    name: "Samsung Galaxy Buds2 Pro, Graphite",
    price: 159.0,
    originalPrice: 229.0,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80",
    ],
    description:
      "Hi-Fi sound with 24bit audio. Intelligent Active Noise Cancellation. 360 Audio for immersive sound. IPX7 water resistance. Comfortable ergonomic fit.",
    category: "Electronics",
    stock: 70,
    rating: 4.3,
    reviews: 198,
    sold: 1600,
    brand: "Samsung",
    features: ["24bit Hi-Fi", "ANC", "360 Audio", "IPX7"],
    specs: {
      Driver: "Custom coaxial 2-way",
      ANC: "Intelligent",
      Battery: "5hr + 18hr case",
      Codec: "SSC HiFi",
      Weight: "5.5 g each",
    },
  },
  {
    id: "tshirt-blue-cotton",
    name: "T-Shirts with multiple colors, for men and lady",
    price: 78.99,
    originalPrice: 98.0,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    ],
    description:
      "Premium cotton t-shirt available in multiple colors. Comfortable fit for everyday wear. Size: medium, Color: blue, Material: Plastic blend.",
    category: "Clothes",
    stock: 200,
    rating: 4.0,
    reviews: 45,
    sold: 380,
    brand: "Artel Market",
    features: ["100% cotton", "Multiple colors", "Unisex", "Machine washable"],
    specs: {
      Material: "Cotton/Plastic blend",
      Fit: "Regular",
      Sizes: "S, M, L, XL",
      Care: "Machine wash",
    },
  },
  {
    id: "leather-wallet-brown",
    name: "Premium Leather Wallet, RFID Blocking",
    price: 39.0,
    originalPrice: 59.0,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    ],
    description:
      "Genuine leather bifold wallet with RFID blocking technology. Multiple card slots, bill compartment, and ID window. Slim profile fits in any pocket.",
    category: "Clothes",
    stock: 90,
    rating: 4.1,
    reviews: 75,
    sold: 640,
    brand: "LeatherCraft",
    features: ["RFID blocking", "Genuine leather", "Slim profile", "12 card slots"],
    specs: {
      Material: "Genuine leather",
      Slots: "12 card + 2 bill",
      Dimensions: "4.5 x 3.5 x 0.5 in",
      RFID: "Yes",
    },
  },
  {
    id: "camping-tent-4p",
    name: "Coleman Sundome 4-Person Camping Tent",
    price: 89.0,
    originalPrice: 129.0,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
    ],
    description:
      "Easy-to-setup dome tent for camping. WeatherTec system with patented welded floors and inverted seams. Fits 4 people or 1 queen airbed.",
    category: "Home and outdoor",
    stock: 30,
    rating: 4.2,
    reviews: 210,
    sold: 1100,
    brand: "Coleman",
    features: ["WeatherTec system", "Easy setup", "E-Port", "Storage pockets"],
    specs: {
      Capacity: "4 person",
      Dimensions: "9 x 7 ft",
      Height: "4 ft 11 in",
      Weight: "4.1 kg",
      Seasons: "3-season",
    },
  },
]

/* ---- CRUD helpers (operate on in-memory array) ---- */

/** Return all products, optionally filtered by query or category */
export function getAllProducts(query?: string, category?: string): Product[] {
  let result = [...products]
  if (category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    )
  }
  if (query) {
    const q = query.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    )
  }
  return result
}

/** Return a single product by ID */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

/** Create a new product and return it */
export function createProduct(data: Omit<Product, "id">): Product {
  const id = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
  const newProduct: Product = { id, ...data }
  products.push(newProduct)
  return newProduct
}

/** Update an existing product. Returns the updated product or null. */
export function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id">>
): Product | null {
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null
  products[index] = { ...products[index], ...data }
  return products[index]
}

/** Delete a product by ID. Returns true if deleted. */
export function deleteProduct(id: string): boolean {
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return false
  products.splice(index, 1)
  return true
}

/** Return unique categories from the product list */
export function getCategories(): string[] {
  return [...new Set(products.map((p) => p.category))]
}

/** Return unique brands from the product list */
export function getBrands(): string[] {
  return [...new Set(products.map((p) => p.brand))]
}
