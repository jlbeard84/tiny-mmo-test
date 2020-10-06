import * as ex from 'excalibur';
import { GameResources } from '../resources';

export class ResourceLoader extends ex.Loader {

    constructor () {
        super();

        for (let key in GameResources) {
            this.addResource(GameResources[key]);
        }
    }
}