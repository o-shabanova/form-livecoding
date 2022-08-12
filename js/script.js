"use strict"

/* спочатку нам треба перехопити те, що відправляється з форми*/
document.addEventListener('DOMContentLoaded', function () {
    // створюємо змінну
    const form = document.getElementById('form');
    // вішаємо івент на цю змінну
    //прі відправці форми, ми повинні перейти до функції formSend
    form.addEventListener('submit', formSend);

    //першим чином ми забороняємо стандартне відправлення форми, тобто при натисканні на кнопку нічого відбуватися не буде, все буде відбуватися в js
    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        if (error === 0) {

        } else {
            alert("Please, fill required field!");
        }
    }

    function formValidate(form) {
        let error = 0;
        //ця зминна буде вказувати на всі елементи з класом _req, це будуть елементи які ОБОВ'ЯЗКОВО треба буде заповнчтч
        let formReq = document.querySelectorAll('._req');
        //за допомогою цикла, ми будемо перебирати кожний елемент з _req класом і перевіряти вимоги
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];

            //перш ніж ми приступимо до перевірки, ми маємо прибрати в об'єкта клас _error
            formRemoveError(input);


            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    //якщо тест не пройдено, тоді будемо додавати елементу клас _error
                    formAddError(input);
                    //також будемо збільшувати нашу змінну error, тобто ми рахуємо кількість помилок
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input)
                error++;
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    //додають об'єкту клас _error і батьківському об'єкту також додають клас _error
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    //а тут прибирають клас _error у об'єкта і у батька
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    //Функція теста email, перевіряємо чи email відповідає нашим вимогам
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

})