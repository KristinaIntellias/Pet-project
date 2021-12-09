import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ArticleWithoutId } from "../../models/article.model";
import { Controls, ErrorDescription, ErrorKey } from "../../models/article-dialog.model";
import { articleDialogErrors } from "../../constants/errors";

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.scss']
})
export class ArticleDialogComponent implements OnInit {
  form!: FormGroup;
  errorMap: Map<ErrorKey, ErrorDescription> = articleDialogErrors;

  constructor(public dialogRef: MatDialogRef<ArticleDialogComponent>) {}

  ngOnInit(): void {
    this.initForm();
  }

  submit() {
    this.dialogRef.close({ date: Date.now(), favorite: 0, ...this.form.value} as ArticleWithoutId);
  }

  cancel() {
    this.dialogRef.close();
  }

  getErrorMessage(control: Controls): ErrorDescription | null {
    for (let error of this.errorMap.entries()) {
      if (this.form.get(control)?.hasError(error[0])) {
        return error[1];
      }
    }
    return null;
  }

  private initForm(): void {
    this.form = new FormGroup({
      author: new FormControl('', [Validators.minLength(2), Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      content: new FormControl(''),
    });
  }
}
