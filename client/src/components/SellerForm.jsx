import { useState } from "react";
import axios from "axios";

function SellerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    county: "",
    state: "",
    parcel_number: "",
    acres: "",
    asking_price: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/leads/submit", { ...formData, phone: "" });
      alert("Property submitted successfully!");
      setFormData({
        name: "",
        email: "",
        county: "",
        state: "",
        parcel_number: "",
        acres: "",
        asking_price: "",
        notes: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting property.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="situations-form">
      <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="form-input" required />
      <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="form-input" required />
      <input name="county" placeholder="County" value={formData.county} onChange={handleChange} className="form-input" required />
      <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="form-input" required />
      <textarea name="notes" placeholder="Any Property Details" value={formData.notes} onChange={handleChange} className="form-textarea" rows={4} />
      <input name="parcel_number" placeholder="Parcel Number (Optional)" value={formData.parcel_number} onChange={handleChange} className="form-input" />
      <input name="acres" placeholder="Acreage" value={formData.acres} onChange={handleChange} className="form-input" />
      <button type="submit" className="primary-button situations-form-btn">Submit Property</button>
      <p className="situations-form-disclaimer">No Obligation. Simple & Easy Process.</p>
    </form>
  )
}

export default SellerForm;