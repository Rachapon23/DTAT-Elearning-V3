
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
      const query_email = await User.findOne({ email: email }).exec()
      if (query_email) {
        return res.status(400).json({ error: "This email has been used" });
      }
    }

    // create new user data
    user = new User({
      employee,
      password,
      department,
      email,
      firstname,
      lastname,
      plant,
      role: await Role.findOne({ name: "student" }).select("_id")
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

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
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Password not match" });
      }

      // create payload
      const payload = {
        user: {
          fisrtname: user.firstname,
          role: user.role.name,
          user_id: user._id,
        },
      };

      // Generate Token Time_limit( 1 day )
      jwt.sign(payload, "jwtSecret", { expiresIn: '1d' }, (err, token) => {
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


// check current user
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.user_id })
      .select("-password")
      .exec();
    console.log("USer: ", user)
    res.send(user);
  }
  catch (err) {
    console.log(err);
    return res.status(500).send("Server Error!!! on current user");
  }
};

exports.getTeacherByCourseId = async (req, res) => {
  try {
    const { course_id } = req.body
    const course = await Course.findOne({ _id: course_id })
      .populate("teacher")
      .select("-password")
      .exec();
    // console.log(course)
    let data = {
      _id: course.teacher._id,
      firstname: course.teacher.firstname,
      lastname: course.teacher.lastname,
    }
    res.send(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on get teacher by ID");
  }
};

// POST: /send-email
exports.sendEmail = async (req, res) => {
  try {
    const { email } = req.body
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'densoeleaning@gmail.com',
        pass: 'hqqabmpdjxmqsevf'
      }
    });

    const token = jwt.sign({ email: email }, "jwtSecret", { expiresIn: '5m' });
    const reset_password_data = await ResetPassword.findOne({ email: email }).exec()

    let isTokenExpire = true;
    if (reset_password_data) {
      jwt.verify(reset_password_data.token, "jwtSecret", (err, _) => {
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
      await ResetPassword.findOneAndDelete({ email: email }).exec()
    }

    if (isTokenExpire) {
      const reset_password_request = new ResetPassword({
        email: email,
        token: token,
      })
      await reset_password_request.save()

      let mailOptions = {
        from: 'densoeleaning@gmail.com',
        to: email,
        subject: 'Reseting your elearning password',
        html: `
                <html>
                <h1>Do not delete this email utill you reseted your password</h1>
                <h1> Click the button below to link to reset password page <h1>
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

exports.resetPassword = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const decoded = jwt.verify(req.headers.authtoken, "jwtSecret");
    const tokenEmail = decoded.email;

    const reset_password_data = await ResetPassword.findOne({ token: req.headers.authtoken }).exec()
    // console.log(req)
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
    res.send(req.user.role)
  }
  catch (err) {
    console.log(err);
  }
}

exports.getMyaccount = async (req, res) => {
  try {

    const user = await User.findOne({ _id: req.user.user_id }).exec()

    res.json({ data: user })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unxpected error on get account" })
  }
}

exports.uploadProfile = async (req, res) => {
  try {

    const filename = req.file.filename;
    const { email, tel } = req.body

    const user = await User.findOneAndUpdate(
      { _id: req.user.user_id },
      {
        profile: filename,
        email: email,
        tel: tel
      }
    ).exec()

    res.json({ data: user })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unxpected error on uploadProfile" })
  }
}

exports.updateProfile = async (req, res) => {
  try {

    const { email, tel } = req.body

    const user = await User.findOneAndUpdate(
      { _id: req.user.user_id },
      {
        email: email,
        tel: tel
      }
    ).exec()
    res.send(user)

  }
  catch (err) {
    console.log(err);
    res.status(500).send("error on updateProfile")
  }
}

exports.returnRoute = async (req, res) => {
  try {
    console.log(req.user)
    res.send({ status: true, role: req.user.role })
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Error your access denied")
  }
}


exports.ChangeAmount = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.user_id },
      { amountstudent: parseInt(req.body.amount) }
    )
    res.send(user)
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Error your ChangeAmount")
  }
}