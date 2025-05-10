namespace PlayTogether {
    export namespace _Protocol {
        export const CHANNEL_ID = "arcade-plato-ext";
        export const VERSION = "1";

        export interface Message {
            type: string;
        }

        /**
         * Client --> Host
         * Notify host that the client is a PlayTogether client.
         */
        export interface ClientInitMessage extends Message {
            type: "client-init";
            payload: {
                version: string;
            };
        }

        /**
         * Host --> Client
         * Communicate game config and other information to the client.
         */
        export interface HostInitMessage extends Message {
            type: "host-init";
            payload: {
                playerId: string; // ID of the local player
                isHost: boolean; // true if the local player is the session host
            };
        }

        /**
         * Host --> Client
         * Notify client that a player is joining the game.
         */
        export interface PlayerJoinedMessage extends Message {
            type: "player-joined";
            payload: {
                playerId: string;
                playerName: string;
                //playerIcon: Buffer;
            };
        }

        /**
         * Host --> Client
         * Notify client that a player is leaving the game.
         */
        export interface PlayerLeftMessage extends Message {
            type: "player-left";
            payload: {
                playerId: string;
            };
        }
    }
}
