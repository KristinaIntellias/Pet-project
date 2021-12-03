import { Component, OnInit } from '@angular/core';

import {icons} from "../../constants/icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // icon = icons.writingPencil;
  // icon = './pencil-writing.svg';
  icon = '/fb.svg';

  ngOnInit(): void {
  }

}
