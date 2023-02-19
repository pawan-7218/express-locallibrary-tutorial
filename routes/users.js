const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');


const User = require('../model/user');
const catchAsync = require('../utilities/catchAsync');


router.get('/register', catchAsync((req, res)=>{
res.render('users/register')
}))
router.post('/register' , catchAsync(async(req,res)=>{
try{
const { username,email, password} = req.body;
const user = new User({email,username});
const registeredUser = await User.register(user, password);
console.log(registeredUser);
req.login(registeredUser, err=>{
    if (err){ return (err)} else{
    req.flash('success','Welcome to Yelp Camp');
res.redirect('/campground' );}
})

} catch(e) {
    
    console.log(e)
}
}));
router.get('/login', (req,res)=>{
    res.render('users/login')
});
router.post('/login' ,passport.authenticate("local",{failureFlash:true, failureRedirect:"/login" }), (req,res)=>{
    req.flash('success' , 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campground';
    res.redirect(redirectUrl);
 
});
router.get('/logout' , (req,res,next)=>{
    req.logout(req.user , (err)=>{
        if (err) {return next(err);}

    });
    res.redirect('login');

});
module.exports = router;