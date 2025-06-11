import "./styles.css";
import { updateWeatherContent } from "./weather";

const form = document.querySelector("#location-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const locationInput = formData.get("location");

  updateWeatherContent(locationInput);
});
