const auth = (req, res, next) => {
const {user_name} = req.query
if(user_name){
    req.user = {name: user_name, id: ''}
    next()
}else{
    res.status(401).send('unauthorized')
}
}

module.exports = auth