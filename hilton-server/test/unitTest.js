var express = require('express'); // (npm install --save express)
const axios = require('axios').default;
var expect = require('chai').expect;

describe('Our application', async function() {

it('when visiting none-valid url, it shoudl return 404 ', async function() {
    try{
        let data = await axios.get("http://localhost:3000");
    }catch(e){
        expect(e.code).to.be.equal('ERR_BAD_REQUEST');
    }
});

it('when visit /reservations with GET, it should return reseration data', async function() {

    let data = await axios.get("http://localhost:3000/reservations");
    console.log(data);
    expect(data.status).to.be.equal(200);

});

it('when visit /reservations with post, it should return code 200', async function() {

    let data = await axios.post("http://localhost:3000/reservation",{
        guest_name: "test guest",
        arrival_time : "12:40AM",
        guest_contact: "1234567",
        table_size: 2,
        status: "open"     
    });
    console.log(data);
    expect(data.status).to.be.equal(200);

});

});