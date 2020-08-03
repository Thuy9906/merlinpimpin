import { Component, OnInit, Input } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

import * as firebase from 'firebase';

@Component({
  selector: 'active-image',
  templateUrl: './active-image.component.html',
  styleUrls: ['./active-image.component.scss']
})
export class ActiveImageComponent implements OnInit {

  /**
   * Tells if overlay shall provide an uplaod button, i case image shal be modifiable on server by user
   */
  @Input() hasUploadButton: boolean = true;
  
  /**
   * Gives the document node endpoint within SDB
   * DOcument will be used to store url and miniature url of the uploaded image
   * Shall be provided if upload button is active
   */
  @Input() sdbDocNode: string = "";
  
  /**
   * Gives the SDB property name within the document to the image url
   * Shall be provided if upload button is active
   */
  @Input() imageUrlSdbProperty: string = "";
  
  /**
   * Gives the SDB property name within the document to the miniature image url
   * Shall be provided if upload button is active
   */
  @Input() miniatureImageUrlSdbProperty: string = "";
  
  /**
   * Link to the url image. interactive: if modified (via upload on corresponding node for instance), image is updated
   * Shall be provided
   */
  @Input() imageSrc: string;
  
  /**
   * Input image width, in px
   */
  @Input() containerWidth: number = 200;
  
  /**
   * Input image height, in px
   */
  @Input() containerHeight: number = 200;
  
  /**
   * Input image width
   */
  @Input() containerBorderRadius: number = 0;
  
  
  /**
   * Gives the upload action spinner status, in case upload is active
   */
  public imageLoadingStatus: number = -1;
  
  /**
   * Gives the upload spiner message, in case upload is active
   */
  public imageLoadingMessage: string = "";
  
  /**
   * Tels if active image is on focus, which means overlay shall stay visible, even not on hover
   */
  public onFocus: boolean = false;
  
  /**
   * Uses the image upload service
   */
  constructor(
    private uploadService: UploadService) { }

  ngOnInit(): void {
  }
  
  /**
   * Triggers when the change image button is used by user and image is selected
   */
  public onChangeImage(event: any) {
    var file = event.target.files[0]
    this.imageLoadingStatus = 0;
    this.onFocus = true;
    
    // Try upload image
    this.uploadService.uploadFile(file).then(
      (url: string) => {
        // Set additionnal timeout to wait for post actions on image by server
        setTimeout(() => {
          
          let that = this;
          
          // Compute minaiture image URL
          const extensionIndex = url.lastIndexOf('.');
          const miniatureUrl = url.substring(0, extensionIndex) + '_200x200' + url.substring(extensionIndex, url.length);
          
          // Compute property update to perform at selected document node
          let sdbPropertyUpdate = {};
          sdbPropertyUpdate[this.imageUrlSdbProperty] = url;
          sdbPropertyUpdate[this.miniatureImageUrlSdbProperty] = miniatureUrl;
          firebase.firestore().doc(this.sdbDocNode).update(sdbPropertyUpdate)
            .then(function() {
                // Set upload status
                that.imageLoadingStatus = 1;
                
                // Release status after the 3 second validation time span
                setTimeout(() => {
                  that.imageLoadingStatus = -1;
                }, 3000);
              })
            .catch(function(error) {
                // If any, notify failure to user
                that.imageLoadingStatus = 2;
                console.log(error);
              });
            
        }, 5000);
      }
    );
  }

}
