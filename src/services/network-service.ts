export class NetworkService {

    private _worker: Worker;
    private _playerId: string;

    constructor() {
        this._worker = new Worker('../web-worker/network-worker.js');

        this._worker.onmessage = this.onProcessWorkerMessage;

        this._worker.postMessage({'cmd': 'initialize'});
    }

    public get playerId(): string { 
        return this._playerId;
    }

    public sendPosition(x: number, y: number) {
        this._worker.postMessage({'cmd': 'posUpdate', "x": x, "y": y});
    }

    private onProcessWorkerMessage(e: any) {
        if (!e.data) {
            return;
        }

        const message = e.data;

        switch(message.cmd) {
            case "playerId":
                this._playerId = message.data;
                break;
        }
    }
}
