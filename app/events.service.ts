/**
 * Created by vincentma on 9/1/16.
 */


import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class EventsService {

    public isLogin: EventEmitter<any> = new EventEmitter();

    constructor() { }
}
