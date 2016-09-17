/**
 * Created by Vincent on 9/15/2016.
 */

export class Comment {
    constructor(
        public post_id: number,
        public user_id: number,
        public content: string,
        public status: string,
    ) {}
}