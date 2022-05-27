const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.json());

app.post("/", (req, res) => {
  const data = req.body.data;
  const currentContent = fs.readFileSync(
    __dirname + "/TrainingData.json",
    "utf8"
  );
  let contents = Object.assign([], JSON.parse(currentContent));
  const duplicate =
    contents.filter((item) => {
        return JSON.stringify(Object.values(item.input)) === JSON.stringify(Object.values(data))
    }).length > 0;
  const appendNewPasswordContent = (data) => {
    return contents.concat({
      input: data,
      output: {
        strength: 0,
      },
    });
  };
  if (!duplicate) {
    fs.writeFileSync(
      `${__dirname}/TrainingData.json`,
      JSON.stringify(appendNewPasswordContent(data), null, 2)
    );
  }
  res.send(200);
});

app.listen(2000);
