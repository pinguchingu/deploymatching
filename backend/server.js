const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
import eventsRouter from "./routes/events.js";
import usersRouter from "./routes/users.js";
import matchingsRouter from "./routes/matchings.js"

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://admin1:90Hkwfxjo94MBaMl@cluster0.odi3f.mongodb.net/matching?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB db connection established.");
})

app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.use('/matchings', matchingsRouter);
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

