const bcrypt = require("bcryptjs");

async function generateSecretKey() {
    const saltRounds = 14;
    const salt = await bcrypt.genSalt(saltRounds);
    const secretKey = await bcrypt.hash(salt, saltRounds);
    console.log("Secret Key:", secretKey);
}

generateSecretKey();
