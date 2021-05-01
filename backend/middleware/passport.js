const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const pool = require("../db");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await pool.query("SELECT * FROM registration WHERE userId=$1", [payload.userId]);
                if(user.rows.length !== 0) {
                    done(null, user.rows[0])
                }
                else {
                    done(null, false);
                }
            }
            catch(err) {
                console.log(err);
            }

        })
    )
}