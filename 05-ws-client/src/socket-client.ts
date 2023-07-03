import { Manager, Socket } from 'socket.io-client';

export const connectToServer = ( token: string ) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'mundo',
            authentication: token
        }
    });

    const socket = manager.socket('/');
    
    addListeneres( socket );
}

const addListeneres = ( socket: Socket ) => {

    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'connected';
    })

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'disconnected';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach( clientId => {
            clientsHtml += `
                <li>${ clientId }</li>
            `
        });
        clientsUl.innerHTML = clientsHtml;
    })

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if( messageInput.value.trim().length <= 0 ) return;

        socket.emit('message-from-client', { 
            id: 'Yo', 
            message: messageInput.value 
        });
        
        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        const nesMessage = `
            <li>
                <strong>${ payload.fullName }</strong>
                <strong>${ payload.message }</strong>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = nesMessage;
        messageUl.append( li );
    })
    
}