import express from 'express'; 
import Lab5 from "./Lab5/index.js";


import Hello from "./Hello.js" // import Hello from Hello.js


const app = express()
Hello(app)  // pass app reference to Hello
Lab5(app)            


app.listen(4000)
