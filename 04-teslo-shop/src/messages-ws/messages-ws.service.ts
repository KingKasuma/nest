import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from '../auth/entities/User.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface ConnectedClients {
    [id: string]: {
        socket: Socket,
        user: User
    }
}

@Injectable()
export class MessagesWsService {

    private connectClients: ConnectedClients = {}

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async registerClient( client: Socket, userId: string ) {

        const user = await this.userRepository.findOneBy({ id: userId });
        if( !user ) throw new Error('User not found');
        if( !user.isActive ) throw new Error('User not active');

        this.checkUserConnection(user);

        this.connectClients[client.id] = {
            socket: client,
            user: user,
        };
    }

    removeClient( clientId: string) {
        delete this.connectClients[clientId];
    }

    getConnectedClients(): string[] {
        return Object.keys(this.connectClients);
    }

    getUserFullName( socketId: string ){
        return this.connectClients[socketId].user.fullName;
    }

    private checkUserConnection(user: User) {

        for (const clientId of Object.keys( this.connectClients )) {
            const connectClient = this.connectClients[clientId];

            if( connectClient.user.id === user.id) {
                connectClient.socket.disconnect();
                break;
            }
        }
    }
}
