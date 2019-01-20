const sqlite3 = require( 'sqlite3' );
var bodyParser = require( 'body-parser' )


let db = new sqlite3.Database( ':memory:', ( err ) => {
  if ( err ) {
    return console.error( err.message );
  }
  console.log( 'Connected to the in-memory SQlite database.' );
} );

db.serialize( function () {
  db.run( "CREATE TABLE request (requestId TEXT , data TEXT)" );
} );

var express = require( 'express' ),
  app = express(),
  port = 3001;

app.listen( port );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.post( "/response", ( req, res, next ) => {
  console.log( req.body );
  let sql = `SELECT * from request where requestId = ?`
  let requestId = req.params.requestId;
  db.get( sql, [requestId], ( err, row ) => {
    if ( err ) {
      return console.error( err.message );
    }
    if ( !row ) {
      db.run( `INSERT INTO request(requestId, data) VALUES(?)`, [requestId, ['{"key":"cmm"}']], function ( err ) {
        res.json( 'ok' );
      } );
    } else {
      db.run( `UPDATE COMPANY SET data = ? WHERE requestId = ?;`, [requestId, ['{"key":"cmm2"}']], function ( err ) {
        res.json( 'ok' );
      } );
    }
  } );
} );

console.log( 'RESTful API server started on: ' + port );
