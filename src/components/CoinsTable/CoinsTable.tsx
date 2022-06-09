import * as React from 'react';
import { Coin } from '../../types';

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import styles from './CoinsTable.module.scss';
import classnames from 'classnames';
import { prettifyNumber } from '../../utils';
import { Link } from 'react-router-dom';

interface Props {
  coins: Coin[];
}

const HeaderTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: '#787777',
    fontSize: 12,
  },
}));

export const CoinsTable: React.FC<Props> = ({ coins }) => {
  return (
    <TableContainer sx={{ maxWidth: '90vw' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <HeaderTableCell>#</HeaderTableCell>
            <HeaderTableCell>Name</HeaderTableCell>
            <HeaderTableCell align="right">Change (24h)</HeaderTableCell>
            <HeaderTableCell align="right">Price</HeaderTableCell>
            <HeaderTableCell align="right">Price in BTC</HeaderTableCell>
            <HeaderTableCell align="right">Market Cap </HeaderTableCell>
            <HeaderTableCell align="right">Volume (24h)</HeaderTableCell>
            <HeaderTableCell align="right">Price Graph (7d)</HeaderTableCell>
            <HeaderTableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow
              key={coin.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className={styles.row}
            >
              <TableCell component="th" scope="row">
                {coin.rank}
              </TableCell>
              <TableCell>
                <CoinNameWithLogo coin={coin} />
              </TableCell>
              <TableCell align="right">
                <PriceChange change={coin.priceChange1d} />
              </TableCell>
              <TableCell align="right">${coin.price.toFixed(2)}</TableCell>
              <TableCell align="right">{coin.priceBtc.toFixed(10)}</TableCell>
              <TableCell align="right">
                ${prettifyNumber(coin.marketCap)}
              </TableCell>
              <TableCell align="right">
                ${prettifyNumber(coin.volume)}
              </TableCell>
              <TableCell align="right">
                <img
                  className="coinGraph"
                  src={`https://static.coinstats.app/sparks/${coin.id}_1w.png`}
                  alt=""
                />
              </TableCell>
              <TableCell>
                <MoreHorizIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const PriceChange: React.FC<{ change: number }> = ({ change }) => {
  const isPositive = change > 0;

  return (
    <span
      className={classnames(
        styles.change,
        isPositive ? styles.positive : styles.negative
      )}
    >
      {isPositive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      <span>{Math.abs(change).toFixed(2)}%</span>
    </span>
  );
};

const CoinNameWithLogo: React.FC<{ coin: Coin }> = ({ coin }) => {
  return (
    <div className={styles.coinNameWithLogo}>
      <img className={styles.coinIcon} src={coin.icon} />

      <span onClick={() => console.log('onClick')} className={styles.coinName}>
        {coin.name}
      </span>

      <span className={styles.symbol}>{coin.symbol}</span>
    </div>
  );
};
