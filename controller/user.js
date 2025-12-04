const User = require('../models/user')

async function handleUserSignUp(req, res){
    const {name, email, password} = req.body
    await User.create({
        name: name,
        email,
        password
    });
    // return res.json({})
    return res.redirect("/");
}

async function handleUSerLogin(req, res){
    const {email, password} = req.body
    const user = await User.findOne({email, password});
    if (!user) {
        return res.render("login", {
            error: "Invalid username or password"
        });
    }

    // Successful login: redirect to the home page
    return res.redirect("/");
}

module.exports = {handleUserSignUp, handleUSerLogin}