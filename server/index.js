const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const corsOptions = {
  origin: ['https://regalsouls.com', 'https://regalsoulsweb.onrender.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// Applying CORS options to the specific route
app.use('/souls', cors(corsOptions));

// Parsing JSON requests
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.send("hello");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
}); // we got to add this on render


// Route for submitting data
app.post("/souls", async (req, res) => {
    try {
        const { first, last, birthdate, phone, target, email, money, love, other } = req.body;
        const newInfo = await pool.query(
            "INSERT INTO readings(id,first,last,email,phone,birthdate,target,money,love,other) VALUES(nextval('readings_id_seq'),$1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
            [first, last, email, phone, birthdate, target, money, love, other]
        );

        res.json(newInfo.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
