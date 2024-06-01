import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProof } from '../../src/features/transactionSlice';

const StockistsAdminTableConfirmend = ({ transactions }) => {

  const dispatch = useDispatch();

  // fetch proof from backend
  const fetchProofFromBackend = (fileName, filePath) => {
    dispatch(fetchProof(fileName, filePath));
  };

  const filteredTransactions = useMemo(() => {
    if (!transactions) return []; // Ensure transactions is defined
    return transactions.filter(transaction => transaction.transactionStatus !== "pending");
  }, [transactions]);


  
  const data = useMemo(() => {
    return filteredTransactions.map((transaction, index) => ({
      id: index + 1,
      type: transaction.type,
      amount: (
        (transaction.type === "ST" && transaction.creditFor === "admin" && transaction.sender === "stockist") ? (
          <span>
            <span className="">₹ {transaction.totalAmount}</span><br />
            <span className="text-red-600">
              ({transaction.amount} - 12% = {Math.floor(transaction.totalAmount * (100 / 112))},
              {Math.floor(transaction.totalAmount * (100 / 112))} - {Math.floor(transaction.totalAmount * (100 / 112) / 1.11)} = {Math.floor(transaction.totalAmount * (100 / 112) - Math.floor(transaction.totalAmount * (100 / 112) / 1.11))})
            </span>
          </span>
        ) : `₹ ${transaction.totalAmount}`
      ),
      creditFor: transaction.creditFor,
      debitFor: transaction.debitFor,
      sender: transaction.sender === "admin" ? "Moseta" : transaction.sender === "stockist" ? "You" : null,
      receiver: transaction.receiver === "admin" ? "Moseta" : transaction.receiver === "stockist" ? "You" : transaction.receiver === "client" ? transaction.client.name : null,
      file: transaction?.file
    }));
  }, [filteredTransactions]);

  const columns = useMemo(
    () => [
      {
        header: 'S. No.',
        accessorKey: 'id',
        size: 100,
      },
      {
        header: "Proof",
        size: 150,
        accessorKey: 'file',
        Cell: ({ row }) => (
          <button className="border border-black p-2 rounded-xl font-bold hover:bg-black hover:text-white"
            onClick={() => fetchProofFromBackend(row?.original?.file?.name, row?.original?.file?.path)}
          >
            View Proof
          </button>
        ),
      },

      {
        header: 'Commited by',
        accessorKey: 'sender',
        size: 100,
      },

      {
        header: 'Commited to',
        accessorKey: 'receiver',
        size: 100,
      },

      {
        header: 'Transaction Type',
        accessorKey: 'type',
        size: 200,
      },
      {
        header: 'CR.',
        accessorKey: 'creditFor',
        size: 200,
        Cell: ({ value, row }) => (
          <span>{row.original.creditFor === "stockist" ? row.original.amount : ""}</span>
        ),
      },
      {
        header: 'DR.',
        accessorKey: 'debitFor',
        size: 200,
        Cell: ({ value, row }) => (
          <span>{row.original.debitFor === "stockist" ? row.original.amount : ""}</span>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return <MaterialReactTable table={table} />;
};

export default StockistsAdminTableConfirmend;
