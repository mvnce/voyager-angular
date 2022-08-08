/**
 * Created by vincentma on 9/9/16.
 */

export class Story {
  public uuid: string;
  public title: string;
  public content: string;
  public updatedAt: string;

  constructor(title: string, content: string) {
    this.uuid = '1234-5678-9011';
    this.title = title;
    this.content = content;
    this.updatedAt = new Date().getTime().toString();
  }
}
