
export function authenticated(state){
   var token = state.token.split("|");
    return token[1];
 }
 export function departament(state){
    return state.idDepartament;
 }
 export function address_departament(state){
   return state.idAddress;
}