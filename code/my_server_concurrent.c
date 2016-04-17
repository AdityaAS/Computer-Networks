#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <string.h>
#include <netinet/in.h>
#include <netdb.h>
#include <netinet/tcp.h>
#include <unistd.h>
#include <arpa/inet.h>

int main(int argc, char* argv[])
{
	int serv_socket, newSocket;

	char buffer[8192];
	struct sockaddr_in servaddr, newaddr;
	socklen_t addr_size;

	//Arguments to socket() in order, 1. Protocol Type, 2.Socket Type 3. Default Protocol
	serv_socket = socket(AF_INET,SOCK_STREAM,0);

	//Configure settings of the Server Socket.
	servaddr.sin_family = AF_INET;
	//AF_INET - IPv4, AF_INET6 - IPv6, AF_UNSPEC - IP version agnostic

	servaddr.sin_port = htons(7890);
	//Server will listen at port no 7890. Use the htons function to convert the number from host byte order to network byte order.
	//----------------------------------------------------------//
	servaddr.sin_addr.s_addr = inet_addr("127.0.0.1"); //inet_addr will convert ip given in . and numbers format into binary ip in network byte order.
	//---------------------------------------------------------//
	//Configure the address of the server. The function inet_addr

	memset(servaddr.sin_zero, '\0', sizeof(servaddr.sin_zero));
	//Set all the padding bits to '\0';

	//Note that struct sockaddr_in and struct sockaddr_in6 can be cast into type, struct sockaddr which bind function needs.
	//Function prototype. bind(socket,struct sockaddr*, sizeof(strict sockaddr) )
	bind(serv_socket, (struct sockaddr*)&servaddr, sizeof(servaddr));

	//-----------------Successfully bound the socket to a ip and port with relevant settings.

	//Since the server is a passive entity, it will listen for connection requests now.

	//the call listen, takes 2 arguments, server socket fd and max size of queue for pending requests
	
	if(listen(serv_socket,5) == 0)printf("Listening\n");
	else printf("Error while listening\n");
	
	while(1){	
		addr_size = sizeof(newaddr);

		//The accept call creates a new socke
		newSocket = accept(serv_socket, (struct sockaddr*)&newaddr, &addr_size);

		memset(buffer, '\0',sizeof(buffer));
		 /*---- Send message to the socket of the incoming connection ----*/
	  	if(fork() == 0){
		  	close(serv_socket);
		  	int i=0;
		  	for(i=0;i<30;i++){
		  		printf("Loop %d\n",i);
		  		strcpy(buffer,"Hello World\0");
		  		send(newSocket,buffer,strlen(buffer)+1,0);
		  		memset(buffer, '\0', 8192);
		  		sleep(1);
		  	}

		  	memset(buffer, '\0', 8192);
		  	recv(newSocket, buffer, 100, 0);
		  	printf("%s\n", buffer);
		  	close(newSocket);
		  	exit(0);
		}
	  close(newSocket);
	}
	close(serv_socket);
  	return 0;


}

	