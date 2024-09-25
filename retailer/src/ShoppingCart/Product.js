export default function Product({ product, id, onQuantityChange, handleRemove }) {
  return (
    <div className="card p-3 product-card" data-aos="fade-up">
      <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center justify-content-lg-start">
        <div className="d-flex flex-column align-items-center" data-aos="zoom-in">
          <img

            loading="lazy"
            src={product.image}
            alt={product.title}
            className="img-fluid product-image"

          />
          <div className="d-flex align-items-center mt-3 justify-content-center quantity-controls">
            <button
              className="btn btn-outline-secondary btn-sm quantity-btn"
              onClick={() => onQuantityChange(id, -1)}
              disabled={product.quantity <= 1 || !product.isAvailable}
            >
              -
            </button>
            <span className="quantity-display">
              {product.quantity}
            </span>
            <button
              className="btn btn-outline-secondary btn-sm quantity-btn"
              onClick={() => onQuantityChange(id, 1)}
              disabled={product.quantity >= product.totalStock || !product.isAvailable}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex-grow-1 d-flex flex-column justify-content-between align-items-lg-start align-items-center text-center text-lg-start">
          {!product.isAvailable && (
            <h5 className="text-danger out-of-stock mx-auto">Out of stock</h5>
          )}
          <h3 className="product-title mx-auto">
            {product.title}
          </h3>
          <p className="product-price mx-auto">Price: ${product.salePrice}</p>
          <div className="d-flex gap-3 mx-auto">
            <button className="btn btn-info action-btn">Save for later</button>
            <button className="btn btn-danger ms-2 action-btn-rem action-btn" onClick={() => handleRemove(id)}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
