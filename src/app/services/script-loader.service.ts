import { Injectable } from '@angular/core';
import {ScriptStore} from "../store/other/script.store";
import {Scripts} from "../types/types";

declare var document: HTMLDocument

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  private scripts: Scripts = {
    name:'',
    src: ''
  }

  constructor() {
    ScriptStore.forEach((script: Scripts) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    let promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (this.scripts[name].loaded) {
        resolve({script: name, loaded: true, status: 'Already Loaded'});
      }
      else {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({script: name, loaded: true, status: 'Loaded'});
          };
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

}
