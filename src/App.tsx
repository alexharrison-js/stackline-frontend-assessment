import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./features/dataSlice";
import Graph from "./components/Graph";
import Table from "./components/Table";
import ProductDetails from "./components/ProductDetails";
import { AppDispatch, RootState } from "./app/store";
import "./App.css";

export interface ProductSalesData {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: Review[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: Sale[];
}

interface Review {
  customer: string;
  review: string;
  score: number;
}

interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}


const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="app-container">
      <div className="header">
        <img src="/assets/stackline_logo.svg" alt="Logo" className="logo" />
      </div>

      <div className="content">
        {items.length > 0 && (
          <>
            <div className="product-details">
              <ProductDetails product={items[0]} />
            </div>
            <div className="graph-table-container">
              <div className="graph-container">
                <Graph salesData={items[0].sales} />
              </div>
              <div className="table-container">
                <Table salesData={items[0].sales} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
