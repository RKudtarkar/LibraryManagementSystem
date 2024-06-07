import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.scss'
})
export class ReturnBookComponent {

  returnForm: FormGroup;
  fineToPay: number | null = null;
  constructor(fb: FormBuilder,private apiService:ApiService,private snakbar:MatSnackBar){
    this.returnForm=fb.group({
      userId: fb.control(null),
      bookId:fb.control(null)
    });
  }
  returnBook(){
    let userId=this.returnForm.get("userId")?.value;
    let bookId=this.returnForm.get("bookId")?.value;
    
    this.apiService.returnBook(userId,bookId,this.fineToPay!).subscribe({
      next: (res)=>{
        if (res === 'returned')
          this.snakbar.open('Book has been Returned!', 'OK');
        else this.snakbar.open('Book has not Returned!', 'OK');
      }
    })
  }

  getFine(){
    let userId=this.returnForm.get("userId")?.value;
    let bookId=this.returnForm.get("bookId")?.value;

    this.apiService.getOrdersOfUser(userId).subscribe({
      next: (res:Order[])=>{
        if (res.some(o=>!o.returned && o.bookId==bookId)) {
          let order: Order = res.filter((o) => o.bookId == bookId)[0];
          this.fineToPay = this.apiService.getFine(order);
        }
        else{
          this.snakbar.open(`user dosent have book with Id: ${bookId}`,'OK');
        }
      }
    })
  }
}
