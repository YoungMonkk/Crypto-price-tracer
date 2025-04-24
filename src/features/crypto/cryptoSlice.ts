import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CryptoAsset {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  logo: string;
}

interface CryptoState {
  assets: CryptoAsset[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CryptoState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 93759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950847,
      circulatingSupply: 19.85,
      maxSupply: 21,
      logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547468307,
      circulatingSupply: 120.71,
      maxSupply: null,
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    // Add more initial assets here
  ],
  status: 'idle',
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<Partial<CryptoAsset>[]>) => {
      action.payload.forEach(update => {
        const asset = state.assets.find(a => a.id === update.id);
        if (asset) {
          Object.assign(asset, update);
        }
      });
    },
  },
});

export const { updatePrices } = cryptoSlice.actions;
export const selectAssets = (state: RootState) => state.crypto.assets;
export default cryptoSlice.reducer;
