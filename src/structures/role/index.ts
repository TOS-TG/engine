import { Game } from "../../game";
import { Player } from "../player";
import { Faction, WinCondition } from "./faction";

export const enum PossibleRoleTargets {
    SelfOnly,
    Anyone
}

export type ActionTypes = "day" | "night" | "factional";

export interface RoleAction {
    condition?: (game: Game, player: Player) => boolean,
    action: (game: Game, player: Player, targets: Array<Player>) => void;
}

export type RoleHook = (game: Game, player: Player, ...other: Array<unknown>) => boolean;

export type RoleHookTypes = "target" // When the player who has this role gets targeted
| "kill" // When the player who has this role gets killed
| "thisVote" // When the player who has this role **votes** for someone
| "thisUnvote" // When the player who has this role unvotes for someone
| "vote" // When the player gets voted for
| "unvote" // When the player gets unvoted by another player
| "lynch" // When the player who has this role gets lynches
| "start" // When the game starts
| "attacked" // When the player who has this role gets attacked
| "message" // When this player receives a message
| "roleblocked" // When this player gets roleblocked

export interface RoleDescription {
    abilities: string,
    attributes: string
}

export interface RoleAttributes {
    attack: number,
    defense: number,
    astralVisits?: boolean,
    priority: number,
    category: number,
    actionAmount?: number,
    possibleTargets: PossibleRoleTargets
}

export interface RoleData {
    name: string,
    faction: string, // The faction's name
    alignment: string,
    amount?: number, // 1 for unique, undefined for unlimited
    description: RoleDescription,
    attributes: RoleAttributes,
    hooks: Record<RoleHookTypes, RoleHook>,
    actions: Record<ActionTypes, RoleAction>,
    /**
     * If not present it gets inherited from the faction
     */
    winCondition?: WinCondition
}

export class Role {
    game: Game;
    name: string;
    faction: Faction;
    alignment: string;
    description: RoleDescription;
    attributes: RoleAttributes;
    hooks: Record<RoleHookTypes, RoleHook>;
    actions: Record<ActionTypes, RoleAction>;
    constructor(game: Game, data: RoleData) {
        this.name = data.name;
        this.alignment = data.alignment;
        if (!game.factions.has(data.faction)) throw new Error(`Faction "${data.faction}" doesn't exist."`);
        this.faction = game.factions.get(data.faction) as Faction;
        this.description = data.description;
        this.attributes = data.attributes;
        this.hooks = data.hooks;
        this.actions = data.actions;
        this.game = game;
    }
}