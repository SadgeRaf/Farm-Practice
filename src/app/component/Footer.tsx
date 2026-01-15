import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-green-700 text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Khan Agro</h2>
          <p className="text-white/80">
            Delivering fresh, organic, and farm-to-home food everyday.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-white/80">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-white/80">
            <li>Vegetables</li>
            <li>Fruits</li>
            <li>Dairy</li>
            <li>Fisheries</li>
            <li>Crops</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-white/80">
            <li>Email: support@khanagro.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>

          {/* Socials */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white text-2xl">🌿</a>
            <a href="#" className="hover:text-white text-2xl">📘</a>
            <a href="#" className="hover:text-white text-2xl">📸</a>
          </div>
        </div>

      </div>

      <div className="text-center py-4 bg-green-800 text-white/70 text-sm">
        © {new Date().getFullYear()} Khan Agro. All rights reserved.
      </div>
    </footer>
  );
}
