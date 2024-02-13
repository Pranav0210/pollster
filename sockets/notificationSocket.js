import socketIO from 'socket.io'
import Votes from '../models/votesModel'
import Comment from '../models/commentModel'

// A signed in user while on dashboard will be able to connect to this notificaiton socket
const notificationSocket = (server)=>{
    const io = socketIO(server)
    const notificationNamespace = io.of('/notifs')

    const voteChangeStream = Votes.watch()
    const commentChangeStream = Comment.watch()

    voteChangeStream.on('change', (change)=>{

    })
    commentChangeStream.on('change', (change)=>{
        
    })

}