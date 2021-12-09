import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
  @Input() text!: string;

  public initialText = `Popular Tags No tags are here... yet.`;
}
