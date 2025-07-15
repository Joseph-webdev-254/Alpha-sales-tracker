import { useState, useEffect } from "react";
import { debounce } from "../../../backend/utils/Debounce";
import "./user.css";
const User = () => {
  const [productNames, setProductNames] = useState([]);
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([
    { name: "", quantity: "", price: "" },
    { name: "", quantity: "", price: "" },
    { name: "", quantity: "", price: "" },
  ]);

  useEffect(() => {
    const last = products[products.length - 1];
    if (last.name && last.quantity && last.price) {
      setProducts([...products, { name: "", quantity: "", price: "" }]);
    }
  }, [products]);

  useEffect(() => {
    fetch("http://localhost:5000/productNames")
      .then((res) => res.json())
      .then((data) => setProductNames(data))
      .catch((err) => console.error("Failed to load product names", err));
  }, []);

  const fetchSellingPrice = async (productName) => {
    try {
      const res = await fetch("http://localhost:5000/productprices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName }),
      });

      const data = await res.json();

      if (data.pricePerKG) return parseFloat(data.pricePerKG);
    } catch (error) {
      console.error("could  not  fetch selling price ", error);
    }
  };

  const debounceFetchedPrice = debounce(async (name, quantity, index) => {
    const pricePerKG = await fetchSellingPrice(name);

    if (pricePerKG !== null && !isNaN(quantity)) {
      const rounded = Math.ceil((pricePerKG * quantity) / 5) * 5;
      const updated = [...products];
      updated[index].price = rounded.toFixed(2);
      setProducts(updated);
    }
  }, 300);

  const handleChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);

    const { name, quantity } = updated[index];

    if ((field === "name" || field === "quantity") && name && quantity) {
      debounceFetchedPrice(name, parseFloat(quantity), index);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sales = products
      .filter((p) => p.name && p.quantity)
      .map((p) => ({
        productName: p.name,
        quantity: parseFloat(p.quantity),
      }));
    if (sales.length === 0) {
      alert("please enter valid  products  for sale ");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/record", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(sales),
      });
      const data = await res.json();
      console.log("response:", data);
      alert("sales recorded");
      setProducts([{ name: "", quantity: "", price: "" }]);
      setValue("");
    } catch (error) {
      console.error("could  not  record  your  products");
    }
  };

  return (
    <div className="user-main">
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="date"
          className="user-date"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <h2 className="user-title">Enter Products Sold</h2>

        {products.map((product, index) => (
          <div key={index} className="user-input-row">
            <input
              type="text"
              placeholder="Name"
              className="user-input"
              value={product.name}
              list="product-suggestions"
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Quantity"
              className="user-input"
              value={product.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
            />
            <input
              type="text"
              placeholder="Price"
              className="user-input"
              value={product.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
            />
          </div>
        ))}

        <button type="submit" className="user-submit">
          Submit
        </button>
      </form>

      <datalist id="product-suggestions">
        {productNames.map((name, i) => (
          <option key={i} value={name} />
        ))}
      </datalist>
    </div>
  );
};

export default User;
