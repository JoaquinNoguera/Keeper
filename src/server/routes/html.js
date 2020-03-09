const express = require('express');
const path = require('path');

const html= express();

html.get('*',(_,res)=> {
    res.sendFile(path.join(__dirname + '/client/index.html'))
});

module.exports = html;


