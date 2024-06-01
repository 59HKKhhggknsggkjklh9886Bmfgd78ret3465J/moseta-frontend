import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProof } from '../../src/features/transactionSlice';
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { confirmTransaction } from '../../src/features/adminSlice';
import { getTransactions } from '../../src/features/stockistsSlice';

const AdminsStockistTablePending = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { transactions } = useSelector((state) => state.stockist);
  const [updatedTransactions, setUpdatedTransactions] = useState([]);

  useEffect(() => {
    const stockistId = params?.id;
    dispatch(getTransactions({ stockistId }));
  }, [dispatch, params?.id]);

  useEffect(() => {
    setUpdatedTransactions(transactions);
  }, [transactions]);

  const fetchProofFromBackend = (fileName, filePath) => {
    dispatch(fetchProof(fileName, filePath));
  };

  const approveTransaction = (transactionId) => {
    const confirmApproval = window.confirm("Are you sure you want to approve this transaction ?");
    if (confirmApproval) {
      dispatch(confirmTransaction(transactionId, "approved"))
        .then(() => {
          setUpdatedTransactions(prevTransactions => prevTransactions.filter(transaction => transaction._id !== transactionId));
        });
    }
  };

  const rejectTransaction = (transactionId) => {
    const rejectionReason = window.prompt("Are you sure you want to reject this transaction ? If yes then Why :");

    if (rejectionReason) {
      dispatch(confirmTransaction(transactionId, "rejected", rejectionReason))
        .then(() => {
          setUpdatedTransactions(prevTransactions => prevTransactions.filter(transaction => transaction._id !== transactionId));
        });
    }
  };

  const filteredTransactions = useMemo(() => {
    if (!updatedTransactions) return [];
    return updatedTransactions.filter(transaction => transaction.transactionStatus === "pending");
  }, [updatedTransactions]);

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
      file: transaction?.file,
      transactionStatus: transaction?.transactionStatus,
      transactionId: transaction._id
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
      {
        header: 'Approval',
        accessorKey: 'approval',
        size: 200,
        Cell: ({ value, row }) => (
          <div className='flex justify-between   '>
            <button className='text-green-600 text-3xl'
              onClick={() => approveTransaction(row?.original?.transactionId)}
            >
              <FaCheck />
            </button>
            <button className='text-red-600 text-3xl'
              onClick={() => rejectTransaction(row?.original?.transactionId)}
            >
              <ImCross />
            </button>
          </div>
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

export default AdminsStockistTablePending;
