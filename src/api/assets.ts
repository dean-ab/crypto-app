import { request } from '../services/request';
import { Coin, Currency } from '../types';

export function fetchCoins(
  {
    offset = 0,
    limit = 10,
    currency = 'USD',
  }: {
    offset?: number;
    limit?: number;
    currency?: Currency;
  } = { offset: 0, limit: 10, currency: 'USD' }
): Promise<Coin[]> {
  return request
    .get(
      `https://api.coinstats.app/public/v1/coins?skip=${offset}&limit=${limit}&currency=${currency}`
    )
    .then((res) => res.data.coins);
}
