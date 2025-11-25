import { Artist, Event, Release, Playlist, NewsItem } from './types';

export const ARTISTS: Artist[] = [
  { id: 1, name: "NEON PULSE", genre: "Acid Techno", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&q=80" },
  { id: 2, name: "CYBER DUST", genre: "Deep House", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80" },
  { id: 3, name: "VOID WALKER", genre: "Melodic Techno", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&q=80" },
  { id: 4, name: "ASTRAL ECHO", genre: "Psy-Trance", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&q=80" },
];

export const RELEASES: Release[] = [
  { id: 1, title: "Blue Horizon", artist: "Neon Pulse", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80", year: "2024" },
  { id: 2, title: "System Failure", artist: "Cyber Dust", cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", year: "2024" },
  { id: 3, title: "Into the Abyss", artist: "Void Walker", cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", year: "2023" },
];

export const EVENTS: Event[] = [
  { id: 1, name: "RAGEVENTURE: ORIGINS", date: "OCT 14, 2024", location: "Ibiza, Spain", status: "Sold Out" },
  { id: 2, name: "MIDNIGHT SUN", date: "NOV 02, 2024", location: "Tulum, Mexico", status: "Selling Fast" },
  { id: 3, name: "DEEP DIVE", date: "DEC 31, 2024", location: "London, UK", status: "Available" },
];

export const PLAYLISTS: Playlist[] = [
  { id: 1, title: "DEEP SPACE", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&q=80" },
  { id: 2, title: "CYBERNETIC", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80" },
  { id: 3, title: "GALACTIC", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80" },
  { id: 4, title: "ACID RAIN", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80" },
  { id: 5, title: "NEON NIGHTS", image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&q=80" },
  { id: 6, title: "VOID", image: "https://images.unsplash.com/photo-1506318137071-a8bcbf6d919d?w=500&q=80" },
];

export const GENRES = [
  "Techno", "House", "Drum & Bass", "Ambient", "Psy-Trance", "IDM", "Dubstep"
];

export const NEWS: NewsItem[] = [
  { id: 1, title: "London's Deviation releases limited-edition photobook", date: "14 ENE", category: "MÚSICA", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200", excerpt: "Rare photographs from the archive." },
  { id: 2, title: "Mix Of The Day: Nanny Wams", date: "13 ENE", category: "MIX", image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200", excerpt: "The Croydon-beat wizard in action." },
  { id: 3, title: "New music: DJ Narciso, Tom Boogizm", date: "12 ENE", category: "LANZAMIENTOS", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200", excerpt: "We round up 15 new music announcements." },
];