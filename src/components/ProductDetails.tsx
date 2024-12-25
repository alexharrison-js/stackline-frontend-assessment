import React from 'react';
import { ProductSalesData } from '../App';


interface ProductDetailsProps {
  product: ProductSalesData;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="product-container">
      <div className="image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h2>{product.title}</h2>
        <p>{product.subtitle}</p>
        <div className="tags">
          {product.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
