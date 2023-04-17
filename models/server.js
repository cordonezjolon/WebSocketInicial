const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');



class Server{

        constructor(){
            this.app   = express();
            this.port = process.env.PORT;

            this.server = require('http').createServer(this.app);
            this.io = require('socket.io')(this.server);


            this.paths = {};
            
            //Middlewaresl+
            this.middlewares();

            //Rutas del sitio
            this.routes();

            //Sockets
            this.sockets();


        }
        routes(){
            //this.app.use(this.paths.auth,require('../routes/auth'))
        }
        sockets(){
            this.io.on('connection', socketController);
        }

        listen(){
            this.server.listen(this.port, ()=>{
                console.log(`Aplicacion iniciada en el puerto ${this.port}`)
            });
        }
        middlewares(){
            this.app.use(cors());
            this.app.use(express.static('public'));
        }

}
module.exports = Server;