import { Game } from "../../game";
import { Role } from "../role";

export interface PlayerData {
    name: string,
    num: number,
    id: string,
    role: Role
}

export const enum PlayerState {
    Alive,
    Dead,
    Spectator,
    Host
}

export const enum PlayerJudgement {
    Guilty,
    Innocent,
    Abstain
}

export const enum PlayerInfoTypes {
    /**
     * Result messages, sheriff results, invest results, roleblocked, witched messages etc.
     */
    Result,
    /**
     * Messges which inform the death of the player.
     */
    Death,
    /**
     * Messages which are good for the player, heal, save, etc.
     */
    Good
}

/**
 * These messages are sent from other roles to a player, and only the player can see them. 
 */
export interface PlayerMessage {
    type: PlayerInfoTypes,
    content: string
}

export class Player {
    game: Game;
    name: string;
    num: number;
    role: Role;
    state: PlayerState;
    /**
     * If the array of targets is empty, then that means the player stayed home (aka they didn't select anyone to target), if the array is empty then the action `targets: 0` will be executed only,
     * if it's set to undefined, then the action has been removed from another role (for example escort).
     * 
     * This property is used for **night** and **factional** actions only, because day actions get immediately executed, the day action's targets don't need to be shown.
     */
    targets?: Array<Player>;
    /**
     * Night result messages. All of them get sent at once at the end of every night, and then the array gets emptied.
    */
    messages: Array<PlayerMessage>;
    votes: number;
    votedFor?: Player;
    judgement?: PlayerJudgement;
    /**
     * An object which gets cleared at the end of every night, anything can be stored inside.
     */
    nightly: Record<string, unknown>;
    constructor(game: Game, data: PlayerData) {
        this.game = game;
        this.name = data.name;
        this.num = data.num;
        this.role = data.role;
        this.state = PlayerState.Alive;
        this.votes = 0;
        this.nightly = {};
        this.targets = [];
        this.messages = [];
    }

    
}