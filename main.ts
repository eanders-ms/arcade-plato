namespace PlayTogether {
    let initialized = false;
    let _isHost = false;
    let _playerId: string;

    export function isHost() {
        return _isHost;
    }

    export function playerId() {
        return _playerId;
    }

    export function _init() {
        if (initialized) return;
        initialized = true;

        const CHANNEL_ID = "arcade-plato-ext";
        const VERSION = "1";

        control.simmessages.onReceived(CHANNEL_ID, (buf: Buffer) => {
            let msg = JSON.parse(buf.toString()) as _Protocol.Message;
            if (!msg || !msg.type) return;
            switch (msg.type) {
                case "host-init": {
                    const mmsg = msg as _Protocol.HostInitMessage;
                    _isHost = mmsg.payload.isHost;
                    _playerId = mmsg.payload.playerId;
                    break;
                }
                case "player-joined": {
                    const mmsg = msg as _Protocol.PlayerJoinedMessage;
                    break;
                }
                case "player-left": {
                    const mmsg = msg as _Protocol.PlayerLeftMessage;
                    break;
                }
            }
        });

        const initMsg: _Protocol.ClientInitMessage = {
            type: "client-init",
            payload: {
                version: VERSION,
            },
        };

        control.simmessages.send(CHANNEL_ID, Buffer.fromUTF8(JSON.stringify(initMsg)), true);
    }
}

PlayTogether._init();
