import Select from "../functions/Select.mjs";

export default class SortableGalery {
  #eventCoordinator;
  //   #eventPrefix;

  #customSelect;
  #mediaPreviewElements;

  constructor(eventCoordinator, customSelect, mediaPreviewElements) {
    this.#eventCoordinator = eventCoordinator;
    // this.#eventPrefix = "galery";

    this.#customSelect = new Select(this.#eventCoordinator, customSelect);
    this.#mediaPreviewElements = mediaPreviewElements;
  }

  init() {
    this.#eventCoordinator.subscribe("sort-valueChanged", (value) => {
      switch (value) {
        case "popular":
          this.#mediaPreviewElements.sort(
            (a, b) => b.data.likes - a.data.likes
          );
          break;
        case "date":
          this.#mediaPreviewElements.sort(
            (a, b) => new Date(b.data.date) - new Date(a.data.date)
          );
          break;
        case "title":
          this.#mediaPreviewElements.sort((a, b) =>
            a.data.title.localeCompare(b.data.title)
          );
          break;
      }

      this.#mediaPreviewElements.forEach((mediaPreview) =>
        mediaPreview.reRender()
      );
    });

    this.#customSelect.init();
    console.log("SortableGalery initialized");
  }
}
