const axios = require("axios");
const validUrl = require("valid-url");
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const unshort = async(url) => {
  const extractUrl = req => req.request.res.responseUrl ? req.request.res.responseUrl : 
  req.request._redirectable._currentUrl ? req.request._redirectable._currentUrl : 
  req.request._currentUrl ? req.request._currentUrl : 
  req.request._options.href ? req.request._options.href : 
  'https://'+req.request.host + req.request.path;

    try{
        const req = await axios.get(url);
        const result = extractUrl(req);
        var longUrl = result ? result : url;
    }catch(err){
        const result = extractUrl(err);
        var longUrl = result ? result : url;
    }
  return {ok: true, shortUrl: url, longUrl, by : 'https://github.com/AffanTheBest'}
}

app.get("/api/",( async(req,res)=>{
  const url = req.query.url;
  if(url && validUrl.isUri(url)){
    const result = await unshort(url);
    res.send(JSON.stringify(result));
  }else{
    const error = {ok : false , err : 'URL not found!!' , soln : 'Head to https://github.com/AffanTheBest to know how to use.'};
    res.send(JSON.stringify(error));
  }
}));

app.listen(port , () => console.log('Listening to the port ' + port));
