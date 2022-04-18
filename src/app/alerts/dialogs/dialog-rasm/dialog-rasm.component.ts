import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../instrument-review/instrument-review.component";
import {AlertsService} from "../../alerts.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-rasm',
  templateUrl: './dialog-rasm.component.html',
  styleUrls: ['./dialog-rasm.component.scss']
})
export class DialogRasmComponent implements OnInit {

  typeRams: any = "hola";
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogRasmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertsService: AlertsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      type_rasm: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    console.log('Alerta> id_poll: ', this.data.id_poll)
  }

  sendRASM() {
    //Enviamos el registro a RASM
    this.alertsService.postRASM({
      id_poll: this.data.id_poll,
      type_rasm: this.form.value.type_rasm
    }).subscribe()

    //Eliminamos el registro de ALERT
    this.alertsService.deleteAlertByIdPoll(this.data.id_poll).subscribe();
    this.router.navigate(['navbar/care-rasm']);
    this.dialogRef.close();
  }

}