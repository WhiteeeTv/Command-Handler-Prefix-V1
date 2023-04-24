module.exports = {
    name: 'ready',
    execute: async (client) => {
        console.log(`Bot connecté en tant que ${client.user.tag}!`);

        let statusIndex = 0;
        const statusList = [
            { activity: { name: 'White>>', type: 'PLAYING' }, status: 'online' },
            { activity: { name: 'Hdse noob', type: 'LISTENING' }, status: 'idle' },
            { activity: { name: 'SelaOuaf   ', type: 'WATCHING' }, status: 'dnd' },
        ];

        const updateStatus = () => {
            const currentStatus = statusList[statusIndex];
            client.user.setPresence(currentStatus);
            statusIndex = (statusIndex + 1) % statusList.length;
        };

        updateStatus();
        setInterval(updateStatus, 10000);

       
    },
};
