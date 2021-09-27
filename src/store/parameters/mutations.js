export function SET_TOKEN(state, token) {
    state.token = token;
}
export function SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions;
}
export function SET_RENDER(state) {
    state.isRouterAlive = isRouterAlive;
}
export function SET_DEPARTAMENT(state, id_departament,id_address) {
    state.idDepartament = id_departament;
}
export function SET_ADDRESS(state,id_address) {
    state.idAddress = id_address;
}