import Button from '@mui/material/Button';
import * as React from 'react';
import { CoinsTable } from '../CoinsTable';
import { fetchCoins as fetchCoinsApi } from '../../api';
import { Coin } from '../../types';
import { TransactionModal } from '../TransactionModal';

export const Dashboard: React.FC = () => {
  const [coins, setCoins] = React.useState<Coin[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const fetchCoins = () => {
    fetchCoinsApi({ offset: coins.length }).then((res) =>
      setCoins((c) => [...c, ...res])
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  React.useEffect(fetchCoins, []);

  return (
    <main
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <CoinsTable coins={coins} />
      <Button onClick={fetchCoins}>Load More Coin Prices</Button>
      <Button onClick={openModal}>New Transaction</Button>
      <TransactionModal close={closeModal} open={isModalOpen} />
    </main>
  );
};
