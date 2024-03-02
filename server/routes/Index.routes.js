const router = require("express").Router();



const ApiSignIn = require("./api/Signin.routes");
const ApiSignUp = require("./api/Signup.routes");
const ApiLogOut = require("./api/Logout.routes");
const ApiCheck = require('./api/Check.routes');
const ApiQuestions= require('./api/Questions.routes');
const ApiRates = require('./api/Rates.routes');



router.use("/api", ApiSignUp);
router.use("/api", ApiSignIn);
router.use("/api", ApiLogOut);

router.use('/api', ApiCheck);

router.use('/api/questions', ApiQuestions);

router.use('/api', ApiRates);

module.exports = router;