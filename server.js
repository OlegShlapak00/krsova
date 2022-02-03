
const express = require("express");
const app = express();

app.use(express.static(`./dist/client`));
app.get(`/*`, function(req, res) {
  res.sendFile(`index.html`, {root: `dist/client/`});
});

app.listen(8080||process.env.PORT , () => console.log("listening"));
