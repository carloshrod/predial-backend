const { sign } = require('jsonwebtoken');
const { config } = require('../config');

exports.generateAuthToken = (user) => {
    const token = sign(
        {
            _id: user._id,
            rol: user.rol,
            nro_doc: user.nro_doc
        },
        config.JWT_SECRET_KEY,
        { expiresIn: '6h' }
    )
    return token
}
