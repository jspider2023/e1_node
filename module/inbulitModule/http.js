let http=require('node:http')
let path=require('path')
let fs=require('fs')
const { json } = require('react-router-dom')
let server= http.createServer((req,res)=>{
    let AboutPath=path.join(__dirname,'Home.html')
   
     if(req.url=='/')
     {
         fs.readFile(AboutPath,'utf-8',(err,data)=>{
            if(err)
            {
                res.writeHead(500,"Content-type:application/text")
                res.end('somthing wrong while creating template')
            }
            else{
                res.writeHead(200,"Content-type:application/text")
            
                let str=''
                arr.map((item)=>{
                    return str += `<h1>${item}</h1>`
                })
                let newData=data.replace('    <!-- add your name -->',str)
                res.end(newData)
            }
           
        })
       
     }
     if(req.url=="/home.css")
     {
           console.log('hii i am css hitting')
         fs.readFile(path.join(__dirname,'home.css'),'utf-8',(err,data)=>{
            res.end(data)
         })   
     }
     if(req.url=="/about")
     {
        res.writeHead(200,"Content-type:application/text")
        res.end('hello i am about')
     }
     if(req.url=='/todo' && req.method=="POST")
     {
        let body = '';

        req.on('data', (chunk) => {
          body += chunk;
        });
    
        req.on('end', () => {
            let dbpath=path.join(__dirname,'db/db.js')
          console.log(JSON.parse(body));
          res.writeHead(200, { 'Content-Type': 'text/plain' });
      
           fs.readFile(dbpath,'utf-8',(err,data)=>{
             if(err)
             {
               res.end('somthing wrong')
             }
             else{
                 let newData=JSON.parse(data)
                 let result=JSON.parse(body)
                 newData.push(result)
                 fs.writeFile(dbpath,JSON.stringify(newData),(err)=>{
                    console.log('somthing wrong1')
                    if(err)
                    {
                     res.end('somthing wrong')
                    }
                    else{
                        console.log('dev test')
                        res.end('done')
                    }
                 })
             
             }
           })
        });
    
     }
    
})

 server.listen('8080',()=>{
    console.log('success')
})