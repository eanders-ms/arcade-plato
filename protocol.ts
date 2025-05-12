namespace PlayTogether {
    export const CHANNEL_ID = "arcade-plato-ext";
    export const VERSION = 1;

    export namespace _Protocol {
        /**
         * Client --> Host
         */
        export namespace CliToHost {
            /**
             * Notify host that the client is a PlayTogether client.
             */
            export interface InitMessage {
                type: "init";
                payload: {
                    version: number;
                };
            }

            /**
             * Notify host that the player pressed a key.
             */
            export interface KeyDownMessage {
                type: "key-down";
                payload: {
                    key: string;
                };
            }

            /**
             * Notify host that the player released a key.
             */
            export interface KeyUpMessage {
                type: "key-up";
                payload: {
                    key: string;
                };
            }

            export type Message = InitMessage | KeyDownMessage | KeyUpMessage;
        }
        /**
         * Host --> Client
         */
        export namespace HostToCli {
            /**
             * Notify client that the host is a PlayTogether host.
             */
            export interface InitMessage {
                type: "init";
                payload: {
                    playerId: string; // ID of the local player
                    isHost: boolean; // true if the local player is the session host
                };
            }

            /**
             * Notify client that a player is joining the game.
             */
            export interface PlayerJoinMessage {
                type: "player-join";
                payload: {
                    playerId: string;
                    playerName: string;
                    //playerIcon: Buffer;
                };
            }

            /**
             * Notify client that a player is leaving the game.
             */
            export interface PlayerLeaveMessage {
                type: "player-leave";
                payload: {
                    playerId: string;
                };
            }

            /**
             * Notify client that a player pressed a key.
             */
            export interface KeyDownMessage {
                type: "key-down";
                payload: {
                    playerId: string;
                    key: string;
                };
            }

            /**
             * Notify client that a player released a key.
             */
            export interface KeyUpMessage {
                type: "key-up";
                payload: {
                    playerId: string;
                    key: string;
                };
            }

            export type Message = InitMessage | PlayerJoinMessage | PlayerLeaveMessage | KeyDownMessage | KeyUpMessage;
        }
    }
}
