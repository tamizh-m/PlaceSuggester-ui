//Install express server
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const allowedOrigins = ['https://place-suggester.herokuapp.com'];
app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true) 
      } else {
        callback(new Error(`Origin: ${origin} is now allowed`))
      }
    }
  }));
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/road-trip-planner'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/road-trip-planner/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
