import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LinearProgress from '@mui/material/LinearProgress';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';

interface Props {
  open: boolean;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Operation = 'BUY' | 'SELL';

interface Transaction {
  operation: Operation;
  asset: string;
  amount: number;
  note?: string;
  approved: boolean;
}

export const TransactionModal: React.FC<Props> = ({ open, close }) => {
  const [transaction, setTransaction] = React.useState<Partial<Transaction>>(
    {}
  );
  const [status, setStatus] = React.useState('STALE');

  const handleApprove = async () => {
    setStatus('LOADING');
    try {
      const docRef = await addDoc(collection(db, 'transactions'), transaction);
      setStatus('COMPLETED');
    } catch (error) {
      console.error(error);
      setStatus('FAILED');
    }

    close();
  };

  const handleCancel = () => close();

  const handleChange =
    (property: keyof Transaction) => (e: React.ChangeEvent<any>) => {
      const value =
        property === 'amount' ? Number(e.target.value) : e.target.value;
      setTransaction((t) => ({
        ...t,
        [property]: value,
      }));
    };

  React.useEffect(() => console.log({ transaction }), [transaction]);
  return (
    <Modal open={open} onClose={() => console.log('Closed')}>
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Transaction
        </Typography>

        {status === 'LOADING' && <LinearProgress />}
        <div style={{ display: 'grid', gridGap: 20, marginTop: 20 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Operation</InputLabel>
            <Select label="Operation" onChange={handleChange('operation')}>
              <MenuItem value={'BUY'}>Buy</MenuItem>
              <MenuItem value={'SELL'}>Sell</MenuItem>
            </Select>
          </FormControl>
          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Asset / Coin</InputLabel>
            <TextField />
          </FormControl> */}
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Asset / Coin"
              variant="outlined"
              onChange={handleChange('asset')}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              inputProps={{ inputMode: 'numeric' }}
              onChange={handleChange('amount')}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Note"
              variant="outlined"
              onChange={handleChange('note')}
            />
          </FormControl>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleApprove}>Approve</Button>
            <Button>Cancel</Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
