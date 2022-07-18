export function authenticated(state) {
  if (state.token) {
    var token = state.token.split("|");
    return token[1];
  }
  return null;
}
export function departament(state) {
  return state.idDepartament;
}
export function address_departament(state) {
  return state.idAddress;
}
export function URL_PRODUCTION(state) {
  return state.URL_PRODUCTION;
}
export function URL_PUBLIC_PRODUCTION(state) {
  return state.URL_PUBLIC_PRODUCTION;
}
