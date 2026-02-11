import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedProduction() {
  console.log("🌱 Seeding database...");

  // Clear data (order matters because of relations)
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
  throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD not set in environment");
}

const hashedPassword = await bcrypt.hash(adminPassword, 10);

await prisma.user.create({
  data: {
    firstName: "Super",
    lastName: "Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "ADMIN",
  },
});
  console.log("✅ Admin created");

  // 📂 Create Categories
  await prisma.category.createMany({
    data: [
      { name: "Audio" },
      { name: "Wearables" },
      { name: "Accessories" },
      { name: "Electronics" },
    ],
  });

  const allCategories = await prisma.category.findMany();

  // Create category map (SAFE — no hardcoded IDs)
  const categoryMap = {};
  allCategories.forEach((cat) => {
    categoryMap[cat.name] = cat.id;
  });

  console.log("✅ Categories created");

  // 📦 Products
  const products = [
    {
      name: "Laptop Stand",
      price: 4149,
      image: "https://images.unsplash.com/photo-1629317480872-45e07211ffd4",
      images: [
        "https://images.unsplash.com/photo-1629317480826-910f729d1709",
        "https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204",
      ],
      rating: 4,
      review: 156,
      categoryId: categoryMap["Electronics"],
      description:
        "Ergonomic aluminum laptop stand with adjustable height and angle.",
      features: [
        "Adjustable height",
        "Aluminum construction",
        "Heat dissipation",
        "Portable design",
      ],
      inStock: true,
      stock: 25,
    },
    {
      name: "Bluetooth Speaker",
      price: 6639,
      image: "https://images.unsplash.com/photo-1548949974-5a40c9a4de55",
      images: [
        "https://images.unsplash.com/photo-1548949974-5a40c9a4de55",
        "https://images.unsplash.com/photo-1529359744902-86b2ab9edaea",
      ],
      rating: 5,
      review: 203,
      categoryId: categoryMap["Electronics"],
      description:
        "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
      features: [
        "360-degree sound",
        "Waterproof IPX7",
        "12-hour battery",
        "Voice assistant",
      ],
      inStock: true,
      stock: 12,
    },
    {
      name: "Phone Case",
      price: 450,
      image: "https://images.unsplash.com/photo-1696531376565-df72f8b5d3c8",
      images: [
        "https://images.unsplash.com/photo-1696531376565-df72f8b5d3c8",
        "https://images.unsplash.com/photo-1637806583099-10ca71eb8761",
      ],
      rating: 4,
      review: 67,
      categoryId: categoryMap["Electronics"],
      description:
        "Durable phone case with military-grade protection and wireless charging support.",
      features: [
        "Drop protection",
        "Wireless charging",
        "Precise cutouts",
        "Easy grip",
      ],
      inStock: true,
      stock: 50,
    },
    {
      name: "USB-C Cable",
      price: 400,
      image: "https://images.unsplash.com/photo-1657181253444-66c4745d5a86",
      images: [
        "https://images.unsplash.com/photo-1657181253444-66c4745d5a86",
        "https://images.unsplash.com/photo-1711056823627-64e9089d4a82",
      ],
      rating: 5,
      review: 234,
      categoryId: categoryMap["Electronics"],
      description:
        "High-speed USB-C cable with fast charging and data transfer capabilities.",
      features: ["Fast charging", "Data sync", "Durable braided", "6ft length"],
      inStock: true,
      stock: 100,
    },
    {
      name: "Wireless Mouse",
      price: 3319,
      image: "https://images.unsplash.com/photo-1632488507953-20bedb3b9602",
      images: [
        "https://images.unsplash.com/photo-1632488507953-20bedb3b9602",
        "https://images.unsplash.com/photo-1607677686474-ad91fc94f5ae",
        "https://images.unsplash.com/photo-1722437697582-18710e8ebda9",
      ],
      rating: 4,
      review: 145,
      categoryId: categoryMap["Electronics"],
      description:
        "Ergonomic wireless mouse with precision tracking and long battery life.",
      features: [
        "Ergonomic design",
        "Precision tracking",
        "Long battery",
        "Silent clicks",
      ],
      inStock: true,
      stock: 30,
    },
    {
      name: "Tablet",
      price: 24899,
      image: "https://images.unsplash.com/photo-1527698266440-12104e498b76",
      images: [
        "https://images.unsplash.com/photo-1527698266440-12104e498b76",
        "https://images.unsplash.com/photo-1589739900869-082b93d8f224",
      ],
      rating: 5,
      review: 78,
      categoryId: categoryMap["Electronics"],
      description:
        "10-inch tablet with high-resolution display and all-day battery life.",
      features: [
        "10-inch display",
        "All-day battery",
        "Fast processor",
        "Lightweight design",
      ],
      inStock: true,
      stock: 5,
    },
    {
      name: "Gaming Keyboard",
      price: 5199,
      image: "https://images.unsplash.com/photo-1637243218672-d338945efdf7",
      images: [
        "https://images.unsplash.com/photo-1637243218672-d338945efdf7",
        "https://images.unsplash.com/photo-1637243218422-31b313a7627d",
      ],
      rating: 5,
      review: 98,
      categoryId: categoryMap["Electronics"],
      description:
        "Mechanical RGB gaming keyboard with customizable lighting and fast response.",
      features: [
        "RGB lighting",
        "Mechanical switches",
        "Anti-ghosting",
        "Ergonomic design",
      ],
      inStock: true,
      stock: 20,
    },
    {
      name: "Fitness Tracker",
      price: 3599,
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288",
      images: [
        "https://images.unsplash.com/photo-1576243345690-4e4b79b63288",
        "https://images.unsplash.com/photo-1557935728-e6d1eaabe558",
        "https://images.unsplash.com/photo-1640901764423-3195244b8e77",
      ],
      rating: 4,
      review: 142,
      categoryId: categoryMap["Electronics"],
      description:
        "Track your health and activity with real-time data and app integration.",
      features: [
        "Heart rate monitor",
        "Sleep tracking",
        "Step counter",
        "App sync",
      ],
      inStock: true,
      stock: 18,
    },
    {
      name: "Portable Power Bank",
      price: 1299,
      image: "https://images.unsplash.com/photo-1706275399494-fb26bbc5da63",
      images: [
        "https://images.unsplash.com/photo-1706275399494-fb26bbc5da63",
        "https://images.unsplash.com/photo-1706275787520-541d385ae221",
        "https://images.unsplash.com/photo-1585995603413-eb35b5f4a50b",
      ],
      rating: 5,
      review: 210,
      categoryId: categoryMap["Electronics"],
      description:
        "10,000mAh power bank with dual USB ports and fast charging support.",
      features: ["10,000mAh", "Dual USB", "Fast charging", "LED indicator"],
      inStock: true,
      stock: 40,
    },
    {
      name: "Noise Cancelling Earbuds",
      price: 6999,
      image: "https://images.unsplash.com/photo-1733641839407-b703ece14e5d",
      images: [
        "https://images.unsplash.com/photo-1733641839407-b703ece14e5d",
        "https://images.unsplash.com/photo-1733641839465-f9de0c9b9bde",
      ],
      rating: 5,
      review: 176,
      categoryId: categoryMap["Electronics"],
      description:
        "In-ear wireless earbuds with advanced noise cancellation and deep bass.",
      features: [
        "Noise cancellation",
        "Wireless",
        "Touch controls",
        "Charging case",
      ],
      inStock: true,
      stock: 22,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("✅ Products seeded successfully");
  console.log("🎉 Seeding completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
