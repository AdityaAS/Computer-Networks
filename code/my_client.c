#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <string.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <netinet/tcp.h>
#include <unistd.h>

int main(int argc, char* argv[])
{
	int cli_socket, new_socket;

	char buffer[8192];
	struct sockaddr_in servaddr, newaddr;
	socklen_t addr_size;

	cli_socket = socket(AF_INET, SOCK_STREAM, 0);


	//Configure settings of the Server Socket.
	servaddr.sin_family = AF_INET;
	//AF_INET - IPv4, AF_INET6 - IPv6, AF_UNSPEC - IP version agnostic

	servaddr.sin_port = htons(7890);
	//Server will listen at port no 7890. Use the htons function to convert the number from host byte order to network byte order.

	servaddr.sin_addr.s_addr = inet_addr("127.0.0.1"); //inet_addr will convert ip given in . and numbers format into binary ip in network byte order.
	//Configure the address of the server. The function inet_addr

	memset(servaddr.sin_zero, '\0', sizeof(servaddr.sin_zero));
	//Set all the padding bits to '\0';	


	addr_size = sizeof(servaddr);
	if(connect(cli_socket, (struct sockaddr*)&servaddr,addr_size) == 0)
		printf("Connected\n");
	else
	{
		printf("Error while connecting\n");
	}
	memset(buffer, '\0',sizeof(buffer));
	 /*---- Read the message from the server into the buffer ----*/
  	int i;
  	for(i=0;i<30;i++){
  		printf("Loop %d\n",i);
  		recv(cli_socket, buffer, 1024, 0);

  		printf("Data received: %s %d\n",buffer,i);   
  		memset(buffer, '\0', 8192);
  	}

  	strcpy(buffer, "Connection about to be terminated\n");;
  	send(cli_socket, buffer, 100, 0);

  	printf("Sent Termination Request data\n");

  	close(cli_socket);
  	return 0;
}

