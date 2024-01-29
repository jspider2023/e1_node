let path=require('node:path')
// let data="C\JSpiders\OneDrive\Desktop\E1_node_grooming\module\customModule.jpg";
 //let data2="https://google.com"
 //console.log(path.basename(data))
 //console.log(path.extname(data))
 //let data3="C:\Users\JSpiders///////\\\\\\\\\OneDrive\Desktop"
 //console.log(path.dirname(data))
 //console.log(path.isAbsolute(data))
 //console.log(path.isAbsolute(data2))
 //console.log(path.normalize(data3))
 //console.log(path.parse(data))
//console.log(path)
//console.log(path.join('/utsav','/jsp'))
//console.log(path.join(__dirname,'/utsav','/jsp/mern'))
console.log(path.join(__dirname,'..','customModule','result.js'))
let y=path.join(__dirname,'..','customModule','result.js')
console.log(path.isAbsolute(y))