import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromoService } from '../promo.service';
import { SubSink } from "subsink";
import SweetAlert from 'sweetalert2';
import { ActivatedRoute, Router } from "@angular/router";

@Component( {
  selector: 'app-add-promo-form',
  templateUrl: './add-promo-form.component.html',
  styleUrls: [ './add-promo-form.component.scss' ]
} )
export class AddPromoFormComponent implements OnInit {
  // promoAdded is used to emit an event when a promo is added
  @Output() promoAdded = new EventEmitter<void>();
  // existingPromo is used to store the existing promo details when editing a promo
  existingPromo: any;
  // promoForm is used to store the form group
  promoForm!: FormGroup;
  // loading state
  loading = false;
  // subs is used to store the subscriptions
  private subs = new SubSink();
  // title is used to store the title of the form
  title = 'Add';
  // ID from param
  id: string | null = '';

  // initializeForm to initialize the form group
  private initializeForm(): void {
    this.promoForm = this.fb.group( {
      ref: [ '', Validators.required ],
      title: [ '', Validators.required ],
      sub_title: [ '', Validators.required ],
      description: [ '', Validators.required ],
    } );
  }

  // getPromoOperation to conditionally call the createPromo or updatePromo method based on the existingPromo
  private getPromoOperation() {
    return this.existingPromo
      ? this.promoService.updatePromo(this.existingPromo._id, this.promoForm.value)
      : this.promoService.createPromo(this.promoForm.value);
  }

// handleSuccessResponse to handle the success response
  private handleSuccessResponse() {
    this.loading = false;
    SweetAlert.fire({
      title: 'Success',
      text: this.existingPromo ? "Promo updated successfully" : "Promo added successfully",
      icon: 'success',
      allowOutsideClick: false,
    });
    this.route.navigate(['/promo']);
    this.promoAdded.emit();
    if (!this.existingPromo) {
      this.promoForm.reset();
    }
  }

  // handleErrorResponse to handle the error response
  private handleErrorResponse(err: any) {
    this.loading = false;
    console.error('Error updating/creating promo:', err);
  }

  // constructor to inject the required services
  constructor( private fb: FormBuilder, private promoService: PromoService, private router: ActivatedRoute, private route: Router ) {
  }

  // ngOnInit to initialize the component
  ngOnInit(): void {
    // initializeForm is called to initialize the form group
    this.initializeForm();
    // getPromoDetails is called to get the promo details when editing a promo
    this.getIdParam();
    // getPromoDetails is called to get the promo details when editing a promo
    if (this.id) {
      this.getDetails( this.id );
    }
  }

  // Get details of the promo and patch the form with the existing promo details
  getDetails(id: string) {
    this.loading = true;
    this.subs.sink = this.promoService.getDetails(id).subscribe((data) => {
      if (data) {
        this.title = 'Edit';
        this.existingPromo = data;
        this.promoForm.patchValue(this.existingPromo);
      }
      this.loading = false;
    });
  }

  // getIdParam to get the id param from the route
  getIdParam() {
    this.id = this.router.snapshot.paramMap.get( 'id' );
  }


  onSubmit() {
    if (this.promoForm?.valid) {
      this.loading = true;
      const promoOperation = this.getPromoOperation();
      this.subs.sink = promoOperation.subscribe({
        next: (res) => this.handleSuccessResponse(),
        error: (err) => this.handleErrorResponse(err)
      });
    }
  }


}
