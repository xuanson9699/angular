import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'hello',
    templateUrl: './hello.component.html',
    styleUrls: ['./hello.component.css'],
    imports: [CommonModule, FormsModule],
    standalone: true
})

export class HelloComponent implements OnInit {
    name = 'Angular';
    directive = '';

    number = 10;

    class_number_more_than_10 = 'class_number_more_than_10';

    class_number_less_than_10 = 'class_number_less_than_10';

    fontSize = '30px';

    value_test_10 = 'Hello'

    ngOnInit(): void {
        
    }

}