const bcrypt = require('bcrypt');

const generarHash = async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('locofeo212121', salt);
    console.log('Hash generado:', hashedPassword);
};

generarHash();