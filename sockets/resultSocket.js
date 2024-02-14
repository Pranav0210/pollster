const socketIO = require('socket.io');
const Vote = require('../models/votesModel');

const resultSocket = (server) => {
    const io = socketIO(server,
        {
          cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            allowedHeaders: ['my-custom-header'],
            credentials: true,
          }});
    const resultNamespace = io.of('/result');
    // console.log(resultNamespace)

    
    resultNamespace.on('connection', (socket) => {
        console.log(`A user connected to the live results.`)
        
        const voteUpdate = Vote.watch();
        voteUpdate.on('change', async (change) => {
            console.log(`a change in DB observed`,change)
            if (change.operationType === 'update') {
                const vote = await Vote.findOne({ _id: change.documentKey._id });
                resultNamespace.emit('voteUpdate', vote.poll_id);
            }
        });

        socket.on('disconnect', ()=>{
            console.log(`user disconnected`);
        })
    })

    resultNamespace.on('error',(error) => {
        console.error(`Socket error: ${error.message}`);
      })
    resultNamespace.on('connection_error', (error) => {
        console.error(`Engine error: ${error.message}`);
    })
}

module.exports = resultSocket;