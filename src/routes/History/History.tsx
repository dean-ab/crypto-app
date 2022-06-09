import { collection, getDocs } from 'firebase/firestore';
import * as React from 'react';
import { db } from '../../services/firebase';

export const History: React.FC = () => {
  const [history, setHistory] = React.useState<any>();

  React.useEffect(() => {
    getDocs(collection(db, 'transactions'))
      .then((snapshot) => snapshot.docs.map((d) => d.data()))
      .then((d) => setHistory(d));
  }, []);
  return (
    <pre>
      <code>{JSON.stringify(history, null, 2)}</code>
    </pre>
  );
};
