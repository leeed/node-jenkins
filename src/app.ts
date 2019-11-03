import * as express from "express";
import * as bodyParser from "body-parser";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        //support for applicattion/json post-data
        this.app.use(bodyParser.json());
        //support for applicattion/x-www-from-urlencoded post-data
        this.app.use(bodyParser.urlencoded({ extended: true}));
    }

    private routes(): void 
    {
        this.app.route('/')
        .get((req: express.Request, res: express.Response) => {            
            res.status(200).send('Home! app')
        })

        this.app.get('/greet/:name', (req: express.Request, res: express.Response) => {            
            res.send(this.greet(req.params.name));
        });

        this.app.route('/products').get((req: express.Request, res: express.Response) => {
            let products = [
                {id: 1, description: 'bicycle', price: 200, stock: 10},
                {id: 1, description: 'motorcycle', price: 800, stock: 5},
            ];
            res.status(200).send(products);
        });
    }

    public greet(name: string) {
        return 'Hello ' + name + '!';
    }
}

export default new App();