/**
 * Created by vincentma on 9/9/16.
 */

export class Thread {
    constructor(public title: string, public content: string) {}


    getJSON() {
        return {
            "title": this.title,
            "content": this.content
        };
    }
}
