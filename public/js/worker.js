self.addEventListener('push', async (event) => {

    const { data } = event;

    const pushMessage = data.json();

    event.waitUntil(self.registration.showNotification(pushMessage.title, {
        body: pushMessage.message,
        icon: '/assets/logo-1.png'
    }));
})

addEventListener('notificationclick', () => {
    return self.clients.openWindow('http://localhost:5173/workspace/events');
})