import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-hi-children',
    templateUrl: './hi-children.component.html',
    imports: [FormsModule],
    standalone: true,
})

export class HiChildrenComponent implements OnInit {
    @Input() valueInput: string = '';
    @Input() twoWayBinding: string = '';
    @Output() handleChange = new EventEmitter();

    handleChangeInput(event: any) {
        this.handleChange.emit(event);
    }

    value_test  = 'Xin chao';
    ngOnInit() {}
}