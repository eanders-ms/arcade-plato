namespace PlayTogether {
    export class Player {
        private _id: string;
        private _name: string;
        private _zone: string;

        constructor(id: string, name: string, zone: string) {
            this._id = id;
            this._name = name;
            this._zone = zone;
        }

        get id() {
            return this._id;
        }

        get name() {
            return this._name;
        }

        get zone() {
            return this._zone;
        }

        set zone(zone: string) {
            this._zone = zone;
        }
    }

    export class PlayerManager {
        private players: Player[] = [];

        addPlayer(id: string, name: string, zone: string): Player {
            const player = new Player(id, name, zone);
            this.players.push(player);
            return player;
        }

        getPlayer(id: string): Player | undefined {
            return this.players.find(player => player.id === id);
        }

        removePlayer(id: string): boolean {
            const index = Util.findIndex(this.players, player => player.id === id);
            if (index !== -1) {
                this.players.splice(index, 1);
                return true;
            }
            return false;
        }
    }
}
