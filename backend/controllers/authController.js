
const User = require('../models/user')
const Course = require('../models/course')
const ResetPassword = require("../models/resetPassword")
const nodeMailer = require("nodemailer")
const Role = require("../models/role")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST: /register
exports.register = async (req, res) => {
  try {
    // extract data from request
    const {
      employee,
      password,
      department,
      email,
      firstname,
      lastname,
      plant,
    } = req.body

    // check if user already registered
    let user = await User.findOne({ employee })
    if (user) {
      console.log(user)
      return res.status(400).json({ error: "User already exist already" });
    }

    // check user email will not duplicate with other
    if (email.length > 0) {
      const query_email = await User.findOne({ email: email })
      if (query_email) {
        return res.status(400).json({ error: "This email has been used" });
      }
    }

    // create profile
    const profile = await new Profile({
      image: null,
      tel: null,
      email: email,
      target: 0,
    }).save();

    // create new user data
    user = new User({
      employee,
      password,
      department,
      email,
      firstname,
      lastname,
      plant,
      profile,
      role: await Role.findOne({ name: "student" }).select("_id")
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    console.log(user)

    // save use data
    await user.save();
    return res.json({ data: "Register Success" })

  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Unexpected Error on register" })
  }
}

// POST: /login
exports.login = async (req, res) => {
  try {
    // extract data from request
    const { employee, password } = req.body;


    // find user
    var user = await User.findOneAndUpdate({ employee }, { new: true }).populate("role", "name -_id");
    if (user && user.enabled) {

      // check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Password not match" });
      }

      // create payload
      const payload = {
        user: {
          firstname: user.firstname,
          role: user.role.name,
          user_id: user._id,
        },
      };

      // Generate Token Time_limit( 1 day )
      // JWT_CODE="jwtSecret"
      jwt.sign(payload, process.env.JWT_CODE, { expiresIn: '1d' }, (err, token) => {
        if (err) throw err;
        return res.json({ token, payload });
      });
    }
    else if (user && !user.enabled) {
      return res.status(400).json({ error: "User not active, Please contact admin" });
    }
    else {
      return res.status(400).json({ error: "User not found" });
    }
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Unexpected error on login" });
  }
};

// POST: /send-email
exports.sendEmail = async (req, res) => {
  try {
    const { email } = req.body
    const transporter = nodeMailer.createTransport({
      service: process.env.SERVICE_EMAIL_SENDER,// gmail
      auth: {
        user: process.env.EMAIL_SENDER, // densoeleaning@gmail.com
        pass: process.env.PASS_EMAIL_SENDER // hqqabmpdjxmqsevf
      }
    });

    const token = jwt.sign({ email: email }, process.env.JWT_CODE, { expiresIn: '5m' });
    const reset_password_data = await ResetPassword.findOne({ email: email })

    let isTokenExpire = true;
    if (reset_password_data) {
      jwt.verify(reset_password_data.token, process.env.JWT_CODE, (err, _) => {
        if (!err) {
          isTokenExpire = false;
          return res.status(500).json({ error: "Cannot reset password because previous token is not expire" });
        }
        else {
          return res.status(500).json({ error: "Unexpected error on verify token" });
        }
      });
    }

    if (isTokenExpire && reset_password_data) {
      await ResetPassword.findOneAndDelete({ email: email })
    }

    if (isTokenExpire) {
      const reset_password_request = new ResetPassword({
        email: email,
        token: token,
      })
      await reset_password_request.save()

      const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: 'Reseting your elearning password',
        html: `
                <html>
                <h1>Do not delete this email utill you reseted your password</h1>
                <h1> Click the link below to link to reset password page <h1>
                <a href="http://localhost:3000/reset-password/${token}"> click </a>
                </html>
                `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Send email fail" });
        }
        else {
          console.log('Email sent: ' + info.response);
          return res.json({ data: "Send email success" })
        }
      });
    }
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Unexpected error on request send email" });
  }
}

// ???: ???
exports.resetPassword = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const decoded = jwt.verify(req.headers.authtoken, process.env.JWT_CODE);
    const tokenEmail = decoded.email;

    const reset_password_data = await ResetPassword.findOne({ token: req.headers.authtoken }).exec()
    if (reset_password_data) {
      if (reset_password_data.is_used) {
        return res.status(500).json({ error: "Cannot reset password because previous token is not expire" })
      }
    }
    else {
      return res.status(500).json({ error: "Must send rest password request first" })
    }

    if (userEmail === tokenEmail) {
      await ResetPassword.findOneAndDelete({ token: req.headers.authtoken }).exec()
      if (req.body.confirm_new_password === req.body.new_password) {
        const salt = await bcrypt.genSalt(10);
        const encrypted_password = await bcrypt.hash(req.body.confirm_new_password, salt);
        await User.findOneAndUpdate({ email: userEmail }, { password: encrypted_password })
        return res.json({ data: "Reset password success" })
      }
      else {
        return res.status(500).json({ error: "New password and Confirm new password are not the same" })
      }

    }
    else {
      return res.status(500).json({ error: "Entered email does not match with email that server send to" })
    }
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Unexpected error on reset password" })
  }
}

exports.checkRole = async (req, res) => {
  try {
    const { user_id, role } = req?.user
    return res.json({ data: { user_id: user_id, role: role } });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Unexpected error on check user" });
  }
}