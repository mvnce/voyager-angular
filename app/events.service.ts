/**
 * Created by vincentma on 9/1/16.
 */

import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class EventsService {
	public isLogin: EventEmitter<boolean> = new EventEmitter();
	public username: EventEmitter<string> = new EventEmitter();

	constructor () {
	}
}
