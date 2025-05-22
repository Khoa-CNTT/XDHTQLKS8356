const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const jwt = require('jsonwebtoken');
const { Messenger } = require("../model/messenger");
const { Conversation } = require("../model/conversation");
const { User } = require("../model/user");
const { sequelize } = require("../config/mysql");
const {Sequelize, Op} = require("sequelize");


const app = express();

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*'
	},
});

const user_onl = new Map();

io.on('connection', (socket) => {
	console.log('User connected:', socket.id);
	

	//Login lưu socket id và user_idid
	// socket.on('login', (token) => {
	// 	const users = jwt.verify(token, process.env.JWT);
	// 	const id = users.user.id;
	// 	user_onl.set(id, socket.id);
	// })


	const users = socket.handshake.query.userId;
    const userId = jwt.verify(users, process.env.JWT).user.id;
    if(userId != "undefined") user_onl.set(userId, socket.id);

	socket.on('send_message', async ({token, message_content, image, conversationId}) => {

		const users = jwt.verify(token, process.env.JWT);
		const userId = users.user.id;
		console.log("cons", conversationId, userId)
		//Lưu tin nhắn vào DB
		const message = await Messenger.create({ConversationId: conversationId, UserId: userId,messageContent: message_content, image});
		

		//Lấy tất cả user trong conversation
		const conversation_list = await Conversation.findOne({
			where : {
				id : conversationId
			},
			attributes : ["conversation_list"]
		})
		const list_id = JSON.parse(conversation_list.conversation_list)
		console.log("list_id", typeof list_id, JSON.parse(conversation_list.conversation_list));


		//Phát tin nhắn đến tất cả user online trong conversation
		list_id.forEach((uid) => {
			const socketId = user_onl.get(uid);
			console.log()
			if (socketId) {
				console.log(true,socketId)
				io.to(socketId).emit('receive_message', {
					conversationId,
					user_id:userId,
					message_content,
					message_time: message.messageTime,
					//thêm trường image
				});
			}
		});
	});


	socket.on('disconnect', () => {
		for (let [userId, socketId] of user_onl) {
			if (socketId === socket.id) {
				console.log("disconnect ", socket.id)
				user_onl.delete(userId);
				break;
			}
		}
  	});


});

module.exports = { app, server, io };