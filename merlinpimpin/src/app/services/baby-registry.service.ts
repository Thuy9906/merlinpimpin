import { Injectable } from '@angular/core';
import { Gift } from '../models/baby-registry/gift.model';
import * as firebase from 'firebase';
import { ChildAreaService } from './child-area.service';
import { ChildArea } from '../models/child-area.model';

@Injectable({
  providedIn: 'root'
})
export class BabyRegistryService {
  
  public babyRegistry : Gift[] = [];
  
  constructor( public childAreaService: ChildAreaService) {
    this.childAreaService.childAreaSubject.subscribe(
      (childArea: ChildArea) => {
        this.babyRegistry = childArea.babyRegistry;
      }
    );
  }
  
  /*
  addGiftItem(gift : Gift){
    this.addGiftItemOnServer(gift).then(
      () =>{
        this.birthList.push(gift);
        console.log(this.birthList);
      }
    );
  }
  */
  addGiftItemOnServer(gift : Gift) {
    return new Promise (
      (resolve, reject) =>{
      firebase.firestore().collection('child-area-dashboard').doc(this.childAreaService.childArea.id).update(
          {
             'babyRegistry' : firebase.firestore.FieldValue.arrayUnion(giftConverter.toFirestore(gift))
          }).then(
        () => {
            resolve()
        },(error) => {
            reject(error);
        });
      }
    );
  }
  
  
}
  
  
  
export const giftConverter = {
    toFirestore: function(gift : Gift) {
        return {
            item: gift.item,
            quantity: gift.quantity,
            brand : gift.brand,
            price : gift.price,
//            donation : gift.donation,
            image : gift.image,            
            }
    },
    fromFirestore: function(snapshot : any, options : any){
        const data = snapshot.data(options);
        let gift = new Gift(data.item, data.quantity);
        gift.brand = data.brand;
        gift.price = data.price;
//        gift.donation = data.donation;
        gift.image = data.image;
        return gift;
        
    }
    
}
