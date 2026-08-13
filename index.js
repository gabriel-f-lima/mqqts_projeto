let web = null;
let id = 'ESP32DAFOF';

web = new Paho.MQTT.Client(
    'broker.hivemq.com',
    8884,
    id
);

web.connect({
    useSSL: true,
    timeout: 3000,
    onSuccess: function () {
        console.log('Conectado com sucesso!');
        web.subscribe('leds');
    },
    onFailure: function (e) {
        console.log('Falha na conexão: ' + e.errorMessage);
    }
});


function acaoVermelho() {
    const msg = new Paho.MQTT.Message('')
    msg.destinationName = 'senai510/gfl/ligar/vermleho';
    web.send(msg);
}

function acaoVerde() {
    const msg = new Paho.MQTT.Message('')
    msg.destinationName = 'senai510/gfl/ligar/verde';
    web.send(msg);
}