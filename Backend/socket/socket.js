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


	const users = socket.handshake.query.userId;
    const userId = jwt.verify(users, process.env.JWT).user.id;
    if(userId != "undefined") user_onl[userId] = socket.id;

	socket.on('send_message', async ({token, message_content, conversationId}) => {

		const users = jwt.verify(token, process.env.JWT);
		const userId = users.user.id;

		//Lưu tin nhắn vào DB
		const message = await Messenger.create({ConversationId : conversationId, UserId : userId, messageContent : message_content});
		

		//Lấy tất cả user trong conversation
		let list_id = await Conversation.findOne({
			where : {
				id : conversationId
			},
			attributes : ["conversation_list"]
		})

		list_id = JSON.parse(conversation_list.conversation_list);
		
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
					fullname : users.fullname,
					image : users.image
				});
			}
		});

	});


	socket.on('disconnect', () => {
		for (let [userId, socketId] of user_onl) {
			if (socketId === socket.id) {
				user_onl.delete(userId);
				break;
			}
		}
  	});


});

module.exports = { app, server, io };