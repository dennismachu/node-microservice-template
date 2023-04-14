import express, { 
    Application,
    urlencoded,
    json,
  } from 'express';
import 'dotenv/config'
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import AppLogger from './core/eventLogger';


let logger = new AppLogger();
const app: Application = express();

let scope = "app.ts"
process.on("uncaughtException", (e) => {
    logger.logError(scope, e.toString());
  });


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.raw())
app.use(express.text())
app.use(cors())
app.use(mongoSanitize()) //Use for security to prevent NoSql injections
app.use(helmet()) //Adds extra headers to protect the routes
app.use(hpp()) //To prevent HTTP Parameter Pollution.
app.use(urlencoded({ limit: '10mb', extended: false, parameterLimit: 10000 }));

app.use(json({ limit: '10mb' }));
/**
 * Initiate the Routes
 * All Routes to begin with /api/v1/{the routes}
 */
const router = express.Router()
app.use('/api/v1', router);


// Default Route
router.get('/', (req, res, next) => {
   res.status(200).json({
       success: true,
       message: 'Welcome to Micro Service - API',
       author: 'Awtsyde Ltd',
       website: 'www.awtsyde.com',
   })
})
/**
* The Routes
*/
// Error Route
app.get('/', (req, res, next) => {
   res.status(200).json({
       success: true,
       message: 'Oops you have missed your way',
       author: 'Awtsyde Ltd',
       website: 'www.awtsyde.com',
   })
})

export default app;