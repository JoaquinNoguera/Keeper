export const LOGIN = `
mutation Login( $username: String! , $password: String! ){
	login( username: $username, password: $password){
    user{
      name
    }
  }
}
`

export const LOGOUT = `
mutation{
          logout
        }
`


export const SINGUP = `
mutation singup( $name:String!, $email:String!, $password:String!){
  singup(
      input:{
              name: $name,
              email: $email,
              password: $password
            }
  ){
    user{
        name
    }
  }
}
`

export const SEND_EMAIL = `
mutation sendEmail( $username: String! ){
    sendCodEmail(username: $username)
}
`

export const CHECK_CODE = `mutation checkCode( $code: String!){
  checkCode(code: $code)
}
`

export const RECOVERY_PASSWORD = `
  mutation recoveryPassword( $code: String!, $newPassword: String! ){
    recoveryPassword( code: $code,  newPassword: $newPassword )
  }
`