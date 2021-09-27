import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../services/photo.service";
import {ModalController} from "@ionic/angular";
import {Todo, User} from "../types/types";
import {TodoFormComponent} from "../components/todo-form/todo-form.component";
import {AugmentedRealityComponent} from "../components/augmented-reality/augmented-reality.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private photoService: PhotoService,
              private modalController: ModalController,
              private router: Router) {}

  async ngOnInit(){
      await this.photoService.loadSaved();
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }


  presentAR() {
      this.router.navigate(['ar']);
  }

}
