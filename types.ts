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