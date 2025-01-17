export default class FormService {
  #eventCoordinator;
  #eventPrefix;

  #formElement;
  #submitButton;

  constructor(eventCoordinator, formElement) {
    this.#eventCoordinator = eventCoordinator;
    this.#eventPrefix = formElement.classList[0].split("-")[0];

    this.#formElement = formElement;
    this.#submitButton = Array.from(formElement.elements).find(
      (element) => element.id === "submit-button"
    );
    this.#submitButton.removeAttribute("id");
    this.#submitButton.addEventListener("click", (event) =>
      this.#validateFormHandler(event)
    );
  }

  #validateFormHandler(event) {
    if (this.#formElement.reportValidity()) {
      event.preventDefault();

      Array.from(this.#formElement.elements).forEach((element) => {
        if (element.type === "submit") return;
        console.log(`${element.id}: ${element.value}`);
      });

      this.#eventCoordinator.emit(`${this.#eventPrefix}-formSubmitted`);
    }
  }
}
