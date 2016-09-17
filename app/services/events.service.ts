/**
 * Created by vincentma on 9/1/16.
 */


import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventsService {

    public isLogin: EventEmitter<any> = new EventEmitter();
    public isFinish: EventEmitter<any> = new EventEmitter();
    private showComment = new Subject<boolean>();

    showCommentStatus$ = this.showComment.asObservable();

    constructor() { }
}
