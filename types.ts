export interface Artist {
  id: number;
  name: string;
  genre: string;
  image: string;
}

export interface Release {
  id: number;
  title: string;
  artist: string;
  cover: string;
  year: string;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  status: 'Selling Fast' | 'Sold Out' | 'Available';
}

export interface Playlist {
  id: number;
  title: string;
  image: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Product {
  id: number;
  name: string;
  type: 'vinyl' | 'merch' | 'digital';
  price: number;
  image: string;
  artist?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio?: string;
}