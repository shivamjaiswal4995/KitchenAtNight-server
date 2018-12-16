const server = require('../index.js');
const io = require('socket.io')(server);
// the port has to come from config file (or) as a env variable
const port = (process.env.PORT || 3000);

server.listen(port, () => {
	console.log(` server is listening on ${port} `);
})
io.on('connection', socket => {
	// sockets.add(socket);
	// console.log("Socket: ", socket);
	console.log(`Socket ${socket.id} added`);
	
	socket.on('signin', data => {
		console.log("Data recieved in SIGNIN event ", data, socket.id);
		socket.join(data.userEmail); 
	});

	socket.on('signup', data => {
		console.log("Data recieved in SIGNUP event ", data, socket.id);
		socket.join(data.userEmail);
	});

	socket.on('share', data => {
		const email = data.receipient.split(',')[1].trim();
		console.log('Data received on SHARE event', email, socket.id);
		const response = {
			title: data.title,
			from: data.sender
		}
		
		if(io.sockets.adapter.rooms[email]) {
			// console.log('room exists');
			io.sockets.in(email).emit('notify', response);
		} else {
			let obj = {
				content: `Note titled "${data.title}" has been shared to you by user ${data.sender}`
			}
			notificationController.addNotification(data.idOfSharedUser, obj, (err, savedNotification) => {
				if(err) {
					logger.error('error occurred while saving notification: ', err);
				} else {
					console.log('Notification saved: ', savedNotification);
				}
			});
			// console.log('room does not exist!');
		}
	});

    socket.on('disconnect', () => {
		console.log(`Deleting socket: ${socket.id}`);
	});
});