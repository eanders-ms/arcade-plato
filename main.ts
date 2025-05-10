namespace PlayTogether {
    let _initialized = false;
    let _isHost = false;
    let _playerId: string;
    let _ready = false;
    let _readyCb: () => void;

    export function isHost() {
        return _isHost;
    }

    export function playerId() {
        return _playerId;
    }

    export function onReady(cb: () => void) {
        if (!_ready) {
            _readyCb = cb;
        } else if (!_readyCb) {
            _readyCb = cb;
            cb && cb();
        }
    }

    export function _checkReady() {
        if (_ready) return;
        if (!_playerId) return;
        _ready = true;
        _readyCb && _readyCb();
    }

    export function _init() {
        if (_initialized) return;
        _initialized = true;

        const CHANNEL_ID = "arcade-plato-ext";
        const VERSION = 1;

        control.simmessages.onReceived(CHANNEL_ID, (buf: Buffer) => {
            let msg = JSON.parse(buf.toString()) as _Protocol.Message;
            if (!msg || !msg.type) return;
            switch (msg.type) {
                case "host-init": {
                    const mmsg = msg as _Protocol.HostInitMessage;
                    _isHost = mmsg.payload.isHost;
                    _playerId = mmsg.payload.playerId;
                    _checkReady();
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
