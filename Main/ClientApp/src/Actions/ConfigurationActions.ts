import ConfigurationApi from "../Api/ConfigurationApi";
import Dispatcher from "../Infrastructure/Dispatcher";
import { Configuration } from "../Model/Configuration";
import ActionTypes from "./ActionTypes";

export async function loadConfiguration() {
  let configuration = await ConfigurationApi.getConfiguration();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_CONFIGURATION,
    payload: { configuration: configuration },
  });
}

export async function updateConfiguration(config: Configuration) {
  let success = await ConfigurationApi.updateConfiguration(config);
  if (success) loadConfiguration();
  else console.error("Nie można zaktualizować konfiguracji");
}
