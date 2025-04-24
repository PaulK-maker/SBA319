import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import seedRoute from './routes/seedRoute.js'; // Import the seed route
import methodOverride from 'method-override';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(methodOverride('_method'));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

// Routes setup
app.use("/events", eventRoutes);
app.use("/users", userRoutes);
app.use("/companies", companyRoutes);
app.use('/seed', seedRoute); // Use the seed route

app.get("/", (req, res) => {
    res.render("pages/home", { title: "Home" });
});

// Error handling
app.use((req, res, next) => {
    res.status(404).json({ error: "Resource Not Found" });
});
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));