export const SUBMIT_USER = `
mutation loginUser($username:String!, $password: String!){
    login(username: $username,
          password: $password){
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
}
`;

export const SUBMIT_NEWUSER = `
mutation singupUser(
            $name:String!, 
            $email:String!, 
            $password:String!){
                          singup(input:{
                                        name: $name,
                                        email: $email,
                                        password: $password
                                        }
                                  )
                                {
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
}
`

export const SEND_EMAIL = `
mutation sendEmail(
                    $username: String!
                  ){
                    sendCodEmail(username: $username)
                    }
`

export const RECOVERY_PASSWORD = `
mutation recoveryPassword(
                          $code: String!,
                          $newPassword: String!
                          ){
                            recoveryPassword(
                                              code: $code, 
                                              newPassword: $newPassword)
                          }

`

export const CHECK_CODE =  `
mutation checkCode(
                    $code: String!
                  ){
                    checkCode(code: $code)
                    }
`

export const GET_USER_BY_CODE = `
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

export const GET_CURRENT_USER = `
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

export const LOGOUT = `
mutation{
          logout
        }
`

export const CHANGE_PASSWORD = `
mutation changePassword(
                        $newPassword: String!,
                        $oldPassword: String!
                        ){
                            changePassword(
                                            newPassword:$newPassword,
                                            oldPassword:$oldPassword)
                          }
`

export const CREATE_SECTION = `
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

export const EDIT_SECTION = `
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

export const DELETE_SECTION = `
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

export const CREATE_CARD = `
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

export const GET_CARDS = `
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

export const DELETE_CARD = `
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
}`

export const EDIT_CARD = `
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