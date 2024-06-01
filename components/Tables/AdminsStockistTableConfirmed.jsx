import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProof } from '../../src/features/transactionSlice';

const AdminsStockistTableConfirmed = ({ transactions }) => {

  const dispatch = useDispatch();
  

  // fetch proof from backend
  const fetchProofFromBackend = (fileName , filePath) => {
    dispatch(fetchProof(fileName , filePath));
  }


  const filteredTransactions = useMemo(() => {
    if (!transactions) return []; // Ensure transactions is defined
    return transactions.filter(transaction => transaction.transactionStatus !== "pending");
  }, [transactions]);

  
  const data = useMemo(() => {
    if (!filteredTransactions) return []; // Ensure transactions is defined

    return filteredTransactions.map((transaction, index) => ({
      id: index + 1,

      type: (
        (transaction.type === "ST" && transaction.creditFor === "admin") ? "LTP" :
        (transaction.type === "CT" && transaction.debitFor === "admin") ? "TI" :
        transaction.type
      ),

      amount: (
        (transaction.type === "ST" && transaction.creditFor === "admin" && transaction.sender === "stockist") ? (
          <span>
            <span className="">₹ {transaction.totalAmount}</span><br />
            <span className="text-red-600">
              ({transaction.totalAmount} - 12% = {Math.floor(transaction.totalAmount * (100 / 112))},
              {Math.floor(transaction.totalAmount * (100 / 112))} - {Math.floor(transaction.totalAmount * (100 / 112) / 1.11)} = {Math.floor(transaction.totalAmount * (100 / 112) - Math.floor(transaction.totalAmount * (100 / 112) / 1.11))})
            </span>
          </span>
        ) : `₹ ${transaction.totalAmount}`
      ),
          
      creditFor: transaction.creditFor,
      debitFor: transaction.debitFor,
      sender: transaction.sender === "admin" ? "Moseta" : transaction.sender === "stockist" ? "stockist" : null,
      receiver: transaction.receiver === "admin" ? "Moseta" : transaction.receiver === "stockist" ? "stockist"  : transaction.receiver === "client" ? "client" :null,
      file: transaction?.file
    }));
  }, [transactions]);




  const columns = useMemo(
    () => [
      {
        header: 'S. No.',
        accessorKey: 'id',
        size: 10,
      },

      {
        header: "Proof",
        size: 15,
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
        size: 10,
      },

      {
        header: 'Commited to',
        accessorKey: 'receiver',
        size: 10,
      },

      {
        header: 'Transaction Type',
        accessorKey: 'type',
        size: 10,
      },
      {
        header: 'CR.',
        accessorKey: 'creditFor',
        size: 200,
        Cell: ({ value, row }) => (
          <span>{row.original.creditFor === "admin" ? row.original.amount : ""}</span>
        ),
      },
      {
        header: 'DR.',
        accessorKey: 'debitFor',
        size: 150,
        Cell: ({ value, row }) => (
          <span>{row.original.debitFor === "admin" ? row.original.amount : ""}</span>
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

export default AdminsStockistTableConfirmed;
