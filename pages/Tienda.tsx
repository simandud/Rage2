import { Footer } from '../components/shared/Footer';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Filter, Search, Heart, Eye, TrendingUp } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Fictional Store Products
const TIENDA_PRODUCTOS = [
  {
    id: 1,
    name: "RAGE VENTURE Classic Tee",
    category: "Ropa",
    price: "€29.99",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    rating: 5,
    reviews: 124,
    stock: "In Stock",
    trending: true,
    description: "Camiseta 100% algodón con logo RAGE VENTURE bordado. Fit regular."
  },
  {
    id: 2,
    name: "Limited Edition Vinyl Case",
    category: "Accesorios",
    price: "€89.99",
    image: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=800&q=80",
    rating: 5,
    reviews: 67,
    stock: "Limited Edition",
    trending: true,
    description: "Estuche de aluminio para 50 vinilos. Resistente y portátil."
  },
  {
    id: 3,
    name: "DJ Slipmats - Acid Edition",
    category: "DJ Gear",
    price: "€24.99",
    image: "https://images.unsplash.com/photo-1619432168937-a4c6f36f5b60?w=800&q=80",
    rating: 4,
    reviews: 89,
    stock: "In Stock",
    trending: false,
    description: "Par de slipmats anti-estáticos con diseño exclusivo acid."
  },
  {
    id: 4,
    name: "RAGE Snapback Cap",
    category: "Ropa",
    price: "€34.99",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    rating: 5,
    reviews: 156,
    stock: "In Stock",
    trending: true,
    description: "Gorra snapback bordada. Ajuste universal y visera plana."
  },
  {
    id: 5,
    name: "Techno Hoodie - Black Edition",
    category: "Ropa",
    price: "€64.99",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    rating: 5,
    reviews: 203,
    stock: "Low Stock",
    trending: true,
    description: "Sudadera premium con capucha. 80% algodón, 20% poliéster."
  },
  {
    id: 6,
    name: "Vinyl Cleaning Kit Pro",
    category: "Accesorios",
    price: "€39.99",
    image: "https://images.unsplash.com/photo-1611532736606-fca6eb8e3a8f?w=800&q=80",
    rating: 5,
    reviews: 91,
    stock: "In Stock",
    trending: false,
    description: "Kit completo de limpieza para vinilos con cepillo y solución."
  },
  {
    id: 7,
    name: "Limited Edition Tote Bag",
    category: "Accesorios",
    price: "€19.99",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    rating: 4,
    reviews: 78,
    stock: "In Stock",
    trending: false,
    description: "Bolsa de lona resistente con diseño exclusivo. Perfecta para vinilos."
  },
  {
    id: 8,
    name: "DJ Essentials Sticker Pack",
    category: "Accesorios",
    price: "€9.99",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    rating: 5,
    reviews: 312,
    stock: "In Stock",
    trending: true,
    description: "Pack de 20 stickers waterproof con diseños exclusivos."
  },
  {
    id: 9,
    name: "RAGE Embroidered Bomber Jacket",
    category: "Ropa",
    price: "€129.99",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    rating: 5,
    reviews: 45,
    stock: "Pre-Order",
    trending: true,
    description: "Bomber jacket premium con bordados en espalda y pecho."
  },
  {
    id: 10,
    name: "Headphone Stand - Metal Edition",
    category: "Accesorios",
    price: "€44.99",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
    rating: 4,
    reviews: 67,
    stock: "In Stock",
    trending: false,
    description: "Soporte metálico para auriculares con base antideslizante."
  },
  {
    id: 11,
    name: "Glow in the Dark Tee",
    category: "Ropa",
    price: "€39.99",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    rating: 5,
    reviews: 189,
    stock: "In Stock",
    trending: true,
    description: "Camiseta con estampado que brilla en la oscuridad."
  },
  {
    id: 12,
    name: "USB Cable Pack - Angled",
    category: "DJ Gear",
    price: "€24.99",
    image: "https://images.unsplash.com/photo-1591290619762-c588dc80da3a?w=800&q=80",
    rating: 4,
    reviews: 134,
    stock: "In Stock",
    trending: false,
    description: "Pack de 3 cables USB-C con conectores en ángulo para DJs."
  }
];

