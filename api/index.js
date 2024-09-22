const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const port = process.env.port || 3001;
const appVersion = process.env.app_version || "9999";
const db = mysql.createConnection({
  host: process.env.db_host || "localhost",
  port: process.env.db_port || "3306",
  user: process.env.db_user || "root",
  password: process.env.db_pass || "root",
  database: process.env.db_name || "mosque_db",
});
const jwtSecretKey = process.env.key || "1234q1234";

const imageUploadPath = "/home/alottpil/mosqueapp.api.alotaki.com/images";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`);
  },
});

const imageUpload = multer({ storage: storage });

const app = express();
app.use(cors());

app.use(express.json());

app.get("/appVersion", (req, res) => {
  return res.json(appVersion);
});

////////////Prayer Times//////////////////
app.get("/prayerTimes", (req, res) => {
  console.log("getting data");
  const q = "SELECT * FROM prayertimes";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/updatePrayerTime", (req, res) => {
  const token = req.headers["user-token"];
  if (verifyToken(token) === false) {
    return res.status(511).json(false);
  }
  const { Name, Time, Offset } = req.body;
  const q =
    "UPDATE `prayertimes` SET `Iqamah` = " +
    mysql.escape(Time) +
    ", `Offset` = " +
    mysql.escape(Offset) +
    "WHERE `prayertimes`.`Name` = " +
    mysql.escape(Name);

  db.query(q, (err) => {
    if (err) return res.status(400).json(false);
    return res.status(200).json(true);
  });
});

////////////Feedback Functions////////////
app.post("/deletefeedback", (req, res) => {
  const { id } = req.body;
  const q = "DELETE FROM feedback WHERE id=" + mysql.escape(id);

  db.query(q, (err, results) => {
    if (err) return res.json({ message: "Error444" });
    console.log(results);
  });
});

app.get("/getfeedback", (req, res) => {
  const q = "SELECT * FROM feedback";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/addfeedback", (req, res) => {
  const { name, email, feedback } = req.body;
  const q =
    "INSERT INTO feedback (Name, email, feedback) VALUES (" +
    mysql.escape(name) +
    "," +
    mysql.escape(email) +
    "," +
    mysql.escape(feedback) +
    ")";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json({ message: true });
  });
});

////////////Posts Functions////////////
app.get("/getposts", (req, res) => {
  const q = "SELECT * FROM posts ORDER BY id DESC LIMIT 10";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

const uploadImage = imageUpload.single("my-image-file");
app.post("/uploadImage", (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    } else {
      return res.json({
        FileLink:
          "https://mosqueapp.api.alotaki.com/images/" + req.file.filename,
      });
    }
  });
});

app.post("/addposts", (req, res) => {
  const token = req.headers["user-token"];
  if (verifyToken(token) === false) {
    return res.status(511).json(false);
  }
  const { title, contant } = req.body;

  const q =
    "INSERT INTO posts (title, contant, image) VALUES (" +
    mysql.escape(title) +
    "," +
    mysql.escape(contant) +
    "," +
    mysql.escape(null) +
    ")";

  db.query(q, (err) => {
    if (err) return res.status(400).json(false);
    return res.status(200).json(true);
  });
});

app.post("/updatepost", (req, res) => {
  const token = req.headers["user-token"];
  if (verifyToken(token) === false) {
    return res.status(511).json(false);
  }
  const { id, title, contant } = req.body;

  const q =
    "UPDATE posts SET title = " +
    mysql.escape(title) +
    ",contant= " +
    mysql.escape(contant) +
    " WHERE id =" +
    id;
  db.query(q, (err) => {
    if (err) return res.status(400).json(false);
    return res.status(200).json(true);
  });
});
app.post("/deletePost", (req, res) => {
  const token = req.headers["user-token"];
  if (verifyToken(token) === false) {
    return res.status(511).json(false);
  }
  const { id } = req.body;
  const q = "DELETE FROM posts WHERE id=" + mysql.escape(id);
  db.query(q, (err) => {
    if (err) return res.status(400).json(false);
    return res.status(200).json(true);
  });
});

app.get("/getposts", (req, res) => {
  const q = "SELECT * FROM posts";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

///////////////////////signin a user////////////////////////////////
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Look up the user entry in the database
  const q = "SELECT * FROM users WHERE Email=" + mysql.escape(email);
  db.query(q, (err, user) => {
    if (err) return res.json(err);
    // If found, compare the hashed passwords and generate the JWT token for the user
    if (user.length === 1) {
      bcrypt.compare(password, user[0].Pass, function (_err, result) {
        if (!result) {
          return res.status(401).json({ message: "Invalid password" });
        } else {
          let loginData = {
            email,
            signInTime: Date.now(),
          };

          const token = jwt.sign(loginData, jwtSecretKey);
          res
            .status(200)
            .json({ userType: user[0].userType, message: true, token });
        }
      });
    } else {
      res.status(200).json({ message: "User Not Found" });
    }
  });
});
///////////////////////Signup a user////////////////////////////////
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  // Look up the user entry in the database
  const q = "SELECT * FROM users WHERE Email=" + mysql.escape(email);
  db.query(q, (err, user) => {
    if (err) return res.json(err);

    if (user.length === 1) {
      res.status(200).json({ message: "Account already exists" });
    } else if (user.length === 0) {
      bcrypt.hash(password, 10, function (_err, hash) {
        const q =
          "INSERT INTO users (userName,  Email, Pass) VALUES ('new', " +
          mysql.escape(email) +
          "," +
          mysql.escape(hash) +
          ")";
        db.query(q, (err, data) => {
          if (err) return res.json(err);
        });

        let loginData = {
          email,
          signInTime: Date.now(),
        };

        const token = jwt.sign(loginData, jwtSecretKey);
        res.status(200).json({ message: "success", newUser: "true" });
      });
    }
  });
});

// The verify endpoint that checks if a given JWT token is valid
app.post("/verify", (req, res) => {
  const tokenHeaderKey = "jwt-token";
  const authToken = req.headers[tokenHeaderKey];
  try {
    const verified = jwt.verify(authToken, jwtSecretKey);
    if (verified) {
      return res.status(200).json({ status: "logged in", message: "success" });
    } else {
      // Access Denied
      return res.status(401).json({ status: "invalid auth", message: "error" });
    }
  } catch (error) {
    // Access Denied
    return res.status(401).json({ status: "invalid auth", message: "error" });
  }
});

function verifyToken(token) {
  try {
    if (jwt.verify(token, jwtSecretKey)) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

//production
app.listen(port);
