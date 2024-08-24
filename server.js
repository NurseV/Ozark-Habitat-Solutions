const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/signup", (req, res) => {
    // Handle user sign-up (for now, just log the details)
    console.log(req.body);
    res.send("Sign-up successful!");
});

app.post("/login", (req, res) => {
    // Handle user login (for now, just log the details)
    console.log(req.body);
    res.send("Login successful!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
