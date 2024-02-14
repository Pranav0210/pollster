const socketIO = require('socket.io')
const Votes = require('../models/votesModel')
const Comment = require('../models/commentModel')

// A signed in user while on dashboard will be able to connect to this notificaiton socket
const notificationSocket = (server)=>{
    const io = socketIO(server,
        {
          cors: {
            origin: `${process.env.CLIENT_URL}`,
            methods: ['GET', 'POST'],
            allowedHeaders: ['my-custom-header'],
            credentials: true,
          }});
    const notificationNamespace = io.of('/notifs')

    notificationNamespace.on('connection', (socket) => {
        console.log(`A user connected to the notifications.`)
        
        const voteChangeStream = Votes.watch()
        const commentChangeStream = Comment.watch()
    
        voteChangeStream.on('change', (change)=>{
            console.log(`a change in DB observed`,change)
            if (change.operationType === 'update') {
                const vote = Votes.findOne({ _id: change.documentKey._id });
                try{
                    notificationNamespace.emit('vote-notif', vote.poll_id);
                }catch(err){
                    console.log(`ERR:`, err)
                }
                console.log(`emitted vote-notif`);
            }
    
        })
        commentChangeStream.on('change', (change)=>{
            console.log(`a change in DB observed`,change)
            if (change.operationType === 'insert') {
                const comment = Comment.findOne({ _id: change.documentKey._id });
                try{
                    notificationNamespace.emit('comment-notif', comment.poll_id);
                }catch(err){
                    console.log(`ERR:`, err)
                }
                console.log(`emitted comment-notif`);
            }
            
        })

        socket.on('disconnect', ()=>{
            console.log(`user disconnected`);
        })
    })
    notificationNamespace.on('error',(error) => {
        console.error(`Socket error: ${error.message}`);
      })
    notificationNamespace.on('connection_error', (error) => {
        console.error(`Connection error: ${error.message}`);
    })

}

module.exports = notificationSocket;