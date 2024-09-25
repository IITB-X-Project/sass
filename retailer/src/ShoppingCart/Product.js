export default function Product({ product, id, onQuantityChange, handleRemove }) {
  return (
    <div className="card p-3 h-100">
      <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center justify-content-lg-start">
        <div className="d-flex flex-column align-items-center">
          <img
            loading="lazy"
            src={product.img}
            alt={product.name}
            className="img-fluid"
            style={{ width: '100%', maxWidth: '150px', height: 'auto' }}
          />
          <div className="d-flex align-items-center mt-3 justify-content-center">
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              style={{ borderRadius: '50%' }}
              onClick={() => onQuantityChange(id, -1)}
              disabled={product.quantity <= 1}
            >
              -
            </button>
            <span
              className="border p-2"
              style={{ width: '100px', textAlign: 'center', borderRadius: '1em' }}
            >
              {product.quantity}
            </span>
            <button
              className="btn btn-outline-secondary btn-sm ms-2"
              style={{ borderRadius: '50%' }}
              onClick={() => onQuantityChange(id, 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex-grow-1 d-flex flex-column justify-content-between align-items-lg-start align-items-center text-center text-lg-start">
          <h3
            style={{
              fontSize: '3rem',
              letterSpacing: '0.2rem',
              wordBreak: 'break-word',
              margin: 'auto',
              marginBottom: '1rem'
            }}
          >
            {product.name}
          </h3>
          <p className="mb-5 mx-auto">Price: ${product.price}</p>
          <div className="d-flex gap-3 mx-auto">
            <button className="btn btn-info">Save for later</button>
            <button className="btn btn-danger ms-2" onClick={() => handleRemove(id)}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
