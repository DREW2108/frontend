export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    oldPrice?: number;
    discount?: number;
    image: string;
    description: string;
    stock: number;
    rating: number;
    reviews: number;
    seller: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Auriculares inalámbricos",
        category: "Tecnología",
        price: 89900,
        oldPrice: 119900,
        discount: 25,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        description:
            "Auriculares inalámbricos con diseño compacto, sonido equilibrado y comodidad para escuchar música, ver contenido o trabajar durante el día.",
        stock: 18,
        rating: 4.8,
        reviews: 124,
        seller: "VANTA Audio",
    },
    {
        id: 2,
        name: "Bolso urbano minimalista",
        category: "Moda",
        price: 74900,
        oldPrice: 99900,
        discount: 25,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        description:
            "Bolso urbano de diseño minimalista, pensado para combinar fácilmente con diferentes estilos y llevar tus objetos esenciales.",
        stock: 12,
        rating: 4.7,
        reviews: 86,
        seller: "Urban Studio",
    },
    {
        id: 3,
        name: "Lámpara de escritorio",
        category: "Hogar",
        price: 59900,
        oldPrice: 79900,
        discount: 25,
        image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
        description:
            "Lámpara de escritorio de líneas limpias y estética moderna, ideal para espacios de trabajo, estudio o lectura.",
        stock: 24,
        rating: 4.6,
        reviews: 73,
        seller: "Home Lab",
    },
    {
        id: 4,
        name: "Reloj minimalista",
        category: "Accesorios",
        price: 129900,
        oldPrice: 159900,
        discount: 19,
        image:
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
        description:
            "Reloj de estilo minimalista con una estética elegante y versátil para complementar looks casuales o formales.",
        stock: 9,
        rating: 4.9,
        reviews: 142,
        seller: "Minimal Time",
    },
    {
        id: 5,
        name: "Teclado mecánico compacto",
        category: "Tecnología",
        price: 189900,
        oldPrice: 229900,
        discount: 17,
        image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        description:
            "Teclado mecánico compacto diseñado para ofrecer una experiencia de escritura cómoda, precisa y rápida.",
        stock: 7,
        rating: 4.8,
        reviews: 98,
        seller: "KeyLab",
    },
    {
        id: 6,
        name: "Camiseta oversized",
        category: "Moda",
        price: 49900,
        oldPrice: 69900,
        discount: 29,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        description:
            "Camiseta oversized de corte relajado y estilo contemporáneo, ideal para crear outfits cómodos y casuales.",
        stock: 31,
        rating: 4.5,
        reviews: 64,
        seller: "VANTA Wear",
    },
    {
        id: 7,
        name: "Organizador de escritorio",
        category: "Hogar",
        price: 39900,
        oldPrice: 54900,
        discount: 27,
        image:
            "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85",
        description:
            "Organizador compacto para mantener accesorios y objetos pequeños en orden mientras conservas un espacio limpio.",
        stock: 20,
        rating: 4.6,
        reviews: 51,
        seller: "Desk House",
    },
    {
        id: 8,
        name: "Gafas de sol clásicas",
        category: "Accesorios",
        price: 69900,
        oldPrice: 89900,
        discount: 22,
        image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
        description:
            "Gafas de sol de diseño clásico y fácil de combinar, pensadas para complementar diferentes estilos.",
        stock: 15,
        rating: 4.7,
        reviews: 91,
        seller: "Urban Optics",
    },
];