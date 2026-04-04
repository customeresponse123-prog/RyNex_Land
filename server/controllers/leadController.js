const pool = require("../config/db");

exports.createLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      county,
      state,
      parcel_number,
      acres,
      asking_price,
      notes
    } = req.body;

    if (!name || !email || !county) {
      return res.status(400).json({
        error: "Please fill in all required fields: name, email, and county."
      });
    }

    const phoneValue = phone != null && String(phone).trim() !== "" ? phone : "";
    const fullNotes = state ? (notes ? `State: ${state}. ${notes}` : `State: ${state}`) : (notes || null);
    const newLead = await pool.query(
      `INSERT INTO leads
      (name,email,phone,county,parcel_number,acres,asking_price,notes)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [name, email, phoneValue, county, parcel_number || null, acres || null, asking_price || null, fullNotes]
    );

    res.json(newLead.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};