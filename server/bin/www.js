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
	
	//now every user has its own room through signin and signup event and a particular
	//room dedicated to just user and admin through user and admin event
	//respectively.
	socket.on('signin', data => {
		//data is userId which will be sentt from client side.
		console.log("Data recieved in SIGNIN event ", data, socket.id);
		socket.join(data);
		let  message = "abc";
		socket.emit('userjoinedthechat', "checking notification api");
	});

	socket.on('signup', data => {
		//data i userId which wlll be sent from client-side.
		console.log("Data recieved in SIGNUP event ", data, socket.id);
		socket.join(data);
		socket.emit('userjoinedthechat', "checking notification api");
	});

	socket.on('admin', data => {
		console.log("Data received in admin event", data, socket.id);
		socket.join(data);
	});

	socket.on('user', data => {
		console.log("Data received in user event", data, socket.id);
		socket.join(data);
	})

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
			io.sockets.in(email).emit('notifyOrder', response);
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
			io.sockets.in(email).emit('notifyOffer', response);
		} else {
			//add into notification database and share when user is active again.
		}
	});

	socket.on('referral', data => {
		const userIdReferralOf = data.referralOf;//to the user whose referral is used.
		console.log('Data received on referral event', email, socket.id);
		const response = {
			referralUsedBy : data.referralUsedBy,
			referralCode : data.referralCode,
			message : `Your friend $referralUsedBy has used your referral code $referralCode. You have 
			earned a new referral coupon BITEATNIGHT30. Keep sharing.`
			//i want to notify the user the name of friend who have used his referral
		}
		
		if(io.sockets.adapter.rooms[userIdReferralOf]) {
			// console.log('room exists');
			io.sockets.in(userIdReferralOf).emit('notifyReferral', response);
		} else {
		//add into notification database and share when user is active again.
			// console.log('room does not exist!');
		}
	}); 

    socket.on('disconnect', () => {
		console.log(`Deleting socket: ${socket.id}`);
	});
});