/* eslint-disable prettier/prettier */
import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express();

const router = express.Router(); // this how we initaialize router in express.

app.disable('x-powered-by')



app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// this act as an middleware 
// we can execute this middle before the controller 
// eg: app.get('/data',log,(req,res)=>{})
// we can pass array of middlewares [log,test]....
const log = (req, res, next) => {
    console.log(req.body, 'logging');
    next(); // this tell to continue executing next thing
}

// app.use(log); // this saying execute this middleware before every controller

// routing in express with different routes like regx, exact match, glob, paramtrs

app.get('/users/*', (req, res) => {
    res.send({ message: 'route for glob' });
})

app.get('/:id', (req, res) => {
    console.log(req.params);
    res.send({ message: 'route for params' });
})

app.get('/data', log, (req, res) => {
    res.send({
        message: "Hello"
    })
})

app.post('/data', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

// example for routers in express.
// if we are using router we need to register it with root royter which is app

// basically we are saying anything with /api execute router
app.use('/api', router);

// to go to this we use /api/me 
router.get('/me', (req, res) => {
    res.send({ me: 'hello' });
})
// end of router example

// we can also have middleware for router 
// router.use('/route',anyReqResFunc);



// rest routes there are 5 

const routes = ['get /cat', 'get /cat:id', 'post /cat', 'put /cat:id', 'delete cat/:id'];

// express does this in 2 ways , we can use router or app

// 1
router.route('/cat')
    .get()
    .post()

// 2 
router.route('/cat/:id')
    .get()
    .put()
    .delete()


// server 
export const start = () => {
    app.listen(3000, () => {
        console.log('Server is running');
    })
}
