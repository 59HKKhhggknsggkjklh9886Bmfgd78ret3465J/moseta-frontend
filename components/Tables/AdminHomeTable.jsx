import { useEffect, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllStockists } from '../../src/features/stockistsSlice';

const AdminHomeTable = () => {

  const { stockists } = useSelector((state) => state.stockist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStockists());
  },[dispatch])

  const data = useMemo(() =>

    stockists.map((stockist, index) => ({
      id: index+1,
      name: stockist.name,
      tradeName: stockist.profile?.tradeName,
      contactNo : stockist.profile?.contactNo,
      special: stockist.special,
      address: stockist.profile?.address,
      gstNo: stockist.profile?.gstNo,
      profileSetup : stockist.profile?.profileSetup,
      stockist
    })),

    [stockists]

  );


  const columns = useMemo(
    () => [

      {
        header: 'S. No.',
        accessorKey: 'id',
        size: 100,
      },
      {
        header: 'Name',
        accessorKey: 'stockist.name',
        size: 200,
        Cell: ({ value, row }) => (
          <Link to={`/stockist/${row.original.stockist._id}`}>{row.original.name}</Link>
        ),
      },
      {
        header: 'Trade Name',
        accessorKey: 'tradeName',
        size: 200,
      },
      {
        header: 'GSTIN',
        accessorKey: 'gstNo',
        size: 200,
      },
      {
        header: 'Address',
        accessorKey: "address",
        size: 200
      },
      {
        header: 'Contact',
        accessorKey: 'contactNo',
        size: 200,
      }
      

    ],

    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return <MaterialReactTable table={table} />;
};

export default AdminHomeTable;
