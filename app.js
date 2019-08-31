const express = require("express");
const app = express();
const studentsJson = require(__dirname + "/data/students.json");
const hbs = require("hbs");

//set my view engine to hbs
app.set("view engine", "hbs");
//declare where to find views
app.set("views", __dirname + "/views");

//register partial views
hbs.registerPartials(__dirname + "/partials");

//serve static files
app.use(express.static(__dirname + "/public"));

//Routing
app.get("/", (req, res) => {
  const user = { name: "Gijs", age: 27 };
  res.render("index", { user, title: "Home Page" });
});

app.get("/students", (req, res) => {
  res.render("students", {
    students: studentsJson,
    title: "Student Page"
  });
});

app.get("/sopranos", (req, res) => {
  const sopranos = [
    {
      firstName: "Tony",
      lastName: "Soprano"
    },
    {
      firstName: "Christopher",
      lastName: "Moltisanti"
    }
  ];

  res.render("sopranos", { sopranos: sopranos, title: "Soprano page" });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(3000, () => {
  console.log("running on port 3000");
});

const promise = new Promise((resolve, reject) => {
  //get data from remote place
  setTimeout(() => {
    const error = new Error("500 server error");

    if (error) {
      reject(error);
      return;
    }

    const data = [
      {
        name: "gijs"
      }
    ];
    resolve(data);
  }, 3000);
});

promise
  .then(x => {
    console.log(x);
  })
  .catch(err => {
    console.log(err);
  });