export const Tienda: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [cartCount, setCartCount] = useState(0);

  const categories = ["Todos", "Ropa", "Accesorios", "DJ Gear"];

  const filteredProducts = selectedCategory === "Todos"
    ? TIENDA_PRODUCTOS
    : TIENDA_PRODUCTOS.filter(product => product.category === selectedCategory);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <main className="w-full relative z-10 overflow-hidden min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <motion.section
        className="panel mb-20"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingCart className="w-20 h-20 mx-auto mb-6 text-blue-500" />
          </motion.div>
          <span className="section-meta">MERCHANDISE OFICIAL</span>
          <h1 className="text-6xl md:text-8xl font-[Bebas_Neue] text-white mb-6 tracking-wider">
            TIENDA
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ropa exclusiva, accesorios para DJ y productos de edición limitada.
            Todo lo que necesitas para representar la cultura RAGE VENTURE.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          {/* Search */}
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-3 rounded-lg font-bold text-sm tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(0,123,255,0.3)]'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:border-blue-500/50 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Cart */}
          <div className="relative">
            <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(0,123,255,0.3)] flex items-center gap-2">
              <ShoppingCart size={20} />
              CARRITO
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.section>

      {/* Products Grid */}
      <motion.section
        className="panel"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariant}
              className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-blue-900/10 to-purple-900/10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                  {product.trending && (
                    <div className="px-3 py-1 bg-orange-500/20 border border-orange-500 text-orange-400 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md flex items-center gap-1">
                      <TrendingUp size={12} />
                      Trending
                    </div>
                  )}
                  <div className={`ml-auto px-3 py-1 backdrop-blur-md border text-xs font-bold uppercase tracking-wider rounded-full ${
                    product.stock === 'In Stock' ? 'bg-green-500/20 border-green-500 text-green-400' :
                    product.stock === 'Low Stock' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' :
                    product.stock === 'Pre-Order' ? 'bg-blue-500/20 border-blue-500 text-blue-400' :
                    'bg-purple-500/20 border-purple-500 text-purple-400'
                  }`}>
                    {product.stock}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                  <button className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white transition-colors">
                    <Eye size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Category */}
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  {product.category}
                </span>

                {/* Name */}
                <h3 className="text-lg font-bold text-white mt-2 mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={12}
                        className={idx < product.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-2xl font-bold text-white">{product.price}</p>
                  </div>
                  <button
                    onClick={addToCart}
                    className="px-4 py-2 bg-blue-600 text-white font-bold text-xs tracking-wider rounded-lg hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(0,123,255,0.5)] transition-all flex items-center gap-2"
                  >
                    <ShoppingCart size={14} />
                    AÑADIR
                  </button>
                </div>
              </div>

              {/* Hover Accent */}
              <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="panel mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-[Bebas_Neue] text-white mb-3 tracking-wide">
              ENVÍO GRATIS
            </h3>
            <p className="text-gray-300 text-sm">
              En pedidos superiores a €50 en toda España. Envío express disponible.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-[Bebas_Neue] text-white mb-3 tracking-wide">
              CALIDAD PREMIUM
            </h3>
            <p className="text-gray-300 text-sm">
              Productos de la más alta calidad. Garantía de satisfacción 100%.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-[Bebas_Neue] text-white mb-3 tracking-wide">
              EDICIONES LIMITADAS
            </h3>
            <p className="text-gray-300 text-sm">
              Drops exclusivos y colaboraciones especiales. No te pierdas nada.
            </p>
          </div>
        </div>
      </motion.section>
    
      <Footer />
    </main>
  );
};
