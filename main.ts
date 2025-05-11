//% blockNamespace="Play Together" icon="\uf11b"
namespace PlayTogether {

    const CHANNEL_ID = "arcade-plato-ext";
    const VERSION = 1;

    export class System {
        private static _isHost = false;
        private static _playerId: string;
        private static _defaultZone = "lobby";
        private static _initialized = false;
        private static _ready = false;
        private static _readyCb: () => void;

        //% block="i'm the host"
        //% blockId=playtogether_system_ishost
        //% group="System"
        static isHost() {
            return this._isHost;
        }

        //% block="my player id"
        //% blockId=playtogether_system_playerid
        //% group="System"
        static playerId() {
            return this._playerId;
        }

        //% block="default zone"
        //% blockId=playtogether_system_defaultzone
        //% group="System"
        static defaultZone() {
            return this._defaultZone;
        }
        //% block="set default zone"
        //% blockId=playtogether_system_setdefaultzone
        //% group="System"
        static setDefaultZone(zone: string) {
            this._defaultZone = zone;
        }

        //% block="on system ready"
        //% blockId=playtogether_system_onready
        //% group="System"
        static onReady(cb: () => void) {
            if (this._ready) {
                cb && cb();
            } else {
                this._readyCb = cb;
            }
        }

        static _markReady() {
            if (this._ready) return;
            if (!this._playerId) return;
            this._ready = true;
            this._readyCb && this._readyCb();
        }

        static _init() {
            if (this._initialized) return;
            this._initialized = true;

            control.simmessages.onReceived(CHANNEL_ID, (buf: Buffer) => {
                const msg = JSON.parse(buf.toString()) as _Protocol.Message;
                if (!msg || !msg.type) return;
                switch (msg.type) {
                    case "host-init": {
                        const mmsg = msg as _Protocol.HostInitMessage;
                        this._isHost = mmsg.payload.isHost;
                        this._playerId = mmsg.payload.playerId;
                        this._markReady();
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
    System._init();
}
