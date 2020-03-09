import gql from 'graphql-tag';

export const SUBMIT_USER = gql`
mutation loginUser($username:String!, $password: String!){
    login(username: $username,
          password: $password){
                                user{
                                        name
                                    }
                            }
}
`;

export const SUBMIT_NEWUSER = gql`
mutation singupUser(
            $name:String!, 
            $email:String!, 
            $password:String!){
singup(input:{
  name: $name,
  email: $email,
  password: $password
}){
  user{
    name
  }
}
}
`

export const SEND_EMAIL = gql`
mutation sendEmail(
                    $username: String!
                  ){
                    sendCodEmail(username: $username)
                    }
`

export const RECOVERY_PASSWORD = gql `
mutation recoveryPassword(
                          $code: String!,
                          $newPassword: String!
                          ){
                            recoveryPassword(
                                              code: $code, 
                                              newPassword: $newPassword)
                          }

`

export const CHECK_CODE = gql`
mutation checkCode(
                    $code: String!
                  ){
                    checkCode(code: $code)
                    }
`

export const GET_USER_BY_CODE = gql `
query getUserByCode(
                    $code: String!
                  ){
                    getUserByCode(
                                  code: $code
                                  ){
                                      user{
                                            name
                                          }
                                    }
                    }
`

export const GET_ACCESS_USER = gql `
{
    getAccessUser
}

`
export const GET_CURRENT_USER = gql `
{
  currentUser{
              user{
                    name
                    email
                    section{
                            color
                            icon
                            title
                            description
                            }
                    }
              }
}`

export const LOGOUT = gql `
mutation{
          logout
        }
`

export const CHANGE_PASSWORD = gql `
mutation changePassword(
                        $newPassword: String!,
                        $oldPassword: String!
                        ){
                            changePassword(
                                            newPassword:$newPassword,
                                            oldPassword:$oldPassword)
                          }
`

export const CREATE_SECTION = gql `
mutation createSection(
  $color:String!, 
  $icon:String!, 
  $title:String!,
  $description: String!){
                createSection(input:{
                                      color: $color,
                                      icon: $icon,
                                      title: $title,
                                      description: $description
                                    }
                              ){
                                user{
                                      section{
                                              color
                                              icon
                                              title
                                              description
                                        }
                                    }
                          }
}
`

export const EDIT_SECTION = gql `
mutation editSection(
  $oldTitle: String!
  $color:String!, 
  $icon:String!, 
  $title:String!,
  $description: String!){
                editSection(oldTitle: $oldTitle,
                              input:{
                                      color: $color,
                                      icon: $icon,
                                      title: $title,
                                      description: $description
                                    }
                              ){
                                user{
                                      section{
                                              color
                                              icon
                                              title
                                              description
                                        }
                                    }
                          }
}
`

export const DELETE_SECTION = gql `
mutation deleteSection(
  $title:String!){
                deleteSection(title: $title,){
                                user{
                                      section{
                                              color
                                              icon
                                              title
                                              description
                                        }
                                    }
                          }
}
`

export const CREATE_CARD = gql `
mutation createCard(
                $section: String!,
                $color: String!,
                $title: String!,
                $description: String!
                  ){
                    createCard(
                                section:$section,
                                input:{
                                        color: $color,
                                        title: $title,
                                        description: $description
                                }){
                                            color
                                            title
                                            description
                                    }
}
`

export const GET_CARDS = gql `
query getCards(
    $section: String!  
){
  getCards(section: $section){
    color
    title
    description
  }
}
`

export const DELETE_CARD = gql `
mutation deleteCard(
    $section: String!,
    $card: String!
){
  deleteCard(
    section: $section,
    card: $card
  ){
      color
      title
      description
  }
}

`

export const EDIT_CARD = gql `
mutation editCard(
                $section: String!,
                $card: String!,
                $color: String!,
                $title: String!,
                $description: String!
                  ){
                    editCard(
                                section:$section,
                                card: $card,
                                input:{
                                        color: $color,
                                        title: $title,
                                        description: $description
                                }){
                                            color
                                            title
                                            description
                                    }
}
`