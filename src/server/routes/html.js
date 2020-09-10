import express from 'express';
import path from 'path';

const html= express();

html.get('*',(_,res)=> {
    res.sendFile(path.join(__dirname + '/views/index.html'))
});

export default html;


