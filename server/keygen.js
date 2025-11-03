const bcrypt = require("bcryptjs");
bcrypt.hash("mysecretkey", 10).then(console.log);