import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Issue } from 'src/app/issues/issue';

@Component({
    selector: 'app-employee-detail',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
    employee$: Observable<Employee>;
    issues$: Observable<Issue[]>;

    constructor(
        private service: EmployeeService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.employee$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.service.getEmployee(params.get('id')))
        );

        this.issues$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.service.getIssues(params.get('id')))
        );
    }

    gotoEmployees(employee: Employee) {
        const employeeId = employee ? employee.id : null;
        this.router.navigate(['/employees']);
    }
}