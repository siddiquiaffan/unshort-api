const axios = require("axios");
const validUrl = require("valid-url");
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get("/api/",(req,res)=>{
  const url = req.query.url;
  if(url){
    if (validUrl.isUri(url)) {
      axios.get(url)
        .then((response) => {
          const longUrl = response.request.res.responseUrl;
          const error = {ok : false , err : 'The link is not shortened!!' , by : 'https://github.com/AffanTheBest'}
          const result = {ok : longUrl ? 'true' : 'false' ,short_url : url , extracted_url : longUrl ? longUrl : 'Link is not valid', by : 'https://github.com/AffanTheBest'};
          if(longUrl == url){
            res.end(JSON.stringify(error));
          }else{
            res.end(JSON.stringify(result));
          }
        })
        .catch((err) => {
          if(err){
            const longUrl = err.request._options.href || err.request._currentUrl;
            const error = {ok : false , err : 'The link is not shortened!!' , by : 'https://github.com/AffanTheBest'}
            const result = {ok : longUrl ? 'true' : 'false' ,short_url : url , extracted_url : longUrl ? longUrl : 'Link is not valid', by : 'https://github.com/AffanTheBest'};
            if(longUrl == url){
              res.end(JSON.stringify(error));
            }else{
              res.end(JSON.stringify(result));
            }
          }
        })
    } else {
      const error = {ok : false , err : 'Either the URL you entered is invalid or not a URL.'}
      res.end(JSON.stringify(error));
    }
  }else{
    const error = {ok : false , err : 'URL not found!!' , soln : 'Head to https://github.com/AffanTheBest to know how to use.'};
    res.send(JSON.stringify(error));
  }
});

app.listen(port , () => console.log('Listening to the port ' + port));
