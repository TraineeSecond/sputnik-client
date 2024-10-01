export const formatPrice = (value: string | number | undefined): string =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const parsePrice = (value: string | undefined): string =>
  value ? value.replace(/\s/g, '') : '';

export const formatPriceRub = (value: string | number | undefined): string =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';

export const calculateDiscount = (price: number, newPrice: number): number => {
  if (price <= newPrice) return 0;
  return Math.round(((price - newPrice) / price) * 100);
};
