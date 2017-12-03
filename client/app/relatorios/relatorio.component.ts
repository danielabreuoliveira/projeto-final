import { Component } from '@angular/core';
import {RelatorioService} from '../services/relatorio.service'

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent {

  constructor(relatorioService : RelatorioService) { 
    relatorioService.dadosCliente;

  }

  public lineChartData:Array<any> = [
    [10,20,30,10,20,40,30],
    [40,30,20,10,15,20,10]
  ];
  public lineChartLabels:Array<any> = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';
 
  // Pie
  public pieChartLabels:string[] = ['Produto A', 'Produto B', 'Produto C'];
  public pieChartData:number[] = [1000,2000,1500];
 
  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }




}
