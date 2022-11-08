import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export default class ToastService {
    
    toastr: CustomToastrService;

    constructor(private toastrService: ToastrService) {
        this.toastr = new CustomToastrService(this.toastrService);
    }
}

class CustomToastrService {

    constructor(private toastrService: ToastrService) {
  
    }
  
    private readonly defaultTitle: string = 'Atenção';
  
    success = (message: string, title?: string) => setTimeout(() => this.toastrService.success(message, title || this.defaultTitle));
  
    error = (message: string, title?: string) => setTimeout(() => this.toastrService.error(message, title || this.defaultTitle));
  
    info = (message: string, title?: string) => setTimeout(() => this.toastrService.info(message, title || this.defaultTitle));
  
    warning = (message: string, title?: string) => setTimeout(() => this.toastrService.warning(message, title || this.defaultTitle));
}