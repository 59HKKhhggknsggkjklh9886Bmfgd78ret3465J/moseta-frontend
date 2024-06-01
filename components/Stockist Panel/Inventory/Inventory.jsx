import { useDispatch, useSelector } from "react-redux"
import "./Inventory.css"
import { useEffect } from "react";
import { fetchStock } from "../../../src/features/stockSlice";

const Inventory = () => {

    const {stock} = useSelector((state) => state.stock);
    const dispatch = useDispatch();
    // console.log(stock)

    useEffect(() => {
        dispatch(fetchStock())
    },[dispatch])
  return (
    <div className='stockistInventoryBody'>

        <div className='stockistInventoryContainer'>
           <h1 className="stockistInventoryTitle">INVENTORY</h1>

           <div className="stockistInventoryStockContainer">
                
                {stock.map((item,key) => (
                    <div className="stockistInventoryCategoryContainer" key={key}>
                        <div className="stockistInventoryCategory"><p className="stockInventoryCategoryTitle">Category</p> <p className="stockInventoryCategoryName">{item?.category?.name}</p></div>

                        {item.products.map((product,k) => (
                            <div className="stockistInventoryProductList" key={k}>
                                <p className="stockistInventoryProductName">{product?.product?.name}</p>
                                <p className="stockistInventoryProductQuantity">{product?.quantity}</p>
                            </div>
                        ))}
                    </div> 
                ))}

           </div>

        </div>

    </div>
  )
}

export default Inventory