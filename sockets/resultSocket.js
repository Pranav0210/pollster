import socketIO from 'socket.io';
import Votes from '../models/votesModel';

const resultSocket = (server) => {
    const io = socketIO(server);
    const resultNamespace = io.of('/result');

    
    resultNamespace.on('connection', (socket) => {
        console.log(`A user connected to the live results.`)
        
        const voteUpdate = Votes.watch();
        voteUpdate.on('change', async (change) => {
            if (change.operationType === 'update') {
                const vote = await Votes.findOne({ _id: change.documentKey._id });
                resultNamespace.emit('voteUpdate', vote);
            }
        });

        socket.on('', ()=>{
            console.log(``);
        })
    })
}

module.exports = resultSocket;