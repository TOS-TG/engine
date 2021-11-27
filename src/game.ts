import { PhaseData } from "./structures/phase";
import { Player } from "./structures/player";
import { Role } from "./structures/role";
import { Faction } from "./structures/role/faction";
import { Collection } from "./utils/Collection";
import { EventEmitter } from "events";
import { Clock } from "./structures/phase/Clock";

export class Game extends EventEmitter {
    players: Collection<Player>;
    roles: Collection<Role>;
    factions: Collection<Faction>;
    clock: Clock;

    constructor(data: {
        phases: Array<PhaseData>,
        firstPhase: string
        }) {
        super();
        this.players = new Collection();
        this.roles = new Collection();
        this.factions = new Collection();
        this.clock = new Clock(this, data);
    }


}