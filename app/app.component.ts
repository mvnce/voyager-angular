import {Component} from "@angular/core";
import {NavBarComponent} from "./navbar.component";


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'templates/app.component.html',
    styleUrls: ['../assets/stylesheets/style.css'],
    directives: [NavBarComponent],
})
export class AppComponent { }
