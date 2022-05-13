var express = require('express');
var path = require('path');
const app = new express();

// const __dirname = path.resolve(path.dirname(''));
app.use(express.static(path.join(__dirname, '/src')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/src/index.html'))
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
