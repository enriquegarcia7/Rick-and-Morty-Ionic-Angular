import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule, SharedModule]
})
export class HomePage implements OnInit {

  characters: any[] = [];
  params = {} as any;

  constructor(private rickAndMortySvr: RickAndMortyService) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharacter();
  }
  //funcion para obtener personajes
    getCharacter(event?: any) {
      this.params.page += 1;

      this.rickAndMortySvr.getCharacter(this.params).subscribe({
        next: (res: any) => {

          this.characters.push(...res.results)
          console.log(this.characters);

          if(event) event.target.complete();
      },
      error: (err: any) => {
        if(event) event.target.complete();
    }
  })
}
//funcion para buscar personajes por nombre
searchCharacter() {
  this.params.page = 1;

  this.rickAndMortySvr.getCharacter(this.params).subscribe({
    next: (res: any) => {

      this.characters = res.results

  },
  error: (err: any) => {
  
  }
})
}
}
