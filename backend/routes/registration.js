//################registration

module.exports = function (app, pool, bcrypt) {


//create user

    app.post("/register", async (req, res) => {
        try {
            const {password, userName} = req.body;

            const user = await pool.query("SELECT * FROM registration WHERE userName=$1", [userName]);
            console.log(user.rows);
            if(user.rows.length !== 0) {
                res.status(409).json({
                    message: "This login is already taken"
                })
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const newUser = await pool.query("INSERT INTO registration (userName, password) VALUES($1,$2) RETURNING *", [userName, bcrypt.hashSync(password, salt)]);

                res.json(newUser.rows[0]);
            }


        } catch (err) {
            console.log(err.message);
        }
    })

}