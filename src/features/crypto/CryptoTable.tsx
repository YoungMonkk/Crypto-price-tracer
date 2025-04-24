import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAssets, updatePrices } from './cryptoSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: '#1a1a1a',
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const formatNumber = (num: number, decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

const formatCurrency = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(num);
};

const ChangeCell = styled(TableCell)<{ value: number }>(({ value, theme }) => ({
  color: value > 0 ? '#16c784' : value < 0 ? '#ea3943' : 'inherit',
}));

export function CryptoTable() {
  const assets = useAppSelector(selectAssets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const simulateUpdates = () => {
      const updates = assets.map(asset => ({
        id: asset.id,
        price: asset.price * (1 + (Math.random() - 0.5) * 0.002),
        change1h: asset.change1h + (Math.random() - 0.5),
        change24h: asset.change24h + (Math.random() - 0.5),
        change7d: asset.change7d + (Math.random() - 0.5),
        volume24h: asset.volume24h * (1 + (Math.random() - 0.5) * 0.1),
      }));
      dispatch(updatePrices(updates));
    };

    const interval = setInterval(simulateUpdates, 2000);
    return () => clearInterval(interval);
  }, [assets, dispatch]);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: 'auto', boxShadow: 3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="crypto table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">1h %</StyledTableCell>
            <StyledTableCell align="right">24h %</StyledTableCell>
            <StyledTableCell align="right">7d %</StyledTableCell>
            <StyledTableCell align="right">Market Cap</StyledTableCell>
            <StyledTableCell align="right">Volume (24h)</StyledTableCell>
            <StyledTableCell align="right">Circulating Supply</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset) => (
            <StyledTableRow key={asset.id}>
              <TableCell>{asset.id}</TableCell>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Avatar src={asset.logo} sx={{ width: 24, height: 24 }} />
                  {asset.name}
                  <span style={{ color: '#808a9d' }}>{asset.symbol}</span>
                </div>
              </TableCell>
              <TableCell align="right">{formatCurrency(asset.price)}</TableCell>
              <ChangeCell align="right" value={asset.change1h}>
                {formatNumber(asset.change1h)}%
              </ChangeCell>
              <ChangeCell align="right" value={asset.change24h}>
                {formatNumber(asset.change24h)}%
              </ChangeCell>
              <ChangeCell align="right" value={asset.change7d}>
                {formatNumber(asset.change7d)}%
              </ChangeCell>
              <TableCell align="right">{formatCurrency(asset.marketCap)}</TableCell>
              <TableCell align="right">{formatCurrency(asset.volume24h)}</TableCell>
              <TableCell align="right">{formatNumber(asset.circulatingSupply)} {asset.symbol}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
