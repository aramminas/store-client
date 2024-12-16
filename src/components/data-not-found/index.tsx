import { Link } from "react-router-dom";
import "./styles.scss";

export const DataNotFound = () => {
  return (
    <section className="data-not-found">
      <div className="container">
        <div className="content">
          <h1 className="not-found-title">Data not found :(</h1>
          <p className="not-found-message">Something's missing.</p>
          <p className="description">
            It appears there are no products available yet. Start by creating
            your first product today!
          </p>
          <Link to="/create-product" className="back-button">
            Create new product
          </Link>
        </div>
      </div>
    </section>
  );
};
