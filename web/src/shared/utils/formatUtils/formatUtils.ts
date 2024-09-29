export const formatPrice = (value: string | number | undefined): string =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const parsePrice = (value: string | undefined): string =>
  value ? value.replace(/\s/g, '') : '';
