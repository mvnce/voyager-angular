/**
 * Created by vincentma on 8/18/16.
 */

import {Component} from "@angular/core";
import {FaComponent} from 'angular2-fontawesome/components';


@Component({
    selector: 'loading',
    templateUrl: 'app/templates/loading.component.html',
    directives: [FaComponent],
})
export class LoadingComponent {
    isLoading = true;
}
