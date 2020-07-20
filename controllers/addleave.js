const handleLeave = (req, res, db)=>{
    const {name,start,finish,type,note}=req.body;
    if(!name||!start||!finish||!type){
        return res.status(400).json('unable to get staff');
    }
    else{
        db('leaves')
        .insert({
            name:name,
            start:start,
            finish:finish,
            type:type,
            note:note,
            myob:false,
            myob_add:'',
            myob_note:'',
            starttext:start,
            finishtext:finish
        })
        .then(res.send(true))
        .catch(err => res.status(400).json('unable to get staff'))
    }
    
}

module.exports ={
    handleLeave: handleLeave
}

