let os=require('os')
//console.log('hello os',os)
console.log(os.freemem()/1024/1024)
console.log(os.userInfo().username)
console.log(os.platform())
let x=os.platform()
if(x=="win32")
{
    console.log('valid user')
}
else{
    console.log('you  are invalid')
}
console.log((os.uptime()/1000)/60)
if((os.uptime()/1000)/60<15)
{
   
}