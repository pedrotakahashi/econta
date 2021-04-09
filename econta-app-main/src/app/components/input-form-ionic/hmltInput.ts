export abstract class hmltInput {

  public static check() {
    document.querySelectorAll('.input-custom')['forEach']((input: any) => {
      if (input.value.length != 0) {
        input.closest('div').classList.add('hasValue');
      } else {
        input.closest('div').classList.remove('hasValue');
      }
    });
  }
  public static format() {
    document.querySelectorAll('.field-wrapper')['forEach'](input => input.addEventListener('click', function () {
      this.classList.add('hasValue');
      this.children[0].focus();
    }));

    document.querySelectorAll('.input-custom')['forEach']((input: any) => {
      if (input.value && input.value.length != 0) {
        input.closest('div').classList.add('hasValue');
      }
      input.addEventListener('blur', function () {
        if (this.value.length == 0) {
          this.closest('div').classList.remove('hasValue');
        } else {
          input.closest('div').classList.add('hasValue');
        }
      })
    });
  }
  public static textArea() {
    document.querySelectorAll('.field-wrapperArea')['forEach'](input => input.addEventListener('click', function () {
      let index = 0;
      for (let i = 0; i < this.form.length; i++) {
        const element = this.form[i];
        if (element.type === 'fieldset') {
          index = i;
        }
      }

      if (this.form && this.form.length > 1) {
        this.form[index].classList.add('hasValue');
        if (this.form[index].children && this.form[index].children.length > 1) {
          this.form[index].children[0].classList.add('hasTextareaValue');
        }
      }
      this.classList.add('hasTextareaValue');
    }));
    document.querySelectorAll('.input-custom')['forEach'](input => input.addEventListener('blur', function () {

      let index = 0;
      for (let i = 0; i < this.form.length; i++) {
        const element = this.form[i];
        if (element.type === 'fieldset') {
          index = i;
        }
      }

      if (this.form && this.form.length > 1) {
        this.form[index].classList.remove('hasValue');
        if (this.form[0].children && this.form[index].children.length > 1) {
          this.form[index].children[0].classList.remove('hasTextareaValue');
          this.form[index].children[1].classList.remove('hasTextareaValue');
        }
      }
      if (this.form && this.form.length >= index + 1) {
        this.form[index + 1].classList.remove('hasTextareaValue');
      }
    }));
  }

}



