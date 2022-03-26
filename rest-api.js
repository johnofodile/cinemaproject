
const passwordEncryptor=require("./passwordEncryptor");
const userTable="users";
const passwordField="password";
let db;

module.exports=function setupRESTapi(app, databaseConnection){
  db=databaseConnection;
  let tablesAndViews = db.prepare(`
  SELECT name, type 
  FROM sqlite_schema
  WHERE 
    (type = 'table' OR type = 'view') 
    AND name NOT LIKE 'sqlite_%'
`).all();

    app.get('/api/tablesAndViews',(req,res)=>{
        res.json();

    });
    for (let { name, type } of tablesAndViews) {

        app.get('/api/' + name, (req, res) => {
          let stmt = db.prepare(`
            SELECT *
            FROM ${name}
          `);
          let result = stmt.all();
          res.json(result);
        });
        
       
        

        app.get('/api/' + name + '/:id', (req, res) => {
            let stmt = db.prepare(`
            SELECT *
            FROM ${name}
            WHERE id = :id
          `);
            let result = stmt.all(req.params)[0] || null;
            if (result === null) { res.status(404); }
            res.json(result);
          });
          app.get('/api/trial/' + name + '/:price', (req, res) => {
            let stmt = db.prepare(`
            SELECT *
            FROM ${name}
            WHERE price = :price
          `);
            let result = stmt.all();
            res.json(result);
          });
          app.get('/api/movies/' + name + '/:title', (req, res) => {
            let stmt = db.prepare(`
            SELECT *
            FROM ${name}
            WHERE title = :title
          `);
            let result = stmt.all(req.params)[0] || null;
            if (result === null) { 
              res.status(404);
             }
            res.json(result);
          });
         
      
          if (type === 'view') {
            continue;
          }
      
          
          app.post('/api/' + name, (req, res) => {
            delete req.body.id;
            if(name==userTable){
              req.body[passwordField] = passwordEncryptor(req.body[passwordField]);
            }
            let stmt = db.prepare(`
              INSERT INTO ${name} (${Object.keys(req.body)})
              VALUES (${Object.keys(req.body).map(x => ':' + x)})
            `);
            
            res.json(stmt.run(req.body));
          });
      
          let putAndPatch = (req, res) => {
            if(name==userTable && req.body[passwordField]){
              req.body[passwordField]== passwordEncryptor(req.body[passwordField]);
            }
            let stmt = db.prepare(`
              UPDATE ${name}
              SET ${Object.keys(req.body).map(x => x + ' = :' + x)}
              WHERE id = :id
            `);
      
           
            res.json(stmt.run({ ...req.body, ...req.params }));
          };
      
          
          app.put('/api/' + name + '/:id', putAndPatch);
          app.patch('/api/' + name + '/:id', putAndPatch);
      
          app.delete('/api/' + name + '/:id', (req, res) => {
           
            let stmt = db.prepare(`
              DELETE FROM ${name}
              WHERE id = :id
            `);
            res.json(stmt.run(req.params));
          });
          
      
        }
      
      }
