import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Form, FormControl} from "@angular/forms";
import {RegisterInfo} from "../../types/types";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'wb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  email: FormControl = new FormControl('');
  name: FormControl = new FormControl('')
  password: FormControl = new FormControl('');
  buttonCopy: string = "";
  needName: boolean = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onSubmit(){
    const registerInfo: RegisterInfo = {
      email: this.email.value,
      password: this.password.value,
      name: this.name.value
    }
    this.modalController.dismiss(registerInfo);
  }

  dismissModal(){
    this.modalController.dismiss();
  }
}
