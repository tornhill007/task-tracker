//################login


module.exports = function (app, pool, bcrypt, jwt, keys) {


    app.post("/login", async (req, res) => {
        try {
            const {password, userName} = req.body;
            console.log(userName)
            const user = await pool.query("SELECT * FROM registration WHERE userName = $1", [userName]);
            console.log("USSER", user);

            if(user.rows.length !== 0) {
                const passwordResult = bcrypt.compareSync(password, user.rows[0].password);
                // console.log("3", user.rows[0].userid)
                if(passwordResult) {
                   const token = jwt.sign({
                       userName: user.rows[0].username,
                       userId: user.rows[0].userid
                   }, keys.jwt, {expiresIn: 60 * 60});

                   res.status(200).json({
                       token: `Bearer ${token}`
                   })
                }
                else {
                    res.status(401).json({
                        message: "Password mismatch, try again"
                    })
                }
            }
            else {
                res.status(404).json({
                    message: "User with this name was not found"
                })
            }


        } catch (err) {
            console.log(err.message);
        }
    })

}