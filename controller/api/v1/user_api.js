const User = require("../../../model/User");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "invalid ",
      });
    }
    return res.json(200, {
      message: "done",
      data: {
        token: jwt.sign(user.toJSON(), "freindbook", { expiresIn: 10000 }),
      },
    });
  } catch (err) {
    console.log(err);
  }
};
