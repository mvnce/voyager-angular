import {Component} from "angular2/core";
import {NavBarComponent} from "./navbar.component";



@Component({
    selector: "my-app",
    templateUrl: "app/templates/app.component.html",
    directives: [NavBarComponent],
})
export class AppComponent { }