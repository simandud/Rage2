/**
 * Format utilities
 * Helper functions for formatting data
 */

/**
 * Format date to readable string
 */
export const formatDate = (date: Date | number | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format time to readable string
 */
export const formatTime = (date: Date | number | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format price to EUR
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};

/**
 * Format number with thousands separator
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num);
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Slugify string for URLs
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
