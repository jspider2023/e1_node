let fs=require('fs')
let path=require('path')
let http=require('http')
let server=http.createServer()
server.on('request',(req,res)=>{
    let rstream= fs.createReadStream(path.join(__dirname,'utsav.txt'))
    let body=""
    console.log('77777777777777777777777777777777777777777777777')
   rstream.on('data',(chunk)=>{
     body+=chunk
   })
  
   rstream.on('end',()=>{
    console.log(body)
    res.end()
   })
   console.log('=========================================')
})
server.listen(8080)
