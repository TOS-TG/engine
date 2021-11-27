import { Game } from "../../game";

export interface PhaseData {
    name: string,
    next: string,
    /**
     * In milliseconds
     */
    duration: number,
    iterations?: number
}

export type PhaseEvent = (game: Game, phase: Phase) => void;

export class Phase {
    game: Game;
    name: string;
    next: string;
    iterations: number;
    originalDuration: number;
    leftoverDuration?: number;
    private eventsEnd: Map<number, Array<PhaseEvent>>;
    private eventsStart: Map<number, Array<PhaseEvent>>;
    constructor(game: Game, data: PhaseData) {
        this.game = game;
        this.name = data.name;
        this.next = data.next;
        this.originalDuration = data.duration;
        this.iterations = data.iterations || 1;
        this.eventsEnd = new Map();
        this.eventsStart = new Map();
    }

    get duration() : number {
        return this.leftoverDuration || this.originalDuration;
    }

    start() {
        this.game.emit("phaseStart", this);
        const events = this.eventsStart.get(this.iterations);
        if (events) {
            for (const event of events) event(this.game, this);
            this.eventsStart.delete(this.iterations);
        }
    }

    end() : void {
        this.game.emit("phaseEnd", this);
        this.iterations++;
        delete this.leftoverDuration;
        const events = this.eventsEnd.get(this.iterations);
        if (events) {
            for (const event of events) event(this.game, this);
            this.eventsEnd.delete(this.iterations);
        }
        return;
    }

    addEvent(iteration: number, atStart: boolean, fn: PhaseEvent) : void {
        const map = atStart ? this.eventsStart : this.eventsEnd;
        const events = map.get(iteration);
        if (!events) map.set(iteration, [fn]);
        else events.push(fn);
    }

}