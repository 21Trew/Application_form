import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-test-number',
  templateUrl: './test-number.component.html',
  styleUrls: ['./test-number.component.scss'],
  standalone: true,
  imports: [
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestNumberComponent),
      multi: true
    }
  ]
})
export class TestNumberComponent implements ControlValueAccessor {
  @Input() label!: string;
  value!: number;

  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(value: number) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  increment() {
    this.setValue(this.value + 1);
  }

  decrement() {
    if (this.value > 0) {
      this.setValue(this.value - 1);
    }
  }
}
