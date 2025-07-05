import bcrypt from "bcrypt";
import pool from "../db/pool.js"; // also include `.js`
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { email, password, first_name, last_name, access_level } = req.body;

  if (
    !email ||
    !password ||
    !first_name ||
    !last_name ||
    access_level === undefined
  ) {
    console.log(
      "❌ Missing required fields or access_level is undefined:",
      req.body
    );
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (
        email, password, first_name, last_name, access_level
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, first_name, last_name, access_level `,
      [email, hashedPassword, first_name, last_name, access_level]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Register error (detailed):", error.message, error.stack);
    res.status(400).json({ error: error.message }); // Return real reason
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, access_level: user.access_level },
      "super_secret_key", // Replace this with an environment variable in production!
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        access_level: user.access_level,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getCurrentUser = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  try {
    const decoded = jwt.verify(token, "super_secret_key"); // same secret as login

    const result = await pool.query(
      "SELECT id, email, first_name, last_name, access_level FROM users WHERE id = $1",
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
