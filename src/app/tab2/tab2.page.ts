import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../services/photo.service";
import {ModalController, PopoverController} from "@ionic/angular";
import {Photo, Todo} from "../types/types";
import {TodoFormComponent} from "../components/todo-form/todo-form.component";
import {AugmentedRealityComponent} from "../components/augmented-reality/augmented-reality.component";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ImagePopoverComponent} from "../components/image-popover/image-popover.component";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public photos: Photo[]

  constructor(private photoService: PhotoService,
              private modalController: ModalController,
              private router: Router,
              private ps: PopoverController) {}

  async ngOnInit(){
      await this.photoService.loadSaved().then(()=>{
        this.photos = this.photoService.photos
      })
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }


  presentAR() {
      this.router.navigate(['ar']);
  }

    async showPopover(photo: Photo) {
      const popover = await this.ps.create({
        component: ImagePopoverComponent,
        componentProps: {imageSource: photo.webviewPath, title: 'Gallery Picture'},
        cssClass: 'image-popover',
        translucent: true
      });
      await popover.present();

      const { role } = await popover.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
}
