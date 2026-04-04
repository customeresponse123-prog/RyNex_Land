import { useState } from "react";
import axios from "axios";

const STATES = ["Tennessee", "North Carolina", "Georgia", "Alabama", "Other"];
const COUNTIES = ["Davidson", "Shelby", "Knox", "Hamilton", "Rutherford", "Mecklenburg", "Wake", "Guilford", "Fulton", "Gwinnett", "Jefferson", "Madison", "Other"];

function HeroLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    county: "",
    state: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/leads/submit", {
        ...formData,
        parcel_number: "",
        acres: "",
        asking_price: "",
        notes: formData.state ? `State: ${formData.state}` : ""
      });
      alert("Thanks! We'll be in touch with your offer soon.");
      setFormData({ name: "", phone: "", email: "", county: "", state: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="hero-form">
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="hero-form-input"
        required
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="hero-form-input"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="hero-form-input"
        required
      />
      <select
        name="county"
        value={formData.county}
        onChange={handleChange}
        className="hero-form-input"
        required
      >
        <option value="">County</option>
        {COUNTIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        name="state"
        value={formData.state}
        onChange={handleChange}
        className="hero-form-input"
        required
      >
        <option value="">State</option>
        {STATES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button type="submit" className="hero-form-btn">
        Get Offer
      </button>
    </form>
  );
}

export default HeroLeadForm;
