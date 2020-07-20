const handleMyob = (req, res, db)=>{
    const {id,name,note}=req.body;
    if(!name){
        res.send(false);
        return res.status(400).json('unable to get staff');
    }
    else{
        db('leaves')
        .where('id', '=',id)
        .update({
            myob:true,
            myob_add:name,
            myob_note:note
        })
        .then(res.send(true))
        .catch(err => res.status(400).json('unable to get staff'))
    }
}

module.exports ={
    handleMyob: handleMyob
}

