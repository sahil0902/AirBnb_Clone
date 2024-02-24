module.exports  = (fn) => {
    return (req, res, next) => {
     fn(req,res,next).catch(err=>res.send(err));
   
    }
};

// module.exports=function(fn){return function(a,b,c){console