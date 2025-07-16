import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuccessCard from "../welcome/Card";
import "./Create.css";

const Create = () => {
  const [name, setname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Bprice, setBprice] = useState("");
  const [Sprice, setSprice] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [productNames, setproductNames] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/productNames")
      .then((res) => setproductNames(res.data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (!name) return setError("please provide product name");
    if (!quantity) return setError("please provide quantity");
    if (!Bprice) return setError("please provide buying price");
    if (!Sprice) return setError("please provide selling price");

    if (isNaN(quantity)) return setError("Quantity must be a number");
    if (isNaN(Bprice)) return setError("Buying price must be a number");
    if (isNaN(Sprice)) return setError("Selling price must be a number");

    axios
      .post("http://localhost:5000/createProduct", {
        productName: name,
        productQuantity: Number(quantity),
        buyingPrice: Number(Bprice),
        sellingPrice: Number(Sprice),
      })
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setname("");
        setQuantity("");
        setBprice("");
        setSprice("");
        setError("");
      })
      .catch(() => {
        setError("Failed to create product");
      });
  };

  return (
    <>
      <section className="create-section">
        <header className="create-header">
          <button className="hamburger" onClick={() => setDrawerOpen(true)}>
            ☰
          </button>
        </header>

        {drawerOpen && (
          <>
            <div
              className="drawer-backdrop"
              onClick={() => setDrawerOpen(false)}
            ></div>
            <div className="drawer">
              <button
                className="drawer-close"
                onClick={() => setDrawerOpen(false)}
              >
                ×
              </button>
              <div className="drawer-options">
                <button
                  onClick={() => {
                    navigate("/user");
                    setDrawerOpen(false);
                  }}
                >
                  User
                </button>
                <button
                  onClick={() => {
                    // Placeholder for future report
                    alert("Report generation coming soon!");
                  }}
                >
                  Generate Sales Report
                </button>
              </div>
            </div>
          </>
        )}

        <form className="create-form" onSubmit={handleSubmit}>
          <div className="create-inputs">
            <h1 className="create-title">Create Product</h1>
            {error && <div className="create-error">{error}</div>}
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="create-input"
              list="product-suggestions"
            />
            <datalist id="product-suggestions">
              {productNames.map((item, i) => (
                <option key={i} value={item} />
              ))}
            </datalist>
            <input
              type="number"
              placeholder="Quantity purchased in KG"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="create-input"
            />
            <input
              type="text"
              placeholder="Buying price per KG"
              value={Bprice}
              onChange={(e) => setBprice(e.target.value)}
              className="create-input"
            />
            <input
              type="text"
              placeholder="Selling price per KG"
              value={Sprice}
              onChange={(e) => setSprice(e.target.value)}
              className="create-input"
            />
            <button type="submit" className="create-button">
              Create Product
            </button>
          </div>
        </form>
      </section>

      <SuccessCard message="Product created successfully!" show={showSuccess} />
    </>
  );
};

export default Create;
