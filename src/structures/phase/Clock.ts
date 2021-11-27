import { Phase, PhaseData } from ".";
import { Game } from "../../game";
import { Collection } from "../../utils/Collection";


export class Clock {
    current!: Phase;
    first!: Phase;
    phases: Collection<Phase>;
    game: Game;
    phaseStartedAt!: number;
    private timer!: NodeJS.Timeout;

    constructor(game: Game, data: { phases: Array<PhaseData>, firstPhase: string }) {
        this.game = game;
        this.phases = new Collection(data.phases.map(p => [p.name, new Phase(game, p)]));
        this.first = this.phases.get(data.firstPhase) as Phase;
    }

    timeLeft() : {seconds: number, minutes: number} {
        const now = Date.now();
        const msLeft = this.current.duration - (now - this.phaseStartedAt);
        let mins = Math.floor(msLeft / 60000);
        let secs = Math.round(((msLeft % 60000) / 1000));
        if (secs === 60) {
            mins++;
            secs = 0;
        }
        return { minutes: mins, seconds: secs };
    }
    
}