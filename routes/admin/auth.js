const express = require('express');
const { signup, signin, signout, getToken, addToken } = require('../../controller/admin/admin');
// const { isSignupRequestValidated, isSignInRequestValidated } = require('../../validators/userValidations');
const { requireSignin } = require('../../validators/validateToken');
const router = express.Router();


router.post('/admin/signup', signup);

router.post('/admin/signin', signin);

router.get('/admin/gettoken', requireSignin, getToken)
router.post('/admin/addToken', requireSignin, addToken)

// router.post('/admin/signout', signout);

module.exports = router;