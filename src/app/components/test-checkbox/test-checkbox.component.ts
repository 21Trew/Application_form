import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-test-checkbox',
  templateUrl: './test-checkbox.component.html',
  styleUrls: ['./test-checkbox.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestCheckboxComponent),
      multi: true
    }
  ]
})
export class TestCheckboxComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() options: any[] = [];
  value: any[] = [];

  onChange: (value: any[]) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any[]): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  updateSkills(option: any) {
    if (option.value === 'all') {
      this.handleSelectAll();
    } else {
      this.handleSingleOption(option);
    }
    this.onChange(this.value);
  }

  private handleSelectAll() {
    const allSelected = this.areAllSelected();
    this.options.forEach(opt => {
      opt.checked = !allSelected;
      this.updateValueArray(opt.value, opt.checked);
    });
  }

  private handleSingleOption(option: any) {
    this.updateValueArray(option.value, option.checked);

    // Обработка чекбокса "выделить все"
    if (!option.checked) {
      const allOption = this.options.find(opt => opt.value === 'all');
      if (allOption) {
        allOption.checked = false;
        this.updateValueArray(allOption.value, false);
      }
    }
  }

  private updateValueArray(value: string, isChecked: boolean) {
    const index = this.value.indexOf(value);

    if (isChecked && index === -1) {
      this.value.push(value);
    } else if (!isChecked && index !== -1) {
      this.value.splice(index, 1);
    }
  }

  areAllSelected(): boolean {
    return this.options.filter(option => option.value !== 'all').every(option => option.checked);
  }

  protected readonly Math = Math;
}
