// Gerar ID único para o cliente Web (evita quedas por conflito)
const idCliente = 'WEB_' + Math.random().toString(16).substring(2, 8);

// Cliente MQTT Paho com WebSocket SSL
const web = new Paho.MQTT.Client(
    'broker.hivemq.com',
    8884,
    idCliente
);

web.onConnectionLost = function (responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log('Conexão perdida: ' + responseObject.errorMessage);
    }
};

web.connect({
    useSSL: true,
    timeout: 3,
    onSuccess: function () {
        console.log('Conectado ao MQTT com sucesso! ID: ' + idCliente);
    },
    onFailure: function (e) {
        console.log('Falha na conexão: ' + e.errorMessage);
    }
});

// Função auxiliar para enviar mensagens
function enviarComando(topico) {
    if (web.isConnected()) {
        const msg = new Paho.MQTT.Message('');
        msg.destinationName = topico;
        web.send(msg);
        console.log('Comando enviado para: ' + topico);
    } else {
        alert('Conexão MQTT ainda não está ativa. Aguarde alguns segundos.');
    }
}

// Funções acionadas pelos botões da tela
function ligarVermelho() {
    enviarComando('senai510/gfl/ligar/vermelho');
}

function desligarVermelho() {
    enviarComando('senai510/gfl/desligar/vermelho');
}

function ligarVerde() {
    enviarComando('senai510/gfl/ligar/verde');
}

function desligarVerde() {
    enviarComando('senai510/gfl/desligar/verde');
}