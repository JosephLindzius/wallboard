import {Component, OnInit} from '@angular/core';
import { GoogleAuthProvider } from "firebase/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ModalController} from "@ionic/angular";
import {RegisterComponent} from "../register/register.component";
import {RegisterInfo} from "../../types/types";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;


@Component({
  selector: 'wb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  provider: GoogleAuthProvider = new GoogleAuthProvider();
  registerInfo!: RegisterInfo

  constructor(private fireAuth: AngularFireAuth,
              private location: Location,
              private modalController: ModalController,
              private us: UserService,
              private router: Router
  ) {
  }

  ngOnInit() {
  }

  async presentRegisterModal() {
    const modal = await this.modalController.create({
      component: RegisterComponent,
      componentProps: {registerInfo: this.registerInfo, buttonCopy: "Register", needName: true},
      cssClass: 'wallboard-register'
    });

    modal.onDidDismiss()
      .then((data) => {
        const registerInfo = data['data']
        this.registerInfo = registerInfo
        this.registerWithWallboard(this.registerInfo)
      })
    return await modal.present();
  }

  async presentLoginModal() {
    const modal = await this.modalController.create({
      component: RegisterComponent,
      componentProps: {registerInfo: this.registerInfo, buttonCopy: "Login"},
      cssClass: 'wallboard-register'
    });

    modal.onDidDismiss()
      .then((data) => {
        const loginInfo = data['data']
        this.registerInfo = loginInfo
        this.loginWithWallboard(this.registerInfo)
      })
    return await modal.present();
  }

  registerWithWallboard(registerInfo: RegisterInfo) {
    this.fireAuth.createUserWithEmailAndPassword(registerInfo.email, registerInfo.password)
      .then((userCred) => {
        if (userCred.additionalUserInfo.isNewUser) {
          this.us.addUser(registerInfo, userCred).then(() => this.router.navigate(['home']));
        }
      })

  }

  loginWithWallboard(loginInfo: RegisterInfo) {
    this.fireAuth.signInWithEmailAndPassword(loginInfo.email, loginInfo.password).then(() => this.router.navigate(['home']))
  }

  loginWithGoogle() {
    this.fireAuth.signInWithPopup(this.provider).then((userCred) => {
      this.checkId(userCred)
      return this.router.navigate(['home'])
    })
  }

  private async checkId(userCredential: UserCredential) {
    if (userCredential.additionalUserInfo.isNewUser) {
      await this.us.addGoogleUser(userCredential).then(() => this.router.navigate(['home']));
    }
  }

}
