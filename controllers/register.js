const handleRegister = (req, res, db)=>{
    const {name,store,type}=req.body;
    if(!name||!store||!type){
        return res.status(400).json('unable to get staff');
    }
    else{
        db('staff')
        .insert({
            name:name,
            store:store,
            type:type
        })
        .then(res.send(true))
        .catch(err => res.status(400).json('unable to get staff'))
    }
}

module.exports ={
    handleRegister: handleRegister
}