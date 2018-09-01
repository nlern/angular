import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-debug-panel',
  templateUrl: './debug-panel.component.html',
  styleUrls: ['./debug-panel.component.css']
})
export class DebugPanelComponent implements OnInit {

  @Input() data;
  @HostBinding('class.has-content') get content() { return this.hasContent; }
  hasContent = false;
  @HostBinding('class.is-visible') get visible() { return this.isVisible; }
  isVisible = false;

  constructor() {
    this.isVisible = localStorage.getItem('debugIsVisible') === 'true';
  }

  ngOnInit() {
    this.hasContent = (this.data);
  }

  onSaveState() {
    localStorage.setItem('debugIsVisible', this.isVisible.toString());
  }

}
