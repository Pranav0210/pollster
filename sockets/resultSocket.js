const socketIO = require('socket.io');
const Vote = require('../models/votesModel');

const resultSocket = (server) => {
    const io = socketIO(server,
        {
          cors: {
            origin: `${process.env.CLIENT_URL}`,
            methods: ['GET', 'POST'],
            allowedHeaders: ['my-custom-header'],
            credentials: true,
          }});
    const resultNamespace = io.of('/result');

    
    resultNamespace.on('connection', (socket) => {
        console.log(`A user connected to the live results.`)
        
        const voteUpdate = Vote.watch();
        voteUpdate.on('change', async (change) => {
            console.log(`a change in DB observed`,change)
            if (change.operationType === 'update') {
                const vote = await Vote.findOne({ _id: change.documentKey._id });
                try{
                    await resultNamespace.emit('result-change', vote.poll_id);
                }catch(err){
                    console.log(`ERR:`, err)
                }
                console.log(`emitted result-change`);
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
        console.error(`Connection error: ${error.message}`);
    })
}

module.exports = resultSocket;