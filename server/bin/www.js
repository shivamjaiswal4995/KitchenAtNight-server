const server = require('../index.js');
const io = require('socket.io').listen(server);
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
		socket.join(data);
		let  message = "abc";
		socket.emit('userjoinedthechat', data +"has joined socket");
	});

	socket.on('signup', data => {
		console.log("Data recieved in SIGNUP event ", data, socket.id);
		socket.join(data.userEmail);
	});

	socket.on('order', data => {
		const email = data.receipient;
		//what if i have to send more than two admins..
		console.log("Data received on order event", data, socket.id);
		const response = {
			orderId: data.orderId,
			userName: data.userName,
			orderedOn: data.orderedOn,
			payable_amount: data.payable_amount,
			message: data.message //message to be displayed in notification panel
		}
		if(io.sockets.adapter.rooms[email]){
			io.sockets.in(email).emit('notify', response);
		} else {
			//add into notification database and share when user is active again.
		}
	});

	socket.on('offer', data => {
		//const email = data.receipient; I have to send to all the users except admins.
		//i can send to admins also, as i have only two admins.
		//what if i have to send more than two admins..
		console.log("Data received on offer event", data, socket.id);
		const response = {
			offerName: data.offerName,
			message: data.message //in place of order description, i will send some catchy message.
		}
		//i want to send notification to all the users except admin who has sent it
		if(io.sockets.adapter.rooms[email]){
			io.sockets.in(email).emit('notify', response);
		} else {
			//add into notification database and share when user is active again.
		}
	});

	socket.on('referral', data => {
		const email = data.receipient;//to the user whose referral is used.
		console.log('Data received on referral event', email, socket.id);
		const response = {
			message: data.message,
			referralUsedBy : data.referralUsedBy
			//i want to notify the user the name of friend who have used his referral
		}
		
		if(io.sockets.adapter.rooms[email]) {
			// console.log('room exists');
			io.sockets.in(email).emit('notify', response);
		} else {
		//add into notification database and share when user is active again.
			// console.log('room does not exist!');
		}
	});

    socket.on('disconnect', () => {
		console.log(`Deleting socket: ${socket.id}`);
	});
});