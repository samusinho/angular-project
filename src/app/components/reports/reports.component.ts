import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(
    private shared: SharedService
  ) { }

  votes: any[];
  data: any;
  param = "party"; // party || candidate

  ngOnInit(): void {
    this.shared.get('votes').subscribe({
      next: ((response: any) => {
        this.votes = response.votes;
        this.orderBy();
      })
    });
  }

  orderBy(param: string = "party") {
    const data: any = {
      labels:[
        `Total de votaciones ${param == "candidate" ? "(Por Candidato)":
        (param == "station" ? "(Por mesa de votación)": "(Por partido)")}`
      ],
      datasets: []
    };
    const items: any = {};
    let cont = 0;
    for (let i of this.votes) {
      const attr = param == "candidate" ? i.candidate.name : 
      (param == "station" ? i.station.name : i.candidate.party.name);
      if (!items[attr]) {
        cont = 1;
        items[attr] = {
          label: attr,
          data: [cont],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgb(255, 99, 132)'],
          borderWidth: 1
        }
      } else { // candidato/partido/mesa ya está en el objeto
        cont++;
        items[attr]['data'] = [cont]
      }
    }
    for (let i in items) data.datasets.push(items[i]);
    this.data = data;
  }
}
