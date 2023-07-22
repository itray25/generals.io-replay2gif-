const http = require("http");
const express= require("express");
const child = require('child_process')
const cors = require('cors');
const fs = require("fs");
const path = require("path");
const request = require("request");
var app=express();
app.use(cors({
    origin: 'https://www.cospi.tk'
    })); 
var server = http.createServer(app);
server.listen(1145,()=>{
    console.log("服务器启动成功");
});
   
var url3,id,fileName3
var dir3="./replays"
function download() {
    console.log("starting download...");
    return new Promise((resolve) => {
        let stream = fs.createWriteStream(path.join(dir3, fileName3));
        request(url3).pipe(stream).on("close", function (err) {
            console.log("文件" + fileName3 + "下载完毕");
            resolve("p1");
        });
        console.log("download is done");

    });
  }
  
function generate() {
    console.log("starting generation...");
    return new Promise((resolve) => {
        child.exec(".\\replays\\gifmaker.exe .\\replays\\"+id+".gior", (err, stdout, stderr) => {
            console.log(err, stdout, stderr)
            resolve("p2");
         })
        console.log("generation is done");

    });
  }

app.get("/gen_replay",(req,res)=>{
    async function sequentialStart() {
        console.log("Process started");
        await download();
        await generate();
        res.json({result:"https://cospi.tk/generals_file/replays/"+id+".gif"})
      }
    id=req.query.id
    url3="https://generalsio-replays-na.s3.amazonaws.com/"+id+".gior";
    fileName3=id+".gior"
    sequentialStart()
    
});