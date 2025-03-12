// server.js

// Importing express module
// const express = require('express')
import express from 'express'

// Importing NodeCache and creating a 
// new object called myCache
// const NodeCache = require('node-cache')
import NodeCache from 'node-cache'
const myCache = new NodeCache()

// Creating an express object
const app = express()

// Starting server using listen
// function on port 8000
app.listen(8000, err => {
    if (err)
        console.log("Error while starting server")
    else
        console.log(
            "Server has been started at port 8000")
})

app.get('/', (req, res) => {
    res.send('Home page !')
})

// Function to demonstrate heavy computation
// like API requests, database queries, etc.
function heavyComputation() {
    let temp = 0;
    for (let i = 0; i < 100000; i++)
        temp = (Math.random() * 5342) % i;
    return 123;
}

app.get('/api', (req, res) => {

    // If cache has key, retrieve value
    // from cache itself

    const obj = { my: "Special", variable: 42 };
    const success = myCache.set("uniqueKey", obj, 10000);

    if (myCache.has('uniqueKey')) {
        console.log('Retrieved value from cache !!')
        console.log("result: ",success);
        // Serve response from cache using
        // myCache.get(key)
        res.send("Result: " + JSON.stringify(myCache.get('uniqueKey')))
    } else {

        // Perform operation, since cache 
        // doesn't have key
        let result = heavyComputation()

        // Set value for same key, in order to 
        // serve future requests efficiently
        myCache.set('uniqueKey', result)

        console.log('Value not present in cache,'
            + ' performing computation')
        res.send("Result: " + result)
    }
})




// const NodeCache = require( "node-cache" );
// const myCache = new NodeCache();

// obj = { my: "Special", variable: 42 };

// success = myCache.set( "myKey", obj, 10000 );

// value = myCache.get( "myKey" );

// console.log("value: ",value);