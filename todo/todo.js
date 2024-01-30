import http from "http";
import path from "path";
import { URLSearchParams, fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
let dbPath = path.join(__dirname, "db/data.js");
let todoTemp = path.join(__dirname, "todo.html");
//function print
function print(originalData) {
  let str = "";
  originalData.map((item) => {
    str += ` <div class="col-md-3">
                      <div class="card">
                          <div class="card-body">
                              <h6>${item.text}</h6>
                          </div>
                          <div class="footer">
                          <form action="/action" method="POST"> 
                            <input type="hidden" name="action" value="edit" />
                            <input type="hidden" name="id" value="${item.id}"/>
                            <input type="submit" value="edit"/>
                           </form>
                           <form action="/action" method="POST"> 
                            <input type="hidden" name="action" value="delete"/>
                            <input type="hidden" name="id" value="${item.id}"/>
                            <input type="submit" value="delete"/>
                           </form>
                         </div>
                      </div>
                  </div>`;
  });
  fs.readFile(todoTemp, "utf-8", (err, data) => {
    if (err) {
      res.end("somthing wrong");
    } else {
      let newtemp = data.replace("<!-- add dynamic -->", str);
      res.end(newtemp);
    }
  });
}

let server = http.createServer((req, res) => {
  if (req.url == "/" && req.method == "GET") {
    fs.readFile(path.join(__dirname, "todo.html"), "utf-8", (err, datax) => {
      if (err) {
        res.writeHead(500, "Content-Type:application/text");
        res.end("somthing wrong while printing your page");
      } else {
        res.writeHead(200, "Content-Type:application/json");
        fs.readFile(dbPath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(500, "Content-Type:application/text");
            res.end("somthing wrong while printing your page");
          } else {
            let originalData = JSON.parse(data);
            if (originalData.length > 0) {
              print(originalData);
            } else {
              res.end(datax);
            }
          }
        });
      }
    });
  }
  if (req.url == "/" && req.method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      let formData = new URLSearchParams(body);
      let msg = formData.get("text");
      let obj = { id: Math.trunc(Math.random() * 1000), text: msg };
      fs.readFile(dbPath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, "Content-Type:application/text");
          res.end("somthing wrong while printing your page");
        } else {
          let orignalData = JSON.parse(data);
          orignalData = [...orignalData, obj];
          let templateCard = print(orignalData);
          fs.writeFile(dbPath, JSON.stringify(orignalData), (err) => {
            if (err) {
              res.writeHead(500, "Content-Type:application/text");
              res.end("somthing wrong while printing your page");
            } else {
              fs.readFile(todoTemp, "utf-8", (err, data) => {
                if (err) {
                  res.writeHead(500, "Content-Type:application/text");
                  res.end("somthing wrong while printing your page");
                } else {
                  //   let newTemplate = data.replace(
                  //     "<!-- add dynamic -->",
                  //     templateCard
                  //   );
                  let newTemplate = print(orignalData);
                  res.end(newTemplate);
                }
              });
            }
          });
        }
      });
    });
  }
  if (req.url == "/action" && req.method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      let formData = new URLSearchParams(body);
      let id = formData.get("id");
      let action = formData.get("action");
      if (action == "edit") {
        console.log("edit");
        res.end("edit is under the mentinance");
      } else {
        fs.readFile(dbPath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(500, "Content-Type:application/text");
            res.end("somthing wrong while printing your page");
          } else {
            let orignalData = JSON.parse(data);
            orignalData = orignalData.filter((item) => {
              return item.id != id;
            });
            fs.writeFile(dbPath, JSON.stringify(orignalData), (err) => {
              if (err) {
                res.writeHead(500, "Content-Type:application/text");
                res.end("somthing wrong while printing your page");
              } else {
                res.writeHead(302, { Location: "/" });
                console.log("hello");
                let templecard = print(orignalData);
                res.end(templecard);
              }
            });
          }
        });
      }
    });
  }
});
server.listen(8080);
