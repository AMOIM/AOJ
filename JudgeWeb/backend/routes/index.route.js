import express from 'express';
<<<<<<< HEAD

=======
import problemRoute from './problem.route.js';
>>>>>>> a5ba12f885930c30a8588118539b18a6eff262a1
import contestRoute from './contest.route.js';

const app = express();

<<<<<<< HEAD

=======
app.use('/problem', problemRoute);
>>>>>>> a5ba12f885930c30a8588118539b18a6eff262a1
app.use('/contest', contestRoute);

export default app;