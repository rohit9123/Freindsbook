const express = require("express");
const port = 8081;
const app = express();

// we are using index routin here
app.use("/", require("./router/index"));

app.listen(port, () => {
  console.log("listing on ${port}", port);
});
