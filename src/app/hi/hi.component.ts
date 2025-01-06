import { Component } from "@angular/core";
import { HiChildrenComponent } from "../hi-children/hi-children.component";

@Component({
    selector: 'app-hi',
    templateUrl: './hi.component.html',
    imports: [HiChildrenComponent],
})

export class HiComponent {
    valueInput: string = 'Hi from parent';

    handleChange(event: any) {
        console.log('valueInput', event)
        this.valueInput = event.target.value
    }

    twoWayBinding = 'Two way binding'
}