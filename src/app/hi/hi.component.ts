import { Component } from "@angular/core";
import { HelloComponent } from "../hello/hello.component";

@Component({
    selector: 'app-hi',
    template: '<h1>Hiiiiiiiiiiiiiiiiiiiiiiiiiiiii</h1>',
    imports: [HelloComponent]
})

export class HiComponent {

}