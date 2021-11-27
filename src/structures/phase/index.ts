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
    duration: number;
    iterations: number;
    private eventsEnd: Map<number, Array<PhaseEvent>>;
    private eventsStart: Map<number, Array<PhaseEvent>>;
    constructor(game: Game, data: PhaseData) {
        this.game = game;
        this.name = data.name;
        this.next = data.next;
        this.duration = data.duration;
        this.iterations = data.iterations || 0;
        this.eventsEnd = new Map();
        this.eventsStart = new Map();
    }

    start() {
        this.game.clock.current = this;
        this.game.emit("phaseStart", this);
        const events = this.eventsStart.get(this.iterations);
        if (events) {
            for (const event of events) event(this.game, this);
            this.eventsStart.delete(this.iterations);
        }
    }

    end(startNext = true) {
        this.game.emit("phaseEnd", this);
        this.iterations++;
        const events = this.eventsEnd.get(this.iterations);
        if (events) {
            for (const event of events) event(this.game, this);
            this.eventsEnd.delete(this.iterations);
        }
        if (startNext) {
            const nextPhase = this.game.clock.phases.get(this.next) as Phase;
            nextPhase.start();
        }
    }

    addEvent(iteration: number, atStart: boolean, fn: PhaseEvent) {
        const map = atStart ? this.eventsStart : this.eventsEnd;
        const events = map.get(iteration);
        if (!events) map.set(iteration, [fn]);
        else events.push(fn);
    }

}