import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';

import { TestCheckboxComponent } from './components/test-checkbox/test-checkbox.component';
import { TestInputComponent } from './components/test-input/test-input.component';
import { TestNumberComponent } from './components/test-number/test-number.component';
import { TestSelectComponent } from './components/test-select/test-select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TestInputComponent,
    TestSelectComponent,
    TestNumberComponent,
    TestCheckboxComponent,
    FormsModule,
    NgClass,
    NgIf,
    NgForOf,
    NgStyle
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  testForm = {
    name: '',
    age: 1,
    maritalStatus: 'Не женат / не замужем',
    university: '',
    birthPlace: 'Не важно',
    skills: [],
    universities: [] as string[]
  };

  universities: string[] = [];

  skillsOptions = [
    { label: 'Общение', value: 'communication' },
    { label: 'Иностранные языки', value: 'languages' },
    { label: 'Бег с препятствиями', value: 'running' },
    { label: 'Быстрое чтение', value: 'reading' },
    { label: 'Самозащита', value: 'selfDefense' },
    { label: 'Вождение', value: 'driving' },
    { label: 'Программирование', value: 'programming' },
    { label: 'Управление вертолетом', value: 'helicopter control' },
    { label: 'Оперное пение', value: 'singing' },
    { label: 'Выделить все', value: 'all' }
  ];

  get availableMaritalStatusOptions() {
    return this.testForm.maritalStatus === 'Не женат / не замужем'
      ? ['Женат / замужем']
      : ['Не женат / не замужем'];
  }

  submitForm() {
    this.testForm.universities = [...this.universities];

    alert('Форма успешно отправлена!');

    console.log(this.testForm);

    this.testForm = {
      name: '',
      age: 1,
      maritalStatus: 'Не женат / не замужем',
      university: '',
      birthPlace: 'Не важно',
      skills: [],
      universities: [] as string[]
    };
    this.universities = [];
  }

  onAdd() {
    const newUniversity = this.testForm.university;
    if (!newUniversity) {
      alert('Пожалуйста, введите название университета.');
      return;
    }

    this.universities.push(newUniversity);
    this.testForm.university = '';
  }

  onRemove() {
    if (this.universities.length > 0) {
      this.universities.pop();
    }
  }

  isFormValid() {
    return this.testForm.name.trim() !== '' &&
      this.testForm.age > 0 &&
      this.testForm.maritalStatus !== '';
  }
}
