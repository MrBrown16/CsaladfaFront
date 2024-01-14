import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent {
  person:any
  selectedId:any = null


  constructor(private base:BaseService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.person = this.route.paramMap.pipe(
      switchMap(params => {
        if (params.get('id')!=null) {
          this.selectedId = parseInt(params.get('id')!, 10);
          return this.base.getPersonById(this.selectedId);
        }
      })
    );
  }
}
